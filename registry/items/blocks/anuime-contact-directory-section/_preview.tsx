"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeContactDirectorySection } from "./anuime-contact-directory-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeContactDirectorySection character={character} />;
}
