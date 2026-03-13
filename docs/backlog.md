# Book Editor Application — Project Backlog

## Scope Summary

A book editor application where authors can create and edit their books. The POC covers a landing page that displays books from localStorage, a book editor page where authors can edit the book title, manage chapters, and add/edit pages within chapters. Changes are persisted in localStorage and reflected immediately on the landing page.

---

## Backlog Progress

| Metric              | Value |
|---------------------|-------|
| Total tasks         | 18    |
| Completed tasks     | 8     |
| Remaining tasks     | 10    |
| Completion          | 44%   |

---

## Iterations

---

### Iteration 1 — Project Foundation

**Status:** DONE

**Goal:** Establish the Next.js project baseline with a clean folder structure, routing, and localStorage utility layer so all subsequent iterations have a stable foundation to build on.

**UI required:** No

**Tasks:**

- [x] 1.1 Verify Next.js app is bootstrapped and runs locally (`npm run dev`)
- [x] 1.2 Define the localStorage data model for books, chapters, and pages (TypeScript interfaces in `src/types/`)
- [x] 1.3 Implement a `localStorage` utility module (`src/lib/storage.ts`) with `getBooks`, `saveBooks`, and seed data functions
- [x] 1.4 Seed localStorage with at least two sample books (each with 2 chapters, 2 pages per chapter) so subsequent iterations have data to display

**Acceptance Criteria:**

- Running `npm run dev` starts the app without errors
- TypeScript types for `Book`, `Chapter`, and `Page` are defined and exported
- `getBooks()` returns the seeded book list from localStorage
- `saveBooks()` persists changes and the data survives a page refresh
- No UI changes are required in this iteration

**Dependencies:** None

---

### Iteration 2 — Landing Page (Book Listing)

**Status:** DONE

**Goal:** Build the landing page that reads books from localStorage and displays them in a browsable list, giving authors an overview of all their books.

**UI required:** Yes

**Tasks:**

- [x] 2.1 Create the `/` (home) route page component (`src/app/page.tsx`)
- [x] 2.2 Read books from localStorage on the client side and render a book card/list for each book
- [x] 2.3 Display the book title and chapter count on each book card
- [x] 2.4 Add a navigation link on each book card that points to the editor page for that book (`/editor/[id]`)

**Acceptance Criteria:**

- The landing page loads and displays the seeded books without errors
- Each book card shows the book title and chapter count
- Clicking a book card navigates to the correct editor route
- If localStorage is empty, the page renders without crashing (empty state is acceptable)
- Data is read client-side from localStorage (no server fetch)

**Dependencies:** Iteration 1

---

### Iteration 3 — Book Editor Page (Title Editing)

**Status:** TODO

**Goal:** Create the book editor page and enable authors to view and edit the book title, establishing the editor shell that chapter and page editing will be added to.

**UI required:** Yes

**Tasks:**

- [ ] 3.1 Create the `/editor/[id]` dynamic route page component (`src/app/editor/[id]/page.tsx`)
- [ ] 3.2 Load the correct book from localStorage using the route `id` parameter
- [ ] 3.3 Render an editable input field for the book title
- [ ] 3.4 Add a "Save" button that writes the updated book back to localStorage
- [ ] 3.5 After saving, navigate back to the landing page (or show a success indicator)

**Acceptance Criteria:**

- Navigating to `/editor/[id]` loads the correct book
- The book title is displayed in an editable input field
- Editing the title and clicking Save persists the new title in localStorage
- After save, the landing page shows the updated title
- Navigating to an unknown book id renders a not-found or error state gracefully

**Dependencies:** Iteration 2

---

### Iteration 4 — Chapter Management in the Editor

**Status:** TODO

**Goal:** Allow authors to view, add, rename, and remove chapters within the book editor page.

**UI required:** Yes

**Tasks:**

- [ ] 4.1 Render the list of chapters for the loaded book inside the editor page
- [ ] 4.2 Allow editing each chapter title via an inline input field
- [ ] 4.3 Add an "Add Chapter" button that appends a new empty chapter to the list
- [ ] 4.4 Add a "Remove Chapter" button on each chapter that deletes it (and its pages) from the local state
- [ ] 4.5 Ensure chapter changes are included when the Save button is clicked

**Acceptance Criteria:**

- All chapters for the loaded book are displayed in the editor
- An author can rename any chapter and the new name is saved on Save
- An author can add a new chapter; it appears immediately in the list
- An author can remove a chapter; it disappears from the list
- Saving persists all chapter changes to localStorage
- The landing page reflects the updated chapter count after save

**Dependencies:** Iteration 3

---

### Iteration 5 — Page Management within Chapters

**Status:** TODO

**Goal:** Allow authors to add, edit, and remove pages inside each chapter, with support for an arbitrary number of pages per chapter.

**UI required:** Yes

**Tasks:**

- [ ] 5.1 Render the list of pages under each chapter in the editor
- [ ] 5.2 Allow editing each page's content via a textarea input
- [ ] 5.3 Add an "Add Page" button per chapter that appends a new blank page to that chapter
- [ ] 5.4 Add a "Remove Page" button per page that removes it from the chapter
- [ ] 5.5 Ensure all page changes are included when the Save button is clicked

**Acceptance Criteria:**

- All pages for each chapter are visible and editable in the editor
- An author can add any number of pages to a chapter
- An author can remove any page from a chapter
- Page content is editable via a textarea
- Saving persists all page changes to localStorage
- The data structure in localStorage correctly reflects the page order and content

**Dependencies:** Iteration 4

---

### Iteration 6 — Save Flow and Landing Page Sync

**Status:** TODO

**Goal:** Ensure the full save-and-return flow works end-to-end: saving in the editor updates localStorage and the landing page immediately reflects the changes.

**UI required:** No

**Tasks:**

- [ ] 6.1 Confirm the Save button in the editor writes the complete updated book (title, chapters, pages) atomically to localStorage
- [ ] 6.2 Ensure the landing page re-reads localStorage on every visit (not stale cached state)
- [ ] 6.3 Add a visible save confirmation message or indicator in the editor after a successful save
- [ ] 6.4 Manually verify the end-to-end flow: edit title + chapter + page, save, return to landing page, confirm all changes are visible

**Acceptance Criteria:**

- Saving in the editor persists title, chapter, and page changes atomically
- The landing page always shows the latest data from localStorage on load
- A confirmation indicator is shown after saving
- The full round-trip flow (edit -> save -> landing page) works without data loss

**Dependencies:** Iteration 5

---
