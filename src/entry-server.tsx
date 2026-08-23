/**
 * The build-time entry. The same tree the browser gets, rendered to a string
 * for one path instead of to a DOM node.
 *
 * Nothing in this tree touches `window` or `document` while rendering — scroll
 * handlers and key listeners are all inside callbacks and effects, and effects
 * do not run on the server. That is the only thing that has to stay true for
 * this file to keep working.
 */
import { renderToString } from 'react-dom/server';
import { Router } from './Router.tsx';

/*
 * Re-exported so the build scripts read the same route table the pages are
 * rendered from. Both prerender.mjs and seo.mjs used to keep their own copy,
 * and seo.mjs's copy was already wrong — it still listed one route after the
 * site had four.
 */
export { site, routes, jsonLd } from './content/site.ts';

export const render = (path: string): string =>
  renderToString(<Router path={path} />);
