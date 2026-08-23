/**
 * suite.ng/<slug> — one shop's public page.
 *
 * This is the only dynamic route on an otherwise static site. It exists here
 * rather than inside the signed-in app because the page has to be crawlable:
 * a search engine should get the business name, address and structured data in
 * the first response, without executing a dashboard bundle it will never load.
 *
 * `[slug]` matches exactly one path segment, so `/` and `/assets/index-abc.js`
 * never reach this file. Everything else at the top level does, including
 * `/robots.txt` and any marketing page added later — which is what the routing
 * below is mostly about, and it is ordered the way it is for a reason worth
 * reading before changing it.
 *
 * Deliberately not typed against @cloudflare/workers-types. The tsconfig this
 * repo lints with is a browser React config, and adding a Workers lib to it to
 * describe two properties would change type resolution for the whole site. The
 * context surface used here is small, stable and written out below.
 */
import { renderProfilePage, type PublicProfile } from '../src/public-profile/render.ts';
import { routes } from '../src/content/site.ts';

/** Every path the marketing site owns. A shop can never take one of these. */
const RESERVED = new Set<string>(routes.map((route) => route.path));

interface Context {
  request: Request;
  params: { slug: string | string[] };
  env: { SUITE_API_URL?: string };
  /** Hands the request back to the asset server. Pages' own fall-through. */
  next: () => Promise<Response>;
}

/** Where the API answers. Overridable so a preview deployment can point at staging. */
const DEFAULT_API = 'https://api.suite.ng';

/**
 * The same shape the API validates before it will look a slug up. Checked here
 * first so that `/og.png`, `/sitemap.xml` and every other single-segment file
 * on this site are recognised as not-a-slug without a network call.
 */
const SLUG = /^[a-z0-9][a-z0-9-]{0,79}$/;

/**
 * Bumped when this renderer's output changes.
 *
 * The ETag is built from the profile's `updated_at`, which is the right
 * validator for the data and the wrong one for the page: a change to the layout
 * or the JSON-LD produces different HTML from an identical row, and without
 * this every edge cache would keep serving the old markup until each shop
 * happened to save something.
 */
const RENDERER = 'r2';

/**
 * Security headers for a response `_headers` never sees.
 *
 * `public/_headers` applies to static assets only, so a Function response
 * inherits none of it. The policy here is much tighter than the marketing
 * site's can be, because this page loads no script, no font and no third-party
 * anything: the only sources it needs are its own inline stylesheet and the
 * `data:` URI a shop's logo is stored as.
 */
const SECURITY: Record<string, string> = {
  'content-security-policy':
    "default-src 'none'; img-src 'self' data:; style-src 'unsafe-inline'; " +
    "base-uri 'none'; form-action 'none'; frame-ancestors 'none'; upgrade-insecure-requests",
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'permissions-policy': 'geolocation=(), camera=(), microphone=(), payment=(), interest-cohort=()',
};

const html = (body: string, status: number, headers: Record<string, string>): Response =>
  new Response(body, {
    status,
    headers: { 'content-type': 'text/html; charset=utf-8', ...SECURITY, ...headers },
  });

