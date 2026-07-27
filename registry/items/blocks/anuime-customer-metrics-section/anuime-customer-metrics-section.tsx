"use client";

import { AnuimeAvatar } from "@/components/ui/anuime-avatar";
import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeChartCallout } from "@/components/ui/anuime-chart-callout";
import { AnuimeMetricCard } from "@/components/ui/anuime-metric-card";
import { AnuimeNumberTicker } from "@/components/ui/anuime-number-ticker";
import { AnuimeTooltip } from "@/components/ui/anuime-tooltip";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeCustomerMetricsSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeCustomerMetricsSection({
  character = "kira",
  className = "",
}: AnuimeCustomerMetricsSectionProps) {
  return (
    <section
      data-anuime-section="anuime-customer-metrics-section"
      data-anuime-category="social-proof"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <div className="mx-auto grid max-w-7xl gap-8 p-6 md:p-10">
        <header id="overview" className="grid max-w-3xl gap-4">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
            social proof
          </p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Adoption numbers with their meaning attached.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Pair scale, direction, and customer context so metrics remain credible.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-card">
            <AnuimeCard
              character={character}
              eyebrow="Customer Metrics"
              title="Adoption numbers with their meaning attached."
              description="Pair scale, direction, and customer context so metrics remain credible."
            />
          </div>
          <div className="min-w-0" data-composes="anuime-avatar">
            <AnuimeAvatar character={character} fallback="AN" alt="AnUIme team" status="online" />
          </div>
          <div className="min-w-0" data-composes="anuime-badge">
            <AnuimeBadge character={character}>Customer Metrics</AnuimeBadge>
          </div>
          <div className="min-w-0" data-composes="anuime-tooltip">
            <AnuimeTooltip character={character} label="More context is available">
              <span className="inline-flex min-h-10 items-center border border-border px-3 text-sm">
                Inspect detail
              </span>
            </AnuimeTooltip>
          </div>
          <div className="min-w-0" data-composes="anuime-metric-card">
            <AnuimeMetricCard
              character={character}
              label="Customer Metrics"
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
