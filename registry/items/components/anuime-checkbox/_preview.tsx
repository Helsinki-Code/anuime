"use client";

import { AnuimeCheckbox } from "./anuime-checkbox";

export function Preview() {
  return (
    <div className="rounded-[8px] border border-[#e4dfee] bg-[#fdfcff] p-6 text-[#241d31] [--accent:#0aa3c2] [--anuime-accent:#0aa3c2] [--anuime-border-strong:#d5cfe3] [--anuime-surface:#fdfcff] [--background:#f7f5fa] [--input:#d5cfe3] [--muted-foreground:#6f6880] [--ring:#0aa3c2]">
      <AnuimeCheckbox
        character="kira"
        label="Trace the collar circuit"
        description="Kira uses a mitered hairpin check—never pill geometry."
        defaultChecked
      />
    </div>
  );
}
