import type { HTMLAttributes, ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeBeamBackgroundProps = HTMLAttributes<HTMLDivElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  children?: ReactNode;
  active?: boolean;
};

const beams = {
  kira: {
    primary: "left-[-35%] top-[42%] h-px w-[170%] rotate-[114deg]",
    support: "left-[-28%] top-[48%] h-px w-[170%] rotate-[114deg]",
    animation: "motion-safe:animate-[anuime-beam-kira_1.8s_linear_infinite]",
  },
  mochi: {
    primary:
      "left-[15%] top-[20%] h-28 w-[70%] rounded-[50%] border-b border-[var(--anuime-secondary-accent,var(--border))]",
    support:
      "left-[20%] top-[28%] h-24 w-[60%] rounded-[50%] border-b border-[var(--anuime-border-strong,var(--border))]",
    animation: "motion-safe:animate-[anuime-beam-mochi_2.6s_ease-in-out_infinite]",
  },
  atlas: {
    primary: "left-[-35%] top-[42%] h-0.5 w-[170%] rotate-[76deg]",
    support: "left-[-28%] top-[48%] h-px w-[170%] rotate-[76deg]",
    animation: "motion-safe:animate-[anuime-beam-atlas_2.2s_linear_infinite]",
  },
} as const;

export function AnuimeBeamBackground({
  character = "atlas",
  recipe,
  children,
  active = false,
  className = "",
  ...props
}: AnuimeBeamBackgroundProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  const system = styles.recipe.structureSystem;
  const construction = beams[system];

  return (
    <div
      data-character={system}
      data-anuime-component="beam-background"
      data-anuime-tier="expressive"
      data-anuime-context={active ? "transition" : "ambient"}
      className={`anuime-beam relative isolate overflow-hidden bg-background text-foreground ${className}`}
      {...props}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-10 opacity-25 ${active ? construction.animation : ""}`}
      >
        <span
          className={`absolute bg-[var(--anuime-accent,var(--accent))] ${construction.primary}`}
        />
        <span
          className={`absolute bg-[var(--anuime-border-strong,var(--border))] ${construction.support}`}
        />
      </div>
      {children}
      <style>{`@keyframes anuime-beam-kira{to{transform:translateX(32px)}}@keyframes anuime-beam-mochi{50%{transform:translateY(8px)}}@keyframes anuime-beam-atlas{to{transform:translateX(24px)}}@media(prefers-reduced-motion:reduce){.anuime-beam *{animation:none!important}}`}</style>
    </div>
  );
}
