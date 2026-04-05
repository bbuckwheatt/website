import type { Metadata } from 'next';
import { getThumbnail } from '@/lib/blob';
import { GalleryCard } from '@/components/GalleryCard';

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
          <GalleryCard key={slug} slug={slug} label={label} thumbnail={thumbnail} />
        ))}
      </div>

    </div>
  );
}
