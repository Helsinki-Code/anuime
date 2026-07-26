"use client";

import { useEffect, useState, type HTMLAttributes } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeCursorTrailProps = HTMLAttributes<HTMLDivElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
};

export function AnuimeCursorTrail({
  character = "atlas",
  recipe,
  className = "",
  children,
  ...props
}: AnuimeCursorTrailProps) {
  const system = resolveAnuimeRecipe(recipe, character).recipe.structureSystem;
  const count = system === "mochi" ? 3 : 4;
  const axisAngle = system === "kira" ? 114 : 76;
  const axisRadians = (axisAngle * Math.PI) / 180;
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
      data-anuime-component="cursor-trail"
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
      {!reduced
        ? Array.from({ length: count }, (_, index) => (
            <span
              key={index}
              aria-hidden="true"
              data-anuime-trail-point={index + 1}
              className={`pointer-events-none absolute border border-[var(--anuime-accent,var(--accent))] ${
                system === "mochi"
                  ? "size-2 rounded-full"
                  : system === "atlas"
                    ? "size-2 rotate-45 rounded-[1px]"
                    : "size-1.5 rounded-[1px]"
              }`}
              style={{
                left: point.x,
                top: point.y,
                opacity: point.visible ? 1 - index * 0.2 : 0,
                transform:
                  system === "mochi"
                    ? `translate(${-index * 5}px, ${index * index * 2}px)`
                    : `translate(${Math.cos(axisRadians) * index * 12}px, ${Math.sin(axisRadians) * index * 12}px) rotate(${system === "atlas" ? "45deg" : "0deg"})`,
                transition: `left ${index * 35 + 70}ms linear, top ${index * 35 + 70}ms linear, opacity 180ms ease-out`,
              }}
            />
          ))
        : null}
    </div>
  );
}
