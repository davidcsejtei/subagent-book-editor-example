"use client";

import { useEffect } from "react";
import { seedBooksIfEmpty } from "@/lib/storage";

export default function StorageInitializer() {
  useEffect(() => {
    seedBooksIfEmpty();
  }, []);

  return null;
}
