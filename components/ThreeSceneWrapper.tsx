'use client';

/*
 * ThreeSceneWrapper.tsx — Client-side loader for the Three.js scene
 *
 * WHY THIS FILE EXISTS:
 *   In Next.js 16, `dynamic({ ssr: false })` can only be called inside a
 *   Client Component. The Home page (app/page.tsx) is a Server Component,
 *   so it cannot call dynamic() with ssr: false directly.
 *
 *   The pattern: create a thin 'use client' wrapper that owns the dynamic
 *   import, then import the wrapper from the Server Component page. This way:
 *     - app/page.tsx stays a Server Component (static HTML, no JS bundle cost)
 *     - The Three.js code is still only ever loaded in the browser
 *     - The boundary is minimal — just this file adds a client boundary
 *
 * HOW THE LOADING SEQUENCE WORKS:
 *   1. Server renders app/page.tsx → static HTML with <ScenePlaceholder> in place
 *   2. Browser receives the HTML instantly (from CDN edge)
 *   3. Next.js begins hydration — React takes over the static HTML
 *   4. This wrapper triggers: downloads the ThreeScene JS chunk
 *   5. ThreeScene mounts, Three.js initializes, the 3D scene appears
 *   6. <ScenePlaceholder> fades out as ThreeScene becomes visible
 */

import dynamic from 'next/dynamic';

// Placeholder shown while the ThreeScene JavaScript bundle downloads.
// This is client-rendered after hydration, replacing the server-side fallback.
function ScenePlaceholder() {
  return (
    <div className="
      w-[min(35vw,580px)] min-w-[300px] flex-shrink-0
      h-[min(35vw,600px)] min-h-[300px]
      border border-[var(--border)] rounded-[18px]
      bg-[var(--surface-strong)]
      shadow-[var(--shadow-strong)]
      flex items-center justify-center
      max-sm:w-full max-sm:max-w-[90vw] max-sm:h-[min(60vw,300px)]
    ">
      <div className="text-[var(--text-muted)] text-[0.9rem] font-medium animate-pulse">
        Loading...
      </div>
    </div>
  );
}

/*
 * dynamic() with ssr: false — tells Next.js to:
 *   1. Never render ThreeScene on the server (WebGL doesn't exist in Node.js)
 *   2. Code-split it into its own JS chunk (only downloads on the home page)
 *   3. Show ScenePlaceholder while the chunk loads
 */
const ThreeScene = dynamic(
  () => import('@/components/ThreeScene'),
  {
    ssr: false,
    loading: ScenePlaceholder,
  }
);

export default function ThreeSceneWrapper() {
  return <ThreeScene />;
}
