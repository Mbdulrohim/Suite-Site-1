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
const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

/**
 * Whether a row of opening hours covers today.
 *
 * Shops write "Monday – Friday", not seven rows, so a literal substring test
 * finds nothing on a Wednesday — which is the answer for four days out of five.
 * A dash (or "to") means the named days are the ends of a range and everything
 * between them counts; a comma or an ampersand means they are a list and only
 * the named days do. Ranges wrap, because "Saturday – Sunday" is a weekend and
 * not an empty set.
 *
 * Unknown words simply do not match. A shop writing "Weekdays" gets no
 * highlight, which is the correct amount of guessing to do about somebody
 * else's trading hours.
 */
export function coversToday(label: string, today: string): boolean {
  const target = DAYS.indexOf(today.trim().toLowerCase());
  if (target < 0) return false;

  const lower = label.toLowerCase();
  const named = DAYS
    .map((day, index) => ({ index, at: lower.indexOf(day) }))
    .filter((hit) => hit.at >= 0)
    .sort((a, b) => a.at - b.at);
  if (named.length === 0) return false;
  if (named.length === 1) return named[0]!.index === target;

  const isRange = /[-–—]|\bto\b/.test(lower);
  if (!isRange) return named.some((hit) => hit.index === target);

  const from = named[0]!.index;
  const to = named[named.length - 1]!.index;
  return from <= to
    ? target >= from && target <= to
    : target >= from || target <= to;
}

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
  up: '<path d="M7 17 17 7M9 7h8v8"/>',
} as const;

const icon = (name: keyof typeof ICON, cls = ''): string =>
  `<svg${cls === '' ? '' : ` class="${cls}"`} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[name]}</svg>`;

