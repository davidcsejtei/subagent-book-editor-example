---
name: Book Editor App - Iteration 2 context
description: Iteration 2 plans and validation context for the Landing Page (book listing), including known implementation constraints
type: project
---

Iteration 2 builds the `/` landing page on top of the Iteration 1 storage layer. Status: TODO as of 2026-03-13.

Key implementation constraints that affect E2E test design:
- `StorageInitializer` (in layout.tsx) runs `seedBooksIfEmpty()` via `useEffect` on every page — seeding is async relative to render
- `getBooks()` returns `[]` when `typeof window === "undefined"` (SSR guard), so the landing page must read localStorage client-side only
- Seed data: 2 books — "The Pragmatic Thinker" (book-1, 2 chapters) and "Across the Archipelago" (book-2, 2 chapters)
- Storage key: `book-editor:books`; envelope format: `{ version: 1, books: Book[] }`
- Editor route target: `/editor/[id]` — not yet built in Iteration 2

**Why:** Landing page is the first UI, so tests must account for the client-only rendering pattern and seed timing.
**How to apply:** Always set/clear localStorage before navigating to `/`. Use `page.evaluate()` or `addInitScript()` to inject localStorage state before page load to avoid race conditions with StorageInitializer seeding.
