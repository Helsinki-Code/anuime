"use client";

import { useState } from "react";

import { AnuimePagination } from "./anuime-pagination";

export function Preview() {
  const [page, setPage] = useState(2);
  return <AnuimePagination page={page} pageCount={4} onPageChange={setPage} />;
}
