import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimePageLoader } from "./anuime-page-loader";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimePageLoader character={character} />;
}
