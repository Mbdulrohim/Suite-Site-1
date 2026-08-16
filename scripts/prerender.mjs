/**
 * Render each route with a real browser and write the HTML back to dist/.
 *
 * Vite ships a client-rendered SPA, so without this the page a crawler
 * receives is an empty `<div id="root">`. Prerendering is framework-agnostic
 * on purpose: no SSG plugin to keep in step with React or Vite majors.
 */
import puppeteer from 'puppeteer-core';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const CHROME =
  process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ROUTES = ['/'];
const DIST = 'dist';
const PORT = 4183;

if (!fs.existsSync(CHROME)) {
  console.warn(`prerender: no Chrome at ${CHROME} — skipping (set CHROME_PATH to enable)`);
  process.exit(0);
}

const server = spawn('pnpm', ['exec', 'vite', 'preview', '--port', String(PORT), '--strictPort'], {
  stdio: 'ignore',
});
await new Promise((resolve) => setTimeout(resolve, 2000));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
try {
  for (const route of ROUTES) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0' });

    // Scroll-triggered sections only mount their text once they have been
    // near the viewport, and that text is the entire point of prerendering.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 700) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await new Promise((resolve) => setTimeout(resolve, 800));

    const html = await page.content();
    const out = path.join(DIST, route === '/' ? 'index.html' : `${route}/index.html`);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, html);

    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    console.log(`prerendered ${route} — ${text.length} chars of text in the HTML`);
    await page.close();
  }
} finally {
  await browser.close();
  server.kill();
}
