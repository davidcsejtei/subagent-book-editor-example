"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getBooks } from "@/lib/storage";
import type { Book, BookGenre } from "@/types/book";

// ---------------------------------------------------------------------------
// Genre color mapping
// ---------------------------------------------------------------------------

interface GenreTokens {
  accent: string;
  editBg: string;
  editText: string;
}

const GENRE_TOKENS: Record<BookGenre, GenreTokens> = {
  "Literary Fiction": {
    accent: "#2D6A4F",
    editBg: "#F0F7F4",
    editText: "#2D6A4F",
  },
  "Historical Drama": {
    accent: "#6B4F9E",
    editBg: "#F3F0F9",
    editText: "#6B4F9E",
  },
  Romance: {
    accent: "#C0622B",
    editBg: "#FCF2EC",
    editText: "#C0622B",
  },
  "Science Fiction": {
    accent: "#2A6EA6",
    editBg: "#EEF4FB",
    editText: "#2A6EA6",
  },
  Draft: {
    accent: "#B0B0B0",
    editBg: "#F5F5F5",
    editText: "#6A6A6A",
  },
};

function genreTokens(genre: BookGenre | undefined): GenreTokens {
  if (!genre || !(genre in GENRE_TOKENS)) return GENRE_TOKENS["Draft"];
  return GENRE_TOKENS[genre];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function totalPages(book: Book): number {
  return book.chapters.reduce((sum, ch) => sum + ch.pages.length, 0);
}

// ---------------------------------------------------------------------------
// Icons (inline SVG — no external dependency)
// ---------------------------------------------------------------------------

function HamburgerIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
    >
      <rect x="4" y="7" width="20" height="2" rx="1" fill="#2D6A4F" />
      <rect x="4" y="13" width="20" height="2" rx="1" fill="#2D6A4F" />
      <rect x="4" y="19" width="20" height="2" rx="1" fill="#2D6A4F" />
    </svg>
  );
}

function PlusIcon({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10 4v12M4 10h12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 2.5A1.5 1.5 0 013.5 1H12v11H3.5A1.5 1.5 0 012 10.5v-8z"
        stroke="#8A8A8A"
        strokeWidth="1.2"
        fill="none"
      />
      <path d="M2 10.5A1.5 1.5 0 003.5 12H12" stroke="#8A8A8A" strokeWidth="1.2" />
      <path d="M5 4h5M5 6.5h3" stroke="#8A8A8A" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Navbar
// ---------------------------------------------------------------------------

function Navbar() {
  return (
    <nav
      style={{
        height: "72px",
        background: "#FFFFFF",
        borderBottom: "1px solid #EBEBEB",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 80px",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Left: hamburger + wordmark */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button
          aria-label="Open menu"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0",
            display: "flex",
            alignItems: "center",
          }}
        >
          <HamburgerIcon />
        </button>
        <span
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontWeight: 700,
            fontSize: "18px",
            color: "#1A1A1A",
            letterSpacing: "-0.3px",
          }}
        >
          Folio
        </span>
      </div>

      {/* Right: avatar + name */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          aria-hidden="true"
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "#2D6A4F",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontWeight: 600,
              fontSize: "13px",
              color: "#FFFFFF",
              userSelect: "none",
            }}
          >
            AJ
          </span>
        </div>
        <span
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontWeight: 500,
            fontSize: "14px",
            color: "#1A1A1A",
          }}
        >
          Alex Jordan
        </span>
      </div>
    </nav>
  );
}

// ---------------------------------------------------------------------------
// Page header
// ---------------------------------------------------------------------------

function PageHeader() {
  return (
    <header
      style={{
        padding: "48px 80px 24px",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <span
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontWeight: 500,
            fontSize: "13px",
            color: "#2D6A4F",
            letterSpacing: "1.2px",
            textTransform: "uppercase",
          }}
        >
          Your Library
        </span>
        <h1
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontWeight: 700,
            fontSize: "40px",
            color: "#1A1A1A",
            margin: 0,
            lineHeight: 1.15,
          }}
        >
          My Books
        </h1>
      </div>

      <button
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          height: "44px",
          padding: "0 20px",
          background: "#2D6A4F",
          color: "#FFFFFF",
          border: "none",
          borderRadius: "8px",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontWeight: 600,
          fontSize: "14px",
          cursor: "pointer",
          transition: "filter 0.15s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1.1)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1)";
        }}
      >
        <PlusIcon size={16} color="#FFFFFF" />
        New Book
      </button>
    </header>
  );
}

// ---------------------------------------------------------------------------
// Stats bar
// ---------------------------------------------------------------------------

interface StatsBarProps {
  books: Book[];
}

