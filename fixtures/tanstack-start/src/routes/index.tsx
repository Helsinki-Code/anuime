import { createFileRoute } from "@tanstack/react-router";

import { AnuimeAccordion } from "@/components/ui/anuime-accordion";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeSwitch } from "@/components/ui/anuime-switch";
import { createAnuimeRecipe } from "@/lib/anuime-recipe";
const recipe = createAnuimeRecipe("atlas");
export const Route = createFileRoute("/")({
  component: () => (
    <main>
      <AnuimeButton recipe={recipe}>Gridforge</AnuimeButton>
      <AnuimeSwitch recipe={recipe} label="Power" />
      <AnuimeAccordion
        recipe={recipe}
        items={[{ id: "a", title: "Fixture", content: "TanStack Start renders installed source." }]}
      />
    </main>
  ),
});
