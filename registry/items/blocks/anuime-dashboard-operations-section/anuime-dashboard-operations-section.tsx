"use client";

import { AnuimeAlert } from "@/components/ui/anuime-alert";
import { AnuimeNodeMap } from "@/components/ui/anuime-node-map";
import { AnuimeProgress } from "@/components/ui/anuime-progress";
import { AnuimeSidebar } from "@/components/ui/anuime-sidebar";
import { AnuimeSignalCard } from "@/components/ui/anuime-signal-card";
import { AnuimeTable } from "@/components/ui/anuime-table";
import { AnuimeTimelineFlow } from "@/components/ui/anuime-timeline-flow";
import { AnuimeToolbar } from "@/components/ui/anuime-toolbar";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeDashboardOperationsSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeDashboardOperationsSection({
  character = "kira",
  className = "",
}: AnuimeDashboardOperationsSectionProps) {
  return (
    <section
      data-anuime-section="anuime-dashboard-operations-section"
      data-anuime-category="dashboard"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <div className="mx-auto grid max-w-[90rem] gap-8 p-6 md:p-10">
        <AnuimeToolbar character={character} />
        <header id="overview" className="grid max-w-3xl gap-4">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
            dashboard
          </p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Operate from signal, not surprise.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Align service state, active incidents, and recent operational events.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0 lg:col-span-2" data-composes="anuime-sidebar">
            <AnuimeSidebar character={character} />
          </div>
          <div className="min-w-0 lg:col-span-2" data-composes="anuime-table">
            <AnuimeTable character={character} />
          </div>
          <div className="min-w-0" data-composes="anuime-progress">
            <AnuimeProgress character={character} label="Completion" value={68} />
          </div>
          <div className="min-w-0" data-composes="anuime-alert">
            <AnuimeAlert
              character={character}
              title="Context preserved"
              description="Align service state, active incidents, and recent operational events."
            />
          </div>
          <div className="min-w-0" data-composes="anuime-signal-card">
            <AnuimeSignalCard
              character={character}
              label="Live signal"
              title="All systems nominal"
              description="Align service state, active incidents, and recent operational events."
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
