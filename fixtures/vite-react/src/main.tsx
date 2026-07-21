import React from "react";
import { createRoot } from "react-dom/client";

import { AnuimeAccordion } from "@/components/ui/anuime-accordion";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeSwitch } from "@/components/ui/anuime-switch";
import { createAnuimeRecipe } from "@/lib/anuime-recipe";
const recipe = createAnuimeRecipe("kira");
function App() {
  return (
    <main>
      <AnuimeButton recipe={recipe}>Signal Cut</AnuimeButton>
      <AnuimeSwitch recipe={recipe} label="Power" />
      <AnuimeAccordion
        recipe={recipe}
        items={[{ id: "a", title: "Fixture", content: "Vite renders installed source." }]}
      />
    </main>
  );
}
createRoot(document.getElementById("root")!).render(<App />);
