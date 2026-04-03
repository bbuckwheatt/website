/*
 * gallery/italy/page.tsx — italy photo album
 *
 * SERVER COMPONENT — pre-rendered at build time.
 *
 * Photos for this album have not been added yet.
 * To add photos:
 *   1. Place .jpeg/.jpg files in public/images/gallery/italy/
 *   2. Add entries to the PHOTOS array below following the same pattern
 *      as app/gallery/iceland/page.tsx or app/gallery/meatball/page.tsx
 */

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'italy',
  description: 'Photos from italy.',
};

export default function italyPage() {
  return (
    <div className="px-10 pt-12 pb-24 max-w-[1100px] mx-auto max-sm:px-6 max-sm:pt-8 max-sm:pb-16">

      <Link
        href="/gallery"
        className="inline-block mb-8 text-[var(--text-muted)] no-underline hover:text-[var(--text-primary)] transition-colors duration-200"
      >
        ← Gallery
      </Link>

      <h1 className="text-[2.2rem] mb-4">italy</h1>
      <p className="text-[var(--text-muted)]">Photos coming soon.</p>

    </div>
  );
}
