"use client";

import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeBentoCard } from "@/components/ui/anuime-bento-card";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeMetricCard } from "@/components/ui/anuime-metric-card";
import { AnuimeNodeFieldBackground } from "@/components/ui/anuime-node-field-background";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeHeroBentoSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeHeroBentoSection({
  character = "kira",
  className = "",
}: AnuimeHeroBentoSectionProps) {
  return (
    <section
      data-anuime-section="anuime-hero-bento-section"
      data-anuime-category="hero"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <AnuimeNodeFieldBackground character={character} className="w-full">
        <div className="mx-auto grid min-h-[38rem] max-w-7xl content-center gap-8 p-6 md:p-10">
          <header id="overview" className="grid max-w-4xl gap-4">
            <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
              hero
            </p>
            <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
              The whole system, visible at once.
            </h2>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              Combine the core promise with live metrics and compact capability previews.
            </p>
          </header>
          <div
            id="details"
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
          >
            <div className="min-w-0" data-composes="anuime-badge">
              <AnuimeBadge character={character}>Hero Bento</AnuimeBadge>
            </div>
            <div className="min-w-0" data-composes="anuime-button">
              <AnuimeButton character={character}>Explore the catalog</AnuimeButton>
            </div>
            <div className="min-w-0" data-composes="anuime-card">
              <AnuimeCard
                character={character}
                eyebrow="Hero Bento"
                title="The whole system, visible at once."
                description="Combine the core promise with live metrics and compact capability previews."
              />
            </div>
            <div className="min-w-0" data-composes="anuime-bento-card">
              <AnuimeBentoCard
                character={character}
                eyebrow="Hero Bento"
                title="The whole system, visible at once."
                size="lg"
              >
                Combine the core promise with live metrics and compact capability previews.
              </AnuimeBentoCard>
            </div>
            <div className="min-w-0" data-composes="anuime-metric-card">
              <AnuimeMetricCard
                character={character}
                label="Hero Bento"
                value="94.8%"
                delta="+6.2%"
                direction="up"
              />
            </div>
          </div>
        </div>
      </AnuimeNodeFieldBackground>
    </section>
  );
}
