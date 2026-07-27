"use client";

import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeCheckbox } from "@/components/ui/anuime-checkbox";
import { AnuimeComparisonCard } from "@/components/ui/anuime-comparison-card";
import { AnuimeStickyRail } from "@/components/ui/anuime-sticky-rail";
import { AnuimeTable } from "@/components/ui/anuime-table";
import { AnuimeTooltip } from "@/components/ui/anuime-tooltip";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimePricingComparisonSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimePricingComparisonSection({
  character = "kira",
  className = "",
}: AnuimePricingComparisonSectionProps) {
  return (
    <section
      data-anuime-section="anuime-pricing-comparison-section"
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
            Compare the details that change the decision.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Keep plan differences aligned, labeled, and available while the table moves.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0 lg:col-span-2" data-composes="anuime-table">
            <AnuimeTable character={character} />
          </div>
          <div className="min-w-0" data-composes="anuime-checkbox">
            <AnuimeCheckbox
              character={character}
              label="Keep me informed"
              description="Send relevant updates about this decision."
              defaultChecked
            />
          </div>
          <div className="min-w-0" data-composes="anuime-badge">
            <AnuimeBadge character={character}>Pricing Comparison</AnuimeBadge>
          </div>
          <div className="min-w-0" data-composes="anuime-button">
            <AnuimeButton character={character}>Compare plans</AnuimeButton>
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
              title="Pricing Comparison"
              price="Built in"
              selected
              features={[
                { label: "Character-aware construction" },
                { label: "Accessible defaults" },
                { label: "Opaque hand-rolled styling", included: false },
              ]}
            />
          </div>
          <div className="min-w-0" data-composes="anuime-sticky-rail">
            <AnuimeStickyRail
              character={character}
              items={[
                { id: "overview", label: "Overview" },
                { id: "details", label: "Details" },
                { id: "next", label: "Next step" },
              ]}
              activeId="overview"
              onSelect={() => undefined}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
