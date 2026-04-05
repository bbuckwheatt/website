/*
 * projects/page.tsx — Projects portfolio page (Server Component shell)
 *
 * PROJECTS data lives here and is rendered at build time.
 * ProjectCard is a 'use client' component (needs onPointerMove for spotlight
 * effect) — importing it here is fine because Next.js only hydrates the card
 * shells on the client; the page grid and header stay static HTML.
 */

import type { Metadata } from 'next';
import { ProjectCard, type Project } from '@/components/ProjectCard';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Enterprise implementations, product integrations, and creative experiments by Cameron Powell.',
};

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Open Source CustomGPT Chat Portal',
    description:
      'Production-ready chat frontend that wraps CustomGPT agents as standalone interfaces — built with Next.js, Vercel AI SDK, Neon Postgres, and Auth.js. Features token-by-token streaming, persistent chat history, tiered rate limiting, rich artifacts (text, code, spreadsheets), and voice I/O.',
    imagePath: '/images/projects/chat-frontend.png',
    imageAlt: 'CustomGPT chat portal interface',
    repoUrl: 'https://github.com/bbuckwheatt/customgpt-custom-frontend',
    tags: ['Next.js', 'Vercel AI SDK', 'Neon', 'Auth.js', 'TypeScript'],
    isPrivate: true,
  },
  {
    id: 2,
    title: 'RAG Chat Assistant',
    description:
      'Full-stack RAG chatbot built with Next.js, Vercel AI SDK v6, GPT-4o-mini, and pgvector on Neon. Includes an admin dashboard for knowledge-base management, PDF ingestion, cosine-similarity retrieval, and a 10-case evaluation suite.',
    imagePath: '/images/projects/ragchat.png',
    imageAlt: 'RAG chat assistant interface',
    repoUrl: 'https://github.com/bbuckwheatt/rag-cs',
    tags: ['Next.js', 'RAG', 'pgvector', 'Vercel AI SDK', 'TypeScript'],
  },
  {
    id: 3,
    title: 'CustomGPT Demo Repository',
    description:
      'Reusable demo hub built with Next.js and Vercel, enabling AEs to self-serve technical demos across 60+ engagements without engineering involvement.',
    imagePath: '/images/projects/demoportal.png',
    imageAlt: 'Demo repository hub',
    tags: ['Next.js', 'Vercel', 'TypeScript'],
    isPrivate: true,
  },
  {
    id: 4,
    title: 'CustomGPT Support Automation Workflow',
    description:
      'RAG-driven automation pipelines to streamline support triage and responses across Zendesk, Freshdesk, Intercom, and Zapier — reducing manual workload by 120+ hours per week.',
    tags: ['RAG', 'APIs', 'Automation', 'Python'],
    isPrivate: true,
  },
  {
    id: 5,
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
    id: 6,
    title: 'This Website',
    description:
      'A handcrafted portfolio built with Next.js App Router, featuring an ASCII art hero, a custom Tailwind v4 design system, and zero-JS server components.',
    imagePath: '/images/projects/website.png',
    imageAlt: 'Portfolio website preview',
    repoUrl: 'https://github.com/bbuckwheatt/website',
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
  },
  {
    id: 7,
    title: 'Mars Rover Team — Robotics Software',
    description:
      "Contributed inverse-kinematics functionality for a 6-DOF robotic arm in Northeastern's Mars Rover team.",
    tags: ['Python', 'Robotics', 'Kinematics'],
  },
  {
    id: 8,
    title: 'Photo Editor & Collage Builder',
    description:
      'Designed a modular Java app for collage and photo filters using polymorphism and composition.',
    imagePath: '/images/projects/collage.png',
    imageAlt: 'Photo collage application',
    repoUrl: 'https://github.com/bbuckwheatt/collage',
    tags: ['Java', 'OOP', 'Design Patterns'],
  },
];

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
