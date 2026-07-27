"use client";

import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeCodeDiff } from "@/components/ui/anuime-code-diff";
import { AnuimeCodeWindow } from "@/components/ui/anuime-code-window";
import { AnuimeCommandPalette } from "@/components/ui/anuime-command-palette";
import { AnuimeFileTree } from "@/components/ui/anuime-file-tree";
import { AnuimeSidebar } from "@/components/ui/anuime-sidebar";
import { AnuimeTabs } from "@/components/ui/anuime-tabs";
import { AnuimeTerminalWindow } from "@/components/ui/anuime-terminal-window";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeDashboardDeveloperSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeDashboardDeveloperSection({
  character = "kira",
  className = "",
}: AnuimeDashboardDeveloperSectionProps) {
  return (
    <section
      data-anuime-section="anuime-dashboard-developer-section"
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
            The developer surface, fully inspectable.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Keep commands, source, files, and changes together for fast technical work.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0 lg:col-span-2" data-composes="anuime-sidebar">
            <AnuimeSidebar character={character} />
          </div>
          <div className="min-w-0" data-composes="anuime-tabs">
            <AnuimeTabs
              character={character}
              tabs={[
                {
                  id: "overview",
                  label: "Overview",
                  content:
                    "Keep commands, source, files, and changes together for fast technical work.",
                },
                {
                  id: "details",
                  label: "Details",
                  content: "Every dependency remains visible and inspectable.",
                },
              ]}
            />
          </div>
          <div className="min-w-0 lg:col-span-2" data-composes="anuime-command-palette">
            <AnuimeCommandPalette
              character={character}
              commands={[
                { id: "overview", label: "Open overview", group: "Navigate", shortcut: "O" },
                { id: "action", label: "Open developer tools", group: "Actions", shortcut: "A" },
              ]}
            />
          </div>
          <div className="min-w-0" data-composes="anuime-badge">
            <AnuimeBadge character={character}>Dashboard Developer</AnuimeBadge>
          </div>
          <div className="min-w-0 lg:col-span-2" data-composes="anuime-code-window">
            <AnuimeCodeWindow
              character={character}
              code={
                'export function Example() {\n  return <main data-character="kira">Composed from registry primitives.</main>;\n}'
              }
            />
          </div>
          <div className="min-w-0 lg:col-span-2" data-composes="anuime-terminal-window">
            <AnuimeTerminalWindow
              character={character}
              entries={[
                {
                  command: "npx shadcn@latest add anuime-dashboard-developer-section",
                  output: "Installed composed section and dependencies.",
                },
                { command: "vp test run", output: "Composition checks passed." },
              ]}
            />
          </div>
          <div className="min-w-0 lg:col-span-2" data-composes="anuime-file-tree">
            <AnuimeFileTree
              character={character}
              nodes={[
                {
                  id: "app",
                  label: "app",
                  children: [
                    { id: "section", label: "anuime-dashboard-developer-section.tsx" },
                    { id: "page", label: "page.tsx" },
                  ],
                },
              ]}
              defaultExpanded={["app"]}
            />
          </div>
          <div className="min-w-0 lg:col-span-2" data-composes="anuime-code-diff">
            <AnuimeCodeDiff
              character={character}
              lines={[
                {
                  kind: "context",
                  content: "export function Experience() {",
                  oldLine: 1,
                  newLine: 1,
                },
                { kind: "removal", content: "  return <Generic />", oldLine: 2 },
                { kind: "addition", content: "  return <AnuimeSection />", newLine: 2 },
                { kind: "context", content: "}", oldLine: 3, newLine: 3 },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
