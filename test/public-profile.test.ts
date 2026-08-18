/**
 * The public page renderer.
 *
 * Every string this file feeds in is something a shop can actually type into
 * its own workspace, and the page is served to strangers with no session in
 * front of it. So most of what is asserted here is not "does it look right" but
 * "does a shop's text stay text" — in the document, in an attribute, in an
 * href, and inside the JSON-LD block, which is the one place `<` alone ends the
 * script early.
 *
 * The rest covers the two things that would quietly send a customer to the
 * wrong place: a `tel:` built from a number that was never a number, and a
 * WhatsApp link built from a number that was not in the shape the conversion
 * assumes.
 */
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  coversToday, esc, isThin, openingHours, renderProfilePage, safeHref, telHref, whatsappHref,
  type PublicProfile,
} from '../src/public-profile/render.ts';

const blank: PublicProfile = {
  slug: 'ade-gadgets',
  displayName: 'Ade Gadgets',
  description: null,
  logo: null,
  publicPhone: null,
  whatsappPhone: null,
  publicAddress: null,
  mapUrl: null,
  websiteUrl: null,
  instagramUrl: null,
  tiktokUrl: null,
  facebookUrl: null,
  xUrl: null,
  openingHours: null,
  categories: [],
  brands: [],
  services: [],
  publishedAt: '2026-03-04T09:00:00.000Z',
  updatedAt: '2026-08-18T09:00:00.000Z',
};

// `today` is pinned so the opening-hours highlight does not make this suite
// behave differently on a Sunday.
const render = (patch: Partial<PublicProfile> = {}, today = 'Wednesday'): string =>
  renderProfilePage({ ...blank, ...patch }, { origin: 'https://suite.ng', today });

describe('a shop cannot write markup into its own page', () => {
  it('escapes a script tag in the description', () => {
    const page = render({ description: '<script>alert(1)</script> we sell phones' });
    assert.ok(!page.includes('<script>alert(1)'), 'the tag reached the document intact');
    assert.ok(page.includes('&lt;script&gt;alert(1)&lt;/script&gt;'));
  });

  it('escapes quotes, so a name cannot break out of an attribute', () => {
    // The name goes into <title>, into og:title and into the logo's alt text.
    // The attribute is the one that turns a stray quote into new attributes.
    const page = render({ displayName: 'Ade" onerror="alert(1)', logo: 'data:image/png;base64,AA' });
    assert.ok(!page.includes('onerror="alert(1)"'));
    assert.ok(page.includes('&quot; onerror=&quot;'));
  });

  it('cannot close the JSON-LD block from inside a description', () => {
    /*
     * The specific failure: JSON.stringify happily emits `</script>` inside a
     * string, which ends the block and drops the remainder of the shop's text
     * into the document as markup — where it is no longer being escaped by
     * anything, because it is inside a script tag.
     */
    const page = render({ description: 'phones </script><img src=x onerror=alert(1)>' });
    const block = page.slice(page.indexOf('application/ld+json'));
    const json = block.slice(block.indexOf('>') + 1, block.indexOf('</script>'));

    assert.ok(json.includes('\\u003c/script'), 'the closing tag was not escaped');
    assert.equal(
      (JSON.parse(json) as { description: string }).description,
      'phones </script><img src=x onerror=alert(1)>',
      'escaping changed what the JSON actually says',
    );
  });

  it('escapes the ampersand first, so an entity cannot be smuggled in', () => {
    assert.equal(esc('&lt;script&gt;'), '&amp;lt;script&amp;gt;');
  });
});

describe('links a shop supplies', () => {
  it('refuses a javascript: URL', () => {
    // The API refuses this on the way in now, but rows written before that
    // check existed were never revalidated, and this is the sink.
    assert.equal(safeHref('javascript:alert(document.cookie)'), null);
    const page = render({ websiteUrl: 'javascript:alert(1)' });
    assert.ok(!page.includes('javascript:'));
    assert.ok(!page.includes('>Website<'), 'a refused link still rendered a button');
  });

  it('refuses data: and anything else that is not http', () => {
    assert.equal(safeHref('data:text/html,<script>alert(1)</script>'), null);
    assert.equal(safeHref('not a url at all'), null);
    assert.equal(safeHref(''), null);
    assert.equal(safeHref(null), null);
  });

  it('takes http as well as https, because a shop may have no certificate', () => {
    assert.equal(safeHref('http://adegadgets.ng'), 'http://adegadgets.ng');
    assert.equal(safeHref(' https://adegadgets.ng/shop '), 'https://adegadgets.ng/shop');
  });

  it('marks outbound links nofollow, so the directory cannot be farmed for links', () => {
    const page = render({ websiteUrl: 'https://adegadgets.ng' });
    assert.match(page, /href="https:\/\/adegadgets\.ng"[^>]*rel="noopener nofollow"/);
  });
});

