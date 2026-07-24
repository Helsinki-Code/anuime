"use client";

import { AnuimeProgress } from "./anuime-progress";

export function Preview() {
  return (
    <div className="rounded-[9px] border border-[#d9e0ea] bg-[#fcfdfe] p-6 text-[#2a3340] [--accent:#2458c5] [--anuime-accent:#2458c5] [--anuime-border-strong:#c8d2e0] [--anuime-surface:#fcfdfe] [--background:#f4f6f9] [--border:#d9e0ea] [--input:#c8d2e0] [--muted-foreground:#6b7686]">
      <AnuimeProgress character="atlas" label="Docking sequence" value={68} />
    </div>
  );
}
