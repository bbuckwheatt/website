// Downloads every blob from the private store and re-uploads to the public store.
// Run: node scripts/make-blobs-public.mjs

import { list, put } from '@vercel/blob';
import { readFileSync } from 'fs';

const env = readFileSync('.env.local', 'utf-8');
const vars = {};
env.split('\n').forEach(line => {
  const eq = line.indexOf('=');
  if (eq < 1) return;
  const k = line.slice(0, eq).trim();
  const v = line.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
  if (k) vars[k] = v;
});

const PRIVATE_TOKEN = vars['BLOB_READ_WRITE_TOKEN'];
const PUBLIC_TOKEN  = vars['images_READ_WRITE_TOKEN'];

if (!PRIVATE_TOKEN || !PUBLIC_TOKEN) {
  console.error('Missing tokens in .env.local');
  process.exit(1);
}

async function migrate() {
  let cursor;
  let total = 0;
  let failed = 0;

  do {
    const result = await list({ prefix: 'gallery/', cursor, limit: 100, token: PRIVATE_TOKEN });
    cursor = result.cursor;

    for (const blob of result.blobs) {
      if (blob.pathname.endsWith('/')) continue;

      try {
        // Fetch raw bytes from private store using the token as a header
        const res = await fetch(blob.url, {
          headers: { Authorization: `Bearer ${PRIVATE_TOKEN}` },
        });
        if (!res.ok) throw new Error(`fetch failed: ${res.status}`);
        const buffer = await res.arrayBuffer();
        const contentType = res.headers.get('content-type') ?? 'image/jpeg';

        await put(blob.pathname, buffer, {
          access: 'public',
          addRandomSuffix: false,
          contentType,
          token: PUBLIC_TOKEN,
        });

        console.log('✓', blob.pathname);
        total++;
      } catch (err) {
        console.error('✗', blob.pathname, err.message);
        failed++;
      }
    }
  } while (cursor);

  console.log(`\nDone. Copied ${total}, failed ${failed}.`);
}

migrate();
