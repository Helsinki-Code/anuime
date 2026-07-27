"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeContactFormSection } from "./anuime-contact-form-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeContactFormSection character={character} />;
}
