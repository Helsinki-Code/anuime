"use client";

import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeBorderTraceButton } from "@/components/ui/anuime-border-trace-button";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeComparisonCard } from "@/components/ui/anuime-comparison-card";
import { AnuimeSeparator } from "@/components/ui/anuime-separator";
import { AnuimeTooltip } from "@/components/ui/anuime-tooltip";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimePricingCardsSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimePricingCardsSection({
  character = "kira",
  className = "",
}: AnuimePricingCardsSectionProps) {
  return (
    <section
      data-anuime-section="anuime-pricing-cards-section"
      data-anuime-category="pricing"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <div className="mx-auto grid max-w-7xl gap-8 p-6 md:p-10">
        <header id="overview" className="grid max-w-3xl gap-4">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
            pricing
          </p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Three plans. No interpretive dance.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Put price, fit, and meaningful limits in the same scan path.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-card">
            <AnuimeCard
              character={character}
              eyebrow="Pricing Cards"
              title="Three plans. No interpretive dance."
              description="Put price, fit, and meaningful limits in the same scan path."
            />
          </div>
          <div className="min-w-0" data-composes="anuime-badge">
            <AnuimeBadge character={character}>Pricing Cards</AnuimeBadge>
          </div>
          <div className="min-w-0" data-composes="anuime-button">
            <AnuimeButton character={character}>Choose this plan</AnuimeButton>
          </div>
          <div className="min-w-0" data-composes="anuime-separator">
            <AnuimeSeparator character={character} />
          </div>
          <div className="min-w-0" data-composes="anuime-tooltip">
            <AnuimeTooltip character={character} label="More context is available">
              <span className="inline-flex min-h-10 items-center border border-border px-3 text-sm">
                Inspect detail
              </span>
            </AnuimeTooltip>
          </div>
          <div className="min-w-0" data-composes="anuime-comparison-card">
            <AnuimeComparisonCard
              character={character}
              eyebrow="Recommended"
              title="Pricing Cards"
              price="Built in"
              selected
              features={[
                { label: "Character-aware construction" },
                { label: "Accessible defaults" },
                { label: "Opaque hand-rolled styling", included: false },
              ]}
            />
          </div>
          <div className="min-w-0" data-composes="anuime-border-trace-button">
            <AnuimeBorderTraceButton character={character}>
              Choose this plan
            </AnuimeBorderTraceButton>
          </div>
        </div>
      </div>
    </section>
  );
}
