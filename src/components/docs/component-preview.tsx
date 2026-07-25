"use client";

import { CompositeComponent, type AnyCompositeComponent } from "@tanstack/react-start/rsc";

import {
  anuimeExtendedComponentNames,
  anuimeExtendedConstructionMap,
} from "../../../registry/items/lib/anuime-recipe/anuime-recipe";
import { isRegistryPreviewPilotItem } from "../../lib/anuime/registry-preview-pilot";
import { CharacterPreviewPanel } from "./character-preview-panel";

type ComponentPreviewProps = {
  preview: AnyCompositeComponent | null;
  itemName: string;
};

export function ComponentPreview({ preview, itemName }: ComponentPreviewProps) {
  const character = itemName.includes("-mochi-")
    ? "mochi"
    : itemName.includes("-atlas-")
      ? "atlas"
      : "kira";
  const extendedName = anuimeExtendedComponentNames.find(
    (componentName) => `anuime-${componentName}` === itemName,
  );
  const extendedConstruction = extendedName
    ? anuimeExtendedConstructionMap[extendedName]
    : undefined;

  if (preview && isRegistryPreviewPilotItem(itemName)) {
    return <CharacterPreviewPanel itemName={itemName} />;
  }

  if (preview) {
    return (
      <section
        data-docs-registry-v2
        data-extended-construction={extendedName ? "" : undefined}
        className="overflow-hidden rounded-2xl border bg-background text-foreground shadow-[0_24px_80px_-60px_color-mix(in_oklab,var(--foreground)_60%,transparent)]"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-[linear-gradient(110deg,color-mix(in_oklab,var(--accent)_8%,transparent),transparent_52%)] px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="size-2 rotate-45 bg-[var(--anuime-accent,var(--accent))]" />
            <span className="font-mono text-[10px] font-semibold tracking-[0.16em] uppercase">
              Live component specimen
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
            <span className="rounded-full border px-2 py-1">Registry v2</span>
            {extendedName ? (
              <span className="rounded-full border border-[var(--anuime-accent,var(--accent))] px-2 py-1 text-[var(--anuime-accent,var(--accent))]">
                Extended board
              </span>
            ) : (
              <span>{character} baseline</span>
            )}
          </div>
        </div>
        <div
          className={`anuime-system anuime-system-${character} grid min-h-72 place-items-center bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklab,var(--anuime-accent,var(--accent))_8%,transparent),transparent_42%)] p-5 sm:p-8`}
        >
          <div className="w-full max-w-3xl">
            <CompositeComponent src={preview} />
          </div>
        </div>
        {extendedConstruction ? (
          <div className="grid border-t md:grid-cols-3">
            {(["kira", "mochi", "atlas"] as const).map((system) => (
              <div
                key={system}
                className={`anuime-system anuime-system-${system} relative min-h-28 border-b p-4 last:border-b-0 md:border-r md:border-b-0 md:last:border-r-0`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-bold tracking-[0.14em] uppercase">{system}</span>
                  <span className="font-mono text-[9px] text-muted-foreground uppercase">
                    construction
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {extendedConstruction[system].length ? (
                    extendedConstruction[system].map((motif) => (
                      <span
                        key={motif}
                        className="rounded-[var(--anuime-control-radius,6px)] border bg-[var(--anuime-surface,var(--card))] px-2 py-1 text-[11px] text-muted-foreground"
                      >
                        {motif}
                      </span>
                    ))
                  ) : (
                    <span className="text-[11px] text-muted-foreground">
                      No motif fit — geometry and type only
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </section>
    );
  }

  return (
    <div
      data-slot="component-preview"
      className="grid min-h-72 place-items-center rounded-lg border bg-background p-6"
    >
      <p className="text-sm text-muted-foreground">No preview is available for this item.</p>
    </div>
  );
}
