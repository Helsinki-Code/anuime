"use client";

import { AnuimeAvatar } from "@/components/ui/anuime-avatar";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeFloatingDock } from "@/components/ui/anuime-floating-dock";
import { AnuimeScrollProgress } from "@/components/ui/anuime-scroll-progress";
import { AnuimeTooltip } from "@/components/ui/anuime-tooltip";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeFloatingNavSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeFloatingNavSection({
  character = "kira",
  className = "",
}: AnuimeFloatingNavSectionProps) {
  return (
    <section
      data-anuime-section="anuime-floating-nav-section"
      data-anuime-category="nav"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <div className="mx-auto grid max-w-7xl gap-8 p-6 md:p-10">
        <header id="overview" className="grid max-w-2xl gap-4">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">nav</p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            The next destination stays within reach.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Use a compact dock and reading progress without covering the work underneath.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-tooltip">
            <AnuimeTooltip character={character} label="More context is available">
              <span className="inline-flex min-h-10 items-center border border-border px-3 text-sm">
                Inspect detail
              </span>
            </AnuimeTooltip>
          </div>
          <div className="min-w-0" data-composes="anuime-avatar">
            <AnuimeAvatar character={character} fallback="AN" alt="AnUIme team" status="online" />
          </div>
          <div className="min-w-0" data-composes="anuime-button">
            <AnuimeButton character={character}>Navigate workspace</AnuimeButton>
          </div>
          <div className="min-w-0" data-composes="anuime-floating-dock">
            <AnuimeFloatingDock
              character={character}
              items={[
                { id: "overview", label: "Overview", icon: "◇" },
                { id: "action", label: "Navigate workspace", icon: "→" },
              ]}
              activeId="overview"
              onSelect={() => undefined}
            />
          </div>
          <div className="min-w-0" data-composes="anuime-scroll-progress">
            <AnuimeScrollProgress character={character} value={64} />
          </div>
        </div>
      </div>
    </section>
  );
}
