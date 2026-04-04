/*
 * AsciiPortrait.tsx — ASCII art portrait, server-rendered from portrait.txt
 *
 * SERVER COMPONENT — reads the file at build time, zero client JS.
 *
 * APPROACH: render at a legible font size and crop to the face center,
 * rather than scaling down to illegibility.
 *
 * SIZING MATH (at font-size 7px, monospace):
 *   Character width  ≈ 0.6 × 7px = 4.2px
 *   Character height = 7px × line-height 1.0 = 7px
 *
 *   Full portrait: 250 chars × 4.2px = 1050px wide
 *                  136 lines × 7px   = 952px tall
 *
 *   Container: 480px × 480px
 *   Visible chars: 480 / 4.2 ≈ 114 chars  (center slice of the 250-wide portrait)
 *   Visible lines: 480 / 7   ≈ 68 lines
 *
 *   Horizontal offset to center: (1050 - 480) / 2 = 285px → margin-left: -285px
 *   Vertical offset (face is upper-center): margin-top: -70px shows lines 10-78
 *
 * WHY margin offsets instead of transform:
 *   transform: translate() on the pre would shift it out of the container's
 *   clipping region unless overflow is hidden on a positioned ancestor.
 *   Negative margins pull the pre into position before the container clips it.
 */

import { readFileSync } from 'fs';
import { join } from 'path';

export default function AsciiPortrait() {
  const portrait = readFileSync(join(process.cwd(), 'public', 'portrait.txt'), 'utf-8');

  return (
    <div
      className="
        flex-shrink-0 relative
        w-[480px] h-[480px]
        overflow-hidden
        rounded-[20px]
        border border-[var(--border)]
        bg-[var(--surface)]
        shadow-[var(--shadow-strong)]
        max-lg:w-[400px] max-lg:h-[400px]
        max-md:w-[min(85vw,380px)] max-md:h-[min(85vw,380px)]
      "
    >
      <pre
        role="img"
        aria-label="ASCII art portrait of Cameron Powell"
        style={{
          fontSize: '7px',
          lineHeight: 1.0,
          margin: 0,
          padding: 0,
          /* Crop to face center: shift left by half of (full width - container width) */
          marginLeft: '-285px',
          /* Shift down slightly to frame the face, not the top of the portrait */
          marginTop: '-70px',
          fontFamily: 'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace',
          /* Emerald accent color — matches the site's theme and reads as "terminal" */
          color: 'var(--accent)',
          opacity: 0.75,
          whiteSpace: 'pre',
          userSelect: 'none',
          overflowWrap: 'normal',
          wordBreak: 'normal',
        }}
      >
        {portrait}
      </pre>
    </div>
  );
}
