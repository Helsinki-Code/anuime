"use client";

import { AnuimeTooltip } from "./anuime-tooltip";

export function Preview() {
  return (
    <AnuimeTooltip label="A contextual power hint">
      <button className="rounded border px-4 py-2">Focus me</button>
    </AnuimeTooltip>
  );
}
