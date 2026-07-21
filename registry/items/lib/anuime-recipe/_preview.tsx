"use client";

import { createAnuimeRecipe, encodeAnuimeRecipe } from "./anuime-recipe";

export function Preview() {
  return (
    <pre className="rounded-lg border bg-muted p-4 text-xs">
      {encodeAnuimeRecipe(createAnuimeRecipe("kira"))}
    </pre>
  );
}
