"use client";

import { AnuimeButton } from "./anuime-button";

export function Preview() {
  return (
    <div className="flex flex-wrap gap-3">
      <AnuimeButton character="kira">Activate</AnuimeButton>
      <AnuimeButton character="mochi">Create magic</AnuimeButton>
      <AnuimeButton character="atlas">Initialize</AnuimeButton>
    </div>
  );
}
