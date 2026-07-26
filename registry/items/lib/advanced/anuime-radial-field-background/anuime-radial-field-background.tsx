import type { HTMLAttributes, ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeRadialFieldBackgroundProps = HTMLAttributes<HTMLDivElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  children?: ReactNode;
  origin?: "center" | "top-left" | "top-right";
};

const origins = {
  center: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
  "top-left": "left-0 top-0 -translate-x-1/3 -translate-y-1/3",
  "top-right": "right-0 top-0 translate-x-1/3 -translate-y-1/3",
} as const;

const fields = {
  kira: {
    ring: "size-48 rounded-full border border-[var(--anuime-accent,var(--accent))]",
    core: "left-1/2 top-1/2 h-14 w-px bg-[var(--anuime-accent,var(--accent))]",
  },
  mochi: {
    ring: "size-64 rounded-full border-[22px] border-[var(--anuime-accent,var(--accent))] opacity-10 shadow-[0_0_0_34px_var(--anuime-accent,var(--accent))]",
    core: "hidden",
  },
  atlas: {
    ring: "size-48 rounded-full border-2 border-[var(--anuime-accent,var(--accent))] shadow-[inset_0_0_0_12px_var(--anuime-surface,var(--background))]",
    core: "left-1/2 top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--anuime-accent,var(--accent))]",
  },
} as const;

export function AnuimeRadialFieldBackground({
  character = "mochi",
  recipe,
  children,
  origin = "center",
  className = "",
  ...props
}: AnuimeRadialFieldBackgroundProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  const system = styles.recipe.structureSystem;
  const construction = fields[system];

  return (
    <div
      data-character={system}
      data-anuime-component="radial-field-background"
      data-anuime-tier="expressive"
      data-anuime-context="ambient"
      className={`relative isolate overflow-hidden bg-background text-foreground ${className}`}
      {...props}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -z-10 opacity-25 ${origins[origin]}`}
      >
        <div className={construction.ring} />
        <span className={`absolute ${construction.core}`} />
      </div>
      {children}
    </div>
  );
}
