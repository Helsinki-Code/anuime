"use client";

import { AnuimeAlert } from "@/components/ui/anuime-alert";
import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeNodeMap } from "@/components/ui/anuime-node-map";
import { AnuimeProgress } from "@/components/ui/anuime-progress";
import { AnuimeSignalCard } from "@/components/ui/anuime-signal-card";
import { AnuimeTimelineFlow } from "@/components/ui/anuime-timeline-flow";
import { AnuimeTooltip } from "@/components/ui/anuime-tooltip";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeStatusOverviewSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeStatusOverviewSection({
  character = "kira",
  className = "",
}: AnuimeStatusOverviewSectionProps) {
  return (
    <section
      data-anuime-section="anuime-status-overview-section"
      data-anuime-category="status"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <div className="mx-auto grid max-w-6xl gap-8 p-6 md:p-10">
        <header id="overview" className="grid max-w-3xl gap-4">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
            status
          </p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Current health, plainly stated.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Summarize every service, active issue, and recent event without hiding nuance.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-card">
            <AnuimeCard
              character={character}
              eyebrow="Status Overview"
              title="Current health, plainly stated."
              description="Summarize every service, active issue, and recent event without hiding nuance."
            />
          </div>
          <div className="min-w-0" data-composes="anuime-badge">
            <AnuimeBadge character={character}>Status Overview</AnuimeBadge>
          </div>
          <div className="min-w-0" data-composes="anuime-alert">
            <AnuimeAlert
              character={character}
              title="Context preserved"
              description="Summarize every service, active issue, and recent event without hiding nuance."
            />
          </div>
          <div className="min-w-0" data-composes="anuime-progress">
            <AnuimeProgress character={character} label="Completion" value={68} />
          </div>
          <div className="min-w-0" data-composes="anuime-tooltip">
            <AnuimeTooltip character={character} label="More context is available">
              <span className="inline-flex min-h-10 items-center border border-border px-3 text-sm">
                Inspect detail
              </span>
            </AnuimeTooltip>
          </div>
          <div className="min-w-0" data-composes="anuime-signal-card">
            <AnuimeSignalCard
              character={character}
              label="Live signal"
              title="All systems nominal"
              description="Summarize every service, active issue, and recent event without hiding nuance."
              status="healthy"
            />
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
        </div>
      </div>
    </section>
  );
}
