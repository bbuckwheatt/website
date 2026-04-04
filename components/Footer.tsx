/*
 * Footer.tsx — Server Component (no interactivity, zero JS bundle cost)
 */

export default function Footer() {
  return (
    <footer className="
      py-10 px-8
      border-t border-[var(--border)]
      bg-[var(--section-bg)]
      max-sm:px-6 max-sm:py-8
    ">
      <div className="max-w-[900px] mx-auto flex justify-between items-center flex-wrap gap-6 max-sm:flex-col max-sm:items-center max-sm:text-center">

        <nav className="flex gap-6" aria-label="Footer links">
          {[
            { label: 'GitHub',   href: 'https://github.com/bbuckwheatt' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/cameron-powell-' },
            { label: 'Resume',   href: 'https://drive.google.com/file/d/1vkAo0ptWCJjsrb_eoZdmm7-QZS0xIr7_/view?usp=sharing' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-[0.875rem] font-medium text-[var(--text-muted)] no-underline
                transition-colors duration-200 hover:text-[var(--text-primary)]
                cursor-pointer
              "
            >
              {label}
            </a>
          ))}
        </nav>

        <p className="m-0 text-[0.8rem] text-[var(--text-muted)]">© 2026 Cameron Powell</p>
      </div>
    </footer>
  );
}
