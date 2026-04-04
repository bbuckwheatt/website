/*
 * AsciiPortrait.tsx — ASCII art portrait rendered from public/portrait.txt
 *
 * SERVER COMPONENT — reads the file at build time via Node.js fs.
 * No client JS, no fetch request at runtime. The text ships as static HTML.
 *
 * SIZING MATH:
 *   portrait.txt is 136 lines × ~250 chars per line.
 *   At font-size: 6px monospace, natural dimensions are:
 *     width  ≈ 250 chars × 3.6px/char = 900px
 *     height ≈ 136 lines × 6px × 1.1  = 898px
 *   scale(0.555) brings both to ≈ 500px, fitting the container.
 *
 * WHY transform: scale() instead of tiny font-size:
 *   Very small font sizes (< 5px) can render inconsistently across browsers
 *   and OS font rendering pipelines. Scaling a normally-sized element is
 *   more predictable — the browser paints at 6px then composites at 0.555×.
 *
 * WHY aria-label + role="img":
 *   Screen readers would otherwise attempt to read 34KB of ASCII characters.
 *   role="img" with an aria-label treats the block as a single decorative image.
 */

import { readFileSync } from 'fs';
import { join } from 'path';

export default function AsciiPortrait() {
  // Runs in Node.js at build time — process.cwd() is the project root
  const portrait = readFileSync(join(process.cwd(), 'public', 'portrait.txt'), 'utf-8');

  return (
    <div
      className="
        relative flex-shrink-0
        w-[500px] h-[500px]
        overflow-hidden
        rounded-[20px]
        border border-[var(--border)]
        bg-[var(--surface)]
        shadow-[var(--shadow-strong)]
        max-lg:w-[420px] max-lg:h-[420px]
        max-md:w-[min(85vw,400px)] max-md:h-[min(85vw,400px)]
      "
    >
      <pre
        role="img"
        aria-label="ASCII art portrait of Cameron Powell"
        style={{
          fontSize: '6px',
          lineHeight: 1.1,
          margin: 0,
          padding: 0,
          fontFamily: 'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace',
          color: 'var(--text-primary)',
          opacity: 0.7,
          /* Scale down to fit the container. transform-origin: top left means
           * the element shrinks toward the top-left corner of the container. */
          transform: 'scale(0.555)',
          transformOrigin: 'top left',
          whiteSpace: 'pre',
          userSelect: 'none',
          /* Prevent the pre from wrapping — ASCII art requires exact character positions */
          overflowWrap: 'normal',
          wordBreak: 'normal',
        }}
      >
        {portrait}
      </pre>
    </div>
  );
}
