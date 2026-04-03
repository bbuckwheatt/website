'use client';

/*
 * Header.tsx — Site navigation and theme toggle
 *
 * WHY 'use client':
 *   This component uses two hooks that require a browser environment:
 *     - usePathname() — reads the current URL to highlight the active nav link
 *     - useTheme()    — reads and sets the user's light/dark preference
 *   React hooks and browser APIs are not available in Server Components,
 *   so 'use client' is required. Only this component (and its children) are
 *   sent as JavaScript to the browser — the rest of the page (layout, page
 *   content) remains server-rendered HTML.
 *
 * ACTIVE LINK LOGIC:
 *   In the old SPA we used NavLink from react-router-dom, which added an
 *   'active' class automatically. In Next.js, we use usePathname() to get the
 *   current path and apply the active class ourselves. The `end` prop equivalent
 *   is handled by checking pathname === href for the Home link (exact match),
 *   and pathname.startsWith(href) for all others.
 *
 * THEME TOGGLE:
 *   useTheme() comes from next-themes (via the <Providers> wrapper in layout.tsx).
 *   `resolvedTheme` is 'light' or 'dark' with 'system' already resolved to one of
 *   the two — safer than `theme` which can be 'system'. We use it to decide which
 *   SVG icon to show.
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

// Navigation links — label shown in the nav, href for the route
const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
] as const;

export default function Header() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  // Returns true when the current URL matches this link's href.
  // Home uses exact match; others use prefix match (so /gallery/iceland
  // still highlights the Gallery link).
  function isActive(href: string): boolean {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  function toggleTheme() {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }

  return (
    <header className="
      relative z-10 px-12 py-6
      flex justify-between items-center
      border-b border-[var(--border)]
      backdrop-blur-[10px]
      bg-[rgba(248,250,252,0.92)]
      [data-theme=dark]:bg-[rgba(15,23,42,0.92)]
      max-sm:px-6 max-sm:py-4 max-sm:flex-col max-sm:gap-4
    ">
      {/* Left side: logo + navigation */}
      <div className="flex items-center gap-12 max-sm:flex-col max-sm:gap-6 max-sm:items-center max-sm:w-full">
        {/* Logo / site name */}
        <span className="text-[1.2rem] font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
          Cameron Powell
        </span>

        {/* Navigation links */}
        <nav className="flex gap-10 max-sm:gap-6 max-xs:gap-4 max-xs:flex-wrap max-xs:justify-center">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`
                relative py-2
                text-[0.95rem] font-normal no-underline
                transition-colors duration-200
                ${isActive(href)
                  ? 'text-[var(--accent-soft)] font-medium after:content-[""] after:absolute after:bottom-[-1.5rem] after:left-0 after:right-0 after:h-[2px] after:bg-[var(--accent-soft)] after:rounded-[1px]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }
              `}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Right side: theme toggle */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="
            flex items-center justify-center
            w-10 h-10 p-2
            rounded-md cursor-pointer
            bg-[rgba(255,255,255,0.08)]
            border border-[var(--border)]
            text-[var(--text-primary)]
            transition-all duration-200
            hover:bg-[rgba(255,255,255,0.15)] hover:border-[rgba(148,163,184,0.4)]
            [data-theme=dark]:bg-[rgba(15,23,42,0.6)]
          "
        >
          {/* Sun icon — shown in dark mode (clicking switches to light) */}
          {resolvedTheme === 'dark' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 3a1 1 0 0 1 1 1v1.25a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1Zm7.25 8a1 1 0 0 1 1 1 1 1 0 0 1-1 1H18a1 1 0 1 1 0-2h1.25ZM12 17.75a1 1 0 0 1 1 1V20a1 1 0 1 1-2 0v-1.25a1 1 0 0 1 1-1Zm-6.75-4.75a1 1 0 1 1 0-2H6.5a1 1 0 1 1 0 2H5.25Zm11.06-6.81a1 1 0 0 1 1.41 0l.88.88a1 1 0 1 1-1.41 1.41l-.88-.88a1 1 0 0 1 0-1.41ZM6.62 16.5a1 1 0 0 1 1.41 0l.88.88a1 1 0 0 1-1.41 1.41l-.88-.88a1 1 0 0 1 0-1.41ZM7.5 5.62a1 1 0 0 1 0 1.41l-.88.88A1 1 0 1 1 5.2 6.5l.88-.88a1 1 0 0 1 1.41 0Zm10.88 10.88a1 1 0 0 1 0 1.41l-.88.88a1 1 0 1 1-1.41-1.41l.88-.88a1 1 0 0 1 1.41 0ZM12 8.25a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5Z"
                fill="currentColor"
              />
            </svg>
          ) : (
            /* Moon icon — shown in light mode (clicking switches to dark) */
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M14.5 3.5a1 1 0 0 1 1 1c0 6.08-4.92 11-11 11a1 1 0 0 1-1-1 9.5 9.5 0 0 0 11-11 1 1 0 0 1 1-1Zm4.5 10a1 1 0 0 1 1 1A8.5 8.5 0 1 1 10 4a1 1 0 0 1 0 2 6.5 6.5 0 1 0 7 7.5 1 1 0 0 1 1-1Z"
                fill="currentColor"
              />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
