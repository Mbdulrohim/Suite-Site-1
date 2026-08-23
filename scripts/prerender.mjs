/**
 * Write every route to its own HTML file, with its own head.
 *
 * Vite ships a client-rendered SPA, so the document a crawler receives is an
 * empty `<div id="root">` — the headline, the prose, the whole site is
 * assembled by JavaScript the crawler may never run.
 *
 * This used to drive a real Chrome via puppeteer. That worked on a Mac and
 * silently did nothing on Cloudflare's build image, which has no browser
 * installed — so every deploy shipped the empty shell while the local build
 * looked correct. Rendering through react-dom/server instead needs no browser,
 * so it behaves identically here and on the builder, and it cannot half-fail:
 * if the render throws, the build fails loudly rather than shipping a husk.
 *
 * GSAP still animates on the client exactly as before. Its work happens in
 * effects, which never run here, so the markup this writes is the page's
 * resting state — which is also the state a crawler should read.
 *
 * One file per route is what makes these real pages rather than one page with a
 * router in front of it. A crawler asking for /pricing gets a document whose
 * title, description, canonical and structured data are about pricing, with the
 * words already in it — no JavaScript, no second request, nothing to execute.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const DIST = 'dist';
const SSR_ENTRY = path.resolve('dist-ssr/entry-server.js');
const ROOT = '<div id="root"></div>';

if (!fs.existsSync(SSR_ENTRY)) {
  console.error(`prerender: ${SSR_ENTRY} is missing — run the --ssr build first`);
  process.exit(1);
}

const { render, site, routes } = await import(pathToFileURL(SSR_ENTRY).href);

const shell = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
if (!shell.includes(ROOT)) {
  console.error(`prerender: could not find ${ROOT} in ${DIST}/index.html`);
  process.exit(1);
}

const escape = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Swap the head values the shell carries for this route's own.
 *
 * Replacing rather than appending, so a page cannot end up with two titles or a
 * canonical that disagrees with the URL it was served from — which is worse
 * than having neither, because a crawler picks one and it may not be yours.
 */
const retitle = (html, route) => {
  const url = `${site.url}${route.path === '/' ? '/' : route.path}`;
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(route.title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[\s\S]*?(")/, `$1${escape(route.description)}$2`)
    .replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta\s+property="og:title"\s+content=")[\s\S]*?(")/, `$1${escape(route.title)}$2`)
    .replace(/(<meta\s+property="og:description"\s+content=")[\s\S]*?(")/, `$1${escape(route.description)}$2`)
    .replace(/(<meta\s+name="twitter:title"\s+content=")[\s\S]*?(")/, `$1${escape(route.title)}$2`)
    .replace(/(<meta\s+name="twitter:description"\s+content=")[\s\S]*?(")/, `$1${escape(route.description)}$2`);
};

/**
 * A breadcrumb and a WebPage node per route, on top of the site-wide graph the
 * shell already carries. Cheap, and it is what lets an assistant say which page
 * an answer came from rather than citing the domain.
 */
const pageGraph = (route) => {
  const url = `${site.url}${route.path === '/' ? '/' : route.path}`;
  const nodes = [{
    '@type': 'WebPage',
    '@id': `${url}#page`,
    url,
    name: route.title,
    description: route.description,
    isPartOf: { '@id': `${site.url}/#website` },
    inLanguage: 'en-NG',
  }];
  if (route.path !== '/') {
    nodes.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Suite', item: `${site.url}/` },
        { '@type': 'ListItem', position: 2, name: route.title, item: url },
      ],
    });
  }
  return `<script type="application/ld+json">${
    JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes })
  }</script>`;
};

for (const route of routes) {
  const body = render(route.path);
  let html = retitle(shell, route).replace(ROOT, `<div id="root">${body}</div>`);
  html = html.replace('</head>', `${pageGraph(route)}</head>`);

  const dir = route.path === '/' ? DIST : path.join(DIST, route.path);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);

  const words = body.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').length;
  console.log(`prerender: ${route.path} — ${words} words in the HTML`);
}
