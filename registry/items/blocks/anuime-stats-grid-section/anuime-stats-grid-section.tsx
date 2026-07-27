"use client";

import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeBentoCard } from "@/components/ui/anuime-bento-card";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeMetricCard } from "@/components/ui/anuime-metric-card";
import { AnuimeNumberTicker } from "@/components/ui/anuime-number-ticker";
import { AnuimeTooltip } from "@/components/ui/anuime-tooltip";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeStatsGridSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeStatsGridSection({
  character = "kira",
  className = "",
}: AnuimeStatsGridSectionProps) {
  return (
    <section
      data-anuime-section="anuime-stats-grid-section"
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
            The operating picture in twelve seconds.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Arrange the metrics leaders need with labels, direction, and comparison intact.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-card">
            <AnuimeCard
              character={character}
              eyebrow="Stats Grid"
              title="The operating picture in twelve seconds."
              description="Arrange the metrics leaders need with labels, direction, and comparison intact."
            />
          </div>
          <div className="min-w-0" data-composes="anuime-badge">
            <AnuimeBadge character={character}>Stats Grid</AnuimeBadge>
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
              label="Stats Grid"
              value="94.8%"
              delta="+6.2%"
              direction="up"
            />
          </div>
          <div className="min-w-0" data-composes="anuime-bento-card">
            <AnuimeBentoCard
              character={character}
              eyebrow="Stats Grid"
              title="The operating picture in twelve seconds."
              size="lg"
            >
              Arrange the metrics leaders need with labels, direction, and comparison intact.
            </AnuimeBentoCard>
          </div>
          <div className="min-w-0" data-composes="anuime-number-ticker">
            <AnuimeNumberTicker
              character={character}
              from={0}
              value={2418}
              className="text-3xl font-bold"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
