/*
 * hobbies/page.tsx — Hobbies & Interests page
 *
 * SERVER COMPONENT — no 'use client' directive.
 * Pure static content: a heading, intro paragraph, and a grid of hobby cards.
 * Pre-rendered at build time, served as static HTML.
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hobbies',
  description:
    'Outside of work — technology, games, hiking, cooking, photography, and more.',
};

const HOBBIES = [
  'Technology and emerging tools',
  'Strategy and role-playing games',
  'Science fiction and fantasy',
  'Finance and markets',
  'Fitness and hiking',
  'Cooking and coffee',
  'Pickleball',
  'Photography and travel',
] as const;

export default function HobbiesPage() {
  return (
    <section className="px-10 pt-[4.5rem] pb-24 max-w-[1000px] mx-auto max-sm:px-6 max-sm:pt-14 max-sm:pb-20">

      <h1 className="text-[2.4rem] mb-4">Hobbies &amp; Interests</h1>
      <p className="text-[var(--text-muted)] max-w-[680px] mb-10">
        Outside of work, I&apos;m usually experimenting with new tools, exploring the outdoors, or
        capturing moments on camera.
      </p>

      {/*
       * auto-fit grid: expands from 1 column on mobile to as many 200px columns
       * as the container allows — no breakpoints needed.
       */}
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        {HOBBIES.map((hobby) => (
          <div
            key={hobby}
            className="
              bg-[var(--surface)] p-6
              rounded-[16px] border border-[var(--border)]
              shadow-[var(--shadow-soft)]
              font-medium text-[var(--text-primary)]
            "
          >
            {hobby}
          </div>
        ))}
      </div>

    </section>
  );
}
