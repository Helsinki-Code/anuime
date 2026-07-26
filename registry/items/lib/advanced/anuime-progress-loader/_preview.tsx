import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeProgressLoader } from "./anuime-progress-loader";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeProgressLoader character={character} value={68} />;
}
