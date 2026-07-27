"use client";

import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeLineGridBackground } from "@/components/ui/anuime-line-grid-background";
import { AnuimeSeparator } from "@/components/ui/anuime-separator";
import { AnuimeTooltip } from "@/components/ui/anuime-tooltip";
import { AnuimeTraceCard } from "@/components/ui/anuime-trace-card";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeLogoCloudSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeLogoCloudSection({
  character = "kira",
  className = "",
}: AnuimeLogoCloudSectionProps) {
  return (
    <section
      data-anuime-section="anuime-logo-cloud-section"
      data-anuime-category="social-proof"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <AnuimeLineGridBackground character={character} className="w-full">
        <div className="mx-auto grid max-w-7xl gap-8 p-6 md:p-10">
          <header id="overview" className="grid max-w-3xl gap-4">
            <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
              social proof
            </p>
            <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
              Trusted in workflows that care about craft.
            </h2>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              Present partner evidence as structured proof rather than a decorative logo wall.
            </p>
          </header>
          <div
            id="details"
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
          >
            <div className="min-w-0" data-composes="anuime-card">
              <AnuimeCard
                character={character}
                eyebrow="Logo Cloud"
                title="Trusted in workflows that care about craft."
                description="Present partner evidence as structured proof rather than a decorative logo wall."
              />
            </div>
            <div className="min-w-0" data-composes="anuime-tooltip">
              <AnuimeTooltip character={character} label="More context is available">
                <span className="inline-flex min-h-10 items-center border border-border px-3 text-sm">
                  Inspect detail
                </span>
              </AnuimeTooltip>
            </div>
            <div className="min-w-0" data-composes="anuime-separator">
              <AnuimeSeparator character={character} />
            </div>
            <div className="min-w-0" data-composes="anuime-trace-card">
              <AnuimeTraceCard
                character={character}
                title="Trusted in workflows that care about craft."
                description="Present partner evidence as structured proof rather than a decorative logo wall."
                footer={<span className="text-sm font-semibold">See integrations</span>}
              />
            </div>
          </div>
        </div>
      </AnuimeLineGridBackground>
    </section>
  );
}
