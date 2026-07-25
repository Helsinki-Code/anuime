import { IconArrowRight, IconCopy, IconLock, IconSparkles } from "@tabler/icons-react";
import { Link, createFileRoute } from "@tanstack/react-router";

import { SiteLogo } from "@/components/docs/site-logo";
import { Button } from "@/components/ui/button";
import { trackProductEvent } from "@/lib/analytics";
import { curatedGalleryEntries, type GalleryEntry } from "@/lib/anuime/gallery";
import { componentCatalog, studioSearchFromDocument } from "@/lib/anuime/studio";
import { featureFlags } from "@/lib/feature-flags";

import { AnuimeAlert } from "../../registry/items/components/anuime-alert/anuime-alert";
import {
  AnuimeAvatar,
  AnuimeAvatarGroup,
} from "../../registry/items/components/anuime-avatar/anuime-avatar";
import {
  AnuimeBadge,
  AnuimeStatusIndicator,
} from "../../registry/items/components/anuime-badge/anuime-badge";
import {
  AnuimeButtonGroup,
  AnuimeButtonGroupItem,
} from "../../registry/items/components/anuime-button-group/anuime-button-group";
import { AnuimeButton } from "../../registry/items/components/anuime-button/anuime-button";
import { AnuimeCard } from "../../registry/items/components/anuime-card/anuime-card";
import { AnuimeInput } from "../../registry/items/components/anuime-input/anuime-input";
import { AnuimeProgress } from "../../registry/items/components/anuime-progress/anuime-progress";
import { AnuimeSwitch } from "../../registry/items/components/anuime-switch/anuime-switch";
import {
  AnuimeTable,
  AnuimeTableBody,
  AnuimeTableCell,
  AnuimeTableHead,
  AnuimeTableHeader,
  AnuimeTableRow,
} from "../../registry/items/components/anuime-table/anuime-table";
import {
  AnuimeToolbar,
  AnuimeToolbarButton,
} from "../../registry/items/components/anuime-toolbar/anuime-toolbar";
import { getSeoHead } from "../lib/seo";

export const Route = createFileRoute("/gallery")({
  head: () =>
    getSeoHead({
      title: "AnUIme Examples — Character-driven product compositions",
      description:
        "Explore complete interface examples composed from real AnUIme registry components.",
      path: "/gallery",
    }),
  component: GalleryPage,
});

function GalleryPage() {
  const examples = curatedGalleryEntries.filter((entry) => entry.moderationStatus === "approved");

  return (
    <main className="overflow-hidden">
      <section className="anuime-grid relative isolate border-b px-5 py-16 sm:py-24">
        <div className="anuime-aurora pointer-events-none absolute inset-0 opacity-35" />
        <div className="relative mx-auto max-w-7xl">
          <SiteLogo className="h-10 w-44" />
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <p className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                <IconSparkles className="size-4" /> Product examples · real registry primitives
              </p>
              <h1 className="mt-5 max-w-4xl text-5xl leading-[0.96] font-semibold tracking-[-0.055em] text-balance sm:text-7xl">
                Components make sense when they work together.
              </h1>
            </div>
            <div className="lg:pb-2">
              <p className="text-lg leading-8 text-muted-foreground">
                Six production-minded compositions across launch, onboarding, operations,
                publishing, and review workflows. Every preview is built from the same installable
                components available in the registry.
              </p>
              <Button
                className="mt-6"
                size="lg"
                nativeButton={false}
                render={<Link to="/studio" />}
              >
                Build your own in Studio
                <IconArrowRight data-icon="inline-end" />
              </Button>
            </div>
          </div>
          <div className="mt-12 grid gap-3 border-t pt-5 sm:grid-cols-3">
            <GalleryMetric value="6" label="Complete compositions" />
            <GalleryMetric value="18+" label="Primitives in context" />
            <GalleryMetric value="3" label="Character systems" />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[100rem] gap-5 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-16">
        {examples.map((entry, index) => (
          <ExampleCard key={entry.id} entry={entry} featured={index === 0 || index === 3} />
        ))}
      </section>

      <section className="border-y bg-muted/25 px-5 py-16 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
              A gallery with guardrails
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Remix the recipe. Keep the construction laws.
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Examples carry deterministic recipes and real component IDs—never arbitrary HTML or
              mystery CSS. Remixing opens a complete, shareable Studio document.
            </p>
          </div>
          {!featureFlags.galleryPublish ? (
            <p className="inline-flex shrink-0 items-center gap-2 rounded-full border bg-background px-4 py-2 text-xs text-muted-foreground">
              <IconLock className="size-3.5" /> Community publishing remains feature-gated
            </p>
          ) : null}
        </div>
      </section>
    </main>
  );
}

