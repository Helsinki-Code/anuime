import type { HTMLAttributes, ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeMetricCardProps = HTMLAttributes<HTMLElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  label: ReactNode;
  value: ReactNode;
  delta?: ReactNode;
  direction?: "up" | "down" | "flat";
};

const metricStyles = {
  kira: {
    rail: "h-px bg-[var(--anuime-border-strong,var(--border))]",
    marker: "size-2 rounded-full border border-[var(--anuime-accent,var(--accent))]",
  },
  mochi: {
    rail: "h-px bg-[var(--anuime-secondary-accent,var(--border))]",
    marker:
      "size-2.5 rounded-full border border-[var(--anuime-secondary-accent,var(--border))] bg-[var(--anuime-surface,var(--background))]",
  },
  atlas: {
    rail: "h-1 bg-[repeating-linear-gradient(90deg,var(--anuime-accent,var(--accent))_0_12px,transparent_12px_16px)]",
    marker: "size-2 rotate-45 bg-[var(--anuime-accent,var(--accent))]",
  },
} as const;

export function AnuimeMetricCard({
  character = "atlas",
  recipe,
  label,
  value,
  delta,
  direction = "flat",
  className = "",
  ...props
}: AnuimeMetricCardProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  const system = styles.recipe.structureSystem;
  const construction = metricStyles[system];

  return (
    <article
      data-character={system}
      data-anuime-component="metric-card"
      data-direction={direction}
      className={`${styles.surface} ${styles.surfacePadding} ${className}`}
      {...props}
    >
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className={construction.marker} />
        <p className="text-sm font-semibold text-muted-foreground">{label}</p>
      </div>
      <div className="mt-5 flex items-end justify-between gap-4">
        <strong
          className={`text-3xl tracking-tight ${system === "mochi" ? "font-serif" : "font-mono"}`}
        >
          {value}
        </strong>
        {delta ? (
          <span className="font-mono text-xs font-semibold text-foreground">{delta}</span>
        ) : null}
      </div>
      <div aria-hidden="true" className={`mt-5 ${construction.rail}`} />
    </article>
  );
}
