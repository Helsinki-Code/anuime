"use client";

import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeChartCallout } from "@/components/ui/anuime-chart-callout";
import { AnuimeDataTable } from "@/components/ui/anuime-data-table";
import { AnuimeMetricCard } from "@/components/ui/anuime-metric-card";
import { AnuimeSidebar } from "@/components/ui/anuime-sidebar";
import { AnuimeStickyRail } from "@/components/ui/anuime-sticky-rail";
import { AnuimeToolbar } from "@/components/ui/anuime-toolbar";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeDashboardOverviewSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeDashboardOverviewSection({
  character = "kira",
  className = "",
}: AnuimeDashboardOverviewSectionProps) {
  return (
    <section
      data-anuime-section="anuime-dashboard-overview-section"
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
            A workspace built for decisions.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Put high-level health, active work, and the next useful drill-down in one view.
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
              eyebrow="Dashboard Overview"
              title="A workspace built for decisions."
              description="Put high-level health, active work, and the next useful drill-down in one view."
            />
          </div>
          <div className="min-w-0 lg:col-span-2" data-composes="anuime-data-table">
            <AnuimeDataTable
              character={character}
              caption="Current operating signals"
              rows={[
                { id: "1", signal: "Readiness", owner: "Product", status: "Ready" },
                { id: "2", signal: "Quality", owner: "Design", status: "Verified" },
              ]}
              columns={[
                { key: "signal", header: "Signal" },
                { key: "owner", header: "Owner" },
                { key: "status", header: "Status" },
              ]}
            />
          </div>
          <div className="min-w-0" data-composes="anuime-badge">
            <AnuimeBadge character={character}>Dashboard Overview</AnuimeBadge>
          </div>
          <div className="min-w-0" data-composes="anuime-metric-card">
            <AnuimeMetricCard
              character={character}
              label="Dashboard Overview"
              value="94.8%"
              delta="+6.2%"
              direction="up"
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
