/*
 * app/page.tsx — Home page (Server Component shell + client Three.js island)
 *
 * Static shell renders at build time from CDN. ThreeSceneWrapper is the only
 * dynamic island — it loads client-side via Suspense.
 */

import Link from 'next/link';
import type { Metadata } from 'next';
import AsciiPortrait from '@/components/AsciiPortrait';
import { ScrambleName } from '@/components/ScrambleName';

export const metadata: Metadata = {
  title: 'Cameron Powell — Lead Solutions Engineer',
  description:
    'Lead Solutions Engineer based in Boston. Building technical partnerships, enterprise implementations, and AI automation.',
};

const TECH_TAGS = [
  'Solutions Engineering',
  'APIs & Integrations',
  'RAG & Automation',
  'Next.js & React',
  'TypeScript & Python',
  'Data & Dashboards',
] as const;

export default function HomePage() {
  return (
    <div className="flex flex-col">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="
        flex justify-center items-center px-12 pt-20 pb-16 relative min-h-[85vh]
        max-md:px-8 max-md:pt-14 max-md:pb-10 max-md:min-h-0
        max-sm:px-6 max-sm:pt-10 max-sm:pb-8
      ">
        {/* Centered content wrapper — caps total width so it doesn't sprawl on ultrawide */}
        <div className="flex items-center gap-16 w-full max-w-[1100px] max-lg:gap-10 max-md:flex-col">

        {/* Text — left */}
        <div className="
          flex-1 max-w-[580px] flex flex-col gap-7
          max-md:order-2 max-md:max-w-none max-md:items-center max-md:text-center
        ">

          {/* Role pill */}
          <span className="
            self-start
            px-3 py-1 rounded-full
            text-[0.75rem] font-semibold tracking-widest uppercase
            text-[var(--accent)] bg-[rgba(16,185,129,0.08)]
            border border-[rgba(16,185,129,0.2)]
            dark:bg-[rgba(52,211,153,0.08)] dark:border-[rgba(52,211,153,0.2)]
            max-md:self-center
          ">
            Lead Solutions Engineer
          </span>

          {/* Name */}
          <ScrambleName className="
            text-[3.8rem] font-bold leading-[1.0] tracking-[-0.03em]
            text-[var(--text-primary)]
            max-lg:text-[3.2rem] max-md:text-[2.8rem] max-sm:text-[2.2rem]
            m-0
          " />

          <p className="text-[1.05rem] text-[var(--text-muted)] leading-[1.75] max-w-[500px] max-sm:text-[0.95rem]">
            I build high-trust technical partnerships that turn complex customer goals into
            shipped solutions — across product, engineering, and sales.
          </p>

          {/* CTAs */}
          <div className="flex gap-3 flex-wrap max-md:justify-center">
            <Link
              href="/projects"
              className="
                inline-flex items-center justify-center
                px-6 py-2.5 rounded-full no-underline
                font-semibold text-sm text-white
                bg-[var(--accent)]
                shadow-[0_8px_20px_rgba(16,185,129,0.25)]
                transition-all duration-200
                hover:-translate-y-px hover:shadow-[0_12px_24px_rgba(16,185,129,0.35)]
                motion-reduce:hover:translate-y-0
              "
            >
              View projects
            </Link>
            <Link
              href="/contact"
              className="
                inline-flex items-center justify-center
                px-6 py-2.5 rounded-full no-underline
                font-semibold text-sm text-[var(--text-primary)]
                border border-[var(--border)]
                bg-[var(--surface)]
                transition-all duration-200
                hover:bg-[rgba(148,163,184,0.12)] hover:border-[rgba(148,163,184,0.4)]
              "
            >
              Get in touch
            </Link>
          </div>
        </div>

        {/* ASCII portrait — right */}
        <div className="flex-shrink-0 max-md:order-1 max-md:w-full max-md:flex max-md:justify-center">
          <AsciiPortrait />
        </div>
        </div>{/* end centered content wrapper */}
      </section>

      {/* ── Focus strip ─────────────────────────────────────────────────── */}
      <section className="
        px-12 py-14
        border-t border-[var(--border)]
        bg-[var(--section-bg)]
        max-sm:px-6 max-sm:py-10
      ">
        <div className="max-w-[860px] mx-auto flex flex-col gap-6 items-center text-center">
          <h2 className="text-[1.6rem] font-semibold text-[var(--text-primary)] max-sm:text-[1.4rem]">
            What I focus on
          </h2>
          <p className="text-[var(--text-muted)] leading-[1.7] max-w-[600px]">
            Bridging product and engineering with business outcomes — translating requirements,
            designing systems, and shipping production-ready solutions for enterprise teams.
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            {TECH_TAGS.map((tag) => (
              <span
                key={tag}
                className="
                  px-4 py-1.5 rounded-full
                  text-[0.8rem] font-semibold
                  text-[var(--text-primary)]
                  bg-[var(--chip-bg)]
                  border border-[var(--border)]
                  transition-colors duration-200
                  hover:border-[rgba(148,163,184,0.4)] hover:bg-[rgba(148,163,184,0.12)]
                "
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
