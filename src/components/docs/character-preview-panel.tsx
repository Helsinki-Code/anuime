"use client";

import { IconChevronDown } from "@tabler/icons-react";
import { useState, type CSSProperties } from "react";

import {
  isRegistryPreviewPilotItem,
  registryPreviewCharacters,
  registryPreviewConstruction,
  type RegistryPreviewCharacter,
  type RegistryPreviewPilotItem,
} from "@/lib/anuime/registry-preview-pilot";

import { Preview as BreadcrumbPreview } from "../../../registry/items/components/anuime-breadcrumb/_preview";
import { Preview as CheckboxPreview } from "../../../registry/items/components/anuime-checkbox/_preview";
import { Preview as DataTablePreview } from "../../../registry/items/components/anuime-data-table/_preview";

type CharacterPreviewPanelProps = {
  itemName: string;
};

type PreviewMotionStyle = CSSProperties & {
  "--anuime-preview-duration": string;
  "--anuime-preview-timing": string;
};

const characters = ["kira", "mochi", "atlas"] as const;

export function CharacterPreviewPanel({ itemName }: CharacterPreviewPanelProps) {
  const [character, setCharacter] = useState<RegistryPreviewCharacter>("kira");

  if (!isRegistryPreviewPilotItem(itemName)) return null;

  const system = registryPreviewCharacters[character];
  const construction = registryPreviewConstruction[itemName][character];
  const motionStyle: PreviewMotionStyle = {
    "--anuime-preview-duration": `${system.transitionMs}ms`,
    "--anuime-preview-timing": system.transitionTiming,
  };

  return (
    <section
      data-character-preview-panel
      data-preview-character={character}
      data-frame-law={system.frameLaw}
      data-transition-ms={system.transitionMs}
      className="flex flex-col gap-4"
    >
      <div
        role="group"
        aria-label="Preview character"
        className="grid grid-cols-3 overflow-hidden rounded-[var(--anuime-control-radius,6px)] border bg-background sm:inline-grid sm:w-fit"
      >
        {characters.map((candidate) => {
          const candidateSystem = registryPreviewCharacters[candidate];
          const selected = candidate === character;

          return (
            <button
              key={candidate}
              type="button"
              aria-pressed={selected}
              data-preview-character-option={candidate}
              onClick={() => setCharacter(candidate)}
              className="min-h-9 border-r px-4 text-sm font-medium transition-colors last:border-r-0 hover:bg-accent focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring aria-pressed:bg-foreground aria-pressed:text-background"
            >
              {candidateSystem.label}
            </button>
          );
        })}
      </div>

      <div
        data-character-preview-frame
        className={`anuime-system anuime-system-${character} relative isolate overflow-hidden border border-[var(--border)] bg-[var(--anuime-surface)] text-foreground shadow-[0_24px_80px_-60px_color-mix(in_oklab,var(--foreground)_60%,transparent)]`}
        style={motionStyle}
      >
        <FrameMotif character={character} />

        <div
          data-character-preview-header
          className={`relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] px-4 py-3 sm:px-6 ${
            character === "kira"
              ? "bg-[var(--anuime-surface)] dark:bg-[var(--anuime-elevated)]"
              : "bg-[var(--anuime-surface)]"
          }`}
        >
          <div className="flex items-center gap-3">
            <CharacterMark character={character} />
            <span className="font-mono text-[10px] font-semibold tracking-[0.16em] uppercase">
              Live component specimen
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
            {system.label} · {system.adjective}
          </span>
        </div>

        <div
          key={character}
          data-character-preview-stage
          className="anuime-docs-character-enter relative z-10 grid min-h-72 place-items-center bg-[var(--background)] p-5 sm:p-8"
        >
          <div className="w-full max-w-3xl">
            <PilotSpecimen itemName={itemName} character={character} />
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between gap-3 border-t border-[var(--border)] bg-[var(--anuime-surface)] px-4 py-2.5 font-mono text-[9px] tracking-[0.12em] text-muted-foreground uppercase sm:px-6">
          <span>{system.frameLabel}</span>
          <span>
            {system.frameLaw} · {system.transitionMs}ms
          </span>
        </div>
      </div>

      <div className={`anuime-system anuime-system-${character}`}>
        <div className="border border-[var(--border)] bg-[var(--anuime-surface)] p-5 text-foreground sm:p-6">
          <p className="font-mono text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            Character construction
          </p>
          <p className="mt-3 max-w-2xl text-base leading-7 font-semibold">
            {construction.headline}
          </p>
          <details className="group mt-4 border-t border-[var(--border)] pt-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-muted-foreground marker:content-none">
              How this is built
              <IconChevronDown
                aria-hidden="true"
                className="size-4 transition-transform group-open:rotate-180"
              />
            </summary>
            <p
              data-construction-provenance
              className="mt-3 max-w-3xl font-mono text-xs leading-6 text-muted-foreground"
            >
              {construction.provenance}
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}

function PilotSpecimen({
  itemName,
  character,
}: {
  itemName: RegistryPreviewPilotItem;
  character: RegistryPreviewCharacter;
}) {
  if (itemName === "anuime-breadcrumb") return <BreadcrumbPreview character={character} />;
  if (itemName === "anuime-checkbox") return <CheckboxPreview character={character} />;
  return <DataTablePreview character={character} />;
}

function CharacterMark({ character }: { character: RegistryPreviewCharacter }) {
  if (character === "kira") {
    return (
      <span
        aria-hidden="true"
        className="h-3 w-4 bg-[linear-gradient(114deg,transparent_0_38%,var(--anuime-accent)_38%_45%,transparent_45%_58%,var(--border)_58%_65%,transparent_65%)]"
      />
    );
  }

  if (character === "mochi") {
    return (
      <span
        aria-hidden="true"
        className="size-4 bg-[radial-gradient(circle_at_50%_50%,color-mix(in_oklab,var(--anuime-accent)_50%,transparent)_0,transparent_68%)]"
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="size-3 border-t-2 border-l-2 border-[var(--anuime-accent)]"
    />
  );
}

function FrameMotif({ character }: { character: RegistryPreviewCharacter }) {
  if (character === "kira") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(114deg,transparent_0_68%,var(--anuime-accent)_68%_68.5%,transparent_68.5%_73%,var(--border)_73%_73.5%,transparent_73.5%)] bg-[length:9rem_6rem] [background-position:right_top] bg-no-repeat"
      />
    );
  }

  if (character === "mochi") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_100%_0%,color-mix(in_oklab,var(--anuime-accent)_22%,transparent)_0,transparent_44%)] shadow-[inset_0_1px_var(--anuime-secondary-accent)]"
      />
    );
  }

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-1.5 z-20">
      <Bracket className="top-0 left-0 border-t-2 border-l-2" />
      <Bracket className="top-0 right-0 border-t-2 border-r-2" />
      <Bracket className="bottom-0 left-0 border-b-2 border-l-2" />
      <Bracket className="right-0 bottom-0 border-r-2 border-b-2" />
    </div>
  );
}

function Bracket({ className }: { className: string }) {
  return (
    <span
      className={`absolute size-4 border-[var(--anuime-accent)] ${className}`}
      aria-hidden="true"
    />
  );
}
