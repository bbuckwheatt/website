import { list } from '@vercel/blob';
import { unstable_cache } from 'next/cache';

function slugToAlt(url: string): string {
  const filename = url.split('/').pop() ?? '';
  const base = filename.replace(/\.[^.]+$/, '');
  return base
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

export const getAlbumPhotos = unstable_cache(
  async (album: string): Promise<{ url: string; alt: string }[]> => {
    const { blobs } = await list({ prefix: `gallery/${album}/`, token: process.env.images_READ_WRITE_TOKEN });
    return blobs
      .filter(b => !b.pathname.endsWith('/'))
      .sort((a, b) => a.pathname.localeCompare(b.pathname))
      .map(b => ({ url: b.url, alt: slugToAlt(b.url) }));
  },
  ['album-photos'],
  { revalidate: 3600 }
);

export const getThumbnail = unstable_cache(
  async (album: string): Promise<string | null> => {
    const { blobs } = await list({ prefix: `gallery/thumbnails/${album}`, token: process.env.images_READ_WRITE_TOKEN });
    return blobs[0]?.url ?? null;
  },
  ['album-thumbnail'],
  { revalidate: 3600 }
);
