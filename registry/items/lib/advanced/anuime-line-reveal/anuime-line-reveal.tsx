import type { HTMLAttributes, ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeLineRevealProps = HTMLAttributes<HTMLSpanElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  children: ReactNode;
  active?: boolean;
};

const reveals = {
  kira: {
    text: "motion-safe:animate-[anuime-reveal-kira_1.7s_ease-out_both]",
    line: "left-[-20%] top-1/2 h-px w-[140%] origin-left rotate-[114deg] bg-[var(--anuime-accent,var(--accent))] motion-safe:animate-[anuime-line-kira_1.7s_ease-out_both]",
  },
  mochi: {
    text: "motion-safe:animate-[anuime-reveal-mochi_1.7s_ease-in-out_both]",
    line: "right-0 bottom-0 left-0 h-px bg-[var(--anuime-secondary-accent,var(--border))] motion-safe:animate-[anuime-line-mochi_1.7s_ease-in-out_both]",
  },
  atlas: {
    text: "motion-safe:animate-[anuime-reveal-atlas_1.7s_ease-out_both]",
    line: "left-[-20%] top-1/2 h-0.5 w-[140%] rotate-[76deg] bg-[var(--anuime-accent,var(--accent))] motion-safe:animate-[anuime-line-atlas_1.7s_linear_both]",
  },
} as const;

export function AnuimeLineReveal({
  character = "kira",
  recipe,
  children,
  active = true,
  className = "",
  ...props
}: AnuimeLineRevealProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  const system = styles.recipe.structureSystem;
  const construction = reveals[system];

  return (
    <span
      data-character={system}
      data-anuime-component="line-reveal"
      data-anuime-tier="expressive"
      data-anuime-context="transition"
      className={`anuime-line-reveal relative inline-grid overflow-hidden text-foreground ${className}`}
      {...props}
    >
      <span className={active ? construction.text : ""}>{children}</span>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute ${active ? construction.line : "hidden"}`}
      />
      <style>{`@keyframes anuime-reveal-kira{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0)}}@keyframes anuime-line-kira{0%{transform:translateX(-110%) rotate(114deg)}70%,100%{transform:translateX(110%) rotate(114deg)}}@keyframes anuime-reveal-mochi{from{opacity:0;transform:translateY(3px)}to{opacity:1;transform:translateY(0)}}@keyframes anuime-line-mochi{0%{transform:scaleX(0)}45%,100%{transform:scaleX(1)}}@keyframes anuime-reveal-atlas{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0)}}@keyframes anuime-line-atlas{0%{transform:translateX(-120%) rotate(76deg)}70%,100%{transform:translateX(120%) rotate(76deg)}}@media(prefers-reduced-motion:reduce){.anuime-line-reveal *{animation:none!important;clip-path:none!important;transform:none!important}}`}</style>
    </span>
  );
}
