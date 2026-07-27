"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeContactSupportSection } from "./anuime-contact-support-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeContactSupportSection character={character} />;
}
