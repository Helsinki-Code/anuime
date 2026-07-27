"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeChangelogFeedSection } from "./anuime-changelog-feed-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeChangelogFeedSection character={character} />;
}
