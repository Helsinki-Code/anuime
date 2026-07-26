import type { HTMLAttributes, ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeSignalCardProps = HTMLAttributes<HTMLElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  label?: string;
  title: ReactNode;
  description?: ReactNode;
  status?: "healthy" | "attention" | "degraded";
  action?: ReactNode;
};

const signalStyles = {
  kira: {
    healthy: "size-2 rounded-full border border-[var(--anuime-accent,var(--accent))]",
    attention: "size-2 rounded-full bg-[var(--anuime-accent,var(--accent))]",
    degraded: "h-3.5 w-1.5 -skew-x-[18deg] bg-destructive",
    rail: "h-px bg-[var(--anuime-border-strong,var(--border))]",
  },
  mochi: {
    healthy:
      "size-2.5 rounded-full border border-[var(--anuime-secondary-accent,var(--border))] bg-[var(--anuime-surface,var(--background))]",
    attention:
      "size-2.5 rounded-full border border-[var(--anuime-secondary-accent,var(--border))] bg-[var(--anuime-accent,var(--accent))]",
    degraded:
      "size-3 rotate-45 bg-destructive [clip-path:polygon(50%_0,62%_38%,100%_50%,62%_62%,50%_100%,38%_62%,0_50%,38%_38%)]",
    rail: "h-px bg-[var(--anuime-secondary-accent,var(--border))]",
  },
  atlas: {
    healthy: "size-2 rotate-45 border border-[var(--anuime-accent,var(--accent))]",
    attention: "size-2 rotate-45 bg-[var(--anuime-accent,var(--accent))]",
    degraded: "h-4 w-0.5 bg-destructive",
    rail: "h-1 bg-[repeating-linear-gradient(90deg,var(--anuime-border-strong,var(--border))_0_16px,transparent_16px_20px)]",
  },
} as const;

export function AnuimeSignalCard({
  character = "kira",
  recipe,
  label = "System signal",
  title,
  description,
  status = "healthy",
  action,
  className = "",
  ...props
}: AnuimeSignalCardProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  const system = styles.recipe.structureSystem;
  const construction = signalStyles[system];

  return (
    <article
      data-character={system}
      data-anuime-component="signal-card"
      data-status={status}
      className={`relative overflow-hidden ${styles.surface} ${styles.surfacePadding} ${className}`}
      {...props}
    >
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className={construction[status]} />
        <p className="font-mono text-xs tracking-[0.12em] text-muted-foreground uppercase">
          {label}
        </p>
        <span aria-hidden="true" className={`grow ${construction.rail}`} />
      </div>
      <h3 className={`mt-4 text-xl font-bold ${system === "mochi" ? "font-serif" : ""}`}>
        {title}
      </h3>
      {description ? (
        <div className="mt-2 text-sm leading-6 text-muted-foreground">{description}</div>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </article>
  );
}
