"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeWaitlistSuccessSection } from "./anuime-waitlist-success-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeWaitlistSuccessSection character={character} />;
}
