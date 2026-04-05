/*
 * AsciiPortrait.tsx — ASCII art portrait rendered from public/portrait.txt
 *
 * SERVER COMPONENT — reads the file at build time via Node.js fs.
 * Zero client JS, zero network request at runtime.
 *
 * DESIGN: always rendered as a dark terminal window regardless of theme.
 * Light mode: dark bg + emerald text (inverted from page — creates contrast).
 * Dark mode: same dark bg + emerald text (consistent).
 *
 * SIZING:
 *   portrait.txt is 136 lines × ~250 chars.
 *   At font-size 6px, monospace char width ≈ 3.6px:
 *     full width  = 250 × 3.6 = 900px
 *     full height = 136 × 6   = 816px
 *
 *   Container is 600px wide × 700px tall (scrollable).
 *   The portrait is wider than the container so it scrolls horizontally,
 *   but the vertical scroll lets you see all 136 lines.
 *   overflow: auto gives native scrollbars styled below.
 *
 * WHY a terminal aesthetic:
 *   The portrait already uses ASCII characters (.:;+x) that look like a CRT
 *   or terminal output. A dark bg with green text reinforces this intentionally.
 */

import { readFileSync } from 'fs';
import { join } from 'path';

export default function AsciiPortrait() {
  const portrait = readFileSync(join(process.cwd(), 'public', 'portrait.txt'), 'utf-8');

  return (
    <div
      className="
        flex-shrink-0 flex flex-col
        w-fit max-w-[min(90vw,620px)]
        rounded-[20px] overflow-hidden
        border border-[rgba(52,211,153,0.25)]
        shadow-[0_0_40px_rgba(52,211,153,0.08),var(--shadow-strong)]
      "
    >
      {/* Terminal title bar */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#1a1a1a] border-b border-[rgba(255,255,255,0.06)]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[0.65rem] text-[rgba(255,255,255,0.3)] font-mono">portrait.txt</span>
      </div>

      {/* Portrait area — zoomed to fit full portrait without scrollbars.
           zoom: 0.62 shrinks the natural ~900×860px pre down to ~558×533px.
           On mobile we drop to 0.38 so the full width fits within 90vw. */}
      <style>{`
        .ascii-pre { zoom: 0.62; }
        @media (max-width: 640px) { .ascii-pre { zoom: 0.38; } }
      `}</style>
      <div className="overflow-hidden bg-[#0d0d0d]">
        <pre
          role="img"
          aria-label="ASCII art portrait of Cameron Powell"
          className="ascii-pre"
          style={{
            fontSize: '6px',
            lineHeight: 1.05,
            margin: 0,
            padding: '12px',
            fontFamily: 'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace',
            color: '#34d399',
            whiteSpace: 'pre',
            userSelect: 'none',
            overflowWrap: 'normal',
            wordBreak: 'normal',
            display: 'block',
          }}
        >
          {portrait}
        </pre>
      </div>
    </div>
  );
}
