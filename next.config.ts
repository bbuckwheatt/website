import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
  },

  // Turbopack root configuration.
  // Explicitly sets the project root so Turbopack doesn't get confused when
  // there are multiple package-lock.json files in parent directories.
  turbopack: {
    root: __dirname,
  },

  // Cache Components (stable Partial Pre-rendering in Next.js 16).
  // This enables the 'use cache' directive and the PPR rendering model,
  // where a static HTML shell is served instantly from the CDN edge while
  // dynamic, personalized, or slow parts stream in after.
  //
  // For this portfolio: the Home page uses this to serve the hero copy
  // immediately while the Three.js 3D scene loads client-side.
  cacheComponents: true,
};

export default nextConfig;
