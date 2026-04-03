/*
 * app/page.tsx — Home page
 *
 * SERVER COMPONENT for the static shell (hero text, CTA buttons, focus section).
 * The Three.js 3D scene loads as a Client Component inside a Suspense boundary.
 *
 * HOW CACHE COMPONENTS (PPR) WORKS HERE:
 *   Next.js 16 with `cacheComponents: true` in next.config.ts enables
 *   Partial Pre-rendering. This means:
 *     1. Next.js pre-renders everything outside the <Suspense> boundary at
 *        build time — the heading, intro text, and CTA buttons become static HTML
 *        served immediately from the CDN edge (zero server time).
 *     2. The <Suspense> boundary wrapping <ThreeScene> is the "dynamic island" —
 *        it streams in after the browser receives and hydrates the static shell.
 *     3. The user sees your name and content instantly; the 3D scene loads
 *        progressively. No blank page while JavaScript downloads.
 *
 * WHY dynamic() WITH { ssr: false }:
 *   ThreeScene uses `new THREE.WebGLRenderer()` which requires the browser's
 *   WebGL API. Node.js (where Next.js runs server rendering) has no WebGL.
 *   `dynamic({ ssr: false })` tells Next.js to skip this component entirely
 *   during server rendering — it only ever runs in the browser.
 *   The `loading` prop provides a server-rendered placeholder that appears
 *   in the static HTML while the Three.js bundle downloads client-side.
 */

import { Suspense } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import ThreeSceneWrapper from '@/components/ThreeSceneWrapper';

export const metadata: Metadata = {
  title: 'Cameron Powell — Lead Solutions Engineer',
  description:
    'Lead Solutions Engineer based in Boston. Building technical partnerships, enterprise implementations, and AI automation.',
};

/*
 * dynamic() is Next.js's code-splitting import. It works like React.lazy()
 * but with extra options:
 *   - ssr: false   → Skip server rendering entirely (required for WebGL)
 *   - loading      → Component shown while the JS chunk is downloading.
 *                    This renders as part of the static HTML shell.
 *
 * The result is that ThreeScene's ~600KB JavaScript only downloads when
 * the user visits the home page — not on every other route.
 */
const TECH_TAGS = [
  'Solutions Engineering',
  'APIs & Integrations',
  'RAG & Automation',
  'Data & Dashboards',
  'React & TypeScript',
  'Python & SQL',
] as const;