function StatsBar({ books }: StatsBarProps) {
  const totalBooks = books.length;
  const totalChapters = books.reduce((sum, b) => sum + b.chapters.length, 0);
  const totalPagesCount = books.reduce((sum, b) => sum + totalPages(b), 0);

  const stats = [
    { value: totalBooks, label: "books total" },
    { value: totalChapters, label: "chapters written" },
    { value: totalPagesCount, label: "pages across all books" },
  ];

  return (
    <div
      style={{
        padding: "24px 80px",
        display: "flex",
        alignItems: "center",
        gap: "32px",
        marginTop: "32px",
        borderTop: "1px solid #EBEBEB",
      }}
    >
      {stats.map((stat, i) => (
        <div key={stat.label} style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <span
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontWeight: 700,
                fontSize: "28px",
                color: "#1A1A1A",
                lineHeight: 1.1,
                letterSpacing: "-0.5px",
              }}
            >
              {stat.value}
            </span>
            <span
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                color: "#8A8A8A",
              }}
            >
              {stat.label}
            </span>
          </div>
          {i < stats.length - 1 && (
            <div
              aria-hidden="true"
              style={{
                width: "1px",
                height: "24px",
                background: "#E0E0E0",
                flexShrink: 0,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Book card
// ---------------------------------------------------------------------------

interface BookCardProps {
  book: Book;
}

function BookCard({ book }: BookCardProps) {
  const tokens = genreTokens(book.genre);
  const isDraft = book.genre === "Draft" || !book.genre;
  const chapterCount = book.chapters.length;
  const pageCount = totalPages(book);

  return (
    <article
      style={{
        background: "#FFFFFF",
        border: "1px solid #EBEBEB",
        borderRadius: "12px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        opacity: isDraft ? 0.75 : 1,
        transition: "box-shadow 0.18s ease, transform 0.18s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.09)";
        el.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "none";
        el.style.transform = "translateY(0)";
      }}
    >
      {/* Accent bar */}
      <div
        aria-hidden="true"
        style={{ height: "8px", background: tokens.accent, flexShrink: 0 }}
      />

      {/* Card body */}
      <div
        style={{
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          flex: 1,
        }}
      >
        {/* Title block */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <h2
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontWeight: 700,
                fontSize: "18px",
                color: "#1A1A1A",
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              {book.title}
            </h2>
            {isDraft && (
              <span
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: "11px",
                  color: "#6A6A6A",
                  background: "#F0F0F0",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  flexShrink: 0,
                }}
              >
                DRAFT
              </span>
            )}
          </div>
          <span
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "13px",
              color: "#8A8A8A",
            }}
          >
            {book.genre ?? "Draft"}
          </span>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <BookIcon />
          <span
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontWeight: 500,
              fontSize: "13px",
              color: "#4A4A4A",
            }}
          >
            {chapterCount} {chapterCount === 1 ? "chapter" : "chapters"}
          </span>
          <div
            aria-hidden="true"
            style={{
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              background: "#D4D4D4",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "13px",
              color: "#8A8A8A",
            }}
          >
            {pageCount} {pageCount === 1 ? "page" : "pages"}
          </span>
        </div>

        {/* Footer */}
        <div
          style={{
            borderTop: "1px solid #F0F0F0",
            paddingTop: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "12px",
              color: "#AAAAAA",
            }}
          >
            {formatDate(book.updatedAt)}
          </span>
          <Link
            href={`/editor/${book.id}`}
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontWeight: 600,
              fontSize: "13px",
              color: tokens.editText,
              background: tokens.editBg,
              padding: "6px 12px",
              borderRadius: "6px",
              textDecoration: "none",
              transition: "filter 0.15s ease",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.filter = "brightness(0.95)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.filter = "brightness(1)";
            }}
          >
            Edit
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 6h8M7 3l3 3-3 3" stroke={tokens.editText} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// New Book CTA card
// ---------------------------------------------------------------------------

function NewBookCard() {
  return (
    <article
      style={{
        border: "1.5px dashed #CCCCCC",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        padding: "24px",
        cursor: "pointer",
        minHeight: "200px",
        transition: "border-color 0.15s ease, background 0.15s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "#2D6A4F";
        el.style.background = "#FAFAF9";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "#CCCCCC";
        el.style.background = "transparent";
      }}
    >
      <div
        aria-hidden="true"
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: "#F0F7F4",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PlusIcon size={20} color="#2D6A4F" />
      </div>
      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "4px" }}>
        <span
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "14px",
            color: "#2D6A4F",
          }}
        >
          New Book
        </span>
        <span
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontWeight: 400,
            fontSize: "12px",
            color: "#8A8A8A",
          }}
        >
          Start writing today
        </span>
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setBooks(getBooks());
    setMounted(true);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8F7F4",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />

      <main style={{ flex: 1, maxWidth: "1440px", width: "100%", margin: "0 auto" }}>
        <PageHeader />

        {/* Books grid */}
        <section
          aria-label="Book library"
          style={{ padding: "0 80px 80px" }}
        >
          <div className="books-grid">
            {mounted ? (
              <>
                {books.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
                <NewBookCard />
              </>
            ) : (
              // Skeleton placeholders during SSR / before mount
              Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #EBEBEB",
                    borderRadius: "12px",
                    height: "200px",
                    opacity: 0.5,
                  }}
                  aria-hidden="true"
                />
              ))
            )}
          </div>
        </section>

        {mounted && <StatsBar books={books} />}
      </main>
    </div>
  );
}
