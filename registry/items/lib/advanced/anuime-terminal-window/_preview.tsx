"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeTerminalWindow } from "./anuime-terminal-window";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeTerminalWindow
      character={character}
      entries={[
        {
          command: "npx shadcn@latest add anuime-button",
          output: "Created components/ui/anuime-button.tsx",
        },
        { command: "vp test run", output: "Tests 305 passed" },
      ]}
      className="w-full max-w-lg"
    />
  );
}
