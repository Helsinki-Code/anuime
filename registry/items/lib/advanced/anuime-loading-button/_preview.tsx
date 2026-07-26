"use client";

import { useState } from "react";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeLoadingButton } from "./anuime-loading-button";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  const [loading, setLoading] = useState(true);
  return (
    <AnuimeLoadingButton character={character} loading={loading} onClick={() => setLoading(true)}>
      Generate report
    </AnuimeLoadingButton>
  );
}
