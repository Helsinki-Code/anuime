import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeConfettiField } from "./anuime-confetti-field";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeConfettiField
      character={character}
      className="grid place-items-center border border-border"
    >
      <strong>Published successfully</strong>
    </AnuimeConfettiField>
  );
}
