import {StrictMode} from 'react';
import {hydrateRoot} from 'react-dom/client';
import { Router } from './Router.tsx';
import './index.css';

// The HTML already contains the rendered page — scripts/prerender.mjs wrote it
// there at build time. Hydrating adopts that markup and attaches the handlers;
// createRoot would throw it away and paint the whole page a second time.
//
// The path has to be the one the server rendered, or hydration finds a
// different tree than the markup it is adopting.
hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <Router path={window.location.pathname} />
  </StrictMode>,
);
