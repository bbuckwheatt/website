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

      <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        {albums.map(({ slug, label, thumbnail }) => (
          <Link key={slug} href={`/gallery/${slug}`} className="no-underline group">
            <div className="relative h-[220px] rounded-[14px] overflow-hidden shadow-[var(--shadow-soft)] bg-[var(--surface-strong)]">
              {thumbnail && (
                <Image
                  src={thumbnail}
                  alt={label}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                />
              )}
            </div>
            <p className="text-center mt-3 font-semibold text-[var(--text-primary)]">{label}</p>
          </Link>
        ))}
      </div>

    </div>
  );
}
