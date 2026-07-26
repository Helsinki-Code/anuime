import type { HTMLAttributes, ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeFramedBackgroundProps = HTMLAttributes<HTMLDivElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  children?: ReactNode;
};

const frames = {
  kira: {
    shell: "rounded-[8px] border-[var(--anuime-border-strong,var(--border))]",
    inset: "inset-3 rounded-[5px] border border-[var(--anuime-accent,var(--accent))] opacity-35",
  },
  mochi: {
    shell: "rounded-[14px] border-[var(--anuime-secondary-accent,var(--border))]",
    inset: "inset-x-5 top-3 h-px bg-[var(--anuime-secondary-accent,var(--border))] opacity-70",
  },
  atlas: {
    shell: "rounded-[9px] border-[var(--anuime-border-strong,var(--border))]",
    inset:
      "inset-3 border-[var(--anuime-accent,var(--accent))] bg-[linear-gradient(var(--anuime-accent,var(--accent))_0_0)] bg-[length:18px_2px] bg-left-top bg-no-repeat opacity-60",
  },
} as const;

export function AnuimeFramedBackground({
  character = "atlas",
  recipe,
  children,
  className = "",
  ...props
}: AnuimeFramedBackgroundProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  const system = styles.recipe.structureSystem;
  const construction = frames[system];

  return (
    <div
      data-character={system}
      data-anuime-component="framed-background"
      data-anuime-tier="expressive"
      data-anuime-context="ambient"
      className={`relative isolate overflow-hidden border bg-background text-foreground ${construction.shell} ${className}`}
      {...props}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -z-10 ${construction.inset}`}
      />
      {system === "atlas" ? (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-3 right-3 size-4 border-t-2 border-r-2 border-[var(--anuime-accent,var(--accent))]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3 left-3 size-4 border-b-2 border-l-2 border-[var(--anuime-accent,var(--accent))]"
          />
        </>
      ) : null}
      {children}
    </div>
  );
}
