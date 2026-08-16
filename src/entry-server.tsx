/**
 * The build-time entry. Same <App /> as the browser gets, rendered to a string
 * instead of to a DOM node.
 *
 * Nothing in this tree touches `window` or `document` while rendering — the
 * scroll handler and the modal's key listener are both inside callbacks and
 * effects, and effects do not run on the server. That is the only thing that
 * has to stay true for this file to keep working.
 */
import { renderToString } from 'react-dom/server';
import App from './App.tsx';

export const render = (): string => renderToString(<App />);