describe('phone numbers', () => {
  it('dials what a shop typed, spacing and all', () => {
    assert.equal(telHref('0803 999 8888'), '08039998888');
    assert.equal(telHref('+234 803 999 8888'), '+2348039998888');
  });

  it('refuses to build a link out of something that is not a number', () => {
    // The number field is deliberately unvalidated, so this is the guard. A
    // wrong tel: dials a stranger, which is worse than an untappable number.
    assert.equal(telHref('call us'), null);
    assert.equal(telHref('0803'), null);
  });

  it('still prints an unlinkable number rather than dropping it', () => {
    const page = render({ publicPhone: 'ask at the counter' });
    assert.ok(!page.includes('tel:'));
  });

  it('converts a Nigerian mobile to the international form WhatsApp needs', () => {
    assert.equal(whatsappHref('0803 999 8888'), 'https://wa.me/2348039998888');
    assert.equal(whatsappHref('+234 803 999 8888'), 'https://wa.me/2348039998888');
  });

  it('will not guess at a number that is not in that shape', () => {
    /*
     * The conversion is only defined for `0` plus ten digits, which every
     * Nigerian mobile is. Anything else — a landline, two numbers on one line,
     * a foreign number — falls back to dialling, because a wa.me link built
     * from a guess opens a chat with whoever does own that number.
     */
    assert.equal(whatsappHref('0803 999 8888 / 0701 222 3333'), null);
    assert.equal(whatsappHref('01 271 0000'), null);
    const page = render({ whatsappPhone: '0803 999 8888 / 0701 222 3333' });
    assert.ok(!page.includes('wa.me'));
    assert.ok(page.includes('WhatsApp'), 'the number stopped being reachable entirely');
  });
});

describe('opening hours', () => {
  it('prints a flat object of strings', () => {
    assert.deepEqual(openingHours({ Monday: '9am – 7pm' }), [['Monday', '9am – 7pm']]);
  });

  it('skips a shape it was not promised', () => {
    // The column is jsonb and nothing enforces its contents — that was right in
    // the schema, and the consequence is that the renderer refuses to invent a
    // format the writer never agreed to.
    assert.deepEqual(openingHours(null), []);
    assert.deepEqual(openingHours(['9am']), []);
    assert.deepEqual(openingHours({ Monday: { open: '9' } }), []);
    assert.deepEqual(openingHours({ Monday: '  ' }), []);
  });
});

describe('what search engines are told', () => {
  it('gives an empty page a noindex, but still serves it', () => {
    /*
     * A page carrying only a business name is thin content, and a domain full
     * of them is treated as a directory of nothing — which would cost every
     * shop that did fill its page in. It still answers at its URL, because a
     * receipt may already be carrying that address.
     */
    const page = render();
    assert.ok(page.includes('name="robots" content="noindex, follow"'));
    assert.ok(page.includes('Ade Gadgets'));
  });

  it('drops the noindex as soon as there is something to read', () => {
    assert.ok(!render({ publicPhone: '0803 999 8888' }).includes('noindex'));
    assert.equal(isThin({ ...blank, description: 'UK-used iPhones' }), false);
  });

  it('builds a title from what the shop says it sells', () => {
    const page = render({ categories: ['Phones', 'Accessories'] });
    assert.ok(page.includes('<title>Ade Gadgets — Phones &amp; Accessories | Suite</title>'));
  });

  it('says LocalBusiness, at the page\'s own canonical URL', () => {
    const page = render({ publicAddress: '12 Otigba Street, Ikeja', publicPhone: '08039998888' });
    const json = page.slice(page.indexOf('application/ld+json'));
    const data = JSON.parse(json.slice(json.indexOf('>') + 1, json.indexOf('</script>')));

    assert.equal(data['@type'], 'LocalBusiness');
    assert.equal(data['@id'], 'https://suite.ng/ade-gadgets');
    assert.equal(data.address.streetAddress, '12 Otigba Street, Ikeja');
    assert.equal(data.address.addressCountry, 'NG');
    assert.ok(page.includes('<link rel="canonical" href="https://suite.ng/ade-gadgets">'));
  });

  it('does not claim Suite\'s own logo is the business\'s', () => {
    // The shop's logo is a data URI stored for offline receipt printing, which
    // no crawler will fetch. Pointing `image` at Suite's OG card instead would
    // be putting our mark on their listing.
    const page = render({ logo: 'data:image/png;base64,AA' });
    const json = page.slice(page.indexOf('application/ld+json'));
    const data = JSON.parse(json.slice(json.indexOf('>') + 1, json.indexOf('</script>')));
    assert.equal(data.image, undefined);
  });
});

describe('the trust mark', () => {
  it('says the business wrote this, not Suite', () => {
    // "Managed with Suite" means the shop uses the product. It must never read
    // as a check Suite performed.
    const page = render();
    assert.ok(page.includes('Managed with Suite'));
    assert.ok(!page.includes('Verified'));
    assert.ok(page.includes('written by the business itself'));
  });

  it('prints the year it first went public, not the last edit', () => {
    const page = render({ publishedAt: '2026-03-04T09:00:00.000Z', updatedAt: '2027-01-01T00:00:00.000Z' });
    assert.ok(page.includes('On Suite since 2026'));
  });
});

