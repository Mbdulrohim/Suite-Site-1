/**
 * A shop's public page, as one HTML document.
 *
 * Everything on this page is free text a shop typed into its own workspace, and
 * the page is served to strangers with no session in front of it. So the two
 * jobs here are, in order: never let that text stop being text, and answer the
 * questions a customer actually has — who is this, where are they, how do I
 * reach them — above the fold on a phone.
 *
 * It renders to a string rather than through React on purpose. The marketing
 * site prerenders one page at build time; this one is rendered per request at
 * the edge, where pulling in react-dom/server would cost bundle size and start-up
 * on every cold isolate to produce markup with no interactivity in it. There is
 * nothing here a template literal cannot say.
 *
 * The page loads no script, no webfont and no external image. That is a
 * deliberate trade against matching the marketing site's typeface: this page's
 * whole job is to give somebody a phone number, often on a slow connection, and
 * a single self-contained document that renders complete on first byte is worth
 * more than Plus Jakarta Sans. The palette and layout still carry the identity.
 */

/** Exactly the DTO `GET /public/profiles/:slug` returns. Nothing wider. */
export interface PublicProfile {
  slug: string;
  displayName: string;
  description: string | null;
  logo: string | null;
  publicPhone: string | null;
  whatsappPhone: string | null;
  publicAddress: string | null;
  mapUrl: string | null;
  websiteUrl: string | null;
  instagramUrl: string | null;
  tiktokUrl: string | null;
  facebookUrl: string | null;
  xUrl: string | null;
  openingHours: unknown;
  categories: string[];
  brands: string[];
  services: string[];
  publishedAt: string | null;
  updatedAt: string;
}

/**
 * The single most important function in this file.
 *
 * Applied to every value that reaches the document, without exception — a shop
 * can type `<script>` into its own description, and it is a supported thing to
 * do, because a description is text. Quotes are escaped as well as angle
 * brackets so the same function is safe inside an attribute, which removes the
 * chance of picking the wrong one of two escapers.
 */
export function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * A link, or nothing.
 *
 * The API refuses anything but http and https on the way in, and this refuses
 * it again on the way out. Not redundancy for its own sake: rows written before
 * that check existed were never re-validated, and a renderer that trusts its
 * input is one schema change away from emitting `javascript:` into an `href`.
 * The check that matters is the one closest to the sink.
 */
export function safeHref(value: string | null): string | null {
  if (value === null || value.trim() === '') return null;
  try {
    const { protocol } = new URL(value);
    if (protocol !== 'http:' && protocol !== 'https:') return null;
    return value.trim();
  } catch {
    return null;
  }
}

/**
 * `tel:` from whatever a shop typed.
 *
 * The number field is deliberately unvalidated — a shop writes two numbers on
 * one line, or spaces them how they like — so this keeps only the characters a
 * dialler can act on and gives up if too little survives. Giving up means the
 * number still prints, just without being tappable, which is the right failure:
 * a wrong `tel:` dials a stranger.
 */
export function telHref(value: string | null): string | null {
  if (value === null) return null;
  const digits = value.replace(/[^\d+]/g, '').replace(/(?!^)\+/g, '');
  return digits.replace(/\D/g, '').length >= 7 ? digits : null;
}

/**
 * `wa.me` from a Nigerian number, or nothing.
 *
 * WhatsApp needs the international form, and shops write the local one. Every
 * Suite shop is in Nigeria and every Nigerian mobile is `0` plus ten digits, so
 * `0803…` to `234803…` is a defined conversion rather than a guess — but only
 * for numbers that are actually that shape. Anything else returns null and the
 * number falls back to being dialled, because sending a customer to the wrong
 * person's chat is worse than not offering the button.
 */
export function whatsappHref(value: string | null): string | null {
  if (value === null) return null;
  const digits = value.replace(/\D/g, '');
  if (/^0\d{10}$/.test(digits)) return `https://wa.me/234${digits.slice(1)}`;
  if (/^234\d{10}$/.test(digits)) return `https://wa.me/${digits}`;
  return null;
}

