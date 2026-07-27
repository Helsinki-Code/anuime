"use client";

import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeCopyButton } from "@/components/ui/anuime-copy-button";
import { AnuimeInput } from "@/components/ui/anuime-input";
import { AnuimeMetricCard } from "@/components/ui/anuime-metric-card";
import { AnuimeNumberTicker } from "@/components/ui/anuime-number-ticker";
import { AnuimeSlider } from "@/components/ui/anuime-slider";
import { AnuimeToggle } from "@/components/ui/anuime-toggle";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimePricingCalculatorSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimePricingCalculatorSection({
  character = "kira",
  className = "",
}: AnuimePricingCalculatorSectionProps) {
  return (
    <section
      data-anuime-section="anuime-pricing-calculator-section"
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
            Price the usage you actually expect.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Turn volume and billing choices into a transparent live estimate.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-card">
            <AnuimeCard
              character={character}
              eyebrow="Pricing Calculator"
              title="Price the usage you actually expect."
              description="Turn volume and billing choices into a transparent live estimate."
            />
          </div>
          <div className="min-w-0" data-composes="anuime-slider">
            <AnuimeSlider character={character} label="Monthly usage" defaultValue={48} />
          </div>
          <div className="min-w-0" data-composes="anuime-toggle">
            <AnuimeToggle character={character}>Annual billing</AnuimeToggle>
          </div>
          <div className="min-w-0" data-composes="anuime-input">
            <AnuimeInput
              character={character}
              label="Work email"
              hint="We will only use this for the requested follow-up."
              placeholder="you@company.com"
            />
          </div>
          <div className="min-w-0" data-composes="anuime-button">
            <AnuimeButton character={character}>Use this estimate</AnuimeButton>
          </div>
          <div className="min-w-0" data-composes="anuime-metric-card">
            <AnuimeMetricCard
              character={character}
              label="Pricing Calculator"
              value="94.8%"
              delta="+6.2%"
              direction="up"
            />
          </div>
          <div className="min-w-0" data-composes="anuime-number-ticker">
            <AnuimeNumberTicker
              character={character}
              from={0}
              value={2418}
              className="text-3xl font-bold"
            />
          </div>
          <div className="min-w-0" data-composes="anuime-copy-button">
            <AnuimeCopyButton
              character={character}
              value="npx shadcn@latest add https://anuime.vercel.app/r/anuime-pricing-calculator-section.json"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
