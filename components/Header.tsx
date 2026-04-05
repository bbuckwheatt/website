'use client';

/*
 * Header.tsx — Floating navigation bar
 *
 * WHY 'use client': usePathname() and useTheme() are React hooks — they need
 * the browser's React runtime. Everything else on the page stays server-rendered.
 *
 * FLOATING DESIGN: mx-4 mt-3 rounded-2xl gives the nav a card-like appearance
 * that floats above the page content. This is purely visual; the header is still
 * position:sticky so it scrolls with and then sticks at the top, but it appears
 * detached from the viewport edges.
 *
 * ACTIVE LINK: uses --accent (the full blue) not --accent-soft, which is too
 * pale in light mode (fails 4.5:1 contrast ratio against white backgrounds).
 *
 * DARK MODE: We use the Tailwind `dark:` variant (powered by our custom
 * @custom-variant dark in globals.css). The `[data-theme=dark]:` inline syntax
 * does NOT work — Tailwind variants require the colon-prefix form, not attribute
 * selectors written inline.
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useState, useCallback, useRef, useEffect } from 'react';

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function useScramble(text: string) {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scramble = useCallback(() => {
    let frame = 0;
    const duration = text.length * 3;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      frame++;
      const progress = frame / duration;
      const revealed = Math.floor(progress * text.length);
      const next = text
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (i < revealed) return text[i];
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        })
        .join('');
      setDisplay(next);
      if (frame >= duration) {
        clearInterval(intervalRef.current!);
        setDisplay(text);
      }
    }, 30);
  }, [text]);

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  return { display, scramble, reset: () => setDisplay(text) };
}

function ScrambleLabel({ text, isActive }: { text: string; isActive: boolean }) {
  const { display, scramble } = useScramble(text);
  return (
    <span
      onMouseEnter={scramble}
      style={{ color: display !== text && !isActive ? 'var(--accent)' : undefined }}
    >
      {display}
    </span>
  );
}

const NAV_LINKS = [
  { label: 'Home',     href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'About',    href: '/about' },
  { label: 'Gallery',  href: '/gallery' },
  { label: 'Contact',  href: '/contact' },
] as const;

export default function Header() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  function isActive(href: string): boolean {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  function toggleTheme() {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }

  return (
    <header className="
      sticky top-0 z-50
      mx-4 mt-3
      px-5 py-3
      flex justify-between items-center
      rounded-2xl
      border border-[var(--border)]
      bg-[rgba(248,250,252,0.88)]
      dark:bg-[rgba(9,9,11,0.88)]
      backdrop-blur-[14px]
      shadow-[0_2px_12px_rgba(0,0,0,0.06)]
      dark:shadow-[0_2px_12px_rgba(0,0,0,0.35)]
      max-sm:mx-3 max-sm:mt-2 max-sm:px-4 max-sm:flex-col max-sm:gap-3
    ">

      {/* Left: logo + nav */}
      <div className="flex items-center gap-10 max-sm:flex-col max-sm:gap-4 max-sm:items-center max-sm:w-full">

        {/* Logo */}
        <Link href="/" className="
          text-[1.05rem] font-semibold tracking-[-0.02em]
          text-[var(--text-primary)] no-underline
          transition-opacity duration-200 hover:opacity-70
        ">
          Cameron Powell
        </Link>

        {/* Nav links */}
        <nav className="flex gap-1 max-sm:gap-1 max-xs:flex-wrap max-xs:justify-center" aria-label="Main navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`
                px-3 py-1.5 rounded-lg
                text-[0.875rem] font-medium no-underline
                transition-all duration-200
                ${isActive(href)
                  ? 'text-[var(--accent)] bg-[rgba(16,185,129,0.1)] dark:bg-[rgba(52,211,153,0.1)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[rgba(148,163,184,0.1)]'
                }
              `}
            >
              <ScrambleLabel text={label} isActive={isActive(href)} />
            </Link>
          ))}
        </nav>
      </div>

      {/* Right: theme toggle */}
      {/* min-w/min-h-[44px] satisfies the 44×44px minimum touch target requirement.
          The visible button is smaller; the min dimensions ensure it's always
          tappable on mobile without shifting the layout. */}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle light/dark theme"
        className="
          flex items-center justify-center
          w-9 h-9 min-w-[44px] min-h-[44px] rounded-lg cursor-pointer
          text-[var(--text-muted)]
          border border-[var(--border)]
          bg-transparent
          transition-all duration-200
          hover:text-[var(--text-primary)] hover:bg-[rgba(148,163,184,0.12)]
        "
      >
        {resolvedTheme === 'dark' ? (
          /* Sun — shown in dark mode, click goes to light */
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          /* Moon — shown in light mode, click goes to dark */
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
    </header>
  );
}
