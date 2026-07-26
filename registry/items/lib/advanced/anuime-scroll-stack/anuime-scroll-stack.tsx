"use client";

import { useEffect, useRef, useState, type HTMLAttributes, type ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeScrollStackProps = HTMLAttributes<HTMLDivElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  items: readonly { id: string; content: ReactNode }[];
};

export function AnuimeScrollStack({
  character = "kira",
  recipe,
  items,
  className = "",
  ...props
}: AnuimeScrollStackProps) {
  const system = resolveAnuimeRecipe(recipe, character).recipe.structureSystem;
  const rootRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = globalThis.matchMedia?.("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduced(query?.matches ?? false);
    const updateProgress = () => {
      const rect = rootRef.current?.getBoundingClientRect();
      if (!rect || query?.matches) return;
      setProgress(
        Math.min(1, Math.max(0, -rect.top / Math.max(rect.height - globalThis.innerHeight, 1))),
      );
    };
    updatePreference();
    updateProgress();
    query?.addEventListener("change", updatePreference);
    globalThis.addEventListener("scroll", updateProgress, { passive: true });
    return () => {
      query?.removeEventListener("change", updatePreference);
      globalThis.removeEventListener("scroll", updateProgress);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      data-character={system}
      data-anuime-component="scroll-stack"
      data-anuime-tier="expressive"
      data-anuime-context="transition ambient"
      className={`w-full ${reduced ? "space-y-4" : "min-h-[160vh]"} ${className}`}
      {...props}
    >
      <div className={reduced ? "space-y-4" : "sticky top-6 h-80"}>
        {items.map((item, index) => {
          const local = Math.min(1, Math.max(0, progress * items.length - index));
          const offset = reduced ? 0 : index * 14 - local * 34;
          return (
            <div
              key={item.id}
              className={`border border-border bg-[var(--anuime-elevated,var(--popover))] p-5 text-foreground shadow-sm ${
                reduced ? "relative" : "absolute inset-x-0 top-0"
              } ${system === "mochi" ? "rounded-[var(--anuime-panel-radius,14px)]" : "rounded-[var(--anuime-panel-radius,4px)]"}`}
              style={{
                transform: reduced ? undefined : `translateY(${offset}px)`,
                zIndex: index + 1,
              }}
            >
              <span
                aria-hidden="true"
                className={`absolute top-3 right-3 border-[var(--anuime-accent,var(--accent))] ${
                  system === "atlas"
                    ? "size-4 border-t-2 border-r-2"
                    : system === "mochi"
                      ? "h-2 w-8 rounded-full border-t"
                      : "h-5 w-px rotate-[114deg] border-l"
                }`}
              />
              {item.content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