export const onRequestGet = async (context: Context): Promise<Response> => {
  const { request, params, env, next } = context;
  const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug;

  if (!SLUG.test(slug)) return next();

  /*
   * The site's own pages win, and are recognised by name rather than by asking
   * the asset server.
   *
   * /pricing is shaped exactly like a shop slug, so without this a marketing
   * page would be swallowed by a profile lookup for a shop that does not exist
   * and the crawler would be told "no such shop". Asking `next()` first and
   * treating a non-404 as "this is a real page" is the obvious fix and the
   * wrong one — Pages answers 200 for paths it does not have, which is how
   * every shop page once became the homepage for half an hour.
   *
   * Reading the same route table the pages are built from means adding a page
   * needs no second edit here, and no list anybody has to remember.
   */
  if (RESERVED.has(`/${slug}`)) return next();

  const origin = new URL(request.url).origin;
  const api = (env.SUITE_API_URL ?? DEFAULT_API).replace(/\/$/, '');

  let response: Response;
  try {
    response = await fetch(`${api}/public/profiles/${encodeURIComponent(slug)}`, {
      // Manual, so the API's 301 for a renamed shop is read rather than
      // silently followed — the browser needs its own redirect, to the public
      // path, not to the API's.
      redirect: 'manual',
      headers: { accept: 'application/json' },
    });
  } catch {
    /*
     * The API is unreachable. Not a 404: this shop's page probably exists, and
     * telling a crawler it does not would cost the shop its indexing over an
     * outage measured in minutes. 503 with a short retry is the honest answer.
     */
    return html(problem(origin, 'This page is not loading', unavailable), 503, {
      'cache-control': 'no-store',
      'retry-after': '60',
    });
  }

  if (response.status === 301) {
    /*
     * A shop that renamed itself. Receipts printed under the old address are in
     * customers' pockets and have to keep working, so this is a real permanent
     * redirect rather than a rendered "moved" page.
     */
    const moved = await response.json().catch(() => ({})) as { movedTo?: string };
    const target = typeof moved.movedTo === 'string' && SLUG.test(moved.movedTo)
      ? moved.movedTo
      : null;
    if (target !== null) {
      return new Response(null, {
        status: 301,
        headers: {
          location: `/${target}`,
          'cache-control': 'public, max-age=300, s-maxage=3600',
          ...SECURITY,
        },
      });
    }
  }

  if (!response.ok) {
    /*
     * Not a shop. It may still be a page this site serves — `[slug]` matches
     * every single-segment path, so `/pricing` arrives here exactly like
     * `/ade-gadgets` does. Ask the asset server before answering.
     *
     * This order — API first, assets second — is the opposite of what reads
     * naturally, and it is deliberate. Pages serves `index.html` with a **200**
     * for a path it does not have, so "ask the assets first and treat a 404 as
     * unclaimed" quietly returns the marketing homepage for every shop on the
     * platform. It did exactly that in production. Asking the API first means a
     * published page renders no matter what the asset server decides to do with
     * paths it does not recognise.
     *
     * `public/404.html` makes that decision an honest 404, which is what turns
     * the branch below into a real answer rather than the homepage again. The
     * ordering here is what stops that file being load-bearing.
     */
    const asset = await next();
    if (asset.status < 400) return asset;

    return html(problem(origin, 'No page at this address', missing), 404, {
      'cache-control': 'public, max-age=60, s-maxage=300',
    });
  }

  const profile = await response.json() as PublicProfile;

  /*
   * Weak, because the body is derived from the row rather than being it. Two
   * renders of one `updated_at` are equivalent HTML, which is exactly what a
   * weak validator claims.
   */
  /*
   * The Lagos date is in here because the page marks today's row in the opening
   * hours. Without it a page rendered on Tuesday keeps being served on
   * Wednesday with Tuesday still highlighted, for as long as the edge holds it.
   */
  const day = new Date().toLocaleDateString('en-CA', { timeZone: 'Africa/Lagos' });
  const etag = `W/"${profile.slug}-${Date.parse(profile.updatedAt)}-${day}-${RENDERER}"`;
  if (request.headers.get('if-none-match') === etag) {
    return new Response(null, { status: 304, headers: { etag, ...SECURITY } });
  }

  return html(renderProfilePage(profile, { origin }), 200, {
    etag,
    // A shop that publishes an edit should see it within the minute; a page
    // being shared around should not touch Postgres for every reader, and a
    // stale copy is a better answer than a spinner while a fresh one is fetched.
    'cache-control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
  });
};

export const onRequestHead = onRequestGet;

const missing = `<p>There is no Suite page at this address. It may have been taken
  down, or the address may be mistyped — they are all lowercase, with hyphens
  instead of spaces.</p>`;

const unavailable = `<p>This page could not be loaded just now. It has not been taken
  down; please try again in a minute.</p>`;

/**
 * The two failure pages, sharing the profile page's palette.
 *
 * Rendered rather than handed to Pages' default 404 for one reason: somebody
 * reaches this by typing an address off a receipt, and a page that says the
 * address is lowercase-with-hyphens is more use to them than a blank 404.
 */
function problem(origin: string, heading: string, body: string): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${heading} | Suite</title>
<meta name="robots" content="noindex">
<style>
body{background:#FAF9F6;color:#121316;font:16px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;margin:0;padding:0 20px}
main{max-width:460px;margin:0 auto;padding:96px 0}
a.brand{font-weight:800;letter-spacing:-.03em;text-decoration:none;font-size:15px}
h1{font-size:26px;letter-spacing:-.03em;margin:28px 0 12px}
p{color:#6B7280;font-size:15px}
p+p{margin-top:14px}
a{color:#2563EB}
</style>
</head>
<body><main>
<a class="brand" href="${origin}/">Suite</a>
<h1>${heading}</h1>
${body}
<p><a href="${origin}/">What Suite is</a></p>
</main></body>
</html>`;
}
