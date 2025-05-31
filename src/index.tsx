import React from 'react';
// import ReactDOM from 'react-dom';

import './styles/globals.css'
import { createRoot } from 'react-dom/client';
import App from './App';

// GitHub Pages 404 redirect handler
// Check if we were redirected from a 404 page and restore the original URL
(function(l) {
  if (l.search[1] === '/' ) {
    const decoded = l.search.slice(1).split('&').map(function(s) { 
      return s.replace(/~and~/g, '&')
    }).join('?');
    window.history.replaceState(null, '', l.pathname.slice(0, -1) + decoded + l.hash);
  }
}(window.location));

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);