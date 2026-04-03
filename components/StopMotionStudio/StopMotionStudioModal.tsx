'use client';

/*
 * StopMotionStudioModal.tsx — Full-screen modal shell for the Stop Motion Studio
 *
 * WHY 'use client':
 *   Uses useState for screen transitions and refs/event handlers throughout
 *   the editor tree. Cannot render in Node.js.
 *
 * WHY native <dialog> instead of Chakra Modal:
 *   The browser's built-in <dialog> element provides the same behavior as
 *   Chakra Modal for free — focus trapping, Escape-key close, backdrop — with
 *   zero JavaScript beyond showModal() / close(). This removes the only Chakra
 *   component that had behavioral (not just visual) functionality.
 *
 *   showModal() vs open attribute:
 *     showModal() — renders the dialog in the top-layer (above everything,
 *                   including fixed-position elements); focus is trapped inside
 *     open attr  — renders inline in the document; no focus trap, no backdrop
 *   We always use showModal() via the ref passed down from StopMotionLauncher.
 *
 * Chakra removed: Modal/ModalOverlay/ModalContent/ModalHeader/ModalCloseButton/
 *                 ModalBody/Button/Box/VStack/Text → <dialog> + plain HTML + Tailwind
 */

import React, { useRef, useImperativeHandle, forwardRef, useState } from 'react';
import { StopMotionEditor } from './StopMotionEditor';

// Public API exposed to parent via ref — lets StopMotionLauncher open/close
// the dialog without needing to own any state itself.
export interface StopMotionModalHandle {
  open: () => void;
  close: () => void;
}

type Screen = 'home' | 'studio';

const StopMotionStudioModal = forwardRef<StopMotionModalHandle>(function StopMotionStudioModal(
  _props,
  ref,
) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [screen, setScreen] = useState<Screen>('home');

  // Expose open/close to the parent component via ref
  useImperativeHandle(ref, () => ({
    open() {
      setScreen('home'); // always reset to home screen when opening
      dialogRef.current?.showModal();
    },
    close() {
      dialogRef.current?.close();
    },
  }));

  const goBackHome = () => setScreen('home');

  return (
    /*
     * <dialog> renders in the browser's "top layer" when opened with showModal().
     * This means it sits above all z-index stacking contexts automatically —
     * no need for portals or z-index management.
     *
     * ::backdrop pseudo-element provides the dimming overlay (styled in globals.css).
     * Here we set a fallback backdrop color via Tailwind's backdrop utility.
     */
    <dialog
      ref={dialogRef}
      className="
        w-[90vw] max-w-[90vw] h-[90vh] max-h-[90vh]
        rounded-[18px] p-0 overflow-hidden
        border border-[var(--border)]
        bg-white
        shadow-[0_24px_80px_rgba(0,0,0,0.4)]
        backdrop:bg-black/50
      "
      // Close on backdrop click (clicking outside the dialog content area)
      onClick={e => { if (e.target === dialogRef.current) dialogRef.current?.close(); }}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)] bg-white">
        <h2 className="text-lg font-semibold text-gray-900">Stop Motion Studio</h2>
        <button
          className="text-gray-400 hover:text-gray-700 transition-colors text-2xl leading-none cursor-pointer"
          onClick={() => dialogRef.current?.close()}
          aria-label="Close"
        >
          ×
        </button>
      </div>

      {/* Body */}
      <div className="h-[calc(90vh-65px)] overflow-y-auto">
        {screen === 'home' ? (
          // Home screen: quick-start instructions + enter-editor button
          <div className="flex flex-col gap-6 p-8">
            <div className="flex items-center justify-center">
              <span className="text-2xl font-semibold text-gray-900">Stop Motion Studio</span>
            </div>

            <button
              className="self-center px-8 py-3 rounded-full bg-[var(--accent)] text-white font-semibold hover:opacity-90 transition-opacity cursor-pointer"
              onClick={() => setScreen('studio')}
            >
              Go to editor
            </button>

            <div>
              <p className="text-base font-semibold text-gray-900 mb-3">Quick start</p>
              <ul className="flex flex-col gap-2 text-[0.95rem] text-gray-700">
                <li>• Use the left panel to add new shapes.</li>
                <li>• Add a new frame with "Add Latest Frame".</li>
                <li>• Use the arrow buttons to navigate frames.</li>
                <li>• Hit play to preview the animation.</li>
                <li>• Load projects with "Load Project".</li>
                <li>• Save work with "Save Project".</li>
                <li>• Export as a GIF with "Export Movie".</li>
              </ul>
            </div>
          </div>
        ) : (
          <StopMotionEditor backHome={goBackHome} />
        )}
      </div>
    </dialog>
  );
});

export default StopMotionStudioModal;
