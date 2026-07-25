"use client";

import { useState } from "react";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimePagination } from "./anuime-pagination";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  const [page, setPage] = useState(2);
  return (
    <AnuimePagination character={character} page={page} pageCount={4} onPageChange={setPage} />
  );
}
