"use client";

import type { HTMLAttributes } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeNodeMapNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  active?: boolean;
};

export type AnuimeNodeMapProps = HTMLAttributes<HTMLDivElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  nodes: readonly AnuimeNodeMapNode[];
  links?: readonly (readonly [string, string])[];
};

export function AnuimeNodeMap({
  character = "kira",
  recipe,
  nodes,
  links = [],
  className = "",
  ...props
}: AnuimeNodeMapProps) {
  const system = resolveAnuimeRecipe(recipe, character).recipe.structureSystem;
  const byId = new Map(nodes.map((node) => [node.id, node]));

  return (
    <div
      data-character={system}
      data-anuime-component="node-map"
      className={`relative min-h-64 w-full overflow-hidden rounded-[var(--anuime-panel-radius,8px)] border border-border bg-[var(--anuime-surface,var(--background))] ${className}`}
      {...props}
    >
      <svg aria-hidden="true" className="absolute inset-0 size-full" viewBox="0 0 100 100">
        {links.map(([from, to]) => {
          const a = byId.get(from);
          const b = byId.get(to);
          return a && b ? (
            <line
              key={`${from}-${to}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              className="stroke-border"
              strokeWidth="0.7"
              vectorEffect="non-scaling-stroke"
            />
          ) : null;
        })}
      </svg>
      {nodes.map((node) => (
        <div
          key={node.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <span
            aria-hidden="true"
            className={`mx-auto block border border-[var(--anuime-accent,var(--accent))] motion-safe:transition-[background-color,transform] motion-reduce:transition-none ${
              system === "atlas"
                ? "size-3 rotate-45 rounded-[1px]"
                : system === "mochi"
                  ? "size-3 rounded-full"
                  : "size-[3px] rounded-[1px]"
            } ${node.active ? "bg-[var(--anuime-accent,var(--accent))]" : "bg-[var(--anuime-surface,var(--background))]"}`}
            style={{
              transitionDuration:
                system === "kira" ? "240ms" : system === "mochi" ? "250ms" : "180ms",
            }}
          />
          <span className="mt-2 block text-xs font-medium text-foreground">{node.label}</span>
        </div>
      ))}
    </div>
  );
}
