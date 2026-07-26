import type { HTMLAttributes, ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeConnectionBeamProps = HTMLAttributes<HTMLDivElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  active?: boolean;
  start?: ReactNode;
  end?: ReactNode;
};

export function AnuimeConnectionBeam({
  character = "kira",
  recipe,
  active = true,
  start = "A",
  end = "B",
  className = "",
  ...props
}: AnuimeConnectionBeamProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  const system = styles.recipe.structureSystem;

  return (
    <div
      data-character={system}
      data-anuime-component="connection-beam"
      data-anuime-tier="expressive"
      data-anuime-context="transition"
      className={`relative flex min-h-40 items-center justify-between overflow-hidden border border-border bg-[var(--anuime-surface,var(--background))] p-6 text-foreground ${
        system === "kira"
          ? "rounded-[5px]"
          : system === "mochi"
            ? "rounded-[10px]"
            : "rounded-[7px]"
      } ${className}`}
      {...props}
    >
      <Endpoint character={system}>{start}</Endpoint>
      {system === "mochi" ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 240 100"
          className="pointer-events-none absolute inset-x-12 top-1/2 h-24 -translate-y-1/2"
          preserveAspectRatio="none"
        >
          <path d="M0 50 Q120 92 240 50" fill="none" stroke="var(--border)" strokeWidth="1.2" />
          <circle
            r="4"
            fill="var(--anuime-surface,var(--background))"
            stroke="var(--anuime-accent,var(--accent))"
            className={active ? "motion-reduce:hidden" : "hidden"}
          >
            <animateMotion dur="2.6s" repeatCount="indefinite" path="M0 50 Q120 92 240 50" />
          </circle>
        </svg>
      ) : (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute top-1/2 left-1/2 h-px w-52 -translate-x-1/2 -translate-y-1/2 bg-border ${
            system === "kira" ? "rotate-[114deg]" : "rotate-[76deg]"
          }`}
        >
          <span
            className={`absolute top-1/2 left-0 size-2 -translate-y-1/2 border border-[var(--anuime-accent,var(--accent))] ${
              system === "kira" ? "rounded-full" : "rotate-45"
            } ${
              active
                ? "motion-safe:animate-[anuime-connection-travel_1700ms_ease-in-out_infinite] motion-reduce:animate-none"
                : ""
            }`}
          />
        </span>
      )}
      <Endpoint character={system}>{end}</Endpoint>
      <style>{`@keyframes anuime-connection-travel{0%{left:0}100%{left:100%}}`}</style>
    </div>
  );
}

function Endpoint({
  character,
  children,
}: {
  character: "kira" | "mochi" | "atlas";
  children: ReactNode;
}) {
  return (
    <span className="relative z-10 grid size-12 place-items-center border border-border bg-[var(--anuime-elevated,var(--popover))] font-mono text-xs">
      {children}
      {character === "kira" ? (
        <span className="absolute -top-1 -right-1 size-2 rounded-full border border-[var(--anuime-accent,var(--accent))]" />
      ) : null}
      {character === "mochi" ? (
        <span className="absolute -top-1 -right-1 size-2 rounded-full border border-[var(--anuime-accent,var(--accent))] bg-[var(--anuime-surface,var(--background))]" />
      ) : null}
      {character === "atlas" ? (
        <span className="absolute -top-1 -right-1 size-2 rotate-45 border border-[var(--anuime-accent,var(--accent))]" />
      ) : null}
    </span>
  );
}
