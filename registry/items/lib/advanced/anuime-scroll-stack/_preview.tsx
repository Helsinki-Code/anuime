"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeScrollStack } from "./anuime-scroll-stack";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeScrollStack
      character={character}
      style={{ minHeight: "32rem" }}
      items={[
        {
          id: "one",
          content: (
            <div>
              <strong>Discover</strong>
              <p className="text-sm text-muted-foreground">Find the structure.</p>
            </div>
          ),
        },
        {
          id: "two",
          content: (
            <div>
              <strong>Compose</strong>
              <p className="text-sm text-muted-foreground">Assign the character.</p>
            </div>
          ),
        },
        {
          id: "three",
          content: (
            <div>
              <strong>Review</strong>
              <p className="text-sm text-muted-foreground">Protect the laws.</p>
            </div>
          ),
        },
      ]}
    />
  );
}
