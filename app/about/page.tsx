/*
 * about/page.tsx — About page (Server Component, static HTML)
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Lead Solutions Engineer at CustomGPT.ai based in Boston. CS & Business grad from Northeastern, building technical partnerships and enterprise AI implementations.',
};

export default function AboutPage() {
  return (
    <section className="px-10 pt-16 pb-24 max-w-[1000px] mx-auto max-sm:px-6 max-sm:pt-12 max-sm:pb-16">

      <header className="mb-14">
        <h1 className="text-[2.8rem] mb-4 tracking-[-0.02em] max-sm:text-[2.2rem]">About</h1>
        <p className="text-[1.1rem] text-[var(--text-muted)] leading-[1.7] max-w-[620px]">
          Lead Solutions Engineer at CustomGPT.ai, based in Boston. I translate ambitious customer
          goals into shipped enterprise solutions — across product, engineering, and sales.
        </p>
      </header>

      {/* Two-column layout: narrative left, facts right */}
      <div className="grid grid-cols-[1fr_300px] gap-12 max-lg:grid-cols-1 max-lg:gap-8">

        {/* Left: narrative */}
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-[1.1rem] font-semibold text-[var(--text-primary)] mb-3 mt-0">What I do</h2>
            <p className="text-[var(--text-muted)] leading-[1.8] m-0">
              I created and scaled the Solutions Engineering function at CustomGPT.ai from scratch —
              lifting demo-to-close rates by 15%, driving 90% PoC-to-annual conversion across 20+
              enterprise clients, and leading a team of SEs, forward-deployed engineers, and data
              scientists that has influenced $1M+ in sales revenue. My work spans solution
              architecture, security reviews (SSO/SAML, vendor questionnaires), cross-platform data
              consolidation into BigQuery, and deep technical partnership with product and engineering.
            </p>
          </div>

          <div>
            <h2 className="text-[1.1rem] font-semibold text-[var(--text-primary)] mb-3 mt-0">Technical focus</h2>
            <ul className="m-0 pl-0 list-none flex flex-col gap-2">
              {[
                'AI/RAG pipelines — LangChain, Vercel AI SDK, Pinecone, pgvector',
                'Full-stack: Next.js, React, TypeScript, Node.js',
                'Enterprise integrations: SSO/SAML, REST APIs, Zapier, HubSpot',
                'Data consolidation: BigQuery, Neon, MySQL, Retool dashboards',
                'Python, SQL, and CI/CD on Azure, Docker, Vercel',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[var(--text-muted)] leading-relaxed">
                  <span className="mt-[0.35rem] w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[1.1rem] font-semibold text-[var(--text-primary)] mb-3 mt-0">Outside work</h2>
            <p className="text-[var(--text-muted)] leading-[1.8] m-0">
              Strategy and role-playing games, science fiction, fantasy, finance, fitness,
              hiking, cooking, coffee, and pickleball.
            </p>
          </div>
        </div>

        {/* Right: quick facts */}
        <div className="flex flex-col gap-4">
          {[
            { label: 'Role',       value: 'Lead Solutions Engineer' },
            { label: 'Company',    value: 'CustomGPT.ai' },
            { label: 'Location',   value: 'Boston, MA' },
            { label: 'Education',  value: 'Northeastern University\nB.S. CS & Business, Fintech\nCum Laude · 3.7 GPA · 2024' },
          ].map(({ label, value }) => (
            <div key={label} className="
              p-5
              bg-[var(--surface)] border border-[var(--border)]
              shadow-[0_2px_8px_rgba(15,23,42,0.04)]
            ">
              <p className="m-0 mb-1 text-[0.7rem] font-semibold uppercase tracking-widest text-[var(--text-muted)]">{label}</p>
              <p className="m-0 text-[0.9rem] font-medium text-[var(--text-primary)] leading-snug whitespace-pre-line">{value}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
