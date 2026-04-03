/*
 * layout.tsx — Root layout (app shell)
 *
 * This file is the entry point for every page in the site. In Next.js App Router,
 * a layout wraps all pages in its directory and any nested directories. This root
 * layout wraps everything — it's the equivalent of what index.html + App.tsx
 * used to do in the old Webpack SPA.
 *
 * WHAT HAPPENS HERE:
 *   1. Fonts are loaded via next/font/google (replaces the @import in globals.css)
 *   2. Site-wide metadata (title template, description, Open Graph) is exported
 *   3. The <html> element is rendered with:
 *      - suppressHydrationWarning (see note below)
 *      - font CSS variable class names
 *   4. <Providers> wraps children to supply the theme context
 *   5. <Header> and <Footer> are rendered on every page
 *
 * IMPORTANT — suppressHydrationWarning:
 *   next-themes changes the `data-theme` attribute on <html> client-side
 *   immediately after hydration (reading from localStorage). The server has no
 *   knowledge of the user's stored preference, so it renders without data-theme,
 *   but the client adds it right away.
 *
 *   Without suppressHydrationWarning, React would log a "Hydration mismatch"
 *   warning because the server-rendered HTML and the client-rendered HTML differ
 *   on this attribute. The flag tells React: "I know this attribute will differ,
 *   it's intentional — don't warn about it." It only suppresses warnings for
 *   this specific element, not its children.
 *
 * WHY NEXT/FONT:
 *   The old site used `@import url('https://fonts.googleapis.com/...')` in CSS.
 *   That's a render-blocking network request — the browser must wait for the font
 *   to download before it can paint text. next/font downloads the fonts at build
 *   time and self-hosts them, eliminating the external request entirely. This
 *   improves LCP (Largest Contentful Paint) and removes the privacy exposure of
 *   connecting to Google's servers on every page load.
 *
 * WHY THIS IS A SERVER COMPONENT:
 *   No 'use client' directive = Server Component. Server Components run on the
 *   server at request time (or build time for static pages) and produce plain HTML.
 *   They can't use useState, useEffect, or browser APIs — but they also don't add
 *   JavaScript to the client bundle, keeping pages fast.
 *   The interactivity (theme toggle, active nav link) lives in the child
 *   Client Components: <Providers>, <Header>.
 */

import type { Metadata } from 'next';
import { Fraunces, Space_Grotesk, Geist } from 'next/font/google';
import { Providers } from './providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


/*
 * next/font/google downloads these fonts at build time and generates CSS variable
 * names that we apply to <html>. This makes the fonts available everywhere in CSS
 * via var(--font-fraunces) and var(--font-space-grotesk), which globals.css maps
 * into the Tailwind @theme token system.
 */
const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  // weight: variable (the font supports a variable weight axis)
  display: 'swap', // Show fallback font until Fraunces loads — prevents invisible text
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

/*
 * Metadata export — Next.js reads this at build time and injects the correct
 * <title> and <meta> tags into the page's <head>. This replaces manually
 * managed <title> elements or libraries like react-helmet.
 *
 * The `title.template` means child pages can export just their page name
 * (e.g., `title: 'About'`) and Next.js will automatically expand it to
 * "About | Cameron Powell".
 *
 * `metadataBase` is required for Open Graph image URLs to resolve correctly
 * on Vercel's CDN. It tells Next.js the canonical origin of the site.
 */
export const metadata: Metadata = {
  title: {
    default: 'Cameron Powell',
    template: '%s | Cameron Powell',
  },
  description:
    'Lead Solutions Engineer based in Boston. Building technical partnerships that ship.',
  metadataBase: new URL('https://cam-powell.com'),
  openGraph: {
    title: 'Cameron Powell',
    description: 'Lead Solutions Engineer based in Boston.',
    url: 'https://cam-powell.com',
    siteName: 'Cameron Powell',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /*
     * suppressHydrationWarning is needed on <html> because next-themes modifies
     * the data-theme attribute client-side. See the explanation at the top of
     * this file for the full picture.
     *
     * The font variables are applied as class names on <html> so they're
     * available to every element via CSS inheritance.
     */
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(fraunces.variable, spaceGrotesk.variable, "font-sans", geist.variable)}
    >
      <body>
        {/*
         * <Providers> is a Client Component that supplies ThemeProvider context.
         * Everything nested inside it can call useTheme() to read or change the theme.
         * It must wrap Header (which uses useTheme for the toggle) and all page content.
         */}
        <Providers>
          <div className="app-shell">
            <Header />
            <main className="app-main">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
