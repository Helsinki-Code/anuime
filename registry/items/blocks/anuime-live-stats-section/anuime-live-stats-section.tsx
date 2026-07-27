"use client";

import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeNodeMap } from "@/components/ui/anuime-node-map";
import { AnuimeNumberTicker } from "@/components/ui/anuime-number-ticker";
import { AnuimeProgress } from "@/components/ui/anuime-progress";
import { AnuimeSignalCard } from "@/components/ui/anuime-signal-card";
import { AnuimeTooltip } from "@/components/ui/anuime-tooltip";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeLiveStatsSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeLiveStatsSection({
  character = "kira",
  className = "",
}: AnuimeLiveStatsSectionProps) {
  return (
    <section
      data-anuime-section="anuime-live-stats-section"
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
            Live state without dashboard theater.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Show changing counts beside service health and the system path producing them.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-card">
            <AnuimeCard
              character={character}
              eyebrow="Live Stats"
              title="Live state without dashboard theater."
              description="Show changing counts beside service health and the system path producing them."
            />
          </div>
          <div className="min-w-0" data-composes="anuime-progress">
            <AnuimeProgress character={character} label="Completion" value={68} />
          </div>
          <div className="min-w-0" data-composes="anuime-badge">
            <AnuimeBadge character={character}>Live Stats</AnuimeBadge>
          </div>
          <div className="min-w-0" data-composes="anuime-tooltip">
            <AnuimeTooltip character={character} label="More context is available">
              <span className="inline-flex min-h-10 items-center border border-border px-3 text-sm">
                Inspect detail
              </span>
            </AnuimeTooltip>
          </div>
          <div className="min-w-0 lg:col-span-2" data-composes="anuime-node-map">
            <AnuimeNodeMap
              character={character}
              nodes={[
                { id: "source", label: "Source", x: 16, y: 52, active: true },
                { id: "process", label: "Process", x: 50, y: 26 },
                { id: "outcome", label: "Outcome", x: 84, y: 62 },
              ]}
              links={[
                ["source", "process"],
                ["process", "outcome"],
              ]}
            />
          </div>
          <div className="min-w-0" data-composes="anuime-signal-card">
            <AnuimeSignalCard
              character={character}
              label="Live signal"
              title="All systems nominal"
              description="Show changing counts beside service health and the system path producing them."
              status="healthy"
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
        </div>
      </div>
    </section>
  );
}