function ExampleCard({ entry, featured }: { entry: GalleryEntry; featured: boolean }) {
  const componentId = entry.componentIds[0] ?? "button";
  const search = studioSearchFromDocument({
    recipe: entry.recipe,
    componentId,
    previewState: componentCatalog[componentId].states[0] ?? "default",
    viewport: "desktop",
    zoom: 1,
  });

  return (
    <article
      data-gallery-example={entry.id}
      className={`group overflow-hidden rounded-[2rem] border bg-background shadow-[0_24px_70px_-55px_color-mix(in_oklab,var(--foreground)_55%,transparent)] ${featured ? "lg:col-span-2 lg:grid lg:grid-cols-[1.25fr_0.75fr]" : ""}`}
    >
      <div
        className={`anuime-system anuime-system-${entry.recipe.colorSystem} relative min-h-[25rem] overflow-hidden bg-[var(--anuime-surface,var(--background))] p-4 text-[var(--anuime-foreground,var(--foreground))] sm:p-6 ${entry.recipe.mode === "dark" ? "dark" : ""}`}
      >
        <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,color-mix(in_oklab,var(--anuime-border,var(--border))_55%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--anuime-border,var(--border))_55%,transparent)_1px,transparent_1px)] [background-size:26px_26px] opacity-35" />
        <div className="relative flex min-h-[22rem] items-center justify-center rounded-[1.25rem] border border-[var(--anuime-border,var(--border))] bg-[var(--anuime-surface,var(--background))]/92 p-4 shadow-lg sm:p-6">
          <ExampleComposition entry={entry} />
        </div>
      </div>
      <div className="flex flex-col justify-between border-t p-6 sm:p-7 lg:border-t-0 lg:border-l">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              {entry.recipe.colorSystem} system · {entry.recipe.density}
            </p>
            <span className="text-xs text-muted-foreground">By {entry.author.displayName}</span>
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight">{entry.title}</h2>
          <p className="mt-3 leading-7 text-muted-foreground">{entry.description}</p>
          <div className="mt-5">
            <p className="text-xs font-semibold">Built with</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {entry.componentIds.map((id) => (
                <span key={id} className="rounded-full border bg-muted/30 px-2.5 py-1 text-xs">
                  {componentCatalog[id].title}
                </span>
              ))}
            </div>
          </div>
        </div>
        <Link
          to="/studio"
          search={search}
          onClick={() =>
            trackProductEvent({
              name: "gallery_remixed",
              character: entry.recipe.colorSystem,
            })
          }
          className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-foreground px-4 text-sm font-semibold text-background transition hover:opacity-85"
        >
          <IconCopy className="size-4" /> Remix this direction
        </Link>
      </div>
    </article>
  );
}

