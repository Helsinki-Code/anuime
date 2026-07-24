import type { ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeHoverCardProps = {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  trigger?: ReactNode;
  children?: ReactNode;
};

export function AnuimeHoverCard({
  character = "mochi",
  recipe,
  trigger = "Focus or hover for details",
  children = "Helpful context appears without blocking the active task.",
}: AnuimeHoverCardProps) {
  const styles = resolveAnuimeRecipe(recipe, character, "hover-card");
  return (
    <span className="group relative inline-block">
      <button
        type="button"
        aria-describedby="anuime-hover-card"
        className={`${styles.secondary} ${styles.control}`}
      >
        {trigger}
      </button>
      <span
        id="anuime-hover-card"
        role="tooltip"
        className={`${styles.surface} ${styles.surfacePadding} invisible absolute bottom-full left-1/2 z-30 mb-2 block w-64 -translate-x-1/2 text-sm opacity-0 shadow-xl transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100 motion-reduce:transition-none`}
      >
        {children}
      </span>
    </span>
  );
}