/**
 * Opening hours, if they are in a shape worth printing.
 *
 * The column is jsonb and nothing enforces its contents, which was the right
 * call in the schema — shops keep genuinely irregular hours and seven pairs of
 * time columns would be wrong for most of them. The consequence is here: the
 * renderer accepts a flat object of strings and skips anything else, rather than
 * inventing a format the writer never agreed to.
 */
export function openingHours(value: unknown): Array<[string, string]> {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return [];
  return Object.entries(value as Record<string, unknown>)
    .filter((entry): entry is [string, string] =>
      typeof entry[1] === 'string' && entry[1].trim() !== '')
    .slice(0, 14);
}

/**
 * Whether this page is too empty to belong in a search index.
 *
 * A page carrying only a business name is thin content, and a domain that
 * accumulates thousands of them gets treated as a directory of nothing — which
 * would cost every shop that did fill its page in. So an empty profile still
 * answers at its URL, because a receipt may already be carrying that address,
 * but it asks not to be indexed until the shop gives a reader something.
 */
export function isThin(profile: PublicProfile): boolean {
  return [
    profile.description, profile.publicPhone, profile.whatsappPhone,
    profile.publicAddress, profile.websiteUrl,
  ].every((field) => field === null || field.trim() === '');
}

/** "Phones & Accessories", or "". Used in the title and under the heading. */
function categoryPhrase(categories: string[]): string {
  const kept = categories.map((c) => c.trim()).filter((c) => c !== '').slice(0, 3);
  if (kept.length === 0) return '';
  if (kept.length === 1) return kept[0]!;
  return `${kept.slice(0, -1).join(', ')} & ${kept[kept.length - 1]!}`;
}

/** 160 characters at most, cut at a word so the tail is not a fragment. */
function clamp(text: string, limit: number): string {
  const flat = text.replace(/\s+/g, ' ').trim();
  if (flat.length <= limit) return flat;
  const cut = flat.slice(0, limit - 1);
  const space = cut.lastIndexOf(' ');
  return `${(space > limit * 0.6 ? cut.slice(0, space) : cut).trimEnd()}…`;
}

/**
 * JSON-LD, escaped for the one context that matters.
 *
 * `JSON.stringify` will happily produce `</script>` inside a string, which ends
 * the block early and puts the rest of the shop's description into the document
 * as markup. Escaping `<` as `\u003c` is valid JSON, parses to the same string,
 * and cannot close the tag.
 */
function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

const ICON = {
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  chat: '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.9-.9L3 20.5l1.5-4.6a8.4 8.4 0 0 1-.9-3.9 8.4 8.4 0 0 1 8.4-8.4h.5a8.4 8.4 0 0 1 8 8z"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/>',
  arrow: '<path d="M7 17 17 7M9 7h8v8"/>',
} as const;

const icon = (name: keyof typeof ICON): string =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[name]}</svg>`;

/** A titled block of pills, or nothing at all when the shop listed none. */
function pills(title: string, values: string[], cls: string): string {
  const kept = values.map((v) => v.trim()).filter((v) => v !== '');
  if (kept.length === 0) return '';
  return `<section class="panel">
      <h2>${esc(title)}</h2>
      <ul class="pills ${cls}">${kept.map((v) => `<li>${esc(v)}</li>`).join('')}</ul>
    </section>`;
}

const SOCIALS = [
  ['instagramUrl', 'Instagram'],
  ['tiktokUrl', 'TikTok'],
  ['facebookUrl', 'Facebook'],
  ['xUrl', 'X'],
] as const;

/**
 * The initials shown when a shop has no logo, or has not made it public.
 *
 * A grey placeholder box would say "this page is unfinished" about a shop that
 * simply has no logo file. Initials on a copper plate read as a mark rather
 * than as a gap, and every business has initials.
 */
function initials(name: string): string {
  const words = name.split(/\s+/).filter((w) => /[a-z0-9]/i.test(w));
  const letters = words.slice(0, 2).map((w) => w[0] ?? '').join('');
  return (letters === '' ? name.slice(0, 2) : letters).toUpperCase();
}

export interface RenderOptions {
  /** `https://suite.ng` — where this page lives, for canonical and OG tags. */
  origin: string;
  /**
   * Today's weekday in Lagos, for marking the current row in opening hours.
   *
   * Passed in rather than read from the clock so a render is a pure function of
   * its inputs and the tests are not different on a Sunday. The caller stamps
   * the date into the ETag, so a cached page does not keep pointing at
   * yesterday.
   */
  today?: string;
}

