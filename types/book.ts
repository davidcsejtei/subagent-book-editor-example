export interface Page {
  id: string;
  title: string;
  content: string;
  order: number;
  createdAt: string; // ISO 8601
  updatedAt: string;
}

export interface Chapter {
  id: string;
  title: string;
  order: number;
  pages: Page[];
  createdAt: string;
  updatedAt: string;
}

export type BookGenre =
  | "Literary Fiction"
  | "Historical Drama"
  | "Romance"
  | "Science Fiction"
  | "Draft";

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverColor: string; // hex color for UI placeholder
  genre: BookGenre;
  chapters: Chapter[];
  createdAt: string;
  updatedAt: string;
}
