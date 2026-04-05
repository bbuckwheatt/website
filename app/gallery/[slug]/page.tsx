import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAlbumPhotos } from '@/lib/blob';
import { notFound } from 'next/navigation';

const ALBUM_META: Record<string, { label: string; description: string }> = {
  iceland:       { label: 'Iceland',          description: 'Photos from Iceland — northern lights, landscapes, and more.' },
  ireland:       { label: 'Ireland',          description: 'Photos from Ireland.' },
  london:        { label: 'London',           description: 'Photos from London.' },
  italy:         { label: 'Italy',            description: 'Photos from Italy.' },
  spain:         { label: 'Spain',            description: 'Photos from Spain.' },
  massachusetts: { label: 'Massachusetts',    description: 'Photos from Massachusetts.' },
  food:          { label: 'Food',             description: 'Food photography.' },
  meatball:      { label: 'Meatball the Cat', description: 'Photos of Meatball.' },
  tony:          { label: 'Tony',             description: 'Photos of Tony.' },
};

export async function generateStaticParams() {
  return Object.keys(ALBUM_META).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const meta = ALBUM_META[slug];
  if (!meta) return {};
  return { title: meta.label, description: meta.description };
}

export default async function AlbumPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = ALBUM_META[slug];
  if (!meta) notFound();

  const photos = await getAlbumPhotos(slug);

  return (
    <div className="px-10 pt-12 pb-24 max-w-[1100px] mx-auto max-sm:px-6 max-sm:pt-8 max-sm:pb-16">

      <Link
        href="/gallery"
        className="inline-block mb-8 text-[var(--text-muted)] no-underline hover:text-[var(--text-primary)] transition-colors duration-200"
      >
        ← Gallery
      </Link>

      <h1 className="text-[2.2rem] mb-10">{meta.label}</h1>

      {photos.length === 0 ? (
        <p className="text-[var(--text-muted)]">No photos yet.</p>
      ) : (
        <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {photos.map(({ url, alt }, i) => (
            <Image
              key={url}
              src={url}
              alt={alt}
              width={800}
              height={600}
              style={{ height: 'auto', width: '100%' }}
              className="rounded-[14px] shadow-[var(--shadow-soft)] object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
              priority={i === 0}
            />
          ))}
        </div>
      )}

    </div>
  );
}
