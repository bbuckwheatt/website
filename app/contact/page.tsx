/*
 * contact/page.tsx — Contact page
 *
 * SERVER COMPONENT — no 'use client' directive.
 * This page is a static set of links (email, GitHub, LinkedIn, Resume).
 * No form submission logic exists yet, so no client-side code is needed.
 *
 * If a contact form is added in the future, extract it into a separate
 * 'use client' component and import it here — the page shell stays static.
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: "Let's connect — reach out via email, GitHub, LinkedIn, or check out my resume.",
};

export default function ContactPage() {
  return (
    // Vertically and horizontally centered card layout
    <section className="px-8 pt-20 pb-28 flex justify-center items-start max-sm:px-6 max-sm:pt-14 max-sm:pb-20">

      <div className="
        max-w-[720px] w-full
        bg-[var(--surface)] text-[var(--text-primary)]
        p-12 rounded-[20px]
        shadow-[var(--shadow-soft)] border border-[var(--border)]
        max-sm:p-9 max-xs:p-6
      ">
        <h1 className="text-[2.2rem] m-0 mb-4 max-xs:text-[1.8rem]">
          Let&apos;s connect
        </h1>
        <p className="text-[var(--text-muted)] mb-8">
          I&apos;m always open to discussing new opportunities, interesting problems, or collaborations.
        </p>

        <div className="grid gap-6">
          {/* Primary contact — email */}
          <a
            href="mailto:powell.c@northeastern.edu"
            className="
              text-[1.2rem] font-semibold
              text-[var(--accent-soft)] no-underline
              hover:text-[var(--accent)]
              transition-colors duration-200
            "
          >
            powell.c@northeastern.edu
          </a>

          {/* Secondary links */}
          <div className="flex gap-6 flex-wrap">
            <a
              href="https://github.com/bbuckwheatt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-primary)] font-medium no-underline hover:text-[var(--accent-soft)] transition-colors duration-200"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/cameron-powell-/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-primary)] font-medium no-underline hover:text-[var(--accent-soft)] transition-colors duration-200"
            >
              LinkedIn
            </a>
            <a
              href="https://drive.google.com/file/d/15iojLYnhLkXt4h22kgwWwI1z3MCFPSMl/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-primary)] font-medium no-underline hover:text-[var(--accent-soft)] transition-colors duration-200"
            >
              Resume
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
