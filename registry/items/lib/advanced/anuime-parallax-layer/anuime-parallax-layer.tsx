"use client";

import { useEffect, useState, type HTMLAttributes, type ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeParallaxLayerProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "onPointerMove"
> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  layers: readonly { id: string; content: ReactNode }[];
};

export function AnuimeParallaxLayer({
  character = "atlas",
  recipe,
  layers,
  className = "",
  ...props
}: AnuimeParallaxLayerProps) {
  const system = resolveAnuimeRecipe(recipe, character).recipe.structureSystem;
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const [reduced, setReduced] = useState(false);
  const axisAngle = system === "kira" ? 114 : 76;
  const axisRadians = (axisAngle * Math.PI) / 180;

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
      data-anuime-component="parallax-layer"
      data-anuime-tier="expressive"
      data-anuime-context="ambient"
      className={`relative min-h-64 w-full overflow-hidden border border-border bg-[var(--anuime-surface,var(--background))] ${className}`}
      onPointerMove={(event) => {
        if (reduced) return;
        const rect = event.currentTarget.getBoundingClientRect();
        setPoint({
          x: (event.clientX - rect.left) / rect.width - 0.5,
          y: (event.clientY - rect.top) / rect.height - 0.5,
        });
      }}
      onPointerLeave={() => setPoint({ x: 0, y: 0 })}
      {...props}
    >
      {system === "mochi" ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-10 rounded-[var(--anuime-panel-radius,16px)] border border-[var(--anuime-accent,var(--accent))] bg-[var(--anuime-accent,var(--accent))] opacity-[0.04]"
        />
      ) : (
        <>
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute top-8 left-8 h-px w-24 border-t border-[var(--anuime-accent,var(--accent))] ${
              system === "kira" ? "rotate-[114deg]" : "rotate-[76deg]"
            }`}
          />
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute top-12 left-10 h-px w-24 border-t border-[var(--anuime-accent,var(--accent))] opacity-50 ${
              system === "kira" ? "rotate-[114deg]" : "rotate-[76deg]"
            }`}
          />
        </>
      )}
      {layers.map((layer, index) => {
        const depth = (index + 1) * 8;
        const axisDistance = (point.x + point.y) * depth;
        const offset =
          system === "mochi"
            ? {
                x: point.x * depth,
                y: (point.y + point.x * point.x * 0.25) * depth,
              }
            : {
                x: Math.cos(axisRadians) * axisDistance,
                y: Math.sin(axisRadians) * axisDistance,
              };
        return (
          <div
            key={layer.id}
            className="absolute inset-0 grid place-items-center motion-safe:transition-transform motion-reduce:transform-none motion-reduce:transition-none"
            style={{
              transform: reduced ? undefined : `translate(${offset.x}px, ${offset.y}px)`,
              transitionDuration:
                system === "kira" ? "240ms" : system === "mochi" ? "250ms" : "180ms",
            }}
          >
            {layer.content}
          </div>
        );
      })}
    </div>
  );
}
