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
          inline-flex items-center justify-center
          px-6 py-2.5 rounded-full
          bg-[var(--accent)] text-white font-semibold text-sm
          shadow-[0_8px_20px_rgba(37,99,235,0.25)]
          hover:opacity-90 transition-opacity cursor-pointer
        "
        onClick={() => modalRef.current?.open()}
      >
        Open studio
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
