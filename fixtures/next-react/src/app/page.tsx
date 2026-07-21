"use client";
import { AnuimeAccordion } from "@/components/ui/anuime-accordion";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeSwitch } from "@/components/ui/anuime-switch";
import { createAnuimeRecipe } from "@/lib/anuime-recipe";
const recipe = createAnuimeRecipe("mochi");
export default function Page() {
  return (
    <main>
      <AnuimeButton recipe={recipe}>Dream Cache</AnuimeButton>
      <AnuimeSwitch recipe={recipe} label="Power" />
      <AnuimeAccordion
        recipe={recipe}
        items={[{ id: "a", title: "Fixture", content: "Next.js renders installed source." }]}
      />
    </main>
  );
}