/** A titled block of pills, or nothing at all when the shop listed none. */
function pills(title: string, values: string[], cls: string): string {
  const kept = values.map((v) => v.trim()).filter((v) => v !== '');
  if (kept.length === 0) return '';
  return `<section class="block">
      <p class="eyebrow">${esc(title)}</p>
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
 * The mark shown when a shop has no logo, or has not made it public.
 *
 * A grey placeholder box would say "this page is unfinished" about a shop that
 * simply has no logo file. Initials read as a mark rather than as a gap, and
 * every business has initials.
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
  const todayRow = hours.find(([day]) => coversToday(day, today));

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
   * One dark pill and the rest quiet, which is how the marketing site treats a
   * primary action. Somebody arriving here wants to call; four buttons of equal
   * weight is four decisions to make before doing the obvious one.
   */
  const actions = [
    tel === null ? '' : `<a class="cta" href="tel:${esc(tel)}">${icon('phone')}<span>Call</span></a>`,
    whatsapp === null
      ? (whatsappTel === null ? '' : `<a class="ghost" href="tel:${esc(whatsappTel)}">${icon('chat')}<span>WhatsApp</span></a>`)
      : `<a class="ghost" href="${esc(whatsapp)}" rel="noopener nofollow">${icon('chat')}<span>WhatsApp</span></a>`,
    map === null ? '' : `<a class="ghost" href="${esc(map)}" rel="noopener nofollow">${icon('pin')}<span>Directions</span></a>`,
    website === null ? '' : `<a class="ghost" href="${esc(website)}" rel="noopener nofollow">${icon('globe')}<span>Website</span></a>`,
  ].join('');

  const contactRows = [
    profile.publicPhone === null ? '' : row('Phone', profile.publicPhone, tel === null ? null : `tel:${tel}`, 'mono'),
    profile.whatsappPhone === null || profile.whatsappPhone === profile.publicPhone
      ? ''
      : row('WhatsApp', profile.whatsappPhone, whatsapp ?? (whatsappTel === null ? null : `tel:${whatsappTel}`), 'mono'),
    address === '' ? '' : row('Address', address, map, 'addr'),
  ].join('');

  const socials = SOCIALS
    .map(([key, label]) => {
      const href = safeHref(profile[key]);
      return href === null
        ? ''
        : `<li><a href="${esc(href)}" rel="noopener nofollow me"><span>${esc(label)}</span>${icon('up')}</a></li>`;
    })
    .join('');

  const since = profile.publishedAt === null
    ? ''
    : `<span class="mono since">On Suite since ${new Date(profile.publishedAt).getUTCFullYear()}</span>`;

  const mark = profile.logo === null
    ? `<div class="plate plate-text" aria-hidden="true">${esc(initials(name))}</div>`
    : `<div class="plate"><img src="${esc(profile.logo)}" alt="${esc(name)} logo" width="64" height="64"></div>`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(meta)}">
${isThin(profile) ? '<meta name="robots" content="noindex, follow">\n' : ''}<link rel="canonical" href="${esc(url)}">
<meta name="theme-color" content="#FAF9F6">
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

<header class="topbar">
  <div class="wrap topbar-in">
    <a class="wordmark" href="${esc(origin)}/">
      <span class="diamond" aria-hidden="true"><i></i></span>Suite
    </a>
    <span class="mono topbar-tag">Business page</span>
  </div>
</header>

<main class="wrap">

  <!-- The identity sits in the same soft tray the marketing site puts its
       product in: gradient ground, hairline border, generous corner. -->
  <div class="tray">
    <article class="sheet">
      <div class="sheet-bar">
        <span class="mono sheet-url">${esc(url.replace(/^https?:\/\//, ''))}</span>
        <span class="tag"><i class="dot"></i>Managed with Suite</span>
      </div>

      <div class="sheet-body">
        <div class="ident">
          ${mark}
          <div class="ident-text">
            <h1>${esc(name)}</h1>
            ${phrase === '' ? '' : `<p class="phrase">${esc(phrase)}</p>`}
          </div>
        </div>

        ${address === '' && todayRow === undefined ? '' : `<div class="facts">
          ${address === '' ? '' : `<span class="fact">${icon('pin')}${esc(address)}</span>`}
          ${todayRow === undefined ? '' : `<span class="fact open"><i class="dot"></i>Today · <b class="mono">${esc(todayRow[1])}</b></span>`}
        </div>`}

        ${description === '' ? '' : `<p class="lede">${esc(description)}</p>`}

        ${actions === '' ? '' : `<nav class="actions" aria-label="Contact ${esc(name)}">${actions}</nav>`}
      </div>
    </article>
  </div>

  <div class="grid">
    ${contactRows === '' ? '' : `<section class="block">
      <p class="eyebrow">Contact</p>
      <dl class="rows">${contactRows}</dl>
    </section>`}

    ${hours.length === 0 ? '' : `<section class="block">
      <p class="eyebrow">Opening hours</p>
      <dl class="hours">${hours
        .map(([day, time]) => {
          const now = coversToday(day, today);
          return `<div${now ? ' class="now"' : ''}><dt>${esc(day)}</dt><dd class="mono">${esc(time)}</dd></div>`;
        })
        .join('')}</dl>
    </section>`}
  </div>

  ${pills('Brands carried', profile.brands, 'brand')}
  ${pills('What they do', profile.services, 'service')}

  ${socials === '' ? '' : `<section class="block">
    <p class="eyebrow">Official pages</p>
    <ul class="social">${socials}</ul>
  </section>`}

  <section class="mark">
    <p class="mark-line"><span class="tag"><i class="dot"></i>Managed with Suite</span>${since}</p>
    <p class="mark-note">Suite is the software ${esc(name)} runs its shop on. Everything on this page
      is written by the business itself — it is not a review, a rating, or a check by Suite.</p>
    <a class="mark-link" href="${esc(origin)}/">What Suite is${icon('up')}</a>
  </section>

</main>

<footer class="foot">
  <div class="wrap foot-in">
    <p class="mono">© ${new Date().getUTCFullYear()} Copper Ledger LTD. Lagos, Nigeria.</p>
    <p class="mono">Built by <a href="https://mbdulrohim.dev" rel="author noopener">mbdulrohim</a></p>
  </div>
</footer>

</body>
</html>`;
}

/** One label/value line in the contact block, linked when it can be. */
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
 * Every value here is lifted from the marketing site rather than invented: the
 * #FAF9F6 ground, the #FAF9F7 tray, the 0.5px hairlines, the 28px corner, the
 * shadow at 2% black, the medium-weight tracking-tight headline, the dark pill
 * with an arrow, the mono treatment on every number and label, and the gradient
 * panel the homepage wraps its product in. A page under the same domain, one
 * click from that homepage, should not be a different piece of software.
 *
 * The exception is the typeface: the marketing site loads Plus Jakarta Sans and
 * JetBrains Mono from Google, and this page loads nothing over the network. It
 * uses the same system stack the homepage already hard-codes for its own
 * headline, and the system mono for the same roles — which keeps the mono as a
 * signal rather than as a font.
 */
