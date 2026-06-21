# NoteHub

A small notes manager built with **Next.js (App Router)**. It supports browsing
notes by tag, full-text search with debounced input, paginated lists, a note
details view (page + intercepted modal), and note creation with an autosaved
draft.

## Tech stack

- **Next.js 16** (App Router, SSR + CSR)
- **TypeScript**
- **TanStack Query** for client data fetching and caching
- **Zustand** (`persist` middleware) for the autosaved note draft
- **axios** for HTTP requests
- **CSS Modules** for styling
- **next/font** (Roboto)

## Features

- SSR prefetch + client hydration via `HydrationBoundary`.
- Filter notes by tag (`/notes/filter/[...slug]`), including an `all` view.
- Debounced search and pagination.
- Create note at `/notes/action/create` using a native form with `action`.
- Draft autosave: form fields are persisted to `localStorage` and restored on
  return; the draft is cleared only after a successful submit.
- SEO: per-route `metadata` / `generateMetadata` with Open Graph tags.

## Project structure

```
app/                 Routes, layouts, parallel/intercepting routes
components/           Reusable UI components (component + .module.css)
lib/api/             axios client + note service functions
lib/store/           Zustand draft store
lib/                 shared helpers (seo, constants, format, hooks)
types/               shared TypeScript types
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Create `.env` based on `.env.example`:

```
NEXT_PUBLIC_NOTEHUB_TOKEN=your-token-here
```

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — lint the project