describe('the document itself', () => {
  it('loads nothing over the network', () => {
    /*
     * The page is one request by design — no script, no webfont, no remote
     * image — because it is read on the connection somebody has while standing
     * in a market. The CSP in the Function is written to match; if a subresource
     * creeps in here, that policy blocks it in production and not in this test,
     * so the assertion lives on this side.
     */
    const page = render({ logo: 'data:image/png;base64,AA', websiteUrl: 'https://adegadgets.ng' });
    assert.ok(!page.includes('<script src'), 'the page pulled in a script');
    assert.ok(!page.includes('fonts.googleapis.com'), 'the page pulled in a webfont');
    assert.ok(!/<img[^>]+src="https?:/.test(page), 'the page pulled in a remote image');
  });

  it('has exactly one h1, and it is the business name', () => {
    const page = render({ description: 'Phones', brands: ['Apple'], services: ['Repairs'] });
    assert.equal(page.match(/<h1[ >]/g)?.length, 1);
    assert.ok(page.includes('<h1>Ade Gadgets</h1>'));
  });
});

describe('the page as a designed thing', () => {
  it('shows initials when a shop has no logo, rather than an empty box', () => {
    // A grey placeholder says "this page is unfinished" about a shop that
    // simply has no logo file. Every business has initials.
    const page = render({ displayName: 'Doyex Phones' });
    assert.ok(page.includes('>DP</div>'));
    assert.ok(!page.includes('<img'), 'a shop with no logo still rendered an image');
  });

  it('uses the real logo when there is one, and labels it', () => {
    const page = render({ logo: 'data:image/png;base64,AA' });
    assert.match(page, /<img src="data:image\/png;base64,AA" alt="Ade Gadgets logo"/);
  });

  it('marks today in the opening hours', () => {
    /*
     * Nigeria does not observe DST, so "today" is Africa/Lagos and nothing
     * about the reader. It is passed in rather than read from the clock so a
     * render stays a pure function of its inputs — the Function stamps the date
     * into the ETag so a cached page cannot keep pointing at yesterday.
     */
    const hours = { Tuesday: '9am – 7pm', Wednesday: '9am – 7pm', Thursday: '9am – 7pm' };
    const page = render({ openingHours: hours }, 'Wednesday');

    assert.ok(page.includes('<div class="now"><dt>Wednesday</dt>'));
    assert.equal(page.match(/class="now"/g)?.length, 1, 'more than one day was marked');
  });

  it('matches a day inside a range, which is how shops actually write hours', () => {
    /*
     * The one that caught a real hole: a substring test finds "Saturday" inside
     * "Monday – Saturday" and finds nothing at all for a Wednesday, which is
     * the answer four weekdays out of five. Shops do not write seven rows.
     */
    assert.equal(coversToday('Monday – Friday', 'Wednesday'), true);
    assert.equal(coversToday('Monday - Friday', 'Saturday'), false);
    assert.equal(coversToday('Monday to Friday', 'Monday'), true);
    const page = render({ openingHours: { 'Monday – Friday': '8:30am – 7pm' } }, 'Wednesday');
    assert.ok(page.includes('class="now"'));
  });

  it('wraps a range across the end of the week', () => {
    // "Saturday – Sunday" is a weekend, not an empty set.
    assert.equal(coversToday('Saturday – Sunday', 'Sunday'), true);
    assert.equal(coversToday('Saturday – Sunday', 'Wednesday'), false);
  });

  it('treats a comma list as a list, not as a range', () => {
    // Monday, Wednesday, Friday must not quietly include Tuesday.
    assert.equal(coversToday('Monday, Wednesday, Friday', 'Wednesday'), true);
    assert.equal(coversToday('Monday, Wednesday, Friday', 'Tuesday'), false);
    assert.equal(coversToday('Saturday & Sunday', 'Sunday'), true);
  });

  it('marks nothing when the day names are not days', () => {
    // "Weekdays" gets no highlight. That is the correct amount of guessing to
    // do about somebody else's trading hours.
    assert.equal(coversToday('Weekdays', 'Wednesday'), false);
    const page = render({ openingHours: { Weekdays: '9am – 7pm' } }, 'Wednesday');
    assert.ok(!page.includes('class="now"'));
  });

  it("puts today's hours in the header, where somebody deciding to visit looks", () => {
    const page = render({ openingHours: { 'Monday – Friday': '8:30am – 7pm', Sunday: 'Closed' } }, 'Wednesday');
    assert.ok(page.includes('Today · <b class="mono">8:30am – 7pm</b>'));
  });

  it('does not repeat one number as both phone and WhatsApp in the contact list', () => {
    // The same number in two labelled rows reads as a mistake on the page.
    const page = render({ publicPhone: '0803 999 8888', whatsappPhone: '0803 999 8888' });
    assert.equal(page.match(/<dt>WhatsApp<\/dt>/g), null);
    assert.ok(page.includes('WhatsApp'), 'the WhatsApp button went too');
  });
});
