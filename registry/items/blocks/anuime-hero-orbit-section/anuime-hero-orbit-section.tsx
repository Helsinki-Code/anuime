"use client";

import { AnuimeAvatar } from "@/components/ui/anuime-avatar";
import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeOrbitMap } from "@/components/ui/anuime-orbit-map";
import { AnuimeRadialFieldBackground } from "@/components/ui/anuime-radial-field-background";
import { AnuimeWordCycle } from "@/components/ui/anuime-word-cycle";
import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeHeroOrbitSectionProps = {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  className?: string;
};

type HeroCopy = {
  eyebrow: string;
  words: readonly string[];
  description: string;
  role: string;
  status: string;
};

const heroCopy: Record<AnuimeCharacter, HeroCopy> = {
  kira: {
    eyebrow: "Kira / direction",
    words: ["precision", "signal", "intent"],
    description:
      "Kira turns product intent into a sharp, connected path - decisive hierarchy, visible state, zero decorative noise.",
    role: "Direction system",
    status: "Trace locked",
  },
  mochi: {
    eyebrow: "Mochi / experience",
    words: ["warmth", "clarity", "care"],
    description:
      "Mochi makes the system feel considered - measured softness, reassuring feedback, and warmth exactly where it matters.",
    role: "Experience system",
    status: "Bloom settled",
  },
  atlas: {
    eyebrow: "Atlas / structure",
    words: ["structure", "scale", "certainty"],
    description:
      "Atlas gives every surface a load-bearing logic - framed regions, surveyed state, and hierarchy built to hold.",
    role: "Structure system",
    status: "Dock secured",
  },
};

const roleNodes = [
  { character: "kira", label: "Direction", fallback: "K" },
  { character: "mochi", label: "Experience", fallback: "M" },
  { character: "atlas", label: "Structure", fallback: "A" },
] as const satisfies readonly {
  character: AnuimeCharacter;
  label: string;
  fallback: string;
}[];

function CastNode({
  node,
  activeCharacter,
}: {
  node: (typeof roleNodes)[number];
  activeCharacter: AnuimeCharacter;
}) {
  const active = node.character === activeCharacter;

  return (
    <div
      data-role={node.character}
      data-active={active ? "true" : "false"}
      className="anuime-hero-orbit__role"
    >
      <AnuimeAvatar
        character={node.character}
        fallback={node.fallback}
        alt={`${node.label} persona`}
        size="sm"
        status={active ? "online" : "offline"}
      />
      <span>
        <span className="block font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
          {node.character}
        </span>
        <span className="block text-xs font-semibold text-foreground">{node.label}</span>
      </span>
    </div>
  );
}

function OrbitStage({
  character,
  recipe,
  copy,
}: {
  character: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  copy: HeroCopy;
}) {
  return (
    <div className="anuime-hero-orbit__stage" aria-label={`${copy.role}: ${copy.status}`}>
      <div aria-hidden="true" className="anuime-hero-orbit__atmosphere" />
      <div aria-hidden="true" className="anuime-hero-orbit__grid" />
      <div aria-hidden="true" className="anuime-hero-orbit__beam anuime-hero-orbit__motion" />
      <div aria-hidden="true" className="anuime-hero-orbit__veil anuime-hero-orbit__motion" />
      <div aria-hidden="true" className="anuime-hero-orbit__brackets">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="anuime-hero-orbit__stage-header">
        <span className="anuime-hero-orbit__stage-index">SYSTEM / 03</span>
        <span className="anuime-hero-orbit__stage-state">
          <span aria-hidden="true" />
          {copy.status}
        </span>
      </div>

      <div className="anuime-hero-orbit__core">
        <div
          aria-hidden="true"
          className="anuime-hero-orbit__core-halo anuime-hero-orbit__motion"
        />
        <AnuimeOrbitMap
          character={character}
          recipe={recipe}
          label={`${copy.role} orbit`}
          className="anuime-hero-orbit__map"
        />
        <span className="anuime-hero-orbit__core-label">
          <span>AN</span>
          <span>UI</span>
          <span>ME</span>
        </span>
      </div>

      <div className="anuime-hero-orbit__roles">
        {roleNodes.map((node) => (
          <CastNode key={node.character} node={node} activeCharacter={character} />
        ))}
      </div>

      <div className="anuime-hero-orbit__legend">
        <span>{copy.role}</span>
        <span aria-hidden="true" className="anuime-hero-orbit__legend-line" />
        <strong>ACTIVE</strong>
      </div>
    </div>
  );
}

