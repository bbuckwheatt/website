/*
 * gallery/iceland/page.tsx — Iceland photo album
 *
 * SERVER COMPONENT — pre-rendered at build time as static HTML.
 * All 4 photos are served from public/images/gallery/iceland/ via next/image,
 * which lazy-loads them and converts to WebP/AVIF on Vercel for better performance.
 *
 * WHY next/image WITH width/height (NOT fill):
 *   For full-size photo pages, we want images to display at their natural aspect
 *   ratio (portrait vs landscape varies per photo). Using width={800} height={600}
 *   with `style={{ height: 'auto' }}` tells the browser the proportional dimensions
 *   at load time (preventing layout shift), while allowing the image to scale
 *   responsively. The `sizes` prop tells next/image which image size variant to
 *   request at each viewport width.
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Iceland',
  description: 'Photos from Iceland — northern lights, landscapes, and more.',
};

const PHOTOS = [
  { src: '/images/gallery/iceland/nl.jpeg',       alt: 'Northern Lights', caption: 'Northern Lights' },
  { src: '/images/gallery/iceland/img_5167.jpeg',  alt: 'Iceland landscape', caption: '' },
  { src: '/images/gallery/iceland/img_5169.jpeg',  alt: 'Iceland landscape', caption: '' },
  { src: '/images/gallery/iceland/img_5172.jpeg',  alt: 'Iceland landscape', caption: '' },
] as const;

export default function IcelandPage() {
  return (
    <div className="px-10 pt-12 pb-24 max-w-[1100px] mx-auto max-sm:px-6 max-sm:pt-8 max-sm:pb-16">

      {/* Back navigation */}
      <Link
        href="/gallery"
        className="inline-block mb-8 text-[var(--text-muted)] no-underline hover:text-[var(--text-primary)] transition-colors duration-200"
      >
        ← Gallery
      </Link>

      <h1 className="text-[2.2rem] mb-10">Iceland</h1>

      {/*
       * Photo grid — auto-fill lets photos wrap naturally. Each photo item
       * is a flex column with the image on top and caption below.
       */}
      <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
        {PHOTOS.map(({ src, alt, caption }) => (
          <div key={src} className="flex flex-col gap-2">
            {/*
             * priority on the first image — it's the LCP (Largest Contentful Paint)
             * element, so we tell next/image to preload it rather than lazy-load.
             */}
            <Image
              src={src}
              alt={alt}
              width={800}
              height={600}
              // height: auto allows the image to maintain its natural aspect ratio
              // instead of being constrained to the 600px height hint
              style={{ height: 'auto', width: '100%' }}
              className="rounded-[14px] shadow-[var(--shadow-soft)] object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
              priority={src.includes('nl.jpeg')}
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
