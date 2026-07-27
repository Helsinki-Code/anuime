"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeLeadershipSection } from "./anuime-leadership-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeLeadershipSection character={character} />;
}
