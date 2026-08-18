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
} as const;

const icon = (name: keyof typeof ICON): string =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[name]}</svg>`;

/** A row of tappable chips, or nothing at all when the shop listed none. */
function chips(title: string, values: string[]): string {
  const kept = values.map((v) => v.trim()).filter((v) => v !== '');
  if (kept.length === 0) return '';
  return `<section class="card">
      <h2>${esc(title)}</h2>
      <ul class="chips">${kept.map((v) => `<li>${esc(v)}</li>`).join('')}</ul>
    </section>`;
}

const SOCIALS = [
  ['instagramUrl', 'Instagram'],
  ['tiktokUrl', 'TikTok'],
  ['facebookUrl', 'Facebook'],
  ['xUrl', 'X'],
] as const;

export interface RenderOptions {
  /** `https://suite.ng` — where this page lives, for canonical and OG tags. */
  origin: string;
}

export function renderProfilePage(profile: PublicProfile, options: RenderOptions): string {
  const { origin } = options;
  const url = `${origin}/${profile.slug}`;
  const name = profile.displayName.trim();
  const phrase = categoryPhrase(profile.categories);
  const description = (profile.description ?? '').trim();

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
    ...(profile.publicAddress === null ? {} : {
      address: {
        '@type': 'PostalAddress',
        streetAddress: profile.publicAddress,
        addressCountry: 'NG',
      },
    }),
    ...(sameAs.length === 0 ? {} : { sameAs }),
    ...(profile.categories.length === 0 ? {} : { keywords: profile.categories.join(', ') }),
  };

  const actions = [
    tel === null ? '' : `<a class="act primary" href="tel:${esc(tel)}">${icon('phone')}<span>Call</span></a>`,
    whatsapp === null
      ? (whatsappTel === null ? '' : `<a class="act wa" href="tel:${esc(whatsappTel)}">${icon('chat')}<span>WhatsApp</span></a>`)
      : `<a class="act wa" href="${esc(whatsapp)}" rel="noopener nofollow">${icon('chat')}<span>WhatsApp</span></a>`,
    map === null ? '' : `<a class="act" href="${esc(map)}" rel="noopener nofollow">${icon('pin')}<span>Directions</span></a>`,
    website === null ? '' : `<a class="act" href="${esc(website)}" rel="noopener nofollow">${icon('globe')}<span>Website</span></a>`,
  ].join('');

  const socials = SOCIALS
    .map(([key, label]) => {
      const href = safeHref(profile[key]);
      return href === null ? '' : `<a href="${esc(href)}" rel="noopener nofollow me">${esc(label)}</a>`;
    })
    .join('');

  const since = profile.publishedAt === null
    ? ''
    : `<span>On Suite since ${new Date(profile.publishedAt).getUTCFullYear()}</span>`;

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
<header class="bar"><a href="${esc(origin)}/">Suite</a></header>
<main>
  <section class="card head">
    ${profile.logo === null ? '' : `<img class="logo" src="${esc(profile.logo)}" alt="${esc(name)} logo" width="72" height="72">`}
    <h1>${esc(name)}</h1>
    ${phrase === '' ? '' : `<p class="kicker">${esc(phrase)}</p>`}
    ${description === '' ? '' : `<p class="desc">${esc(description)}</p>`}
    ${actions === '' ? '' : `<nav class="acts">${actions}</nav>`}
  </section>

  ${profile.publicAddress === null ? '' : `<section class="card">
    <h2>Where to find ${esc(name)}</h2>
    <p class="addr">${icon('pin')}<span>${esc(profile.publicAddress)}</span></p>
  </section>`}

  ${hours.length === 0 ? '' : `<section class="card">
    <h2>Opening hours</h2>
    <dl class="hours">${hours
      .map(([day, time]) => `<div><dt>${esc(day)}</dt><dd>${esc(time)}</dd></div>`)
      .join('')}</dl>
  </section>`}

  ${chips('Brands carried', profile.brands)}
  ${chips('Services', profile.services)}

  ${socials === '' ? '' : `<section class="card">
    <h2>Official pages</h2>
    <nav class="social">${socials}</nav>
  </section>`}

  <section class="card mark">
    <p class="mark-line"><strong>Managed with Suite</strong>${since}</p>
    <p class="mark-note">Suite is the software this business runs its shop on. This page is
      written by the business itself — it is not a review, a rating, or a check by Suite.</p>
    <p class="mark-note"><a href="${esc(origin)}/">What Suite is</a></p>
  </section>
