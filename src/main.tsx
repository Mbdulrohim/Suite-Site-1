import {StrictMode} from 'react';
import {hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// The HTML already contains the rendered page — scripts/prerender.mjs wrote it
// there at build time. Hydrating adopts that markup and attaches the handlers;
// createRoot would throw it away and paint the whole page a second time.
hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <App />
  </StrictMode>,
);
