---
name: Book Editor POC — Design System & Artboard Status
description: Design decisions, color palette, typography, and completion status for the Folio book editor POC designs in Paper
type: project
---

This project is called "Folio" — a book editor POC where authors create and manage books, chapters, and pages stored in localStorage.

**Why:** Covers 4 design iterations (Iterations 2–5) as specified in the product backlog.

**How to apply:** When continuing or iterating on these designs, maintain exact design token consistency described below.

## Paper Document
- File: "Sincere meadow", Page 1

## Artboard Status (as of session end)
- **Artboard 1:** "Iteration 2 — Landing Page" — ID `1-0` — COMPLETE
- **Artboard 2:** "Iteration 3 — Book Editor (Title)" — ID `47-0` — COMPLETE
- **Artboard 3:** "Iteration 4 — Chapter Management" — ID `7E-0` — COMPLETE
- **Artboard 4:** "Iteration 5 — Page Management" — ID `AX-0` — COMPLETE

## Design System Tokens

### Colors
- Background page: `#F8F7F4` (warm off-white)
- Surface (cards, panels): `#FFFFFF`
- Border default: `#EBEBEB`
- Border subtle: `#F0F0F0`
- Input background: `#FAFAFA`
- Input border active: `#2D6A4F` (primary green)
- Input border default: `#E8E8E8`

### Brand / Primary
- Primary green: `#2D6A4F`
- Primary green tint (bg): `#F0F7F4`
- Primary green light: `#EEF7F2`

### Accent colors (book card accent bars)
- Literary Fiction: `#2D6A4F`
- Historical Drama: `#6B4F9E`
- Romance: `#C0622B`
- Science Fiction: `#2A6EA6`
- Draft/Untitled: `#B0B0B0`

### Text
- Primary text: `#1A1A1A`
- Secondary text: `#4A4A4A`
- Muted text: `#6A6A6A`
- Placeholder / meta: `#8A8A8A`
- Disabled: `#AAAAAA`

### Status
- Error red: `#EF4444` / bg `#FEF2F2` / border `#FCA5A5` / text `#DC2626`
- Success: `#2D6A4F` (same as primary)

### Typography
- Display / Headings: `Playfair Display`, serif — weights 700
- UI / Body: `Inter`, sans-serif — weights 400, 500, 600, 700
- Code / IDs: `JetBrains Mono`, monospace

### Spacing (8pt grid)
- Page horizontal padding: `80px`
- Section gap: `40px`
- Card padding: `24px`
- Form field gap: `24px`
- Input height: `48px` (primary), `44px` (secondary), `40px` (compact)
- Button height: `44px`
- Nav height: `72px`
- Sidebar width: `280px`

### Components
- Navbar: white, 72px tall, 80px horizontal padding, 1px bottom border `#EBEBEB`
- Breadcrumb in navbar: muted link > chevron > bold current
- Sidebar: white, 280px wide, right border, collapsible chapter tree
- Book cards: white, 12px radius, 1px border, 8px color accent bar at top
- Chapter cards: white, 12px radius, drag handle + number badge + editable input + remove X
- Add Chapter button: dashed border, 12px radius, centered icon + text
- Toasts: `#1A1A1A` bg, white text, 10px radius
- Error state: red tinted card with back-to-library CTA

## Iteration 5 — Design Notes
Completed in second session. Key patterns used:
- Sidebar tree: Ch 1 expanded (down-chevron, green highlight, Page 1/2/3 indented with dot indicators), Ch 2 & 3 collapsed (right-chevron, page count badge)
- Chapter accordions: Ch 1 open with green `1.5px #2D6A4F` border and `#F0F7F4` header tint; Ch 2 & 3 collapsed with default grey border
- Page rows: number badge (green when active, grey otherwise) + label + textarea + remove X — all separated by `#F0F0F0` dividers
- Active textarea: `1.5px solid #2D6A4F` border, `#FAFAFA` bg, real prose content on page 1-2, italic placeholder on page 3
- Add Page button: dashed `#A8D5C2` border, `#F0F7F4` bg, green text — sits as footer inside each open accordion
- Add Chapter button: full-width dashed row, `12px` radius, below all accordions
- Footer bar: white, 72px, `border-top: 1px #EBEBEB` — green dot + "All changes saved" status left; Cancel + Back to Library + Save All Changes right
