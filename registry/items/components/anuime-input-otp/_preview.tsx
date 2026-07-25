"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeInputOtp } from "./anuime-input-otp";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeInputOtp character={character} />;
}
