'use client';

/*
 * ProjectCard.tsx — Client component wrapping each project card with SpotlightCard.
 *
 * WHY 'use client':
 *   SpotlightCard uses onPointerMove, which requires a client component.
 *   Extracting this here keeps projects/page.tsx a pure Server Component —
 *   the page shell, grid layout, and PROJECTS data stay server-rendered.
 */

import Image from 'next/image';
import { SpotlightCard } from '@/components/SpotlightCard';
import StopMotionLauncher from '@/components/StopMotionStudio/StopMotionLauncher';

export type Project = {
  id: number;
  title: string;
  description: string;
  imagePath?: string;
  imageAlt?: string;
  liveUrl?: string;
  repoUrl?: string;
  tags: readonly string[];
  openStudio?: boolean;
  isPrivate?: boolean;
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <SpotlightCard className="
      group
      bg-[var(--surface)] rounded-[20px] overflow-hidden
      border border-[var(--border)]
      shadow-[0_2px_12px_rgba(15,23,42,0.06)]
      flex flex-col
      transition-all duration-300
      hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,23,42,0.12)]
      dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)]
      motion-reduce:hover:translate-y-0
    ">
      {/* Image */}
      {project.imagePath && project.imageAlt && (
        <div className="relative w-full h-[200px] overflow-hidden bg-[var(--section-bg)]">
          <Image
            src={project.imagePath}
            alt={project.imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Body */}
      <div className="p-6 flex flex-col gap-4 flex-1">
        <h3 className="m-0 text-[1rem] font-semibold text-[var(--text-primary)] leading-snug">
          {project.title}
        </h3>
        <p className="m-0 text-[0.875rem] text-[var(--text-muted)] leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex gap-1.5 flex-wrap">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="
                px-2.5 py-0.5 rounded-full
                text-[0.7rem] font-semibold
                text-[var(--text-muted)]
                bg-[var(--chip-bg)]
                border border-[var(--border)]
              "
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 items-center flex-wrap mt-auto pt-2 border-t border-[var(--border)]">
          {project.openStudio && <StopMotionLauncher />}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] font-semibold text-[0.8rem] no-underline hover:opacity-70 transition-opacity duration-150 cursor-pointer"
            >
              View live ↗
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] font-semibold text-[0.8rem] no-underline hover:opacity-70 transition-opacity duration-150 cursor-pointer"
            >
              View code ↗
            </a>
          )}
          {project.isPrivate && (
            <span className="
              px-2 py-0.5 rounded-full
              bg-[rgba(148,163,184,0.15)] text-[var(--text-muted)]
              text-[0.7rem] font-semibold uppercase tracking-wider
            ">
              Private
            </span>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
}
