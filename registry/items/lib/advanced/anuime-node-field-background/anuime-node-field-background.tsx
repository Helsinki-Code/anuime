import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeNodeFieldBackgroundProps = HTMLAttributes<HTMLDivElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  children?: ReactNode;
};

const stations = [
  ["16%", "26%"],
  ["38%", "68%"],
  ["62%", "22%"],
  ["82%", "58%"],
] as const;

const nodeStyles = {
  kira: "size-2 rounded-full border border-[var(--anuime-accent,var(--accent))]",
  mochi:
    "size-2.5 rounded-full border border-[var(--anuime-secondary-accent,var(--border))] bg-[var(--anuime-surface,var(--background))]",
  atlas: "size-2 rotate-45 border border-[var(--anuime-accent,var(--accent))]",
} as const;

export function AnuimeNodeFieldBackground({
  character = "kira",
  recipe,
  children,
  className = "",
  ...props
}: AnuimeNodeFieldBackgroundProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  const system = styles.recipe.structureSystem;

  return (
    <div
      data-character={system}
      data-anuime-component="node-field-background"
      data-anuime-tier="expressive"
      data-anuime-context="ambient"
      className={`relative isolate overflow-hidden bg-background text-foreground ${className}`}
      {...props}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-30">
        <span className="absolute top-1/2 left-[16%] h-px w-2/3 bg-[var(--anuime-border-strong,var(--border))]" />
        {stations.map(([left, top]) => (
          <span
            key={`${left}-${top}`}
            className={`absolute ${nodeStyles[system]}`}
            style={{ left, top } as CSSProperties}
          />
        ))}
      </div>
      {children}
    </div>
  );
}
