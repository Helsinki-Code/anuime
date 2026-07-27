"use client";

import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeChartCallout } from "@/components/ui/anuime-chart-callout";
import { AnuimeConnectionBeam } from "@/components/ui/anuime-connection-beam";
import { AnuimeNodeMap } from "@/components/ui/anuime-node-map";
import { AnuimeSidebar } from "@/components/ui/anuime-sidebar";
import { AnuimeTooltip } from "@/components/ui/anuime-tooltip";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeDashboardNetworkSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeDashboardNetworkSection({
  character = "kira",
  className = "",
}: AnuimeDashboardNetworkSectionProps) {
  return (
    <section
      data-anuime-section="anuime-dashboard-network-section"
      data-anuime-category="dashboard"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <div className="mx-auto grid max-w-[90rem] gap-8 p-6 md:p-10">
        <header id="overview" className="grid max-w-3xl gap-4">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
            dashboard
          </p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Understand the system between the endpoints.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Show topology, connection health, and supporting trend context in one map.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0 lg:col-span-2" data-composes="anuime-sidebar">
            <AnuimeSidebar character={character} />
          </div>
          <div className="min-w-0" data-composes="anuime-card">
            <AnuimeCard
              character={character}
              eyebrow="Dashboard Network"
              title="Understand the system between the endpoints."
              description="Show topology, connection health, and supporting trend context in one map."
            />
          </div>
          <div className="min-w-0" data-composes="anuime-tooltip">
            <AnuimeTooltip character={character} label="More context is available">
              <span className="inline-flex min-h-10 items-center border border-border px-3 text-sm">
                Inspect detail
              </span>
            </AnuimeTooltip>
          </div>
          <div className="min-w-0" data-composes="anuime-badge">
            <AnuimeBadge character={character}>Dashboard Network</AnuimeBadge>
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
          <div className="min-w-0 lg:col-span-2" data-composes="anuime-connection-beam">
            <AnuimeConnectionBeam character={character} start="Source" end="Outcome" />
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