export default function HomePage() {
  return (
    // home-container: hero-bg gradient, full-height flex column
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--hero-bg)' }}>

      {/* ── Hero Section ─────────────────────────────────────────────── */}
      {/*
       * Two-column layout: text left, 3D scene right.
       * On mobile (< 768px): stacks vertically, 3D scene on top.
       * flex-1 + min-h-[70vh] ensures the hero fills most of the viewport.
       */}
      <main className="
        flex-1 flex items-start gap-16 px-12 pt-16 pb-8 relative min-h-[70vh]
        max-sm:flex-col max-sm:px-4 max-sm:pt-6 max-sm:gap-8 max-sm:items-center max-sm:min-h-[60vh]
        max-xs:px-3 max-xs:pt-4 max-xs:gap-6 max-xs:min-h-[50vh]
      ">

        {/* ── Left column: text content ──────────────────────────────── */}
        {/*
         * This is pure static HTML — Server Component output.
         * It renders instantly from the CDN with zero JavaScript.
         * On mobile it appears below the 3D scene (order-2).
         */}
        <div className="
          flex-1 max-w-[620px] flex flex-col gap-8
          max-sm:order-2 max-sm:max-w-none max-sm:text-center max-sm:px-4 max-sm:gap-6
        ">
          <h1 className="
            text-[3.4rem] font-bold leading-[1.05] text-[var(--text-primary)] mb-2
            max-sm:text-[2.2rem] max-sm:leading-[1.2] max-sm:mb-4
            max-xs:text-[1.8rem] max-xs:leading-[1.1]
          ">
            Cameron Powell — Lead Solutions Engineer
          </h1>

          <div className="flex flex-col gap-6 max-sm:gap-5">
            <p className="text-[1.05rem] text-[var(--text-muted)] leading-[1.7] max-sm:text-[0.95rem] max-sm:leading-[1.5] max-xs:text-[0.9rem]">
              I build high-trust, technical partnerships that turn complex customer goals into
              shipped solutions. At CustomGPT.ai, I lead the Solutions Engineering function and
              work across product, engineering, and sales to deliver secure, scalable implementations.
            </p>
            <p className="text-[1.05rem] text-[var(--text-muted)] leading-[1.7] max-sm:text-[0.95rem] max-sm:leading-[1.5] max-xs:text-[0.9rem]">
              My background blends software engineering, data analytics, and customer-facing delivery.
              I love messy problems, clear outcomes, and the craft of building things that work.
            </p>

            {/* CTA buttons */}
            <div className="flex gap-4 flex-wrap mt-4 max-sm:justify-center max-sm:mt-2">
              <Link
                href="/projects"
                className="
                  inline-flex items-center justify-center
                  px-7 py-3 rounded-full no-underline
                  font-semibold text-white
                  bg-[var(--accent)]
                  shadow-[0_12px_28px_rgba(37,99,235,0.3)]
                  transition-all duration-200
                  hover:-translate-y-px hover:shadow-[0_16px_30px_rgba(37,99,235,0.35)]
                "
              >
                View projects
              </Link>
              <Link
                href="/contact"
                className="
                  inline-flex items-center justify-center
                  px-7 py-3 rounded-full no-underline
                  font-semibold text-[var(--text-primary)]
                  bg-[var(--surface)] border border-[var(--border)]
                  transition-all duration-200
                  hover:bg-[rgba(148,163,184,0.12)]
                "
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>

        {/* ── Right column: 3D scene ─────────────────────────────────── */}
        {/*
         * <Suspense> marks the boundary between the static shell and the
         * dynamic island. Everything inside the boundary is excluded from
         * the initial static HTML and streams in separately.
         *
         * The fallback renders in the static HTML as a placeholder box —
         * the user sees it immediately while ThreeScene's JavaScript loads.
         *
         * On mobile: order-1 so the 3D scene appears above the text.
         */}
        <div className="max-sm:order-1 max-sm:w-full max-sm:flex max-sm:justify-center">
          <Suspense
            fallback={
              <div className="
                w-[min(35vw,580px)] min-w-[300px] flex-shrink-0
                h-[min(35vw,600px)] min-h-[300px]
                border border-[var(--border)] rounded-[18px]
                bg-[var(--surface-strong)]
                shadow-[var(--shadow-strong)]
                flex items-center justify-center
                max-sm:w-[min(90vw,400px)] max-sm:h-[min(60vw,300px)]
              ">
                <div className="text-[var(--text-muted)] text-[0.9rem] animate-pulse">
                  Loading...
                </div>
              </div>
            }
          >
            <ThreeSceneWrapper />
          </Suspense>
        </div>

      </main>

      {/* ── Focus Section ────────────────────────────────────────────── */}
      {/*
       * Static section — rendered at build time.
       * Sits below the hero and describes the professional focus areas.
       */}
      <section className="
        px-8 py-10 pb-12
        bg-[var(--section-bg)] border-t border-[var(--border)]
        max-sm:px-4 max-sm:py-8
      ">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-[2rem] font-semibold mb-4 text-[var(--text-primary)] max-sm:text-[1.6rem]">
            What I focus on
          </h2>
          <p className="text-[1.05rem] text-[var(--text-muted)] mb-8 leading-[1.6] max-sm:text-[0.95rem]">
            I specialize in bridging product and engineering with business outcomes: translating
            requirements, designing systems, and shipping production-ready solutions for enterprise teams.
          </p>

          {/* Tech stack tags */}
          <div className="flex justify-center gap-3 flex-wrap max-sm:gap-2">
            {TECH_TAGS.map((tag) => (
              <span
                key={tag}
                className="
                  bg-[var(--chip-bg)] text-[var(--text-primary)]
                  px-4 py-2 rounded-full
                  text-[0.85rem] font-semibold
                  border border-[var(--border)]
                  transition-all duration-300
                  hover:bg-[rgba(148,163,184,0.2)] hover:border-[rgba(148,163,184,0.45)]
                  max-sm:text-[0.8rem] max-sm:px-3 max-sm:py-1
                "
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient fade to footer */}
      <div className="h-[50px]" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(15,23,42,0.05) 50%, rgba(15,23,42,0.12) 100%)' }} />

    </div>
  );
}
