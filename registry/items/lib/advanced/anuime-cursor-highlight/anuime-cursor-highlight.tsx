"use client";

import { useEffect, useState, type HTMLAttributes } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeCursorHighlightProps = HTMLAttributes<HTMLDivElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
};

export function AnuimeCursorHighlight({
  character = "kira",
  recipe,
  className = "",
  children,
  ...props
}: AnuimeCursorHighlightProps) {
  const system = resolveAnuimeRecipe(recipe, character).recipe.structureSystem;
  const [point, setPoint] = useState({ x: 0, y: 0, visible: false });
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = globalThis.matchMedia?.("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query?.matches ?? false);
    update();
    query?.addEventListener("change", update);
    return () => query?.removeEventListener("change", update);
  }, []);

  return (
    <div
      data-character={system}
      data-anuime-component="cursor-highlight"
      data-anuime-tier="expressive"
      data-anuime-context="ambient"
      className={`relative w-full overflow-hidden ${className}`}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPoint({ x: event.clientX - rect.left, y: event.clientY - rect.top, visible: true });
      }}
      onPointerLeave={() => setPoint((current) => ({ ...current, visible: false }))}
      {...props}
    >
      {children}
      {!reduced ? (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute grid size-8 place-items-center ${
            system === "kira"
              ? "rounded-full border border-[var(--anuime-accent,var(--accent))]"
              : system === "mochi"
                ? ""
                : ""
          }`}
          style={{
            left: point.x,
            top: point.y,
            opacity: point.visible ? 1 : 0,
            transform: "translate(-50%, -50%)",
            transition: `opacity ${system === "kira" ? "240ms" : system === "mochi" ? "250ms" : "180ms"} ease-out`,
          }}
        >
          {system === "mochi" ? (
            <span className="absolute inset-0 rounded-full border border-[var(--anuime-accent,var(--accent))] bg-[var(--anuime-accent,var(--accent))] opacity-20" />
          ) : system === "atlas" ? (
            <>
              <span className="absolute inset-0 border-t-2 border-l-2 border-[var(--anuime-accent,var(--accent))]" />
              <span className="absolute inset-0 border-r-2 border-b-2 border-[var(--anuime-accent,var(--accent))]" />
            </>
          ) : null}
          <span
            className={`block border border-[var(--anuime-accent,var(--accent))] ${
              system === "kira"
                ? "size-3 rotate-45 rounded-[1px]"
                : system === "mochi"
                  ? "size-3 rounded-full bg-[var(--anuime-surface,var(--background))]"
                  : "size-3 rotate-45 rounded-[1px] border-2 bg-[var(--anuime-accent,var(--accent))]"
            }`}
          />
        </span>
      ) : null}
    </div>
  );
}
