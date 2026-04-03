/*
 * about/page.tsx — About page
 *
 * SERVER COMPONENT — no 'use client' directive.
 * This page runs on the server at build time and produces static HTML.
 * It has no interactivity, no hooks, and no browser APIs — it's pure markup.
 * Next.js pre-renders it once and serves the resulting HTML from the CDN edge.
 *
 * The build output will show ○ (Static) for this route, meaning the HTML is
 * generated at build time and never re-executed at runtime.
 */

import type { Metadata } from 'next';

/*
 * metadata export — Next.js reads this at build time and injects the correct
 * <title> and <meta description> into the page's <head>.
 *
 * The root layout defines: title.template = '%s | Cameron Powell'
 * So this page's title becomes: "About | Cameron Powell"
 *
 * This replaces manually managed <title> tags and is more reliable because
 * it works at the framework level, before any JavaScript runs.
 */
export const metadata: Metadata = {
  title: 'About',
  description:
    'Lead Solutions Engineer based in Boston. Building technical partnerships, enterprise implementations, and internal tooling.',
};

export default function AboutPage() {
  return (
    // Page wrapper — horizontal padding, vertical breathing room, max-width centered
    <section className="px-10 pt-[4.5rem] pb-24 max-w-[1100px] mx-auto max-sm:px-6 max-sm:pt-14 max-sm:pb-20">

      {/* Page header */}
      <header className="mb-12">
        <h1 className="text-[2.6rem] mb-4 max-sm:text-[2.2rem]">About Cameron</h1>
        <p className="text-[1.1rem] text-[var(--text-muted)] max-w-[720px]">
          Lead Solutions Engineer based in Boston. I build technical partnerships that translate
          ambitious goals into reliable products, integrations, and deployments.
        </p>
      </header>

      {/*
       * Card grid — auto-fit keeps it responsive without breakpoint-specific CSS:
       * one column on mobile, grows to 2–4 columns as space allows.
       */}
      <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>

        <div className="
          bg-[var(--surface)] rounded-[18px] p-8
          shadow-[var(--shadow-soft)] border border-[var(--border)]
        ">
          <h2 className="mt-0 mb-3">Summary</h2>
          <p className="text-[var(--text-muted)] leading-relaxed">
            I lead the Solutions Engineering function at CustomGPT.ai, where I&apos;ve delivered
            enterprise-grade implementations, led security reviews, and built internal tooling
            that scales sales and customer success. My work blends systems thinking, technical
            depth, and high-touch communication.
          </p>
        </div>

        <div className="
          bg-[var(--surface)] rounded-[18px] p-8
          shadow-[var(--shadow-soft)] border border-[var(--border)]
        ">
          <h2 className="mt-0 mb-3">Technical Focus</h2>
          <ul className="pl-5 m-0 grid gap-2 text-[var(--text-muted)]">
            <li>AI automation, RAG workflows, and API integrations</li>
            <li>Product implementation and solution architecture</li>
            <li>Data tooling: dashboards, telemetry, and insights</li>
            <li>Frontend engineering with React + TypeScript</li>
          </ul>
        </div>

        <div className="
          bg-[var(--surface)] rounded-[18px] p-8
          shadow-[var(--shadow-soft)] border border-[var(--border)]
        ">
          <h2 className="mt-0 mb-3">Education</h2>
          <p className="text-[var(--text-muted)] leading-relaxed">
            Northeastern University — B.S. in Computer Science &amp; Business Administration
            (FinTech concentration). Graduated May 2024, Cum Laude, 3.7 GPA.
          </p>
        </div>

        <div className="
          bg-[var(--surface)] rounded-[18px] p-8
          shadow-[var(--shadow-soft)] border border-[var(--border)]
        ">
          <h2 className="mt-0 mb-3">Interests</h2>
          <p className="text-[var(--text-muted)] leading-relaxed">
            Technology, strategy and role-playing games, science fiction, finance, fitness,
            hiking, cooking, coffee, and pickleball.
          </p>
        </div>

      </div>
    </section>
  );
}
