/**
 * Put the page's words into dist/index.html.
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

const { render } = await import(pathToFileURL(SSR_ENTRY).href);
const body = render();

const file = path.join(DIST, 'index.html');
const shell = fs.readFileSync(file, 'utf8');

if (!shell.includes(ROOT)) {
  console.error(`prerender: could not find ${ROOT} in ${file}`);
  process.exit(1);
}

fs.writeFileSync(file, shell.replace(ROOT, `<div id="root">${body}</div>`));

const text = body
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();
console.log(`prerender: / — ${text.length} chars of readable text in the HTML`);
