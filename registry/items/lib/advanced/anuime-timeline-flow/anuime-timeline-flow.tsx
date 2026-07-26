"use client";

import type { HTMLAttributes } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeTimelineItem = { id: string; title: string; detail?: string };
export type AnuimeTimelineFlowProps = HTMLAttributes<HTMLOListElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  items: readonly AnuimeTimelineItem[];
  currentId?: string;
};

export function AnuimeTimelineFlow({
  character = "atlas",
  recipe,
  items,
  currentId,
  className = "",
  ...props
}: AnuimeTimelineFlowProps) {
  const system = resolveAnuimeRecipe(recipe, character).recipe.structureSystem;

  return (
    <ol
      data-character={system}
      data-anuime-component="timeline-flow"
      className={`relative w-full space-y-5 before:absolute before:top-4 before:bottom-4 before:left-[7px] before:bg-border ${
        system === "atlas" ? "before:w-1" : "before:w-px"
      } ${className}`}
      {...props}
    >
      {items.map((item) => {
        const current = item.id === currentId;
        return (
          <li
            key={item.id}
            aria-current={current ? "step" : undefined}
            className="relative grid grid-cols-[1rem_1fr] gap-4"
          >
            <span className="z-10 mt-1 grid size-3 place-items-center bg-[var(--anuime-surface,var(--background))]">
              <span
                aria-hidden="true"
                className={`block border-[var(--anuime-accent,var(--accent))] motion-safe:transition-colors motion-reduce:transition-none ${
                  system === "atlas"
                    ? "size-3 rotate-45 rounded-[1px] border"
                    : system === "mochi"
                      ? "size-3 rounded-full border"
                      : current
                        ? "size-2.5 rotate-45 border-r-2 border-b-2"
                        : "size-2.5 rounded-[1px] border"
                } ${current && system !== "kira" ? "bg-[var(--anuime-accent,var(--accent))]" : ""}`}
                style={{
                  transitionDuration:
                    system === "kira" ? "240ms" : system === "mochi" ? "250ms" : "180ms",
                }}
              />
            </span>
            <span>
              <span className="block font-semibold text-foreground">{item.title}</span>
              {item.detail ? (
                <span className="mt-1 block text-sm text-muted-foreground">{item.detail}</span>
              ) : null}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
