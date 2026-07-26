"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeCodeDiff } from "./anuime-code-diff";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeCodeDiff
      character={character}
      lines={[
        { kind: "context", content: "export function App() {", oldLine: 1, newLine: 1 },
        { kind: "removal", content: "  return <Button />", oldLine: 2 },
        { kind: "addition", content: "  return <AnuimeButton />", newLine: 2 },
        { kind: "context", content: "}", oldLine: 3, newLine: 3 },
      ]}
      className="w-full max-w-lg"
    />
  );
}
