"use client";
import { AnuimeDialog } from "./anuime-dialog";
export function Preview() {
  return (
    <AnuimeDialog
      character="atlas"
      title="Initialize system?"
      description="Your current recipe is valid and ready for installation."
      triggerLabel="Open transmission"
    >
      <p className="text-sm">All accessibility and compatibility checks passed.</p>
    </AnuimeDialog>
  );
}
