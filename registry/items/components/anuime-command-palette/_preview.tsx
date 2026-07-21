"use client";
import { AnuimeCommandPalette } from "./anuime-command-palette";
export function Preview() {
  return (
    <AnuimeCommandPalette
      character="kira"
      commands={[
        { id: "kira", label: "Cast Kira", group: "Characters", shortcut: "K" },
        { id: "mochi", label: "Cast Mochi", group: "Characters", shortcut: "M" },
        { id: "atlas", label: "Cast Atlas", group: "Characters", shortcut: "A" },
        { id: "install", label: "Copy install command", group: "Actions", shortcut: "I" },
      ]}
    />
  );
}