const STYLE = `
:root{
--paper:#FAF9F6;--white:#FFF;--tray:#FAF9F7;--ink:#121316;--ink-2:#1F2228;
--text:#646A7A;--soft:#717684;--faint:#8C92A4;--fainter:#9CA3AF;
--line:#E7E5DE;--line-2:#EFECE6;--hair:#E8E8E8;
--blue:#2563EB;--blue-wash:#EFF6FF;--green:#15803D;--green-2:#22C55E;--green-wash:#F0FDF4;--green-line:#DCFCE7;
--mono:ui-monospace,SFMono-Regular,"SF Mono",Menlo,Consolas,"Liberation Mono",monospace;
}
*{box-sizing:border-box;margin:0;padding:0}
html{-webkit-text-size-adjust:100%}
body{background:var(--paper);color:var(--ink);font:16px/1.6 -apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
a{color:inherit;text-decoration:none}
svg{width:16px;height:16px;flex:none}
.mono{font-family:var(--mono);font-variant-numeric:tabular-nums}
.wrap{width:100%;max-width:1080px;margin:0 auto;padding:0 20px}
@media(min-width:640px){.wrap{padding:0 32px}}

.topbar-in{height:64px;display:flex;align-items:center;justify-content:space-between}
.wordmark{display:inline-flex;align-items:center;gap:8px;font-size:15px;font-weight:600;letter-spacing:-.02em}
.diamond{width:14px;height:14px;border:1px solid var(--ink);border-radius:2px;transform:rotate(45deg);display:flex;align-items:center;justify-content:center}
.diamond i{width:4px;height:4px;background:var(--ink);border-radius:1px}
.topbar-tag{font-size:11px;color:var(--faint);letter-spacing:.02em}

/* The tray: the homepage's product container, holding the shop instead. */
.tray{background:linear-gradient(135deg,#EEF4FB 0%,#F4F7FB 46%,#F7F5F0 100%);border:1px solid #E4ECF4;border-radius:28px;padding:12px}
.sheet{background:var(--white);border:1px solid var(--line);border-radius:20px;overflow:hidden}
.sheet-bar{min-height:46px;padding:10px 18px;background:var(--tray);border-bottom:1px solid var(--line-2);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px}
.sheet-url{font-size:11.5px;color:var(--soft)}
.tag{display:inline-flex;align-items:center;gap:6px;background:var(--green-wash);border:1px solid var(--green-line);color:var(--green);font-size:10.5px;font-weight:500;padding:3px 9px;border-radius:999px;white-space:nowrap}
.dot{width:6px;height:6px;border-radius:50%;background:var(--green-2);flex:none}
.sheet-body{padding:26px 20px 24px}

.ident{display:flex;align-items:center;gap:16px}
.plate{width:64px;height:64px;flex:none;border-radius:16px;background:var(--white);border:1px solid var(--line);display:flex;align-items:center;justify-content:center;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.04)}
.plate img{width:100%;height:100%;object-fit:contain;padding:8px}
.plate-text{background:var(--tray);color:var(--ink);font-size:22px;font-weight:600;letter-spacing:-.03em}
.ident-text{min-width:0}
h1{font-size:clamp(28px,6.4vw,44px);line-height:1.1;font-weight:500;letter-spacing:-.028em;text-wrap:balance}
.phrase{margin-top:6px;font-size:15px;color:var(--fainter)}

.facts{display:flex;flex-wrap:wrap;gap:8px;margin-top:20px}
.fact{display:inline-flex;align-items:center;gap:7px;border:.5px solid #D6D3CB;border-radius:999px;padding:6px 14px;font-size:13px;color:var(--text);background:transparent}
.fact svg{width:14px;height:14px;color:var(--fainter)}
.fact.open{background:var(--green-wash);border-color:var(--green-line);color:var(--green)}
.fact.open b{font-weight:600;font-size:12.5px}

.lede{margin-top:20px;font-size:16.5px;line-height:1.62;color:var(--text);white-space:pre-line;max-width:64ch}

.actions{display:flex;flex-wrap:wrap;gap:9px;margin-top:24px}
.cta,.ghost{display:inline-flex;align-items:center;justify-content:center;gap:8px;height:46px;padding:0 22px;border-radius:999px;font-size:15px;font-weight:500;letter-spacing:-.01em;transition:background .2s,border-color .2s,box-shadow .2s}
.cta{background:var(--ink);color:var(--paper);box-shadow:0 2px 10px rgba(0,0,0,.09)}
.cta:hover{background:#000;box-shadow:0 6px 20px rgba(0,0,0,.14)}
.ghost{background:var(--white);border:.5px solid #D6D3CB;color:var(--ink-2)}
.ghost:hover{border-color:var(--ink);background:#FDFCFA}

.grid{display:grid;gap:14px;margin-top:14px}
.block{background:var(--tray);border:.5px solid var(--hair);border-radius:28px;padding:24px;box-shadow:0 2px 12px rgba(0,0,0,.02);margin-top:14px}
.grid .block{margin-top:0}
.eyebrow{font-family:var(--mono);font-size:10.5px;text-transform:uppercase;letter-spacing:.12em;color:var(--faint);margin-bottom:16px}

.rows{display:grid}
.rows>div{display:grid;grid-template-columns:84px 1fr;gap:14px;padding:11px 0;border-top:1px solid #EAE8E1;align-items:baseline}
.rows>div:first-child{border-top:0;padding-top:0}
.rows dt{font-size:12.5px;color:var(--faint)}
.rows dd{font-size:15px;min-width:0;color:var(--ink-2)}
.rows dd .mono{font-size:14.5px;font-weight:500;white-space:nowrap}
.rows dd .addr{white-space:pre-line;display:block}
.rows a{color:var(--blue)}
.rows a:hover{text-decoration:underline;text-underline-offset:3px}

.hours{display:grid;font-size:14px}
.hours>div{display:flex;justify-content:space-between;gap:14px;padding:9px 0;border-top:1px solid #EAE8E1}
.hours>div:first-child{border-top:0;padding-top:0}
.hours dt{color:var(--soft)}
.hours dd{font-weight:500;text-align:right;font-size:13.5px}
.hours .now dt{color:var(--green);font-weight:500}
.hours .now dd{color:var(--green)}

.pills{list-style:none;display:flex;flex-wrap:wrap;gap:9px}
.pills li{background:var(--white);border:1px solid #F0EFEA;box-shadow:0 1px 2px rgba(0,0,0,.03);border-radius:999px;padding:8px 16px;font-size:14px;font-weight:500;color:#374151;line-height:1.3}
.pills.service li{color:var(--ink-2)}

.social{list-style:none;display:grid;gap:8px;grid-template-columns:repeat(auto-fit,minmax(150px,1fr))}
.social a{display:flex;align-items:center;justify-content:space-between;gap:10px;background:var(--white);border:1px solid #F0EFEA;border-radius:14px;padding:13px 16px;font-size:14.5px;font-weight:500;box-shadow:0 1px 2px rgba(0,0,0,.03);transition:border-color .2s}
.social svg{width:13px;height:13px;color:var(--fainter)}
.social a:hover{border-color:#D6D3CB}
.social a:hover svg{color:var(--ink)}

.mark{margin-top:14px;border:.5px solid var(--hair);border-radius:28px;padding:24px}
.mark-line{display:flex;flex-wrap:wrap;align-items:center;gap:12px}
.since{font-size:11.5px;color:var(--faint)}
.mark-note{margin-top:12px;font-size:13px;line-height:1.6;color:var(--faint);max-width:66ch}
.mark-link{display:inline-flex;align-items:center;gap:6px;margin-top:14px;font-size:13px;font-weight:500;color:var(--text)}
.mark-link:hover{color:var(--ink)}
.mark-link svg{width:12px;height:12px}

.foot{padding:56px 0 64px}
.foot-in{display:flex;flex-wrap:wrap;gap:6px 24px;justify-content:space-between;font-size:11px;color:var(--faint)}
.foot a{color:var(--text)}
.foot a:hover{color:var(--ink)}

a:focus-visible{outline:2px solid var(--blue);outline-offset:3px;border-radius:6px}
@media(prefers-reduced-motion:reduce){*{transition:none!important}}

@media(min-width:720px){
  .tray{padding:14px;border-radius:32px}
  .sheet{border-radius:24px}
  .sheet-body{padding:34px 32px 32px}
  .ident{gap:20px}
  .plate{width:76px;height:76px;border-radius:18px}
  .plate-text{font-size:26px}
  .block,.mark{padding:28px}
  .grid{grid-template-columns:1fr 1fr;gap:16px;margin-top:16px}
}
`;