function ExampleComposition({ entry }: { entry: GalleryEntry }) {
  const recipe = entry.recipe;

  switch (entry.id) {
    case "signal-launch":
      return (
        <div className="grid w-full max-w-xl gap-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                Release sequence / 07
              </p>
              <h3 className="mt-1 text-xl font-semibold">Signal launch</h3>
            </div>
            <AnuimeStatusIndicator recipe={recipe} label="Armed" tone="success" />
          </div>
          <AnuimeAlert
            recipe={recipe}
            title="All checks passed"
            description="The registry, docs, and production bundle are aligned."
          />
          <AnuimeProgress recipe={recipe} label="Deployment signal" value={86} />
          <div className="flex justify-end">
            <AnuimeButton recipe={recipe}>Activate release</AnuimeButton>
          </div>
        </div>
      );
    case "soft-start":
      return (
        <div className="grid w-full max-w-md gap-5">
          <div>
            <AnuimeBadge recipe={recipe} tone="warning">
              Step 2 of 3
            </AnuimeBadge>
            <h3 className="mt-3 text-2xl font-semibold">Make this space yours.</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              A calm setup flow with just enough guidance.
            </p>
          </div>
          <AnuimeInput recipe={recipe} label="Workspace name" defaultValue="Moonroom Studio" />
          <AnuimeSwitch
            recipe={recipe}
            label="Gentle celebrations"
            description="Use restrained success feedback."
            defaultChecked
          />
          <AnuimeButton recipe={recipe}>Continue setup</AnuimeButton>
        </div>
      );
    case "control-plane":
      return (
        <div className="grid w-full max-w-2xl gap-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                Sector 04 / service mesh
              </p>
              <h3 className="mt-1 text-xl font-semibold">Control plane</h3>
            </div>
            <AnuimeBadge recipe={recipe} tone="success">
              99.98% nominal
            </AnuimeBadge>
          </div>
          <AnuimeTable recipe={recipe}>
            <AnuimeTableHeader>
              <AnuimeTableRow>
                <AnuimeTableHead>Node</AnuimeTableHead>
                <AnuimeTableHead>Load</AnuimeTableHead>
                <AnuimeTableHead>Status</AnuimeTableHead>
              </AnuimeTableRow>
            </AnuimeTableHeader>
            <AnuimeTableBody>
              {[
                ["north-01", "42%", "Ready"],
                ["west-08", "67%", "Review"],
                ["edge-12", "31%", "Ready"],
              ].map(([node, load, status]) => (
                <AnuimeTableRow key={node}>
                  <AnuimeTableCell>{node}</AnuimeTableCell>
                  <AnuimeTableCell>{load}</AnuimeTableCell>
                  <AnuimeTableCell>{status}</AnuimeTableCell>
                </AnuimeTableRow>
              ))}
            </AnuimeTableBody>
          </AnuimeTable>
        </div>
      );
    case "night-shift":
      return (
        <div className="grid w-full max-w-xl gap-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                Night operations
              </p>
              <h3 className="mt-1 text-xl font-semibold">Quiet telemetry</h3>
            </div>
            <AnuimeStatusIndicator recipe={recipe} label="Live" tone="success" />
          </div>
          <div className="grid gap-4 rounded-lg border p-4">
            <AnuimeProgress recipe={recipe} label="Memory envelope" value={64} />
            <AnuimeProgress recipe={recipe} label="Queue pressure" value={38} />
          </div>
          <AnuimeToolbar recipe={recipe}>
            <AnuimeToolbarButton recipe={recipe}>Silence</AnuimeToolbarButton>
            <AnuimeToolbarButton recipe={recipe}>Inspect</AnuimeToolbarButton>
            <AnuimeToolbarButton recipe={recipe}>Escalate</AnuimeToolbarButton>
          </AnuimeToolbar>
        </div>
      );
    case "creator-release":
      return (
        <div className="grid w-full max-w-xl gap-4 sm:grid-cols-[1fr_0.72fr]">
          <AnuimeCard
            recipe={recipe}
            eyebrow="Release 12"
            title="A softer launch."
            description="Publish with calm status, clear controls, and a deliberate final action."
            action={<AnuimeButton recipe={recipe}>Review release</AnuimeButton>}
          />
          <div className="grid content-center gap-4 rounded-xl border p-4">
            <AnuimeInput recipe={recipe} label="Release label" defaultValue="Dusk notes" />
            <AnuimeSwitch recipe={recipe} label="Notify followers" defaultChecked />
          </div>
        </div>
      );
    case "signal-review":
      return (
        <div className="grid w-full max-w-xl gap-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                Review queue
              </p>
              <h3 className="mt-1 text-xl font-semibold">Three signals waiting</h3>
            </div>
            <AnuimeAvatarGroup>
              <AnuimeAvatar recipe={recipe} fallback="KI" />
              <AnuimeAvatar recipe={recipe} fallback="MO" />
              <AnuimeAvatar recipe={recipe} fallback="AT" />
            </AnuimeAvatarGroup>
          </div>
          <AnuimeAlert
            recipe={recipe}
            tone="warning"
            title="Contrast changed"
            description="Two token adjustments need a final human review."
          />
          <div className="flex items-center justify-between gap-4">
            <AnuimeBadge recipe={recipe}>2 files changed</AnuimeBadge>
            <AnuimeButtonGroup recipe={recipe}>
              <AnuimeButtonGroupItem recipe={recipe}>Request edits</AnuimeButtonGroupItem>
              <AnuimeButtonGroupItem recipe={recipe}>Approve</AnuimeButtonGroupItem>
            </AnuimeButtonGroup>
          </div>
        </div>
      );
    default:
      return null;
  }
}

function GalleryMetric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <span className="text-2xl font-semibold">{value}</span>
      <span className="ml-2 text-sm text-muted-foreground">{label}</span>
    </div>
  );
}
