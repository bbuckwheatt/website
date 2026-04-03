'use client';

/*
 * Util.ts — Shared browser utilities for the Stop Motion Studio
 *
 * WHY 'use client':
 *   saveBlob() uses document.createElement and URL.createObjectURL —
 *   both are browser-only APIs unavailable in Node.js.
 */

// Triggers a file download for the given Blob in the user's browser.
// Used to download both the project JSON file and the exported GIF.
export function saveBlob(blob: Blob) {
  // Create a temporary object URL — a browser-managed URL pointing to in-memory data
  const bloburl = URL.createObjectURL(blob);

  // Create a hidden <a> element, click it to trigger the download, then clean up
  const a = document.createElement('a');
  a.style.cssText = 'display: none';
  a.href = bloburl;
  a.download = 'animation.json'; // Default filename for project saves; GIF export overrides this elsewhere
  document.body.appendChild(a);
  a.click();

  // Release the blob URL to free browser memory — if omitted, the blob stays
  // referenced until the page unloads (small memory leak for large GIFs)
  URL.revokeObjectURL(bloburl);
  document.body.removeChild(a);
}
