'use client';

/*
 * StopMotionLauncher.tsx — Client-side launcher button for the Stop Motion Studio
 *
 * WHY 'use client':
 *   This component owns the dialog ref and click handler. It must run in
 *   the browser. The parent page (app/projects/page.tsx) is a Server Component,
 *   so it cannot directly reference a ref or attach onClick handlers.
 *
 * WHY dynamic({ ssr: false }) here:
 *   StopMotionStudioModal renders a Konva <Stage> which uses HTMLCanvasElement.
 *   HTMLCanvasElement does not exist in Node.js — importing it during SSR would
 *   crash the server render. dynamic({ ssr: false }) defers the import entirely
 *   to the browser, so Node.js never evaluates the canvas code.
 *
 *   This is the same pattern used for ThreeScene: the dynamic() call lives in
 *   a 'use client' file (not directly in the Server Component page).
 *
 * Rendering architecture:
 *   app/projects/page.tsx (Server Component)
 *     └─ <StopMotionLauncher />  ← loaded as dynamic import, client-only
 *          └─ <StopMotionStudioModal ref={...} />  ← loaded with ssr: false
 *               └─ <StopMotionEditor />  ← canvas, gif.js, all browser-only
 */

import dynamic from 'next/dynamic';
import { useRef } from 'react';
import type { StopMotionModalHandle } from './StopMotionStudioModal';

// Deferred import — the canvas/Konva bundle is never evaluated on the server.
// No loading prop needed: the trigger button renders instantly; the modal
// content appears only after the user clicks "Open studio".
const StopMotionStudioModal = dynamic(
  () => import('./StopMotionStudioModal'),
  { ssr: false },
);

export default function StopMotionLauncher() {
  const modalRef = useRef<StopMotionModalHandle>(null);

  return (
    <>
      <button
        className="
          relative group inline-flex items-center justify-center
          px-6 py-2.5
          bg-[var(--accent)] text-white font-semibold text-sm
          border border-emerald-500/40
          shadow-[0_8px_20px_rgba(16,185,129,0.25)]
          hover:-translate-y-px hover:shadow-[0_12px_24px_rgba(16,185,129,0.35)]
          transition-all duration-200 cursor-pointer
        "
        onClick={() => modalRef.current?.open()}
      >
        <span className="absolute h-px opacity-0 group-hover:opacity-100 transition-all duration-500 inset-x-0 top-0 bg-gradient-to-r w-3/4 mx-auto from-transparent via-white/60 to-transparent" />
        Open studio
        <span className="absolute h-px group-hover:opacity-40 opacity-0 transition-all duration-500 inset-x-0 -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-white/60 to-transparent" />
      </button>

      {/*
       * The modal is always mounted (but hidden) so the ref is available
       * immediately on first click. The dialog's visibility is controlled
       * by showModal() / close() via the imperative handle.
       */}
      <StopMotionStudioModal ref={modalRef} />
    </>
  );
}
