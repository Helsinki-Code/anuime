"use client";

import { AnuimeAccordion } from "@/components/ui/anuime-accordion";
import { AnuimeBorderTraceButton } from "@/components/ui/anuime-border-trace-button";
import { AnuimeBreadcrumb } from "@/components/ui/anuime-breadcrumb";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeStickyRail } from "@/components/ui/anuime-sticky-rail";
import { AnuimeTypography } from "@/components/ui/anuime-typography";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeCareerDetailSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeCareerDetailSection({
  character = "kira",
  className = "",
}: AnuimeCareerDetailSectionProps) {
  return (
    <section
      data-anuime-section="anuime-career-detail-section"
      data-anuime-category="careers"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <div className="mx-auto grid max-w-7xl gap-8 p-6 md:p-10">
        <AnuimeBreadcrumb character={character} />
        <header id="overview" className="grid max-w-3xl gap-4">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
            careers
          </p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Know the role before you apply.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Make scope, expectations, process, and company context easy to evaluate.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-card">
            <AnuimeCard
              character={character}
              eyebrow="Career Detail"
              title="Know the role before you apply."
              description="Make scope, expectations, process, and company context easy to evaluate."
            />
          </div>
          <div className="min-w-0" data-composes="anuime-typography">
            <AnuimeTypography character={character} />
          </div>
          <div className="min-w-0" data-composes="anuime-button">
            <AnuimeButton character={character}>Apply for this role</AnuimeButton>
          </div>
          <div className="min-w-0" data-composes="anuime-accordion">
            <AnuimeAccordion
              character={character}
              items={[
                {
                  id: "purpose",
                  title: "What is included?",
                  content:
                    "Make scope, expectations, process, and company context easy to evaluate.",
                },
                {
                  id: "next",
                  title: "What happens next?",
                  content: "Choose the next action when the context is clear.",
                },
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
          <div className="min-w-0" data-composes="anuime-border-trace-button">
            <AnuimeBorderTraceButton character={character}>
              Apply for this role
            </AnuimeBorderTraceButton>
          </div>
        </div>
      </div>
    </section>
  );
}
