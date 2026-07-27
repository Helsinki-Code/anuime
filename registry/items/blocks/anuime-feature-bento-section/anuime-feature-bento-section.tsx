"use client";

import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeBentoCard } from "@/components/ui/anuime-bento-card";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeNodeFieldBackground } from "@/components/ui/anuime-node-field-background";
import { AnuimeSignalCard } from "@/components/ui/anuime-signal-card";
import { AnuimeTooltip } from "@/components/ui/anuime-tooltip";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeFeatureBentoSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeFeatureBentoSection({
  character = "kira",
  className = "",
}: AnuimeFeatureBentoSectionProps) {
  return (
    <section
      data-anuime-section="anuime-feature-bento-section"
      data-anuime-category="features"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <AnuimeNodeFieldBackground character={character} className="w-full">
        <div className="mx-auto grid max-w-7xl gap-8 p-6 md:p-10">
          <header id="overview" className="grid max-w-3xl gap-4">
            <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
              features
            </p>
            <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
              See how the system earns its character.
            </h2>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              Group related capabilities into a scan-friendly map of outcomes and proof.
            </p>
          </header>
          <div
            id="details"
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
          >
            <div className="min-w-0" data-composes="anuime-card">
              <AnuimeCard
                character={character}
                eyebrow="Feature Bento"
                title="See how the system earns its character."
                description="Group related capabilities into a scan-friendly map of outcomes and proof."
              />
            </div>
            <div className="min-w-0" data-composes="anuime-badge">
              <AnuimeBadge character={character}>Feature Bento</AnuimeBadge>
            </div>
            <div className="min-w-0" data-composes="anuime-button">
              <AnuimeButton character={character}>Explore the system</AnuimeButton>
            </div>
            <div className="min-w-0" data-composes="anuime-tooltip">
              <AnuimeTooltip character={character} label="More context is available">
                <span className="inline-flex min-h-10 items-center border border-border px-3 text-sm">
                  Inspect detail
                </span>
              </AnuimeTooltip>
            </div>
            <div className="min-w-0" data-composes="anuime-bento-card">
              <AnuimeBentoCard
                character={character}
                eyebrow="Feature Bento"
                title="See how the system earns its character."
                size="lg"
              >
                Group related capabilities into a scan-friendly map of outcomes and proof.
              </AnuimeBentoCard>
            </div>
            <div className="min-w-0" data-composes="anuime-signal-card">
              <AnuimeSignalCard
                character={character}
                label="Live signal"
                title="All systems nominal"
                description="Group related capabilities into a scan-friendly map of outcomes and proof."
                status="healthy"
              />
            </div>
          </div>
        </div>
      </AnuimeNodeFieldBackground>
    </section>
  );
}
