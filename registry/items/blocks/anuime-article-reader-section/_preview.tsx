"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeArticleReaderSection } from "./anuime-article-reader-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeArticleReaderSection character={character} />;
}
