"use client";

import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeChartCallout } from "@/components/ui/anuime-chart-callout";
import { AnuimeSeparator } from "@/components/ui/anuime-separator";
import { AnuimeStickyReveal } from "@/components/ui/anuime-sticky-reveal";
import { AnuimeTimelineFlow } from "@/components/ui/anuime-timeline-flow";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeStatsTimelineSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeStatsTimelineSection({
  character = "kira",
  className = "",
}: AnuimeStatsTimelineSectionProps) {
  return (
    <section
      data-anuime-section="anuime-stats-timeline-section"
      data-anuime-category="stats"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <div className="mx-auto grid max-w-7xl gap-8 p-6 md:p-10">
        <header id="overview" className="grid max-w-3xl gap-4">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
            stats
          </p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            See the metric and the moment that moved it.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Connect trend callouts to the product events that explain them.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-card">
            <AnuimeCard
              character={character}
              eyebrow="Stats Timeline"
              title="See the metric and the moment that moved it."
              description="Connect trend callouts to the product events that explain them."
            />
          </div>
          <div className="min-w-0" data-composes="anuime-badge">
            <AnuimeBadge character={character}>Stats Timeline</AnuimeBadge>
          </div>
          <div className="min-w-0" data-composes="anuime-separator">
            <AnuimeSeparator character={character} />
          </div>
          <div className="min-w-0 lg:col-span-2" data-composes="anuime-timeline-flow">
            <AnuimeTimelineFlow
              character={character}
              currentId="active"
              items={[
                { id: "planned", title: "Planned", detail: "Scope and owner confirmed" },
                { id: "active", title: "Active", detail: "Work is in progress" },
                { id: "complete", title: "Complete", detail: "Outcome verified" },
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
          <div className="min-w-0" data-composes="anuime-sticky-reveal">
            <AnuimeStickyReveal
              character={character}
              eyebrow="Stats Timeline"
              title="See the metric and the moment that moved it."
              body="Connect trend callouts to the product events that explain them."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
