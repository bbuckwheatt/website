/*
 * not-found.tsx — 404 Not Found page
 *
 * Next.js automatically renders this file when:
 *   - A user navigates to a URL that doesn't match any route
 *   - A server component calls notFound() explicitly
 *
 * This replaces two things from the old SPA:
 *   1. The `path="*"` catch-all route in App.tsx
 *   2. The public/404.html file (which was a GitHub Pages hack to redirect
 *      URLs back to the SPA after a hard refresh — no longer needed because
 *      Vercel handles routing natively)
 *
 * SERVER COMPONENT — no interactivity needed.
 */

import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-6">
      <h1 className="text-[2.5rem] m-0">404</h1>
      <p className="text-[var(--text-muted)] text-[1.1rem] max-w-[480px]">
        This page doesn&apos;t exist. You might have followed a broken link or typed the URL incorrectly.
      </p>
      <Link
        href="/"
        className="
          text-[var(--accent)] font-semibold no-underline
          hover:text-[var(--accent-soft)] transition-colors duration-200
        "
      >
        ← Back to home
      </Link>
    </section>
  );
}
