import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeNodeMap } from "./anuime-node-map";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeNodeMap
      character={character}
      nodes={[
        { id: "source", label: "Source", x: 18, y: 52, active: true },
        { id: "model", label: "Model", x: 50, y: 26 },
        { id: "output", label: "Output", x: 82, y: 64 },
      ]}
      links={[
        ["source", "model"],
        ["model", "output"],
      ]}
    />
  );
}
