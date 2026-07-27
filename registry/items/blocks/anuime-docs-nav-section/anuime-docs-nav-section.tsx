"use client";

import { AnuimeBreadcrumb } from "@/components/ui/anuime-breadcrumb";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeCommandDock } from "@/components/ui/anuime-command-dock";
import { AnuimeCommandPalette } from "@/components/ui/anuime-command-palette";
import { AnuimeKbd } from "@/components/ui/anuime-kbd";
import { AnuimeStickyRail } from "@/components/ui/anuime-sticky-rail";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeDocsNavSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeDocsNavSection({
  character = "kira",
  className = "",
}: AnuimeDocsNavSectionProps) {
  return (
    <section
      data-anuime-section="anuime-docs-nav-section"
      data-anuime-category="nav"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <div className="mx-auto grid max-w-7xl gap-8 p-6 md:p-10">
        <AnuimeBreadcrumb character={character} />
        <header id="overview" className="grid max-w-2xl gap-4">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">nav</p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Find the reference before context expires.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Bring search, breadcrumbs, shortcuts, and section position into one docs control layer.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0 lg:col-span-2" data-composes="anuime-command-palette">
            <AnuimeCommandPalette
              character={character}
              commands={[
                { id: "overview", label: "Open overview", group: "Navigate", shortcut: "O" },
                { id: "action", label: "Search documentation", group: "Actions", shortcut: "A" },
              ]}
            />
          </div>
          <div className="min-w-0" data-composes="anuime-button">
            <AnuimeButton character={character}>Search documentation</AnuimeButton>
          </div>
          <div className="min-w-0" data-composes="anuime-kbd">
            <AnuimeKbd character={character}>⌘ K</AnuimeKbd>
          </div>
          <div className="min-w-0" data-composes="anuime-command-dock">
            <AnuimeCommandDock
              character={character}
              commands={[
                { id: "search", label: "Search", shortcut: "⌘K" },
                { id: "open", label: "Search documentation", shortcut: "↵" },
              ]}
              activeId="search"
              onSelect={() => undefined}
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
