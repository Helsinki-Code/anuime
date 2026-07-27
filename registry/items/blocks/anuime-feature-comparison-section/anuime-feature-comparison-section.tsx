"use client";

import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeChartCallout } from "@/components/ui/anuime-chart-callout";
import { AnuimeComparisonCard } from "@/components/ui/anuime-comparison-card";
import { AnuimeTable } from "@/components/ui/anuime-table";
import { AnuimeTabs } from "@/components/ui/anuime-tabs";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeFeatureComparisonSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeFeatureComparisonSection({
  character = "kira",
  className = "",
}: AnuimeFeatureComparisonSectionProps) {
  return (
    <section
      data-anuime-section="anuime-feature-comparison-section"
      data-anuime-category="features"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <div className="mx-auto grid max-w-7xl gap-8 p-6 md:p-10">
        <header id="overview" className="grid max-w-3xl gap-4">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
            features
          </p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Choose by behavior, not adjectives.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Put competing approaches beside concrete signals and implementation detail.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-tabs">
            <AnuimeTabs
              character={character}
              tabs={[
                {
                  id: "overview",
                  label: "Overview",
                  content:
                    "Put competing approaches beside concrete signals and implementation detail.",
                },
                {
                  id: "details",
                  label: "Details",
                  content: "Every dependency remains visible and inspectable.",
                },
              ]}
            />
          </div>
          <div className="min-w-0 lg:col-span-2" data-composes="anuime-table">
            <AnuimeTable character={character} />
          </div>
          <div className="min-w-0" data-composes="anuime-badge">
            <AnuimeBadge character={character}>Feature Comparison</AnuimeBadge>
          </div>
          <div className="min-w-0" data-composes="anuime-button">
            <AnuimeButton character={character}>Inspect the difference</AnuimeButton>
          </div>
          <div className="min-w-0" data-composes="anuime-comparison-card">
            <AnuimeComparisonCard
              character={character}
              eyebrow="Recommended"
              title="Feature Comparison"
              price="Built in"
              selected
              features={[
                { label: "Character-aware construction" },
                { label: "Accessible defaults" },
                { label: "Opaque hand-rolled styling", included: false },
              ]}
            />
          </div>
          <div className="min-w-0" data-composes="anuime-chart-callout">
            <AnuimeChartCallout
              character={character}
              label="Period signal"
              value="+18.4%"
              detail="Measured against the previous operating window."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
