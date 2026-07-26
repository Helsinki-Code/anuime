import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeOrbitMap } from "./anuime-orbit-map";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeOrbitMap character={character} className="mx-auto" />;
}
