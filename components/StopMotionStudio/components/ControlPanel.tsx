'use client';

/*
 * ControlPanel.tsx — Bottom toolbar for the Stop Motion Studio
 *
 * WHY 'use client':
 *   This component handles onClick events and file input changes,
 *   which require the browser event system. Not renderable in Node.js.
 *
 * Chakra removed:
 *   <Box>/<Flex>/<Button>/<Input> → plain HTML <div>/<button>/<input>
 *   All layout is now Tailwind utility classes.
 *   The hidden file input trick (invisible <input type="file"> triggered
 *   by a visible button) is preserved — it's a plain HTML pattern, not Chakra.
 */

import React, { ChangeEvent } from 'react';

type ControlPanelProps = {
  addNewFrame: () => void;
  saveAnimState: () => void;
  fileInput: () => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  backHome: () => void;
  frameForward: () => void;
  frameBackward: () => void;
  playback: () => void;
  exportMovie: () => void;
  reset: () => void;
};

// Shared button style — extracted as a constant to avoid repeating the class string
const BTN =
  'px-4 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] ' +
  'text-[var(--text-primary)] text-sm font-medium ' +
  'hover:bg-[rgba(148,163,184,0.2)] transition-colors duration-150 cursor-pointer';

export const ControlPanel: React.FC<ControlPanelProps> = ({
  addNewFrame,
  saveAnimState,
  fileInput,
  handleChange,
  backHome,
  frameForward,
  frameBackward,
  playback,
  exportMovie,
  reset,
}) => {
  return (
    // Full-width bar centered horizontally
    <div className="flex items-center justify-center w-full py-3 border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="flex flex-row justify-between items-center gap-3 px-6 w-full max-w-5xl flex-wrap">

        {/* Playback */}
        <button className={BTN} onClick={playback}>Play</button>

        {/* Frame navigation */}
        <div className="flex gap-2">
          <button className={BTN} onClick={frameBackward}>{'<--'}</button>
          <button className={BTN} onClick={frameForward}>{'-->'}</button>
        </div>

        <button className={BTN} onClick={addNewFrame}>Add Latest Frame</button>
        <button className={`${BTN} text-red-500 border-red-300`} onClick={reset}>Delete + Reset</button>
        <button className={BTN} onClick={backHome}>Navigate home</button>
        <button className={BTN} onClick={saveAnimState}>Save project</button>

        {/*
         * Hidden file input + visible button pattern:
         * <input type="file"> is visually unstyled by default and varies across
         * browsers. The hidden input is programmatically clicked by the button,
         * giving us full control over the trigger element's appearance.
         */}
        <input
          type="file"
          className="hidden"
          onChange={handleChange}
          id="fileInput"
        />
        <button className={BTN} onClick={fileInput}>Load project</button>

        <button className={`${BTN} bg-[var(--accent)] text-white border-[var(--accent)] hover:opacity-90`} onClick={exportMovie}>
          Export GIF
        </button>
      </div>
    </div>
  );
};
