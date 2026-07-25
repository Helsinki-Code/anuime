"use client";

import { CompositeComponent, type AnyCompositeComponent } from "@tanstack/react-start/rsc";

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

  if (preview) {
    return (
      <div
        data-docs-registry-v2
        className={`anuime-system anuime-system-${character} border bg-background text-foreground`}
      >
        <div className="border-b px-4 py-2 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
          Registry v2 · {character} light baseline
        </div>
        <div className="p-4 sm:p-6">
          <CompositeComponent src={preview} />
        </div>
      </div>
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