const lagosWeekday = (): string => {
  // Every Suite shop is Nigerian and Nigeria does not observe DST, so this is a
  // constant rather than a guess about where the reader is.
  try {
    return new Date().toLocaleDateString('en-GB', {
      weekday: 'long', timeZone: 'Africa/Lagos',
    });
  } catch {
    return '';
  }
};

export function renderProfilePage(profile: PublicProfile, options: RenderOptions): string {
  const { origin } = options;
  const today = options.today ?? lagosWeekday();
  const url = `${origin}/${profile.slug}`;
  const name = profile.displayName.trim();
  const phrase = categoryPhrase(profile.categories);
  const description = (profile.description ?? '').trim();
  const address = (profile.publicAddress ?? '').trim();

  const tel = telHref(profile.publicPhone);
  const whatsapp = whatsappHref(profile.whatsappPhone);
  const whatsappTel = whatsapp === null ? telHref(profile.whatsappPhone) : null;
  const map = safeHref(profile.mapUrl);
  const website = safeHref(profile.websiteUrl);
  const hours = openingHours(profile.openingHours);

  const title = clamp(phrase === '' ? `${name} | Suite` : `${name} — ${phrase} | Suite`, 65);
  const meta = clamp(
    description !== ''
      ? description
      : `Contact details, address and opening hours for ${name}${phrase === '' ? '' : `, ${phrase.toLowerCase()}`}.`,
    160,
  );

  const sameAs = [website, ...SOCIALS.map(([key]) => safeHref(profile[key]))]
    .filter((href): href is string => href !== null);

  /*
   * `image` is deliberately absent. The logo is stored as a data URI for
   * offline receipt printing, and neither a crawler nor a rich-result card will
   * fetch one; pointing at Suite's own OG card instead would be claiming Suite's
   * mark is the business's. It arrives when storefront photos get real URLs.
   */
  const structured = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': url,
    name,
    url,
    ...(description === '' ? {} : { description }),
    ...(profile.publicPhone === null ? {} : { telephone: profile.publicPhone }),
    ...(address === '' ? {} : {
      address: {
        '@type': 'PostalAddress',
        streetAddress: address,
        addressCountry: 'NG',
      },
    }),
    ...(sameAs.length === 0 ? {} : { sameAs }),
    ...(profile.categories.length === 0 ? {} : { keywords: profile.categories.join(', ') }),
  };

  /*
   * Ranked, not listed. Somebody arriving here wants to call, or wants to know
   * where the shop is — in that order — so Call is the only filled button and
   * the rest step down in weight from it. Four equal buttons is four decisions.
   */
  const actions = [
    tel === null ? '' : `<a class="btn go" href="tel:${esc(tel)}">${icon('phone')}<span>Call</span></a>`,
    whatsapp === null
      ? (whatsappTel === null ? '' : `<a class="btn wa" href="tel:${esc(whatsappTel)}">${icon('chat')}<span>WhatsApp</span></a>`)
      : `<a class="btn wa" href="${esc(whatsapp)}" rel="noopener nofollow">${icon('chat')}<span>WhatsApp</span></a>`,
    map === null ? '' : `<a class="btn" href="${esc(map)}" rel="noopener nofollow">${icon('pin')}<span>Directions</span></a>`,
    website === null ? '' : `<a class="btn" href="${esc(website)}" rel="noopener nofollow">${icon('globe')}<span>Website</span></a>`,
  ].join('');

  const contactRows = [
    profile.publicPhone === null ? '' : row('Phone', profile.publicPhone, tel === null ? null : `tel:${tel}`, 'num'),
    profile.whatsappPhone === null || profile.whatsappPhone === profile.publicPhone
      ? ''
      : row('WhatsApp', profile.whatsappPhone, whatsapp ?? (whatsappTel === null ? null : `tel:${whatsappTel}`), 'num'),
    address === '' ? '' : row('Address', address, map, 'addr'),
  ].join('');

  const socials = SOCIALS
    .map(([key, label]) => {
      const href = safeHref(profile[key]);
      return href === null
        ? ''
        : `<li><a href="${esc(href)}" rel="noopener nofollow me">${esc(label)}${icon('arrow')}</a></li>`;
    })
    .join('');

  const since = profile.publishedAt === null
    ? ''
    : `<span class="since">On Suite since ${new Date(profile.publishedAt).getUTCFullYear()}</span>`;

  const logoPlate = profile.logo === null
    ? `<div class="plate plate-text" aria-hidden="true">${esc(initials(name))}</div>`
    : `<div class="plate"><img src="${esc(profile.logo)}" alt="${esc(name)} logo" width="88" height="88"></div>`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(meta)}">
