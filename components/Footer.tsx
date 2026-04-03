/*
 * Footer.tsx — Site footer with social links
 *
 * WHY NO 'use client':
 *   This component has no interactivity — no event handlers, no hooks, no state.
 *   The absence of 'use client' is intentional: Next.js treats it as a Server
 *   Component, which means it runs on the server at build time, produces static
 *   HTML, and adds zero JavaScript to the client bundle.
 *
 *   Rule of thumb: always start without 'use client'. Only add it when a component
 *   actually needs browser APIs or React hooks.
 */

export default function Footer() {
  return (
    <footer className="
      py-8 px-8
      border-t border-[var(--border)]
      bg-[var(--surface-strong)]
    ">
      <div className="
        max-w-[1000px] mx-auto
        flex justify-between items-center flex-wrap gap-4
        max-sm:flex-col max-sm:text-center
      ">
        {/* Social / external links */}
        <nav className="flex gap-8 max-sm:gap-6" aria-label="Social links">
          <a
            href="https://github.com/bbuckwheatt"
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-[var(--text-muted)] font-medium no-underline
              transition-colors duration-300
              hover:text-[var(--text-primary)]
            "
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/cameron-powell-"
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-[var(--text-muted)] font-medium no-underline
              transition-colors duration-300
              hover:text-[var(--text-primary)]
            "
          >
            LinkedIn
          </a>
          <a
            href="https://drive.google.com/file/d/1vkAo0ptWCJjsrb_eoZdmm7-QZS0xIr7_/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-[var(--text-muted)] font-medium no-underline
              transition-colors duration-300
              hover:text-[var(--text-primary)]
            "
          >
            Resume
          </a>
        </nav>

        {/* Copyright — static year avoids dynamic Date() in a Server Component.
            Update this when the year rolls over, or move to a Client Component
            if you want it to update automatically. */}
        <p className="text-[0.9rem] text-[var(--text-muted)] m-0">
          © 2026 Cameron Powell
        </p>
      </div>
    </footer>
  );
}
