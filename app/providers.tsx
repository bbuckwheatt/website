'use client';

/*
 * providers.tsx — Client-side context providers
 *
 * WHY THIS FILE EXISTS:
 * app/layout.tsx is a React Server Component (RSC), which means it runs on the
 * server and cannot use React hooks or browser APIs. However, ThemeProvider from
 * next-themes uses React Context internally — a client-only feature.
 *
 * The solution is this thin wrapper: it's a Client Component ('use client') that
 * can hold client context. layout.tsx imports and renders it, keeping the layout
 * itself a Server Component while still getting the theme functionality.
 *
 * This "providers wrapper" pattern is standard in Next.js App Router projects.
 *
 * WHY NEXT-THEMES:
 * If we managed theme state ourselves with useState and stored it in localStorage,
 * we'd get a "flash of wrong theme" on page load: the server renders the default
 * theme (light), but the user had dark stored — so there's a brief flash before
 * React hydrates and corrects it.
 *
 * next-themes prevents this by injecting a tiny inline script before React hydrates
 * that reads localStorage and sets the data-theme attribute immediately. The HTML
 * is correct before the user's eyes ever see it.
 */

import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      // Use the data-theme HTML attribute (matches our CSS: [data-theme='dark'] {...})
      attribute="data-theme"
      // Default to the user's OS preference (prefers-color-scheme media query)
      defaultTheme="system"
      // Allow the theme to be set to 'light', 'dark', or 'system'
      enableSystem
    >
      {children}
    </ThemeProvider>
  );
}