${isThin(profile) ? '<meta name="robots" content="noindex, follow">\n' : ''}<link rel="canonical" href="${esc(url)}">
<meta name="theme-color" content="#14151A">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Suite">
<meta property="og:url" content="${esc(url)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(meta)}">
<meta property="og:image" content="${esc(origin)}/og.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(meta)}">
<meta name="twitter:image" content="${esc(origin)}/og.png">
<script type="application/ld+json">${jsonLd(structured)}</script>
<style>${STYLE}</style>
</head>
<body>

<div class="band">
  <div class="wrap band-top">
    <a class="wordmark" href="${esc(origin)}/">Suite</a>
    <span class="band-tag">Business page</span>
  </div>
  <div class="wrap identity">
    ${logoPlate}
    <div class="identity-text">
      <h1>${esc(name)}</h1>
      ${phrase === '' ? '' : `<p class="phrase">${esc(phrase)}</p>`}
      ${address === '' ? '' : `<p class="locale">${icon('pin')}<span>${esc(address)}</span></p>`}
    </div>
  </div>
</div>

<div class="wrap">
  ${actions === '' ? '' : `<nav class="actions" aria-label="Contact ${esc(name)}">${actions}</nav>`}

  <div class="cols">
    <div class="main">
      ${description === '' ? '' : `<section class="panel lede">
        <h2>About</h2>
        <p>${esc(description)}</p>
      </section>`}

      ${pills('Brands carried', profile.brands, 'brand')}
      ${pills('What they do', profile.services, 'service')}
    </div>

    <aside class="side">
      ${contactRows === '' ? '' : `<section class="panel">
        <h2>Contact</h2>
        <dl class="rows">${contactRows}</dl>
      </section>`}

      ${hours.length === 0 ? '' : `<section class="panel">
        <h2>Opening hours</h2>
        <dl class="hours">${hours
          .map(([day, time]) => {
            const now = today !== '' && day.toLowerCase().includes(today.toLowerCase());
            return `<div${now ? ' class="now"' : ''}><dt>${esc(day)}</dt><dd>${esc(time)}</dd></div>`;
          })
          .join('')}</dl>
      </section>`}

      ${socials === '' ? '' : `<section class="panel">
        <h2>Official pages</h2>
        <ul class="social">${socials}</ul>
      </section>`}
    </aside>
  </div>

  <section class="mark">
    <p class="mark-head"><span class="dot"></span><strong>Managed with Suite</strong>${since}</p>
    <p class="mark-note">Suite is the software ${esc(name)} runs its shop on. Everything on this
      page is written by the business itself — it is not a review, a rating, or a check by Suite.</p>
    <a class="mark-link" href="${esc(origin)}/">What Suite is${icon('arrow')}</a>
  </section>
</div>

