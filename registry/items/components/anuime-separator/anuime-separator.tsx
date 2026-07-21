import type { HTMLAttributes } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeSeparatorProps = HTMLAttributes<HTMLDivElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
};

export function AnuimeSeparator({
  character = "kira",
  recipe,
  orientation = "horizontal",
  decorative = true,
  className = "",
  ...props
}: AnuimeSeparatorProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  return (
    <div
      role={decorative ? "presentation" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      className={`${styles.accent} shrink-0 bg-current opacity-30 ${orientation === "horizontal" ? "h-px w-full" : "h-full min-h-6 w-px"} ${className}`}
      {...props}
    />
  );
}
