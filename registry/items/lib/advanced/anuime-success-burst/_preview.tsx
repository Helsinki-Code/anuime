import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeSuccessBurst } from "./anuime-success-burst";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeSuccessBurst character={character} className="mx-auto" />;
}
