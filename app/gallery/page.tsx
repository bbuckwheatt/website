/*
 * gallery/page.tsx — Gallery index
 *
 * SERVER COMPONENT — no 'use client' directive.
 * Renders a grid of album thumbnails, each linking to its sub-page.
 *
 * WHY PUBLIC/ PATHS INSTEAD OF STATIC IMPORTS:
 *   Gallery thumbnails live in public/images/gallery/thumbnails/. We reference
 *   them by URL path ('/images/gallery/thumbnails/iceland.jpeg') rather than
 *   importing them as ES modules. Both approaches work with next/image, but:
 *   - URL path: simpler for large sets of images; no build-time module graph overhead
 *   - Static import: Next.js knows dimensions at build time (no need for width/height)
 *
 *   Since we use `fill` layout for the thumbnail grid (responsive fixed-height tiles),
 *   we don't need the dimensions — `fill` makes the image take its parent's dimensions.
 *   That's why URL paths work fine here.
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Travel photography from Iceland, Ireland, London, Italy, and more.',
};

const ALBUMS = [
  { name: 'Iceland',          path: '/gallery/iceland', thumbnail: '/images/gallery/thumbnails/iceland.jpeg' },
  { name: 'Ireland',          path: '/gallery/ireland', thumbnail: '/images/gallery/thumbnails/ireland.jpg'  },
  { name: 'London',           path: '/gallery/london',  thumbnail: '/images/gallery/thumbnails/london.jpeg'  },
  { name: 'Italy',            path: '/gallery/italy',   thumbnail: '/images/gallery/thumbnails/italy.jpeg'   },
  { name: 'Food',             path: '/gallery/food',    thumbnail: '/images/gallery/thumbnails/food.jpeg'    },
  { name: 'Meatball the Cat', path: '/gallery/meatball',thumbnail: '/images/gallery/thumbnails/meatball.jpeg'},
] as const;

export default function GalleryPage() {
  return (
    <div className="px-10 pt-12 pb-24 max-w-[1100px] mx-auto max-sm:px-6 max-sm:pt-8 max-sm:pb-16">

      <header className="mb-10">
        <h1 className="text-[2.4rem] mb-3">Gallery</h1>
        <p className="text-[var(--text-muted)]">Photos from travels and everyday life.</p>
      </header>

      {/* Album grid */}
      <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        {ALBUMS.map(({ name, path, thumbnail }) => (
          <Link
            key={path}
            href={path}
            className="no-underline group"
          >
            {/*
             * The wrapping div must be `position: relative` so that next/image with
             * fill can position itself correctly. `overflow-hidden` prevents the image
             * from bleeding outside the rounded corners on hover scale.
             */}
            <div className="relative h-[220px] rounded-[14px] overflow-hidden shadow-[var(--shadow-soft)]">
              <Image
                src={thumbnail}
                alt={name}
                fill
                // object-cover crops the image to fill the tile without distortion
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
              />
            </div>
            <p className="text-center mt-3 font-semibold text-[var(--text-primary)]">{name}</p>
          </Link>
        ))}
      </div>

    </div>
  );
}
