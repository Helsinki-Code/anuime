"use client";

import { AnuimeSwitch } from "./anuime-switch";

export function Preview() {
  return (
    <div className="rounded-[14px] border border-[#e8dcc8] bg-[#fffdfa] p-6 text-[#3d2e33] [--accent:#c2708a] [--anuime-accent:#c2708a] [--anuime-border-strong:#ddd0bb] [--anuime-secondary-accent:#b08d57] [--anuime-surface:#fffdfa] [--background:#faf6f1] [--input:#ddd0bb] [--muted-foreground:#8a7a80] [--ring:#c2708a]">
      <AnuimeSwitch
        character="mochi"
        label="Keep the pearl lit"
        description="Rose carries state; champagne gold stays at the rim."
        defaultChecked
      />
    </div>
  );
}
