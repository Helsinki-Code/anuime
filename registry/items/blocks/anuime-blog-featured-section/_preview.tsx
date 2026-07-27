"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeBlogFeaturedSection } from "./anuime-blog-featured-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeBlogFeaturedSection character={character} />;
}
