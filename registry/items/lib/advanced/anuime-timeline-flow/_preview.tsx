import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeTimelineFlow } from "./anuime-timeline-flow";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeTimelineFlow
      character={character}
      currentId="build"
      items={[
        { id: "map", title: "Map", detail: "Character laws resolved" },
        { id: "build", title: "Build", detail: "Atomic construction active" },
        { id: "ship", title: "Ship", detail: "Awaiting approval" },
      ]}
    />
  );
}
