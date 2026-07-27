"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeSignInSection } from "./anuime-sign-in-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeSignInSection character={character} />;
}