<footer class="foot">
  <div class="wrap foot-in">
    <p>${esc(url.replace(/^https?:\/\//, ''))}</p>
    <p>A page on Suite, by Copper Ledger LTD · built by
      <a href="https://mbdulrohim.dev" rel="noopener">mbdulrohim</a></p>
  </div>
</footer>

</body>
</html>`;
}

/** One label/value line in the contact card, linked when it can be. */
function row(label: string, value: string, href: string | null, cls: string): string {
  const inner = `<span class="${cls}">${esc(value)}</span>`;
  return `<div><dt>${esc(label)}</dt><dd>${
    href === null ? inner : `<a href="${esc(href)}" rel="noopener nofollow">${inner}</a>`
  }</dd></div>`;
}

/**
 * Inlined rather than served from /assets, because a page with no other
 * subresources renders complete on the first response — which on a market-stall
 * connection is the difference between a phone number and a white screen.
 *
 * Light only, and on purpose. This is a storefront, not a document a reader
 * settles into: it commits to one look the way a printed card does, and the
 * page paints its own ground rather than borrowing the device's.
 *
 * The accent is copper, for Copper Ledger — the company whose mark is at the
 * bottom of every one of these pages. Green stays semantic: it is the colour of
 * the two things that mean "reachable right now", the call button and today's
 * row in the opening hours.
 */
const STYLE = `
:root{
--paper:#F4F3EE;--card:#FFF;--ink:#14151A;--ink-2:#3B3E46;--soft:#6E717A;--faint:#9A9DA5;
--line:#E4E2D9;--hair:#EFEEE7;--copper:#A2562A;--copper-2:#C9793F;--copper-wash:#F7EEE7;
--go:#0E6E41;--go-wash:#E9F2EC;--band:#14151A;
--shadow:0 1px 2px rgba(20,21,26,.05),0 8px 24px -12px rgba(20,21,26,.18);
}
*{box-sizing:border-box;margin:0;padding:0}
html{-webkit-text-size-adjust:100%}
body{background:var(--paper);color:var(--ink);font:16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;-webkit-font-smoothing:antialiased;font-synthesis-weight:none}
a{color:inherit;text-decoration:none}
svg{width:17px;height:17px;flex:none}
.wrap{width:100%;max-width:900px;margin:0 auto;padding:0 20px}

/* Identity band — the shop's name at signboard scale, reversed out. */
.band{background:var(--band);color:var(--paper);padding-bottom:52px}
.band-top{display:flex;align-items:center;justify-content:space-between;height:56px}
.wordmark{font-weight:800;font-size:15px;letter-spacing:-.035em}
.band-tag{font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#7E828C}
.identity{display:flex;gap:18px;align-items:flex-start;padding-top:14px}
.plate{width:88px;height:88px;flex:none;border-radius:20px;background:var(--card);display:flex;align-items:center;justify-content:center;overflow:hidden;box-shadow:0 0 0 1px rgba(255,255,255,.14),0 14px 30px -14px rgba(0,0,0,.7)}
.plate img{width:100%;height:100%;object-fit:contain;padding:10px}
.plate-text{background:linear-gradient(150deg,var(--copper-2),var(--copper));color:#fff;font-size:30px;font-weight:800;letter-spacing:-.03em}
.identity-text{min-width:0;padding-top:4px}
h1{font-size:clamp(30px,7.4vw,46px);line-height:1.03;font-weight:800;letter-spacing:-.042em;text-wrap:balance}
.phrase{margin-top:9px;font-size:14px;font-weight:600;letter-spacing:.02em;color:var(--copper-2)}
.locale{margin-top:12px;display:flex;gap:7px;align-items:flex-start;font-size:13.5px;color:#A7AAB2;max-width:46ch}
.locale svg{margin-top:4px;width:15px;height:15px}

/* Action bar, lifted onto the band so it is the first thing under the name. */
.actions{display:grid;grid-template-columns:repeat(auto-fit,minmax(146px,1fr));gap:8px;background:var(--card);border-radius:18px;padding:8px;margin-top:-34px;box-shadow:var(--shadow);position:relative}
.btn{display:flex;align-items:center;justify-content:center;gap:9px;height:52px;border-radius:12px;font-size:14.5px;font-weight:650;border:1px solid var(--line);background:var(--card);transition:background .15s,border-color .15s}
.btn.go{background:var(--go);border-color:var(--go);color:#fff}
.btn.wa{background:var(--go-wash);border-color:#CBE3D6;color:var(--go)}
.btn:hover{border-color:var(--ink)}
.btn.go:hover{background:#0B5C36;border-color:#0B5C36}
.btn.wa:hover{background:#DDECE3;border-color:var(--go)}

/* Two columns once there is room; the sidebar is the reference material. */
.cols{display:grid;gap:14px;margin-top:14px;align-items:start}
.main,.side{display:grid;gap:14px;align-items:start}
.panel{background:var(--card);border:1px solid var(--hair);border-radius:18px;padding:22px}
.panel h2{font-size:10.5px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--faint);margin-bottom:15px}
.lede p{font-size:16.5px;line-height:1.62;color:var(--ink-2);white-space:pre-line;max-width:62ch}

.pills{list-style:none;display:flex;flex-wrap:wrap;gap:7px}
.pills li{font-size:13.5px;font-weight:550;padding:7px 13px;border-radius:9px;line-height:1.3}
.pills.brand li{background:var(--copper-wash);color:#7C4321}
.pills.service li{background:#F2F1EB;color:var(--ink-2);border:1px solid var(--hair)}

.rows{display:grid;gap:0}
.rows>div{display:grid;grid-template-columns:88px 1fr;gap:14px;padding:12px 0;border-top:1px solid var(--hair);align-items:baseline}
.rows>div:first-child{border-top:0;padding-top:0}
.rows dt{font-size:12.5px;color:var(--soft)}
.rows dd{font-size:15px;min-width:0}
.rows a{color:var(--copper);border-bottom:1px solid transparent}
.rows a:hover{border-bottom-color:currentColor}
.num{font-variant-numeric:tabular-nums;letter-spacing:.01em;font-weight:600;white-space:nowrap}
.addr{white-space:pre-line}

.hours{display:grid;gap:0;font-size:14px}
.hours>div{display:flex;justify-content:space-between;gap:14px;padding:9px 0;border-top:1px solid var(--hair)}
.hours>div:first-child{border-top:0;padding-top:0}
.hours dt{color:var(--soft)}
.hours dd{font-weight:600;text-align:right;font-variant-numeric:tabular-nums}
.hours .now dt{color:var(--go);font-weight:650;display:flex;align-items:center;gap:7px}
.hours .now dt::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--go);flex:none}
.hours .now dd{color:var(--go)}

.social{list-style:none;display:grid;gap:2px}
.social a{display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:14.5px;font-weight:550;padding:11px 0;border-top:1px solid var(--hair)}
.social li:first-child a{border-top:0;padding-top:0}
.social svg{width:14px;height:14px;color:var(--faint)}
.social a:hover{color:var(--copper)}
.social a:hover svg{color:var(--copper)}

/* Trust mark: a quiet strip, not another card competing with the shop's own. */
.mark{margin-top:14px;border:1px solid var(--line);border-radius:18px;padding:20px 22px;background:transparent}
.mark-head{display:flex;flex-wrap:wrap;align-items:center;gap:9px;font-size:14.5px}
.dot{width:7px;height:7px;border-radius:50%;background:var(--copper);flex:none}
.since{color:var(--soft);font-size:12.5px;margin-left:auto;font-variant-numeric:tabular-nums}
.mark-note{margin-top:9px;font-size:13px;line-height:1.55;color:var(--soft);max-width:64ch}
.mark-link{display:inline-flex;align-items:center;gap:5px;margin-top:12px;font-size:13px;font-weight:600;color:var(--copper)}
.mark-link svg{width:13px;height:13px}

.foot{margin-top:40px;border-top:1px solid var(--line);padding:20px 0 44px}
.foot-in{display:flex;flex-wrap:wrap;gap:6px 20px;justify-content:space-between;font-size:12px;color:var(--faint)}
.foot a{color:var(--soft);border-bottom:1px solid var(--line)}

a:focus-visible{outline:2px solid var(--copper);outline-offset:3px;border-radius:4px}
@media(prefers-reduced-motion:reduce){*{transition:none!important}}

@media(min-width:760px){
  .band{padding-bottom:60px}
  .identity{gap:24px;padding-top:20px}
  .plate{width:108px;height:108px;border-radius:24px}
  .plate-text{font-size:38px}
  .panel{padding:26px}
  .cols{grid-template-columns:minmax(0,1fr) 322px;gap:16px}
  .actions{margin-top:-38px;grid-template-columns:repeat(auto-fit,minmax(160px,1fr))}
  .side{position:sticky;top:16px}
}
`;