</main>
<footer class="foot">
  <p>${esc(url.replace(/^https?:\/\//, ''))} · a page on Suite, by Copper Ledger LTD</p>
  <p>Built by <a href="https://mbdulrohim.dev" rel="noopener">mbdulrohim</a></p>
</footer>
</body>
</html>`;
}

/**
 * Inlined rather than served from /assets, because a page with no other
 * subresources renders complete on the first response — which on a market-stall
 * connection is the difference between a phone number and a white screen.
 */
const STYLE = `
:root{--bg:#FAF9F6;--ink:#121316;--soft:#6B7280;--faint:#9CA3AF;--line:#E5E4DE;--card:#FFF;--accent:#2563EB;--wa:#128C4A}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--bg);color:var(--ink);font:16px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;padding:0 16px 48px}
a{color:inherit}
svg{width:18px;height:18px;flex:none}
.bar{max-width:640px;margin:0 auto;padding:18px 2px}
.bar a{font-weight:800;letter-spacing:-.03em;font-size:15px;text-decoration:none}
main{max-width:640px;margin:0 auto;display:flex;flex-direction:column;gap:12px}
.card{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:20px}
.card h2{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--soft);margin-bottom:12px}
.head{padding:24px 20px}
.logo{width:72px;height:72px;object-fit:contain;border-radius:12px;border:1px solid var(--line);background:#fff;margin-bottom:14px;display:block}
h1{font-size:28px;line-height:1.15;font-weight:800;letter-spacing:-.035em;text-wrap:balance}
.kicker{color:var(--soft);font-size:14px;margin-top:6px}
.desc{margin-top:14px;font-size:15px;color:#33363D;max-width:56ch;white-space:pre-line}
.acts{display:flex;flex-wrap:wrap;gap:8px;margin-top:20px}
.act{display:inline-flex;align-items:center;gap:8px;height:44px;padding:0 16px;border:1px solid var(--line);border-radius:11px;font-size:14px;font-weight:600;text-decoration:none;background:#fff}
.act.primary{background:var(--ink);color:var(--bg);border-color:var(--ink)}
.act.wa{color:var(--wa);border-color:#BFE3CE}
.addr{display:flex;gap:10px;align-items:flex-start;font-size:15px;white-space:pre-line}
.addr svg{margin-top:3px;color:var(--soft)}
.hours{display:flex;flex-direction:column;gap:7px;font-size:14px}
.hours div{display:flex;justify-content:space-between;gap:16px;border-bottom:1px dashed var(--line);padding-bottom:7px}
.hours div:last-child{border-bottom:0;padding-bottom:0}
.hours dt{color:var(--soft)}
.hours dd{font-weight:600;text-align:right}
.chips{list-style:none;display:flex;flex-wrap:wrap;gap:7px}
.chips li{font-size:13px;padding:6px 11px;border:1px solid var(--line);border-radius:999px;background:#FDFCFA}
.social{display:flex;flex-wrap:wrap;gap:8px}
.social a{font-size:14px;font-weight:600;color:var(--accent);text-decoration:none;padding:8px 13px;border:1px solid var(--line);border-radius:10px}
.mark{background:#F5F4F0}
.mark-line{display:flex;flex-wrap:wrap;gap:10px;align-items:baseline;font-size:14px}
.mark-line span{color:var(--soft);font-size:13px}
.mark-note{font-size:12.5px;color:var(--soft);margin-top:8px;max-width:60ch}
.mark-note a{color:var(--accent)}
.foot{max-width:640px;margin:24px auto 0;font-size:12px;color:var(--faint);display:flex;flex-wrap:wrap;gap:4px 16px;justify-content:space-between}
.foot a{color:var(--soft)}
a:focus-visible,.act:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
@media(min-width:560px){h1{font-size:34px}.head{padding:28px 24px}.card{padding:22px 24px}}
`;
