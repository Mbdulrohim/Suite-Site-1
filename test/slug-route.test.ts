/**
 * The routing in functions/[slug].ts, driven directly.
 *
 * It is plain Node-compatible code — no Workers-only API survived the last
 * pass — so the handler can be called with a real `Request` and a stubbed
 * `next`, and every branch that decides *what a URL means* can be checked
 * without a wrangler process or a database.
 *
 * The branch worth the most is the first one. `/pricing` and `/sitemap.xml` are
 * single path segments and reach this file exactly like `/ade-gadgets` does;
 * getting that wrong takes the site's own pages off the internet, and it would
 * do it only in production, where the asset server exists.
 */
import assert from 'node:assert/strict';
import { afterEach, describe, it } from 'node:test';
import { onRequestGet } from '../functions/[slug].ts';

const PROFILE = {
  slug: 'ade-gadgets',
  displayName: 'Ade Gadgets',
  description: 'UK-used iPhones and Samsung, Computer Village.',
  logo: null,
  publicPhone: '0803 999 8888',
  whatsappPhone: '0803 999 8888',
  publicAddress: '12 Otigba Street, Ikeja',
  mapUrl: null,
  websiteUrl: null,
  instagramUrl: null,
  tiktokUrl: null,
  facebookUrl: null,
  xUrl: null,
  openingHours: null,
  categories: ['Phones', 'Accessories'],
  brands: [],
  services: [],
  publishedAt: '2026-03-04T09:00:00.000Z',
  updatedAt: '2026-08-18T09:00:00.000Z',
};

const realFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = realFetch; });

/** What the API is pretending to answer with for this test. */
const api = (make: (url: string) => Response): void => {
  globalThis.fetch = (async (input: RequestInfo | URL) =>
    make(String(input))) as typeof fetch;
};

interface CallOptions {
  /** What the asset server would say. 404 means "nothing static at this path". */
  asset?: Response;
  headers?: Record<string, string>;
}

const call = (path: string, options: CallOptions = {}): Promise<Response> => {
  const asset = options.asset ?? new Response('not found', { status: 404 });
  return onRequestGet({
    request: new Request(`https://suite.ng${path}`, { headers: options.headers }),
    params: { slug: path.replace(/^\//, '') },
    env: {},
    next: async () => asset,
  });
};

describe('what reaches the API at all', () => {
  it('hands a path that is not slug-shaped straight back to the asset server', async () => {
    // /og.png, /sitemap.xml, /robots.txt, /_headers — all one segment, all here.
    let asked = false;
    api(() => { asked = true; return new Response('{}', { status: 200 }); });

    for (const path of ['/og.png', '/sitemap.xml', '/robots.txt', '/_headers', '/Ade Gadgets']) {
      const res = await call(path, { asset: new Response('asset', { status: 200 }) });
      assert.equal(await res.text(), 'asset', `${path} was not passed through`);
    }
    assert.equal(asked, false, 'the API was asked about a static file');
  });

  it('lets a real page win over a shop slug', async () => {
    /*
     * Marketing paths resolve first, and they resolve by being asked rather
     * than by being listed here. The database refuses to publish a profile
     * under a reserved path, so nothing can be shadowed by this.
     */
    api(() => new Response(JSON.stringify(PROFILE), { status: 200 }));
    const res = await call('/pricing', { asset: new Response('<h1>Pricing</h1>', { status: 200 }) });

    assert.equal(res.status, 200);
    assert.equal(await res.text(), '<h1>Pricing</h1>');
  });
});

describe('a published shop', () => {
  it('renders the page, cached at the edge and revalidated by the browser', async () => {
    api(() => new Response(JSON.stringify(PROFILE), { status: 200 }));
    const res = await call('/ade-gadgets');
    const body = await res.text();

    assert.equal(res.status, 200);
    assert.match(res.headers.get('content-type') ?? '', /text\/html/);
    assert.ok(body.includes('<h1>Ade Gadgets</h1>'));
    assert.ok(body.includes('12 Otigba Street, Ikeja'));
    assert.equal(
      res.headers.get('cache-control'),
      'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
    );
  });

  it('sets a policy of its own, because _headers does not reach a Function', async () => {
    api(() => new Response(JSON.stringify(PROFILE), { status: 200 }));
    const res = await call('/ade-gadgets');
    const csp = res.headers.get('content-security-policy') ?? '';

    assert.ok(csp.includes("default-src 'none'"));
    assert.ok(csp.includes("img-src 'self' data:"), 'a logo is stored as a data URI');
    assert.ok(!csp.includes('script-src'), 'the page has no script to allow');
    assert.equal(res.headers.get('x-content-type-options'), 'nosniff');
  });

  it('answers 304 when the browser already has this version', async () => {
    api(() => new Response(JSON.stringify(PROFILE), { status: 200 }));
    const first = await call('/ade-gadgets');
    const etag = first.headers.get('etag');
    assert.ok(etag !== null && etag.startsWith('W/'), 'a weak validator, not a strong one');

    const second = await call('/ade-gadgets', { headers: { 'if-none-match': etag } });
    assert.equal(second.status, 304);
  });

  it('changes its ETag when the renderer changes, not only when the shop edits', async () => {
    /*
     * The profile's updated_at is the right validator for the row and the wrong
     * one for the page: a layout or JSON-LD change produces different HTML from
     * an identical row. Without the renderer stamp, every edge cache would keep
     * serving the old markup until each shop happened to save something.
     */
    api(() => new Response(JSON.stringify(PROFILE), { status: 200 }));
    const etag = (await call('/ade-gadgets')).headers.get('etag') ?? '';
    assert.match(etag, /-r\d+"$/);
  });
});

describe('a shop that renamed itself', () => {
  it('redirects permanently to the new address, on the public path', async () => {
    // Receipts printed under the old address are in customers' pockets. The
    // browser needs /new-name, not the API's own /public/profiles/new-name.
    api(() => new Response(JSON.stringify({ movedTo: 'ade-gadgets-ikeja' }), { status: 301 }));
    const res = await call('/ade-gadgets');

    assert.equal(res.status, 301);
    assert.equal(res.headers.get('location'), '/ade-gadgets-ikeja');
  });

  it('does not follow a redirect to somewhere that is not a slug', async () => {
    api(() => new Response(JSON.stringify({ movedTo: 'https://evil.example/' }), { status: 301 }));
    const res = await call('/ade-gadgets');
    assert.equal(res.status, 404, 'an open redirect');
  });
});

describe('when there is no page', () => {
  it('says so, and says how the addresses are written', async () => {
    // Somebody typing this off a receipt is the likeliest reader of a 404 here.
    api(() => new Response('{}', { status: 404 }));
    const res = await call('/ade-gadgets');

    assert.equal(res.status, 404);
    assert.ok((await res.text()).includes('lowercase'));
    assert.equal(res.headers.get('cache-control'), 'public, max-age=60, s-maxage=300');
  });

  it('answers 503, not 404, when the API cannot be reached', async () => {
    /*
     * The shop's page almost certainly exists. Telling a crawler it does not
     * would cost the shop its indexing over an outage measured in minutes, and
     * a cached 404 would outlive the outage.
     */
    globalThis.fetch = (async () => { throw new Error('connect ECONNREFUSED'); }) as typeof fetch;
    const res = await call('/ade-gadgets');

    assert.equal(res.status, 503);
    assert.equal(res.headers.get('cache-control'), 'no-store');
    assert.equal(res.headers.get('retry-after'), '60');
    assert.ok((await res.text()).includes('has not been taken'));
  });
});
