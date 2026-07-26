import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeParticleField } from "./anuime-particle-field";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeParticleField character={character} className="grid place-items-center">
      <strong>Sparse, deterministic atmosphere</strong>
    </AnuimeParticleField>
  );
}
