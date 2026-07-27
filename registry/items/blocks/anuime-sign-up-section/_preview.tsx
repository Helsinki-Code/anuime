"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeSignUpSection } from "./anuime-sign-up-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeSignUpSection character={character} />;
}
