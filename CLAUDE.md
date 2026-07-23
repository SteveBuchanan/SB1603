# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server with HMR
- `npm run build` — type-check via project references (`tsc -b`) then build with Vite
- `npm run lint` — run ESLint over the whole project
- `npm run preview` — serve the production build locally

There is no test runner configured in this project yet.

## Architecture

A React 19 + TypeScript + Vite site for Sterling Breeze Condos (a Panama City Beach vacation rental), styled with Tailwind CSS v4 (via `@tailwindcss/vite`, configured with `@theme` in `src/index.css` — no `tailwind.config.js`) and routed with React Router.

- `src/components/Layout.tsx` composes `Sidebar` (desktop, collapsible) + `TopBar`/mobile drawer + `<Outlet />`. Routes are declared in `App.tsx`; pages live in `src/pages/`.
- `src/data/images.ts` is the single source of truth for property photos — each entry categorizes a file in `public/images/` as `exterior` / `interior` / `amenity` / `area`, consumed by the Gallery's tabs and the Home page teaser strip. `IMG_7690.jpg` exists in `public/images/` but is deliberately excluded here — it's an unrelated event-ticket photo, not a property photo.
- **Availability calendar** (`src/components/CalendarEmbed.tsx`, its own route at `/calendar`): parses the property's VRBO ICS feed client-side with hand-rolled regex (no calendar library). The feed can't be fetched directly from the browser (VRBO sends no CORS header), so it's proxied:
  - Production (GoDaddy shared/cPanel hosting, no persistent Node): `api/calendar.php` fetches the feed server-side. Deploy it to `public_html/api/calendar.php` alongside the `dist/` build output.
  - Local dev: `vite.config.ts` has a `server.proxy` entry forwarding the same `/api/calendar.php` path straight to VRBO, since Vite's dev server doesn't execute PHP.
  - Full rationale and requirements: [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md).
- TypeScript is split via project references: `tsconfig.json` points to `tsconfig.app.json` (source in `src/`) and `tsconfig.node.json` (config files like `vite.config.ts`). `npm run build` type-checks both before invoking Vite.
- ESLint config (`eslint.config.js`) is flat-config style, combining `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`. Type-aware lint rules are not enabled by default.

See [docs/design.md](docs/design.md) for the full product/design spec (branding, page-by-page content, responsive breakpoints).
