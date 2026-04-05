'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';

type Props = {
  slug: string;
  label: string;
  thumbnail: string | null;
};

export function GalleryCard({ slug, label, thumbnail }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/gallery/${slug}`} className="no-underline block">
      <div
        className="relative h-[340px] overflow-hidden bg-[var(--surface-strong)] cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
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

        {/* Blur — animates on hover (desktop), always visible on mobile */}
        <ProgressiveBlur
          className="pointer-events-none absolute bottom-0 left-0 h-[60%] w-full sm:opacity-0"
          blurIntensity={0.4}
          animate={hovered ? 'visible' : 'hidden'}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{ ['--tw-opacity' as string]: undefined }}
        />

        {/* Label — always visible at 70% on mobile, animates on hover on desktop */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          {/* Mobile: always shown */}
          <div className="flex flex-col px-5 py-4 gap-1 sm:hidden">
            <p
              className="text-white font-semibold text-[1.05rem] tracking-wide"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}
            >
              {label}
            </p>
            <div className="h-px bg-white/50 w-full" />
          </div>
          {/* Desktop: hover-animated */}
          <motion.div
            className="hidden sm:block"
            animate={hovered ? 'visible' : 'hidden'}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="flex flex-col px-5 py-4 gap-1">
              <p
                className="text-white font-semibold text-[1.05rem] tracking-wide"
                style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}
              >
                {label}
              </p>
              <div className="h-px bg-white/50 w-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </Link>
  );
}
