import type { Book, BookGenre } from "@/types/book";

export const STORAGE_KEY = "book-editor:books";

interface StorageEnvelope {
  version: 1;
  books: Book[];
}

const SEED_TIMESTAMP = "2026-01-01T00:00:00.000Z";

const SEED_BOOKS: Book[] = [
  {
    id: "book-1",
    title: "The Pragmatic Thinker",
    author: "Ada Lovelace",
    description:
      "A guide to developing rigorous, creative thinking in everyday life and professional practice.",
    coverColor: "#4f46e5",
    genre: "Literary Fiction" as BookGenre,
    createdAt: SEED_TIMESTAMP,
    updatedAt: SEED_TIMESTAMP,
    chapters: [
      {
        id: "chapter-1-1",
        title: "Foundations",
        order: 1,
        createdAt: SEED_TIMESTAMP,
        updatedAt: SEED_TIMESTAMP,
        pages: [
          {
            id: "page-1-1-1",
            title: "What is thinking?",
            content:
              "Thinking is the process by which the mind transforms raw perception into structured understanding. It encompasses everything from simple pattern recognition to abstract reasoning about concepts that have never been directly observed. To think well is to move deliberately through this process, resisting the shortcuts that lead to error.",
            order: 1,
            createdAt: SEED_TIMESTAMP,
            updatedAt: SEED_TIMESTAMP,
          },
          {
            id: "page-1-1-2",
            title: "Mental models",
            content:
              "A mental model is a compressed representation of how something works. The best thinkers carry a diverse toolkit of models drawn from mathematics, physics, biology, economics, and history. When a new problem arrives, they reach for the model that fits most naturally and stress-test it against the evidence at hand.",
            order: 2,
            createdAt: SEED_TIMESTAMP,
            updatedAt: SEED_TIMESTAMP,
          },
        ],
      },
      {
        id: "chapter-1-2",
        title: "Applied Reasoning",
        order: 2,
        createdAt: SEED_TIMESTAMP,
        updatedAt: SEED_TIMESTAMP,
        pages: [
          {
            id: "page-1-2-1",
            title: "Decision frameworks",
            content:
              "Structured decision frameworks impose discipline on choices that would otherwise be driven by emotion or habit. By explicitly enumerating options, criteria, and trade-offs, a framework exposes the hidden assumptions behind any preference. The goal is not to eliminate judgment but to make it legible and revisable.",
            order: 1,
            createdAt: SEED_TIMESTAMP,
            updatedAt: SEED_TIMESTAMP,
          },
          {
            id: "page-1-2-2",
            title: "Avoiding bias",
            content:
              "Cognitive biases are systematic errors in judgment that arise from the heuristics our minds use to save effort. Confirmation bias, availability bias, and anchoring are among the most consequential. Awareness alone is not enough to escape them — building external checks and seeking disconfirming evidence are the reliable antidotes.",
            order: 2,
            createdAt: SEED_TIMESTAMP,
            updatedAt: SEED_TIMESTAMP,
          },
        ],
      },
    ],
  },
  {
    id: "book-2",
    title: "Across the Archipelago",
    author: "Jules Verne",
    description:
      "An adventure through uncharted island chains where every horizon promises discovery and every current holds secrets.",
    coverColor: "#0891b2",
    genre: "Historical Drama" as BookGenre,
    createdAt: SEED_TIMESTAMP,
    updatedAt: SEED_TIMESTAMP,
    chapters: [
      {
        id: "chapter-2-1",
        title: "Departure",
        order: 1,
        createdAt: SEED_TIMESTAMP,
        updatedAt: SEED_TIMESTAMP,
        pages: [
          {
            id: "page-2-1-1",
            title: "The harbor at dawn",
            content:
              "The harbor stirred before the sun had fully cleared the eastern ridge, its masts and rigging emerging from the mist like the bare fingers of some vast outstretched hand. Dock workers moved in practiced silence, coiling lines and stacking provisions while gulls wheeled overhead. By the time the first light struck the water, the ship was ready.",
            order: 1,
            createdAt: SEED_TIMESTAMP,
            updatedAt: SEED_TIMESTAMP,
          },
          {
            id: "page-2-1-2",
            title: "Setting course",
            content:
              "The navigator spread the charts across the table and traced the route with a weathered finger. Beyond the last marked island lay only conjecture — dotted lines and optimistic annotations left by sailors who had never returned to confirm them. The captain studied the gaps between the known and the unknown, then gave the order to proceed.",
            order: 2,
            createdAt: SEED_TIMESTAMP,
            updatedAt: SEED_TIMESTAMP,
          },
        ],
      },
      {
        id: "chapter-2-2",
        title: "The First Island",
        order: 2,
        createdAt: SEED_TIMESTAMP,
        updatedAt: SEED_TIMESTAMP,
        pages: [
          {
            id: "page-2-2-1",
            title: "Landfall",
            content:
              "The island announced itself first as a smell — green and damp and alive in a way that salt air never is. Then the ridge line appeared above the horizon, dark against the pale sky. After seventeen days at sea, the crew lined the rail in silence, each person holding the sight in their eyes as though it might dissolve if they spoke.",
            order: 1,
            createdAt: SEED_TIMESTAMP,
            updatedAt: SEED_TIMESTAMP,
          },
          {
            id: "page-2-2-2",
            title: "The village",
            content:
              "The village sat at the edge of a small bay, its houses built from coral stone and roofed with broad leaves that shed the tropical rain in curtains. The inhabitants watched the strangers come ashore with neither alarm nor enthusiasm, as people do when they have seen ships come and go across many generations. Trade was conducted in gestures and goodwill.",
            order: 2,
            createdAt: SEED_TIMESTAMP,
            updatedAt: SEED_TIMESTAMP,
          },
        ],
      },
    ],
  },
];

export function getBooks(): Book[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const envelope = JSON.parse(raw) as StorageEnvelope;
    if (!Array.isArray(envelope.books)) return [];

    return envelope.books;
  } catch {
    return [];
  }
}

export function saveBooks(books: Book[]): void {
  if (typeof window === "undefined") return;

  const envelope: StorageEnvelope = { version: 1, books };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(envelope));
}

export function seedBooksIfEmpty(): void {
  const existing = getBooks();
  if (existing.length === 0) {
    saveBooks(SEED_BOOKS);
  }
}
