"use client";

import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { characterSystems, type CharacterId } from "@/lib/anuime/characters";
import { createAnuimeRecipe } from "@/lib/anuime/recipe";

import { AnuimeAtlasEmptyState } from "../../../registry/items/components/anuime-atlas-empty-state/anuime-atlas-empty-state";
import { AnuimeAtlasLoader } from "../../../registry/items/components/anuime-atlas-loader/anuime-atlas-loader";
import { AnuimeAtlasSuccess } from "../../../registry/items/components/anuime-atlas-success/anuime-atlas-success";
import { AnuimeAtlasTextReveal } from "../../../registry/items/components/anuime-atlas-text-reveal/anuime-atlas-text-reveal";
import { AnuimeCheckbox } from "../../../registry/items/components/anuime-checkbox/anuime-checkbox";
import { AnuimeKiraEmptyState } from "../../../registry/items/components/anuime-kira-empty-state/anuime-kira-empty-state";
import { AnuimeKiraLoader } from "../../../registry/items/components/anuime-kira-loader/anuime-kira-loader";
import { AnuimeKiraSuccess } from "../../../registry/items/components/anuime-kira-success/anuime-kira-success";
import { AnuimeKiraTextReveal } from "../../../registry/items/components/anuime-kira-text-reveal/anuime-kira-text-reveal";
import { AnuimeMochiEmptyState } from "../../../registry/items/components/anuime-mochi-empty-state/anuime-mochi-empty-state";
import { AnuimeMochiLoader } from "../../../registry/items/components/anuime-mochi-loader/anuime-mochi-loader";
import { AnuimeMochiSuccess } from "../../../registry/items/components/anuime-mochi-success/anuime-mochi-success";
import { AnuimeMochiTextReveal } from "../../../registry/items/components/anuime-mochi-text-reveal/anuime-mochi-text-reveal";
import { AnuimeProgress } from "../../../registry/items/components/anuime-progress/anuime-progress";
import { AnuimeSwitch } from "../../../registry/items/components/anuime-switch/anuime-switch";

export function CharacterThemeSurface({
  character,
  mode,
  children,
  className = "",
}: {
  character: CharacterId;
  mode?: "light" | "dark";
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      data-character-theme={character}
      data-mode={mode}
      className={`anuime-system anuime-system-${character} ${mode === "dark" ? "dark" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export function SignatureControl({
  character,
  compact = false,
}: {
  character: CharacterId;
  compact?: boolean;
}) {
  const recipe = createAnuimeRecipe(character);

  if (character === "kira") {
    return (
      <AnuimeCheckbox
        recipe={recipe}
        defaultChecked
        label={compact ? "Blade trace" : "Trace the next action"}
        description={compact ? undefined : "Angular check; collar-ring focus; no pill geometry."}
      />
    );
  }

  if (character === "mochi") {
    return (
      <AnuimeSwitch
        recipe={recipe}
        defaultChecked
        label={compact ? "Pearl clasp" : "Settle the pearl clasp"}
        description={compact ? undefined : "A pearl thumb with a restrained champagne-gold rim."}
      />
    );
  }

  return (
    <AnuimeProgress
      recipe={recipe}
      label={compact ? "Strap assembly" : "Dock the strap assembly"}
      value={68}
    />
  );
}

export function ExpressiveLoader({ character }: { character: CharacterId }) {
  if (character === "kira") return <AnuimeKiraLoader label="Kira blade-light loading" />;
  if (character === "mochi") return <AnuimeMochiLoader label="Mochi bloom-orbit loading" />;
  return <AnuimeAtlasLoader label="Atlas HUD assembly loading" />;
}

export function ExpressiveMomentRow({ character }: { character: CharacterId }) {
  const system = characterSystems[character];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <Moment title="Loader">
        <ExpressiveLoader character={character} />
      </Moment>
      <Moment title="Text reveal">
        {character === "kira" ? (
          <AnuimeKiraTextReveal />
        ) : character === "mochi" ? (
          <AnuimeMochiTextReveal />
        ) : (
          <AnuimeAtlasTextReveal />
        )}
      </Moment>
      <Moment title="Success">
        {character === "kira" ? (
          <AnuimeKiraSuccess />
        ) : character === "mochi" ? (
          <AnuimeMochiSuccess />
        ) : (
          <AnuimeAtlasSuccess />
        )}
      </Moment>
      <Moment title="Empty state">
        {character === "kira" ? (
          <AnuimeKiraEmptyState title="Circuit clear" description={system.boardCaption} />
        ) : character === "mochi" ? (
          <AnuimeMochiEmptyState title="A quiet table" description={system.boardCaption} />
        ) : (
          <AnuimeAtlasEmptyState title="FIELD CLEAR" description={system.boardCaption} />
        )}
      </Moment>
    </div>
  );
}

export function CharacterSystemCard({ character }: { character: CharacterId }) {
  const system = characterSystems[character];

  return (
    <CharacterThemeSurface
      character={character}
      className="group relative overflow-hidden border bg-background text-foreground"
    >
      <div className="anuime-card-motif" aria-hidden="true" />
      <div className="relative grid min-h-[23rem] content-between gap-8 p-6">
        <div>
          <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
            {system.adjective} · {system.role}
          </p>
          <h3 className="mt-3 text-3xl font-semibold tracking-tight">{system.name}</h3>
          <p className="mt-2 text-lg font-medium">{system.tagline}</p>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">{system.description}</p>
        </div>
        <div className="anuime-signature-panel border bg-[var(--anuime-surface)] p-4">
          <SignatureControl character={character} compact />
        </div>
        <Link
          to="/characters/$character"
          params={{ character }}
          className="font-mono text-xs font-semibold tracking-[0.12em] text-foreground uppercase"
        >
          Open {system.name} system →
        </Link>
      </div>
    </CharacterThemeSurface>
  );
}

function Moment({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="grid min-h-44 place-items-center border bg-[var(--anuime-surface)] p-5 text-center">
      <div>
        <div className="grid min-h-24 place-items-center">{children}</div>
        <p className="mt-3 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
          {title}
        </p>
      </div>
    </div>
  );
}
