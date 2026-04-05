'use client';

/*
 * ScrambleName.tsx — Auto-scrambling h1 for the home page hero
 *
 * Adapted from motion-primitives/text-scramble (21st.dev).
 * Scrambles on mount (after 800ms), then every 3-5 seconds.
 * Uses framer-motion (already in the bundle) for the h1 wrapper.
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TEXT = 'Cameron\nPowell';
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const STEPS = 20;       // 0.8s / 0.04s = 20 steps
const STEP_MS = 40;     // 40ms per step
const MIN_DELAY = 3000;
const MAX_DELAY = 2000; // jitter

export function ScrambleName({ className }: { className?: string }) {
  const [displayText, setDisplayText] = useState(TEXT);

  useEffect(() => {
    let cancelled = false;
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    function runScramble(onDone: () => void) {
      let step = 0;
      intervalId = setInterval(() => {
        if (cancelled) { clearInterval(intervalId!); return; }
        step++;
        const progress = step / STEPS;
        const revealed = Math.floor(progress * TEXT.length);
        let next = '';
        for (let i = 0; i < TEXT.length; i++) {
          if (TEXT[i] === '\n') { next += '\n'; continue; }
          next += i < revealed
            ? TEXT[i]
            : CHARS[Math.floor(Math.random() * CHARS.length)];
        }
        setDisplayText(next);
        if (step >= STEPS) {
          clearInterval(intervalId!);
          setDisplayText(TEXT);
          onDone();
        }
      }, STEP_MS);
    }

    function loop() {
      if (cancelled) return;
      runScramble(() => {
        if (cancelled) return;
        const delay = MIN_DELAY + Math.random() * MAX_DELAY;
        timeoutId = setTimeout(loop, delay);
      });
    }

    timeoutId = setTimeout(loop, 800);

    return () => {
      cancelled = true;
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const [line1, line2] = displayText.split('\n');

  return (
    <motion.h1 className={className}>
      {line1}<br />{line2}
    </motion.h1>
  );
}
