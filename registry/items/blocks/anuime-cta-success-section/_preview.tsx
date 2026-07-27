"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeCtaSuccessSection } from "./anuime-cta-success-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeCtaSuccessSection character={character} />;
}
