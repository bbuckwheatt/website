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
      'A handcrafted portfolio built with Next.js, featuring a 3D interactive hero, PPR rendering, and a custom Tailwind design system.',
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
    <section className="px-10 pt-[4.5rem] pb-24 max-w-[1200px] mx-auto max-sm:px-6 max-sm:pt-14 max-sm:pb-20">

      {/* Page header */}
      <header className="mb-10">
        <h1 className="text-[2.6rem] mb-3 max-sm:text-[2.1rem]">Selected Projects</h1>
        <p className="text-[var(--text-muted)] max-w-[640px]">
          A mix of enterprise implementations, product integrations, and creative experiments.
        </p>
      </header>

      {/* Project cards grid */}
      <div className="grid gap-7" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

    </section>
  );
}

// ─── ProjectCard ──────────────────────────────────────────────────────────────

/*
 * ProjectCard is a Server Component sub-component — it's defined in this file
 * so we don't need a separate file, but it renders as part of the same static
 * HTML output. No 'use client' needed here either.
 *
 * The "Open studio" button for the Stop Motion Studio will be added in Phase 5
 * once the StopMotionLauncher Client Component is built.
 */
function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="
      bg-[var(--surface)] rounded-[18px] overflow-hidden
      border border-[var(--border)] shadow-[var(--shadow-soft)]
      flex flex-col
    ">
      {/* Project image */}
      {project.imagePath && (
        <div className="relative w-full h-[180px]">
          <Image
            src={project.imagePath}
            alt={project.imageAlt}
            fill
            // object-cover crops the image to fill the container without distortion
            className="object-cover"
            // sizes tells next/image the expected rendered width at each breakpoint,
            // so it generates appropriately sized image variants (improves LCP).
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Card body */}
      <div className="p-7 flex flex-col gap-4 flex-1">
        <h3 className="m-0 text-[var(--text-primary)]">{project.title}</h3>
        <p className="m-0 text-[var(--text-muted)] leading-relaxed">{project.description}</p>

        {/* Tech stack tags */}
        <div className="flex gap-2 flex-wrap">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="
                bg-[var(--chip-bg)] text-[var(--text-primary)]
                px-3 py-1 rounded-full
                text-xs font-semibold
                border border-[var(--border)]
              "
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links row — pushed to bottom of card via mt-auto on the parent */}
        <div className="flex gap-4 items-center flex-wrap mt-auto">
          {/* "Open studio" button — Stop Motion launcher wired in Phase 5 */}
          {project.openStudio && (
            <span className="text-[var(--accent)] font-semibold text-[0.95rem] opacity-60 cursor-not-allowed" title="Coming soon">
              Open studio
            </span>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] font-semibold text-[0.95rem] no-underline hover:text-[var(--accent-soft)] transition-colors duration-200"
            >
              View live
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] font-semibold text-[0.95rem] no-underline hover:text-[var(--accent-soft)] transition-colors duration-200"
            >
              View code
            </a>
          )}
          {project.isPrivate && (
            <span className="
              px-2 py-1 rounded-full
              bg-[rgba(148,163,184,0.2)] text-[var(--text-muted)]
              text-[0.75rem] font-semibold uppercase tracking-[0.04em]
            ">
              Private
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
