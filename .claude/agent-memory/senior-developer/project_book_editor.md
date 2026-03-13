---
name: Book Editor App — Architecture & Conventions
description: Core architecture, file layout, and conventions for the Folio Book Editor Next.js app
type: project
---

Next.js 16 App Router project. Root `app/` directory. TypeScript alias `@/*` maps to `./`.

**Tech stack**
- Next.js 16.1.6 (App Router, Turbopack)
- React 19
- Tailwind CSS v4 (`@import "tailwindcss"` syntax — NOT v3 config)
- No shadcn/ui, no external UI library
- Styling: inline styles (primary) + scoped `<style>` blocks for responsive media queries

**Fonts** — loaded via `next/font/google` in `app/layout.tsx`
- Inter: 400/500/600/700 → CSS var `--font-inter`
- Playfair Display: 700 → CSS var `--font-playfair`

**Data layer** — all localStorage, no backend
- Storage key: `book-editor:books`
- Utilities in `lib/storage.ts`: `getBooks()`, `saveBooks()`, `seedBooksIfEmpty()`
- `StorageInitializer` component in `app/components/StorageInitializer.tsx` runs `seedBooksIfEmpty` on mount; included in root layout

**Types** — `types/book.ts`
- `Page`, `Chapter`, `Book` interfaces
- `BookGenre` union: "Literary Fiction" | "Historical Drama" | "Romance" | "Science Fiction" | "Draft"
- `Book.genre` field added in Iteration 2

**Color palette**
- Page bg: `#F8F7F4`, surface: `#FFFFFF`, border: `#EBEBEB`
- Primary green: `#2D6A4F`, green tint: `#F0F7F4`
- Text: primary `#1A1A1A`, secondary `#4A4A4A`, muted `#8A8A8A`

**Genre accent colors** (defined in `app/page.tsx` GENRE_TOKENS)
- Literary Fiction: `#2D6A4F` / Romance: `#C0622B` / Historical Drama: `#6B4F9E` / Sci-Fi: `#2A6EA6` / Draft: `#B0B0B0`

**Routing**
- `/` — landing / book listing (client component — reads localStorage)
- `/editor/[id]` — book editor (Iteration 3+)

**Why:** localStorage-only architecture keeps the app dependency-free and offline-capable. All page components that read data must be `"use client"`.
