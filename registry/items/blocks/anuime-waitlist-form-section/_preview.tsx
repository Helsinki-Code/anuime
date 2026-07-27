"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeWaitlistFormSection } from "./anuime-waitlist-form-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeWaitlistFormSection character={character} />;
}
