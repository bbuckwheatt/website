'use client';

/*
 * SpotlightCard.tsx — Emerald spotlight/glow card wrapper
 *
 * Adapted from easemize/spotlight-card (21st.dev).
 * Key change from original: uses React onPointerMove (local card coords)
 * instead of document.addEventListener (viewport coords). This means:
 *  - Zero global listeners — no cleanup needed
 *  - coords are local to the card, not the viewport
 *  - Works correctly with background-attachment: scroll (not fixed)
 *
 * Styles are injected once via useEffect (module-level flag deduplicates
 * across multiple card instances — no duplicate <style> blocks).
 */

import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

const GLOW_CSS = `
[data-spotlight]::before,
[data-spotlight]::after {
  pointer-events: none;
  content: "";
  position: absolute;
  inset: calc(var(--border-size) * -1);
  border: var(--border-size) solid transparent;
  border-radius: calc(var(--radius) * 1px);
  background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
  background-repeat: no-repeat;
  background-position: 50% 50%;
  mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
  mask-clip: padding-box, border-box;
  mask-composite: intersect;
}
[data-spotlight]::before {
  background-image: radial-gradient(
    calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75)
    at calc(var(--x, -999) * 1px) calc(var(--y, -999) * 1px),
    hsl(160 80% 45% / 1),
    transparent 100%
  );
  filter: brightness(1.6);
}
[data-spotlight]::after {
  background-image: radial-gradient(
    calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5)
    at calc(var(--x, -999) * 1px) calc(var(--y, -999) * 1px),
    hsl(160 60% 70% / 0.7),
    transparent 100%
  );
}
`;

let stylesInjected = false;

type SpotlightCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function SpotlightCard({ children, className }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (stylesInjected) return;
    const style = document.createElement('style');
    style.textContent = GLOW_CSS;
    document.head.appendChild(style);
    stylesInjected = true;
  }, []);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === 'touch') return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty('--x', x.toFixed(2));
    el.style.setProperty('--y', y.toFixed(2));
    el.style.setProperty('--xp', (x / rect.width).toFixed(2));
  }

  return (
    <div
      ref={cardRef}
      data-spotlight
      onPointerMove={handlePointerMove}
      className={cn('relative', className)}
      style={{
        '--radius': '20',
        '--border': '1.5',
        '--border-size': 'calc(var(--border, 1.5) * 1px)',
        '--spotlight-size': '220px',
        backgroundImage:
          'radial-gradient(220px 220px at calc(var(--x, -999) * 1px) calc(var(--y, -999) * 1px), hsl(160 80% 50% / 0.18), transparent)',
        position: 'relative',
        touchAction: 'pan-y',
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