export function AnuimeHeroOrbitSection({
  character = "kira",
  recipe,
  className = "",
}: AnuimeHeroOrbitSectionProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  const system = styles.recipe.structureSystem;
  const copy = heroCopy[system];

  return (
    <section
      data-character={system}
      data-anuime-section="anuime-hero-orbit-section"
      data-anuime-category="hero"
      data-anuime-tier="expressive"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`anuime-hero-orbit xm relative w-full overflow-hidden bg-background text-foreground ${className}`}
    >
      <AnuimeRadialFieldBackground
        character={character}
        recipe={recipe}
        origin="top-right"
        className="w-full"
      >
        <div className="anuime-hero-orbit__shell mx-auto grid min-h-[42rem] max-w-7xl items-center gap-10 px-6 py-12 md:px-10">
          <div className="anuime-hero-orbit__copy relative z-10 max-w-2xl">
            <AnuimeBadge character={character} recipe={recipe} tone="success" className="mb-7">
              <span aria-hidden="true" className={styles.marker} />
              <span className="ml-2">{copy.eyebrow}</span>
            </AnuimeBadge>

            <h1 className="anuime-hero-orbit__headline leading-[0.88] font-bold tracking-[-0.065em] text-balance">
              Design with
              <span className="mt-2 block text-[var(--anuime-accent,var(--accent))]">
                <AnuimeWordCycle
                  character={character}
                  recipe={recipe}
                  words={copy.words}
                  intervalMs={1700}
                  showControls={false}
                  className="tracking-[-0.06em]"
                />
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              {copy.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <AnuimeButton character={character} recipe={recipe} className="min-h-12 px-6 text-sm">
                Explore the cast
                <span aria-hidden="true">→</span>
              </AnuimeButton>
              <AnuimeButton
                character={character}
                recipe={recipe}
                variant="secondary"
                className="min-h-12 px-6 text-sm"
              >
                Open the registry
              </AnuimeButton>
            </div>

            <div className="mt-9 flex items-center gap-4 border-t border-border pt-5">
              <AnuimeAvatar
                character={character}
                recipe={recipe}
                fallback={system.slice(0, 1).toUpperCase()}
                alt={`${system} active persona`}
                status="online"
              />
              <div>
                <p className="text-sm font-semibold">{copy.role}</p>
                <p className="mt-0.5 font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
                  Three minds / one coherent product
                </p>
              </div>
            </div>
          </div>

          <OrbitStage character={system} recipe={recipe} copy={copy} />
        </div>
      </AnuimeRadialFieldBackground>

      <style>{`
        .anuime-hero-orbit {
          --hero-accent: var(--anuime-accent, var(--accent));
          --hero-secondary: var(--anuime-secondary-accent, var(--border));
          --hero-surface: var(--anuime-surface, var(--card));
          --hero-kira-axis: 114deg;
          --hero-atlas-axis: 76deg;
          --hero-survey-turn: 45deg;
          container-name: anuime-hero;
          container-type: inline-size;
          background-image:
            linear-gradient(
              to right,
              var(--border) 1px,
              transparent 1px
            );
          background-size: 72px 100%;
        }

        .anuime-hero-orbit__shell {
          grid-template-columns: minmax(0, 1fr);
        }

        .anuime-hero-orbit__copy {
          width: 100%;
          margin-inline: auto;
          text-align: center;
        }

        .anuime-hero-orbit__copy > p {
          margin-inline: auto;
        }

        .anuime-hero-orbit__copy > div {
          justify-content: center;
        }

        .anuime-hero-orbit__headline {
          font-size: clamp(3.25rem, 6.5cqw, 6rem);
        }

        .anuime-hero-orbit__stage {
          position: relative;
          isolation: isolate;
          min-height: 33rem;
          overflow: hidden;
          border: 1px solid var(--anuime-border-strong, var(--border));
          border-radius: var(--anuime-surface-radius, 10px);
          background: var(--hero-surface);
          box-shadow:
            0 32px 80px -48px var(--border),
            inset 0 1px 0 var(--border);
        }

        .anuime-hero-orbit__stage::after {
          position: absolute;
          inset: auto 0 0;
          z-index: -1;
          height: 28%;
          background: linear-gradient(
            to top,
            var(--hero-accent),
            transparent
          );
          opacity: 0.09;
          content: "";
        }

        .anuime-hero-orbit__atmosphere,
        .anuime-hero-orbit__grid,
        .anuime-hero-orbit__beam,
        .anuime-hero-orbit__veil,
        .anuime-hero-orbit__brackets {
          pointer-events: none;
          position: absolute;
          inset: 0;
          z-index: -1;
        }

        .anuime-hero-orbit__stage-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1.1rem 1.25rem;
          border-bottom: 1px solid var(--border);
          font-family: var(--font-mono, monospace);
          font-size: 0.625rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .anuime-hero-orbit__stage-index {
          color: var(--muted-foreground);
        }

        .anuime-hero-orbit__stage-state {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          color: var(--foreground);
        }

        .anuime-hero-orbit__stage-state > span {
          display: inline-block;
          width: 0.5rem;
          height: 0.5rem;
          background: var(--hero-accent);
          border: 1px solid var(--hero-secondary);
        }

        .anuime-hero-orbit__core {
          position: absolute;
          left: 50%;
          top: 51%;
          z-index: 2;
          display: grid;
          place-items: center;
          width: min(20rem, 60vw);
          aspect-ratio: 1;
          transform: translate(-50%, -50%);
        }

        .anuime-hero-orbit__core-halo {
          position: absolute;
          inset: -2.25rem;
          z-index: -1;
          border: 1px solid var(--hero-accent);
          border-radius: 50%;
          opacity: 0.35;
        }

        .anuime-hero-orbit__map {
          width: 17.5rem;
          max-width: 58vw;
          border-color: var(--border);
          background: var(--hero-surface);
          box-shadow:
            0 24px 56px -34px var(--hero-accent),
            inset 0 0 0 1px var(--border);
        }

        .anuime-hero-orbit__core-label {
          position: absolute;
          display: grid;
          grid-template-columns: repeat(3, auto);
          gap: 0.15rem;
          align-items: center;
          color: var(--foreground);
          font-family: var(--font-mono, monospace);
          font-size: 0.625rem;
          font-weight: 800;
          letter-spacing: 0.04em;
        }

        .anuime-hero-orbit__core-label > span:nth-child(2) {
          color: var(--hero-accent);
        }

        .anuime-hero-orbit__roles {
          position: absolute;
          inset: 3.75rem 0 0;
          z-index: 4;
        }

        .anuime-hero-orbit__role {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 0.65rem;
          min-width: 8.5rem;
          padding: 0.55rem 0.65rem;
          border: 1px solid var(--border);
          border-radius: var(--anuime-control-radius, 7px);
          background: var(--hero-surface);
          box-shadow: 0 18px 32px -26px var(--border);
          backdrop-filter: blur(14px);
        }

        .anuime-hero-orbit__role[data-active="true"] {
          border-color: var(--hero-accent);
          box-shadow:
            0 18px 38px -24px var(--hero-accent),
            inset 0 0 0 1px var(--hero-accent);
        }

        .anuime-hero-orbit__legend {
          position: absolute;
          right: 1.25rem;
          bottom: 1.1rem;
          left: 1.25rem;
          z-index: 5;
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 0.75rem;
          align-items: center;
          color: var(--muted-foreground);
          font-family: var(--font-mono, monospace);
          font-size: 0.625rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .anuime-hero-orbit__legend strong {
          color: var(--hero-accent);
        }

        .anuime-hero-orbit__legend-line {
          height: 1px;
          background: linear-gradient(to right, var(--border), var(--hero-accent), var(--border));
        }

        .anuime-hero-orbit[data-character="kira"] .anuime-hero-orbit__stage {
          background:
            linear-gradient(
              var(--hero-kira-axis),
              transparent 0 46%,
              var(--hero-accent) 46% 46.15%,
              transparent 46.4% 100%
            ),
            var(--hero-surface);
        }

        .anuime-hero-orbit[data-character="kira"] .anuime-hero-orbit__grid {
          inset: 3.75rem 0 0;
          opacity: 0.52;
          background-image:
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(to right, var(--border) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(circle at center, black 12%, transparent 72%);
        }

        .anuime-hero-orbit[data-character="kira"] .anuime-hero-orbit__beam {
          top: 44%;
          left: -28%;
          width: 150%;
          height: 1px;
          background: linear-gradient(
            to right,
            transparent,
            var(--hero-accent) 42% 58%,
            transparent
          );
          transform: rotate(var(--hero-kira-axis));
          transform-origin: center;
          animation: anuime-hero-kira-sweep 1.15s cubic-bezier(0.42, 0, 0.58, 1) infinite;
        }

        .anuime-hero-orbit[data-character="kira"] .anuime-hero-orbit__veil {
          display: none;
        }

        .anuime-hero-orbit[data-character="kira"] .anuime-hero-orbit__core {
          left: 48%;
          top: 50%;
        }

        .anuime-hero-orbit[data-character="kira"] .anuime-hero-orbit__core-halo {
          border-radius: var(--anuime-surface-radius, 8px);
          transform: rotate(var(--hero-survey-turn));
        }

        .anuime-hero-orbit[data-character="kira"] .anuime-hero-orbit__role[data-role="kira"] {
          left: 3%;
          top: 8%;
        }

        .anuime-hero-orbit[data-character="kira"] .anuime-hero-orbit__role[data-role="mochi"] {
          right: 3%;
          top: 20%;
        }

        .anuime-hero-orbit[data-character="kira"] .anuime-hero-orbit__role[data-role="atlas"] {
          right: 6%;
          bottom: 14%;
        }

        .anuime-hero-orbit[data-character="kira"] .anuime-hero-orbit__stage-state > span {
          border-radius: 1px;
        }

        .anuime-hero-orbit[data-character="mochi"] .anuime-hero-orbit__copy h1 {
          font-family: var(--font-serif, serif);
          letter-spacing: -0.045em;
        }

        .anuime-hero-orbit[data-character="mochi"] .anuime-hero-orbit__stage {
          background: var(--hero-surface);
        }

        .anuime-hero-orbit[data-character="mochi"] .anuime-hero-orbit__atmosphere {
          background:
            radial-gradient(circle at 50% 48%, var(--hero-accent), transparent 31%),
            radial-gradient(circle at 50% 48%, var(--hero-secondary), transparent 58%);
          opacity: 0.13;
        }

        .anuime-hero-orbit[data-character="mochi"] .anuime-hero-orbit__grid,
        .anuime-hero-orbit[data-character="mochi"] .anuime-hero-orbit__beam,
        .anuime-hero-orbit[data-character="mochi"] .anuime-hero-orbit__brackets {
          display: none;
        }

        .anuime-hero-orbit[data-character="mochi"] .anuime-hero-orbit__veil {
          inset: 16% 20%;
          display: block;
          border: 1px solid var(--hero-secondary);
          border-radius: 50%;
          box-shadow:
            0 0 0 32px var(--border),
            0 0 0 72px var(--border);
          animation: anuime-hero-mochi-bloom 2.6s cubic-bezier(0.42, 0, 0.58, 1) infinite;
        }

        .anuime-hero-orbit[data-character="mochi"] .anuime-hero-orbit__core {
          top: 49%;
        }

        .anuime-hero-orbit[data-character="mochi"] .anuime-hero-orbit__core-halo {
          border-color: var(--hero-secondary);
          box-shadow: 0 0 56px var(--hero-accent);
          animation: anuime-hero-mochi-bloom 2.6s cubic-bezier(0.42, 0, 0.58, 1) infinite;
        }

        .anuime-hero-orbit[data-character="mochi"] .anuime-hero-orbit__role {
          border-color: var(--hero-secondary);
          font-family: var(--font-serif, serif);
        }

        .anuime-hero-orbit[data-character="mochi"] .anuime-hero-orbit__role[data-role="kira"] {
          left: 3%;
          top: 43%;
        }

        .anuime-hero-orbit[data-character="mochi"] .anuime-hero-orbit__role[data-role="mochi"] {
          left: 50%;
          top: 4%;
          transform: translateX(-50%);
        }

        .anuime-hero-orbit[data-character="mochi"] .anuime-hero-orbit__role[data-role="atlas"] {
          right: 3%;
          top: 43%;
        }

        .anuime-hero-orbit[data-character="mochi"] .anuime-hero-orbit__stage-state > span {
          border-radius: 50%;
          box-shadow: 0 0 0 3px var(--border);
        }

        .anuime-hero-orbit[data-character="atlas"] .anuime-hero-orbit__stage {
          background:
            linear-gradient(
              var(--hero-atlas-axis),
              transparent 0 73%,
              var(--hero-accent) 73% 73.15%,
              transparent 73.4% 100%
            ),
            var(--hero-surface);
          box-shadow:
            0 36px 84px -48px var(--hero-accent),
            inset 0 0 0 1px var(--border);
        }

        .anuime-hero-orbit[data-character="atlas"] .anuime-hero-orbit__grid {
          inset: 3.75rem 0 0;
          opacity: 0.64;
          background-image:
            linear-gradient(
              var(--hero-accent) 1px,
              transparent 1px
            ),
            linear-gradient(
              to right,
              var(--hero-accent) 1px,
              transparent 1px
            );
          background-size: 32px 32px;
          mask-image: linear-gradient(to right, black, black 70%, transparent);
        }

        .anuime-hero-orbit[data-character="atlas"] .anuime-hero-orbit__beam {
          top: 50%;
          left: -20%;
          width: 140%;
          height: 2px;
          background: linear-gradient(to right, transparent, var(--hero-accent), transparent);
          transform: rotate(var(--hero-atlas-axis));
          transform-origin: center;
          animation: anuime-hero-atlas-scan 2.4s cubic-bezier(0.42, 0, 0.58, 1) infinite;
        }

        .anuime-hero-orbit[data-character="atlas"] .anuime-hero-orbit__veil {
          display: none;
        }

        .anuime-hero-orbit[data-character="atlas"] .anuime-hero-orbit__brackets {
          z-index: 3;
        }

        .anuime-hero-orbit[data-character="atlas"] .anuime-hero-orbit__brackets > span {
          position: absolute;
          width: 2rem;
          height: 2rem;
          border-color: var(--hero-accent);
        }

        .anuime-hero-orbit[data-character="atlas"] .anuime-hero-orbit__brackets > span:nth-child(1) {
          top: 4.75rem;
          left: 1rem;
          border-top: 2px solid;
          border-left: 2px solid;
        }

        .anuime-hero-orbit[data-character="atlas"] .anuime-hero-orbit__brackets > span:nth-child(2) {
          top: 4.75rem;
          right: 1rem;
          border-top: 2px solid;
          border-right: 2px solid;
        }

        .anuime-hero-orbit[data-character="atlas"] .anuime-hero-orbit__brackets > span:nth-child(3) {
          bottom: 1rem;
          left: 1rem;
          border-bottom: 2px solid;
          border-left: 2px solid;
        }

        .anuime-hero-orbit[data-character="atlas"] .anuime-hero-orbit__brackets > span:nth-child(4) {
          right: 1rem;
          bottom: 1rem;
          border-right: 2px solid;
          border-bottom: 2px solid;
        }

        .anuime-hero-orbit[data-character="atlas"] .anuime-hero-orbit__core {
          left: 38%;
        }

        .anuime-hero-orbit[data-character="atlas"] .anuime-hero-orbit__core-halo {
          border-radius: 1px;
          transform: rotate(var(--hero-survey-turn));
          animation: anuime-hero-atlas-lock 1.15s cubic-bezier(0.42, 0, 0.58, 1) infinite;
        }

        .anuime-hero-orbit[data-character="atlas"] .anuime-hero-orbit__roles {
          left: auto;
          width: 10.5rem;
        }

        .anuime-hero-orbit[data-character="atlas"] .anuime-hero-orbit__role {
          right: 1.2rem;
          left: auto;
          width: 9.5rem;
          min-width: 0;
          border-left: 2px solid var(--hero-accent);
          box-shadow: inset 18px 0 30px -28px var(--hero-accent);
        }

        .anuime-hero-orbit[data-character="atlas"] .anuime-hero-orbit__role[data-role="kira"] {
          top: 12%;
        }

        .anuime-hero-orbit[data-character="atlas"] .anuime-hero-orbit__role[data-role="mochi"] {
          top: 38%;
        }

        .anuime-hero-orbit[data-character="atlas"] .anuime-hero-orbit__role[data-role="atlas"] {
          top: 64%;
        }

        .anuime-hero-orbit[data-character="atlas"] .anuime-hero-orbit__stage-state > span {
          transform: rotate(var(--hero-survey-turn));
        }

        @keyframes anuime-hero-kira-sweep {
          0%,
          100% {
            opacity: 0.2;
            translate: -18% 0;
          }
          50% {
            opacity: 0.9;
            translate: 18% 0;
          }
        }

        @keyframes anuime-hero-mochi-bloom {
          0%,
          100% {
            opacity: 0.45;
            scale: 0.96;
          }
          50% {
            opacity: 0.86;
            scale: 1.03;
          }
        }

        @keyframes anuime-hero-atlas-scan {
          0%,
          100% {
            opacity: 0.2;
            translate: -3rem 0;
          }
          50% {
            opacity: 0.85;
            translate: 3rem 0;
          }
        }

        @keyframes anuime-hero-atlas-lock {
          0%,
          100% {
            opacity: 0.5;
            scale: 0.96;
          }
          50% {
            opacity: 1;
            scale: 1;
          }
        }

        @container anuime-hero (min-width: 60rem) {
          .anuime-hero-orbit__shell {
            grid-template-columns: minmax(0, 0.86fr) minmax(30rem, 1.14fr);
            gap: 3.5rem;
            padding-block: 4rem;
          }

          .anuime-hero-orbit__copy {
            margin-inline: 0;
            text-align: left;
          }

          .anuime-hero-orbit__copy > p {
            margin-inline: 0;
          }

          .anuime-hero-orbit__copy > div {
            justify-content: flex-start;
          }

          .anuime-hero-orbit__stage {
            min-height: 33rem;
          }
        }

        @container anuime-hero (max-width: 39.99rem) {
          .anuime-hero-orbit__stage {
            min-height: 29rem;
          }

          .anuime-hero-orbit__role {
            min-width: 0;
            padding: 0.4rem;
          }

          .anuime-hero-orbit__role > span:last-child {
            display: none;
          }

          .anuime-hero-orbit[data-character="atlas"] .anuime-hero-orbit__core {
            left: 44%;
          }

          .anuime-hero-orbit[data-character="atlas"] .anuime-hero-orbit__roles {
            width: 5rem;
          }

          .anuime-hero-orbit[data-character="atlas"] .anuime-hero-orbit__role {
            width: auto;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .anuime-hero-orbit .anuime-hero-orbit__motion,
          .anuime-hero-orbit .anuime-orbit-station {
            animation: none !important;
            translate: none !important;
            scale: 1 !important;
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
