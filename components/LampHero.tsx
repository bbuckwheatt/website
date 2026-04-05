'use client';

/*
 * LampHero.tsx — Decorative emerald lamp effect for the contact page header
 *
 * Adapted from aceternity/lamp (21st.dev).
 * Changes from original:
 *  - Color: cyan → emerald (#34d399)
 *  - Background panels: bg-slate-950 → bg-[var(--page-bg)] (theme-aware)
 *  - Size: min-h-screen → fixed ~260px height
 *  - Trigger: whileInView → animate (fires on mount, not scroll)
 *  - No children — purely decorative
 */

import { motion } from 'framer-motion';

const TRANSITION = { delay: 0.2, duration: 0.9, ease: 'easeInOut' as const };

export function LampHero() {
  return (
    <div
      className="relative flex w-full flex-col items-center justify-end overflow-hidden"
      style={{ height: '220px', paddingTop: '60px' }}
      aria-hidden="true"
    >
      {/* Scale-y stretches the beams for a more dramatic cone */}
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">

        {/* Left beam */}
        <motion.div
          initial={{ opacity: 0.5, width: '10rem' }}
          animate={{ opacity: 1, width: '24rem' }}
          transition={TRANSITION}
          className="absolute inset-auto right-1/2 h-48 overflow-visible"
          style={{
            backgroundImage:
              'conic-gradient(from 70deg at center top, #34d399, transparent, transparent)',
          }}
        >
          {/* Mask panels — same color as page bg to cut the beam shape */}
          <div
            className="absolute left-0 bottom-0 z-20 w-full h-36 bg-[var(--page-bg)]"
            style={{ maskImage: 'linear-gradient(to top, white, transparent)' }}
          />
          <div
            className="absolute left-0 bottom-0 z-20 w-32 h-full bg-[var(--page-bg)]"
            style={{ maskImage: 'linear-gradient(to right, white, transparent)' }}
          />
        </motion.div>

        {/* Right beam */}
        <motion.div
          initial={{ opacity: 0.5, width: '10rem' }}
          animate={{ opacity: 1, width: '24rem' }}
          transition={TRANSITION}
          className="absolute inset-auto left-1/2 h-48 overflow-visible"
          style={{
            backgroundImage:
              'conic-gradient(from 290deg at center top, transparent, transparent, #34d399)',
          }}
        >
          <div
            className="absolute right-0 bottom-0 z-20 w-32 h-full bg-[var(--page-bg)]"
            style={{ maskImage: 'linear-gradient(to left, white, transparent)' }}
          />
          <div
            className="absolute right-0 bottom-0 z-20 w-full h-36 bg-[var(--page-bg)]"
            style={{ maskImage: 'linear-gradient(to top, white, transparent)' }}
          />
        </motion.div>

        {/* Blur fade at the bottom edge */}
        <div className="absolute top-1/2 h-40 w-full translate-y-12 scale-x-150 bg-[var(--page-bg)] blur-2xl" />

        {/* Ambient glow — the "bulb" */}
        <div className="absolute inset-auto z-50 h-28 w-[22rem] -translate-y-1/2 rounded-full bg-[#34d399] opacity-20 blur-3xl" />

        {/* Sharp beam tip */}
        <motion.div
          initial={{ width: '6rem' }}
          animate={{ width: '12rem' }}
          transition={TRANSITION}
          className="absolute inset-auto z-30 h-28 -translate-y-[5rem] rounded-full bg-[#34d399] blur-2xl opacity-60"
        />

        {/* Horizontal beam line */}
        <motion.div
          initial={{ width: '10rem' }}
          animate={{ width: '24rem' }}
          transition={TRANSITION}
          className="absolute inset-auto z-50 h-px -translate-y-[6rem] bg-[#34d399]"
        />

        {/* Cover the bottom portion with page bg so only the top beam shows */}
        <div className="absolute inset-auto z-40 h-36 w-full -translate-y-[10rem] bg-[var(--page-bg)]" />
      </div>
    </div>
  );
}
