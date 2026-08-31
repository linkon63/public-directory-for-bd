# Vercel Best Practices & Coding Standards

This project adheres to official Vercel engineering standards and Next.js App Router guidelines:

## 1. Component Architecture & Rendering
- **Server Components First**: Use React Server Components (RSC) by default for data fetching, rendering layout grids, and static content.
- **Client Components Scoped**: Mark components with `'use client'` only when state (`useState`), effects (`useEffect`), or DOM event listeners are strictly necessary.
- **Edge Compatible**: Code written for API routes or utility handlers should maintain compatibility with Vercel Edge Runtime.

## 2. Styling & Aesthetics
- **Vercel Aesthetics**: Deep dark mode palette, sleek monochromatic borders (`border-neutral-800`), glassmorphic overlays (`backdrop-blur`), subtle glowing gradients, and Geist typography.
- **Tailwind Utility First**: Combine utility classes with `clsx` and `tailwind-merge` for conditional styling.

## 3. Analytics & Speed Insights
- Integrated `@vercel/analytics` (`<Analytics />`) for real-time traffic statistics.
- Integrated `@vercel/speed-insights` (`<SpeedInsights />`) for Web Vitals tracking.

## 4. Performance & Deployment
- Dynamic imports for heavy dialogs/modals.
- Proper image optimization using `next/image`.
- Immutable assets cached via Vercel Edge Network.
