/*
 * projects/page.tsx — Projects portfolio page
 *
 * SERVER COMPONENT for the page shell and static project list.
 *
 * WHY THE PAGE IS A SERVER COMPONENT BUT USES CLIENT CHILDREN:
 *   The project list data is hardcoded — it never changes at runtime.
 *   The page shell and all the static card content can be Server Component HTML.
 *
 *   The one interactive piece is the Stop Motion Studio modal (opens on button click).
 *   Rather than making the entire page a Client Component just for one button,
 *   we import <StopMotionLauncher> — a small Client Component that owns only the
 *   open/close state and the dynamic import of the heavy modal. This keeps the
 *   majority of this page as static HTML.
 *
 * PROJECT IMAGES:
 *   In the Webpack SPA, images were imported via file-loader and rendered with <img>.
 *   Here, we use Next.js <Image> which: auto-converts to WebP/AVIF, lazy-loads by
 *   default, and prevents layout shift by knowing dimensions at build time.
 *   Images are stored in the public/ directory and referenced by path.
 *
 * NOTE: Project images (animator.png, ttt.png, web.png, collage.png) need to be
 * moved to public/images/projects/ — handled in the asset migration step.
 */

import type { Metadata } from 'next';
import Image from 'next/image';
/*
 * WHY we can import StopMotionLauncher directly (no dynamic({ ssr: false })):
 *   StopMotionLauncher is a 'use client' component. Next.js serializes its
 *   shell (the button markup) as a server-side placeholder — only the ref and
 *   click handler hydrate on the client. The canvas-unsafe code lives inside
 *   StopMotionStudioModal, which StopMotionLauncher loads with ssr: false via
 *   its own dynamic() call. That inner dynamic() is what gates the canvas from
 *   the server; we don't need another ssr: false at this level.
 *
 *   Contrast with ThreeScene: that component immediately runs WebGL code at
 *   module-evaluation time, so even its shell cannot be server-rendered.
 *   StopMotionLauncher renders only a <button> at the top level, which is
 *   perfectly safe to SSR.
 */
import StopMotionLauncher from '@/components/StopMotionStudio/StopMotionLauncher';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Enterprise implementations, product integrations, and creative experiments by Cameron Powell.',
};

// ─── Data ─────────────────────────────────────────────────────────────────────

type Project = {
  id: number;
  title: string;
  description: string;
  imagePath?: string;    // Path relative to public/ (e.g. '/images/projects/animator.png')
  imageAlt: string;
  liveUrl?: string;
  repoUrl?: string;
  tags: readonly string[];
  openStudio?: boolean;  // If true, renders the Stop Motion Studio launcher button
  isPrivate?: boolean;   // If true, shows a "Private" pill instead of links
};

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'CustomGPT Support Automation Workflow',
    description:
      'Built RAG-driven automation to streamline support triage and responses across multiple helpdesk platforms, reducing manual workload by 120+ hours per week.',
    imagePath: '/images/projects/web.png',
    imageAlt: 'Automation dashboard visualization',
    tags: ['RAG', 'APIs', 'Automation', 'Python'],
    isPrivate: true,
  },
  {
    id: 2,
    title: 'Stop Motion Animator',
    description:
      "Integrated a full stop-motion animation studio into Northeastern's Covey.Town platform with custom canvas tooling and figure-rotation algorithms.",
    imagePath: '/images/projects/animator.png',
    imageAlt: 'Stop motion studio interface',
    liveUrl: 'https://stop-motion-studio-hyvi.onrender.com',
    repoUrl: 'https://github.com/neu-cs4530/covey-town-project-team-603',
    tags: ['React', 'TypeScript', 'Konva'],
    openStudio: true,
  },
  {
    id: 3,
    title: 'This Website',
    description:
      'A handcrafted portfolio built with Next.js App Router, featuring an ASCII art hero, a custom Tailwind v4 design system, and zero-JS server components.',
    imagePath: '/images/projects/web.png',
    imageAlt: 'Portfolio website preview',
    repoUrl: 'https://github.com/bbuckwheatt/website',
    tags: ['Next.js', 'TypeScript', 'Three.js', 'Tailwind'],
  },
  {
    id: 4,
    title: 'Mars Rover Team — Robotics Software',
    description:
      "Contributed inverse-kinematics functionality for a 6-DOF robotic arm in Northeastern's Mars Rover team.",
    imagePath: '/images/projects/ttt.png',
    imageAlt: 'Mars rover interface mockup',
    tags: ['Python', 'Robotics', 'Kinematics'],
  },
  {
    id: 5,
    title: 'Photo Editor & Collage Builder',
    description:
      'Designed a modular Java app for collage and photo filters using polymorphism and composition.',
    imagePath: '/images/projects/collage.png',
    imageAlt: 'Photo collage application',
    repoUrl: 'https://github.com/bbuckwheatt/collage',
    tags: ['Java', 'OOP', 'Design Patterns'],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  return (
    <section className="px-10 pt-16 pb-24 max-w-[1200px] mx-auto max-sm:px-6 max-sm:pt-12 max-sm:pb-16">

      <header className="mb-12">
        <h1 className="text-[2.8rem] mb-3 tracking-[-0.02em] max-sm:text-[2.1rem]">Selected Projects</h1>
        <p className="text-[var(--text-muted)] max-w-[540px] leading-relaxed">
          Enterprise implementations, product integrations, and creative experiments.
        </p>
      </header>

      <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

    </section>
  );
}

// ─── ProjectCard ──────────────────────────────────────────────────────────────

/*
 * ProjectCard is a Server Component sub-component — defined in this file,
 * renders as part of the same static HTML output. No 'use client' needed.
 * The StopMotionLauncher inside it is the only client-side island on this page.
 */
function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="
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
      {/* Image with overlay on hover */}
      {project.imagePath && (
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
        <h3 className="m-0 text-[1rem] font-semibold text-[var(--text-primary)] leading-snug">{project.title}</h3>
        <p className="m-0 text-[0.875rem] text-[var(--text-muted)] leading-relaxed">{project.description}</p>

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

        {/* Links — pushed to bottom */}
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
    </article>
  );
}
