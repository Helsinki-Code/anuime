"use client";

import { AnuimeBreadcrumb } from "@/components/ui/anuime-breadcrumb";
import { AnuimeCommandDock } from "@/components/ui/anuime-command-dock";
import { AnuimeCommandPalette } from "@/components/ui/anuime-command-palette";
import { AnuimeScrollArea } from "@/components/ui/anuime-scroll-area";
import { AnuimeScrollProgress } from "@/components/ui/anuime-scroll-progress";
import { AnuimeSidebar } from "@/components/ui/anuime-sidebar";
import { AnuimeStickyRail } from "@/components/ui/anuime-sticky-rail";
import { AnuimeTypography } from "@/components/ui/anuime-typography";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeDocsShellSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeDocsShellSection({
  character = "kira",
  className = "",
}: AnuimeDocsShellSectionProps) {
  return (
    <section
      data-anuime-section="anuime-docs-shell-section"
      data-anuime-category="docs"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <div className="mx-auto grid max-w-[90rem] gap-8 p-6 md:p-10">
        <AnuimeBreadcrumb character={character} />
        <header id="overview" className="grid max-w-3xl gap-4">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
            docs
          </p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            A documentation workspace that keeps context.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Coordinate navigation, search, reading position, and reference content.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0 lg:col-span-2" data-composes="anuime-sidebar">
            <AnuimeSidebar character={character} />
          </div>
          <div className="min-w-0 lg:col-span-2" data-composes="anuime-command-palette">
            <AnuimeCommandPalette
              character={character}
              commands={[
                { id: "overview", label: "Open overview", group: "Navigate", shortcut: "O" },
                { id: "action", label: "Search the docs", group: "Actions", shortcut: "A" },
              ]}
            />
          </div>
          <div className="min-w-0 lg:col-span-2" data-composes="anuime-scroll-area">
            <AnuimeScrollArea character={character} className="h-48">
              <div className="grid gap-3 p-4">
                <strong>A documentation workspace that keeps context.</strong>
                <p className="text-sm text-muted-foreground">
                  Coordinate navigation, search, reading position, and reference content.
                </p>
              </div>
            </AnuimeScrollArea>
          </div>
          <div className="min-w-0" data-composes="anuime-typography">
            <AnuimeTypography character={character} />
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
          <div className="min-w-0" data-composes="anuime-scroll-progress">
            <AnuimeScrollProgress character={character} value={64} />
          </div>
          <div className="min-w-0" data-composes="anuime-command-dock">
            <AnuimeCommandDock
              character={character}
              commands={[
                { id: "search", label: "Search", shortcut: "⌘K" },
                { id: "open", label: "Search the docs", shortcut: "↵" },
              ]}
              activeId="search"
              onSelect={() => undefined}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
