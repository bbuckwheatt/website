/*
 * gallery/meatball/page.tsx — Meatball the Cat photo album
 *
 * SERVER COMPONENT — pre-rendered at build time.
 * 25 photos of Meatball (meat10 was commented out in the original, preserved here).
 *
 * Same next/image pattern as other gallery pages: width/height for the base
 * proportional hint, height: auto to preserve actual aspect ratios.
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Meatball',
  description: 'Photos of Meatball the cat.',
};

// Array of all 25 photos with their captions.
// meat10 was commented out in the original — omitted here too.
const PHOTOS: { src: string; caption: string }[] = [
  { src: '/images/gallery/meatball/meat1.jpeg',  caption: 'Arrival' },
  { src: '/images/gallery/meatball/meat2.jpeg',  caption: 'Out of the Carrier' },
  { src: '/images/gallery/meatball/meat3.jpeg',  caption: 'Back into Hiding' },
  { src: '/images/gallery/meatball/meat4.jpeg',  caption: 'Caught in the Act! (Playing)' },
  { src: '/images/gallery/meatball/meat5.jpeg',  caption: '' },
  { src: '/images/gallery/meatball/meat6.jpeg',  caption: '' },
  { src: '/images/gallery/meatball/meat7.jpeg',  caption: '' },
  { src: '/images/gallery/meatball/meat8.jpeg',  caption: '' },
  { src: '/images/gallery/meatball/meat9.jpeg',  caption: '' },
  { src: '/images/gallery/meatball/meat11.jpeg', caption: '' },
  { src: '/images/gallery/meatball/meat12.jpeg', caption: '' },
  { src: '/images/gallery/meatball/meat13.jpeg', caption: '' },
  { src: '/images/gallery/meatball/meat14.jpeg', caption: '' },
  { src: '/images/gallery/meatball/meat15.jpeg', caption: '' },
  { src: '/images/gallery/meatball/meat16.jpeg', caption: '' },
  { src: '/images/gallery/meatball/meat17.jpeg', caption: '' },
  { src: '/images/gallery/meatball/meat18.jpeg', caption: '' },
  { src: '/images/gallery/meatball/meat19.jpeg', caption: '' },
  { src: '/images/gallery/meatball/meat20.jpeg', caption: '' },
  { src: '/images/gallery/meatball/meat21.jpeg', caption: '' },
  { src: '/images/gallery/meatball/meat22.jpeg', caption: '' },
  { src: '/images/gallery/meatball/meat23.jpeg', caption: '' },
  { src: '/images/gallery/meatball/meat24.jpeg', caption: '' },
  { src: '/images/gallery/meatball/meat25.jpeg', caption: '' },
  { src: '/images/gallery/meatball/meat26.jpeg', caption: '' },
];

export default function MeatballPage() {
  return (
    <div className="px-10 pt-12 pb-24 max-w-[1100px] mx-auto max-sm:px-6 max-sm:pt-8 max-sm:pb-16">

      <Link
        href="/gallery"
        className="inline-block mb-8 text-[var(--text-muted)] no-underline hover:text-[var(--text-primary)] transition-colors duration-200"
      >
        ← Gallery
      </Link>

      <h1 className="text-[2.2rem] mb-10">Meatball the Cat</h1>

      <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
        {PHOTOS.map(({ src, caption }, index) => (
          <div key={src} className="flex flex-col gap-2">
            <Image
              src={src}
              alt={`Meatball${caption ? ` — ${caption}` : ''}`}
              width={800}
              height={600}
              style={{ height: 'auto', width: '100%' }}
              className="rounded-[14px] shadow-[var(--shadow-soft)] object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
              // Priority-load the first image (LCP candidate)
              priority={index === 0}
            />
            {caption && (
              <p className="text-center text-[0.95rem] text-[var(--text-muted)] mt-2">{caption}</p>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
