import type { HTMLAttributes, ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeLineGridBackgroundProps = HTMLAttributes<HTMLDivElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  children?: ReactNode;
};

const fields = {
  kira: {
    field:
      "bg-[repeating-linear-gradient(114deg,transparent_0_31px,var(--anuime-border-strong,var(--border))_31px_32px)]",
    marker: "left-8 top-8 size-1.5 rounded-full border border-[var(--anuime-accent,var(--accent))]",
  },
  mochi: {
    field:
      "bg-[repeating-linear-gradient(0deg,transparent_0_30px,var(--anuime-secondary-accent,var(--border))_30px_31px,transparent_31px_35px,var(--anuime-border-strong,var(--border))_35px_36px)]",
    marker:
      "left-8 top-[30px] size-2 rounded-full border border-[var(--anuime-secondary-accent,var(--border))] bg-[var(--anuime-surface,var(--background))]",
  },
  atlas: {
    field:
      "bg-[linear-gradient(var(--anuime-border-strong,var(--border))_1px,transparent_1px),linear-gradient(90deg,var(--anuime-border-strong,var(--border))_1px,transparent_1px)] bg-[size:24px_24px]",
    marker: "left-6 top-6 size-2 rotate-45 bg-[var(--anuime-accent,var(--accent))]",
  },
} as const;

export function AnuimeLineGridBackground({
  character = "kira",
  recipe,
  children,
  className = "",
  ...props
}: AnuimeLineGridBackgroundProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  const system = styles.recipe.structureSystem;
  const construction = fields[system];

  return (
    <div
      data-character={system}
      data-anuime-component="line-grid-background"
      data-anuime-tier="expressive"
      data-anuime-context="ambient"
      className={`relative isolate overflow-hidden bg-background text-foreground ${className}`}
      {...props}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-10 opacity-25 ${construction.field}`}
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -z-10 ${construction.marker}`}
      />
      {children}
    </div>
  );
}
