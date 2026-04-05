import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getThumbnail } from '@/lib/blob';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Travel photography from Iceland, Ireland, London, Italy, and more.',
};

const ALBUM_SLUGS = [
  { slug: 'iceland',       label: 'Iceland' },
  { slug: 'ireland',       label: 'Ireland' },
  { slug: 'london',        label: 'London' },
  { slug: 'italy',         label: 'Italy' },
  { slug: 'spain',         label: 'Spain' },
  { slug: 'massachusetts', label: 'Massachusetts' },
  { slug: 'food',          label: 'Food' },
  { slug: 'meatball',      label: 'Meatball the Cat' },
  { slug: 'tony',          label: 'Tony' },
] as const;

export default async function GalleryPage() {
  const albums = await Promise.all(
    ALBUM_SLUGS.map(async ({ slug, label }) => ({
      slug,
      label,
      thumbnail: await getThumbnail(slug),
    }))
  );

  return (
    <div className="px-10 pt-12 pb-24 max-w-[1100px] mx-auto max-sm:px-6 max-sm:pt-8 max-sm:pb-16">

      <header className="mb-10">
        <h1 className="text-[2.4rem] mb-3">Gallery</h1>
        <p className="text-[var(--text-muted)]">Photos from travels and everyday life.</p>
      </header>

      <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {albums.map(({ slug, label, thumbnail }) => (
          <Link key={slug} href={`/gallery/${slug}`} className="no-underline group block">
            <div className="relative h-[340px] overflow-hidden bg-[var(--surface-strong)]">
              {thumbnail ? (
                <Image
                  src={thumbnail}
                  alt={label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 bg-[var(--surface-strong)]" />
              )}
              {/* Progressive blur overlay — bottom half blurs on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  maskImage: 'linear-gradient(to top, black 0%, black 35%, transparent 65%)',
                  WebkitMaskImage: 'linear-gradient(to top, black 0%, black 35%, transparent 65%)',
                }}
              />
              {/* Label overlay — always present, slides up on hover */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-5 pointer-events-none">
                <p
                  className="text-white font-semibold text-[1.1rem] tracking-wide translate-y-1 opacity-60 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  style={{ textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}
                >
                  {label}
                </p>
                <div className="h-px bg-white/0 mt-2 scale-x-0 origin-left transition-all duration-300 group-hover:scale-x-100 group-hover:bg-white/60" />
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
