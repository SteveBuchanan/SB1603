# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server with HMR
- `npm run build` — type-check via project references (`tsc -b`) then build with Vite
- `npm run lint` — run ESLint over the whole project
- `npm run preview` — serve the production build locally

There is no test runner configured in this project yet.

## Architecture

This is a bare Vite + React 19 + TypeScript scaffold (created from the official `vite` React-TS template) — `src/App.tsx` still contains the template's starter markup, not application-specific UI yet.

- TypeScript is split via project references: `tsconfig.json` points to `tsconfig.app.json` (source in `src/`) and `tsconfig.node.json` (config files like `vite.config.ts`). `npm run build` type-checks both before invoking Vite.
- ESLint config (`eslint.config.js`) is flat-config style, combining `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`. Type-aware lint rules are not enabled by default.
- `public/images/` holds a large set of unprocessed property photos (interior/exterior shots of what appears to be a vacation rental unit, "Sterling Breeze Unit 1603"), served as static assets — these are source material for the site, not build output.

See [docs/design.md](docs/design.md) for the product/design spec and [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md) for feature requirements.
