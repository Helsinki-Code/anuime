/* eslint-disable jsx-a11y/no-noninteractive-tabindex -- Scrollable install commands must be keyboard reachable. */
import {
  IconArrowBackUp,
  IconArrowForwardUp,
  IconCheck,
  IconCode,
  IconCopy,
  IconDeviceDesktop,
  IconDeviceMobile,
  IconDeviceTablet,
  IconDownload,
  IconExternalLink,
  IconPhoto,
  IconRefresh,
  IconSearch,
  IconSparkles,
} from "@tabler/icons-react";
import { Link, createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { z } from "zod";

import { SiteLogo } from "@/components/docs/site-logo";
import { ComponentPreview } from "@/components/studio/component-preview";
import { Button } from "@/components/ui/button";
import { trackProductEvent } from "@/lib/analytics";
import { characterIds, characterSystems } from "@/lib/anuime/characters";
import { directorProposalSchema, type DirectorProposal } from "@/lib/anuime/director";
import { exportPreviewAsPng } from "@/lib/anuime/export-preview";
import {
  anuimeDensities,
  anuimeModes,
  anuimeMotionLevels,
  createAnuimeRecipe,
  decodeAnuimeRecipe,
  encodeAnuimeRecipe,
  validateAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime/recipe";
import {
  componentCatalog,
  defaultStudioDocument,
  getInstallCommand,
  getUsageSnippet,
  parseStudioSearch,
  registryComponentIds,
  studioDocumentFromSearch,
  studioSearchFromDocument,
  type StudioDocument,
  type StudioViewport,
  type StudioZoom,
} from "@/lib/anuime/studio";
import { featureFlags } from "@/lib/feature-flags";

import { getSeoHead } from "../lib/seo";

export const Route = createFileRoute("/studio")({
  validateSearch: parseStudioSearch,
  head: () =>
    getSeoHead({
      title: "Component Lab — AnUIme",
      description:
        "Direct every AnUIme component across character, state, viewport, density, and motion.",
      path: "/studio",
    }),
  component: StudioPage,
});

const recipeDimensions = [
  ["colorSystem", "Color"],
  ["shapeSystem", "Shape"],
  ["structureSystem", "Structure"],
  ["motionSystem", "Motion"],
] as const;

const directorSessionResponseSchema = z.object({ csrfToken: z.string().min(1) });
const directorApiResponseSchema = z.object({ proposal: directorProposalSchema });

function StudioPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [document, setDocument] = React.useState(() => studioDocumentFromSearch(search));
  const [past, setPast] = React.useState<StudioDocument[]>([]);
  const [future, setFuture] = React.useState<StudioDocument[]>([]);
  const [notice, setNotice] = React.useState<string | null>(null);
  const [mobileControlsOpen, setMobileControlsOpen] = React.useState(false);
  const [recentRecipes, setRecentRecipes] = React.useState<AnuimeRecipeV2[]>([]);
  const [studioReady, setStudioReady] = React.useState(false);
  const previewRef = React.useRef<HTMLDivElement>(null);
  const incoming = React.useMemo(() => studioDocumentFromSearch(search), [search]);

  React.useEffect(() => {
    setDocument((current) => (documentKey(incoming) === documentKey(current) ? current : incoming));
  }, [incoming]);

  React.useEffect(() => {
    setStudioReady(true);
    trackProductEvent({ name: "studio_entered" });
    try {
      const stored = parseStoredRecipes(localStorage.getItem("anuime:recent-recipes"));
      setRecentRecipes(
        stored
          .map((value) => (typeof value === "string" ? value : ""))
          .map((value) => importRecipe(value))
          .filter((value): value is AnuimeRecipeV2 => Boolean(value))
          .slice(0, 5),
      );
    } catch {
      localStorage.removeItem("anuime:recent-recipes");
    }
  }, []);

  const commit = React.useCallback(
    (next: StudioDocument, replace = false) => {
      if (next.componentId !== document.componentId) {
        trackProductEvent({ name: "component_selected", componentId: next.componentId });
      }
      setPast((items) => [...items.slice(-29), document]);
      setDocument(next);
      setFuture([]);
      rememberRecipe(next.recipe, setRecentRecipes);
      void navigate({ search: studioSearchFromDocument(next), replace });
    },
    [document, navigate],
  );

  const undo = React.useCallback(() => {
    const previous = past.at(-1);
    if (!previous) return;
    setPast((items) => items.slice(0, -1));
    setFuture((items) => [document, ...items].slice(0, 30));
    setDocument(previous);
    void navigate({ search: studioSearchFromDocument(previous) });
  }, [document, navigate, past]);

  const redo = React.useCallback(() => {
    const next = future[0];
    if (!next) return;
    setFuture((items) => items.slice(1));
    setPast((items) => [...items.slice(-29), document]);
    setDocument(next);
    void navigate({ search: studioSearchFromDocument(next) });
  }, [document, future, navigate]);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey)) return;
      if (event.key.toLowerCase() === "z" && !event.shiftKey) {
        event.preventDefault();
        undo();
      }
      if (event.key.toLowerCase() === "y" || (event.key.toLowerCase() === "z" && event.shiftKey)) {
        event.preventDefault();
        redo();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [redo, undo]);

  const copy = async (value: string, message: string) => {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard access is unavailable.");
      await navigator.clipboard.writeText(value);
      showNotice(setNotice, message);
    } catch {
      showNotice(setNotice, "Clipboard blocked — select and copy the code manually.");
    }
  };

  const issues = validateAnuimeRecipe(document.recipe);
  const component = componentCatalog[document.componentId];
  const activeCharacter =
    characterIds.find((character) => isPureCharacter(document.recipe, character)) ?? null;

  return (
    <main
      className="relative min-h-[calc(100svh-3.5rem)] overflow-hidden bg-muted/20"
      data-studio-ready={studioReady}
    >
      <div className="anuime-aurora pointer-events-none absolute inset-x-0 top-0 h-[32rem] opacity-35 dark:opacity-20" />
      <div className="anuime-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_78%)] opacity-35" />
      <div className="relative mx-auto max-w-[104rem] px-3 py-5 sm:px-5 lg:px-7">
        <header className="overflow-hidden rounded-[1.75rem] border bg-background/88 shadow-[0_18px_60px_-36px_color-mix(in_oklab,var(--foreground)_35%,transparent)] backdrop-blur-xl">
          <div className="flex flex-col gap-5 p-5 sm:p-7 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <SiteLogo className="mr-2 h-8 w-32" />
                <span className="inline-flex items-center gap-2 rounded-full border bg-foreground px-3 py-1 font-mono text-[10px] font-semibold tracking-[0.15em] text-background uppercase">
                  <IconSparkles className="size-3.5" /> Studio 2.0
                </span>
                <span className="rounded-full border bg-background/80 px-3 py-1 text-xs text-muted-foreground">
                  {registryComponentIds.length} installable components
                </span>
                <span className="rounded-full border bg-background/80 px-3 py-1 text-xs text-muted-foreground">
                  URL-synced
                </span>
              </div>
              <h1 className="mt-5 text-3xl font-semibold tracking-[-0.045em] text-balance sm:text-5xl">
                Compose a system.{" "}
                <span className="text-muted-foreground">See the real component.</span>
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                Pick a production component, cast a complete character, then fine-tune only when the
                product calls for it.
              </p>
            </div>
            <div
              className="flex flex-wrap items-center gap-2"
              aria-label="Studio history and sharing"
            >
              <Button variant="outline" size="sm" disabled={past.length === 0} onClick={undo}>
                <IconArrowBackUp data-icon="inline-start" /> Undo
              </Button>
              <Button variant="outline" size="sm" disabled={future.length === 0} onClick={redo}>
                <IconArrowForwardUp data-icon="inline-start" /> Redo
              </Button>
              <Button variant="ghost" size="sm" onClick={() => commit(defaultStudioDocument)}>
                <IconRefresh data-icon="inline-start" /> Reset
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  trackProductEvent({ name: "recipe_shared", componentId: document.componentId });
                  void copy(window.location.href, "Share URL copied.");
                }}
              >
                <IconCopy data-icon="inline-start" /> Share recipe
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t bg-muted/35 px-5 py-3 text-xs sm:px-7">
            <span className="font-mono font-semibold tracking-[0.12em] uppercase">Live recipe</span>
            <RecipeSignal label="Component" value={component.title} />
            <RecipeSignal
              label="Character"
              value={activeCharacter ? characterSystems[activeCharacter].name : "Custom cast"}
            />
            <RecipeSignal label="Density" value={document.recipe.density} />
            <RecipeSignal label="Motion" value={document.recipe.motionLevel} />
            <RecipeSignal label="Mode" value={document.recipe.mode} />
          </div>
        </header>

        {search.warning === "invalid-recipe" ? (
          <div
            role="alert"
            className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm"
          >
            <span className="mt-1 size-2 shrink-0 rounded-full bg-amber-500" />
            <span>
              The shared recipe was invalid, so the safe Kira default is shown. Adjust the controls
              to create a new valid link.
            </span>
          </div>
        ) : null}

        <section
          data-studio-mobile-controls
          className="mt-4 rounded-2xl border bg-background/95 p-4 shadow-sm xl:hidden"
        >
          <button
            type="button"
            className="w-full cursor-pointer text-left font-semibold"
            aria-expanded={mobileControlsOpen}
            onClick={() => setMobileControlsOpen((open) => !open)}
          >
            <span className="flex items-center justify-between gap-4">
              <span>
                Open Studio controls
                <span className="mt-1 block text-xs font-normal text-muted-foreground">
                  Component, character, and fine-tuning
                </span>
              </span>
              <span className="rounded-full border px-2.5 py-1 text-xs">
                {mobileControlsOpen ? "Close" : "Edit"}
              </span>
            </span>
          </button>
          {mobileControlsOpen ? (
            <div className="mt-5 border-t pt-5">
              <StudioControls document={document} commit={commit} recentRecipes={recentRecipes} />
            </div>
          ) : null}
        </section>

        <div className="mt-4 grid items-start gap-4 xl:grid-cols-[19rem_minmax(34rem,1fr)_20rem]">
          <aside
            data-studio-desktop-controls
            className="sticky top-20 hidden max-h-[calc(100svh-6.5rem)] overflow-y-auto rounded-[1.5rem] border bg-background/92 p-5 shadow-sm backdrop-blur-xl xl:block"
          >
            <StudioControls document={document} commit={commit} recentRecipes={recentRecipes} />
          </aside>

          <section className="min-w-0 overflow-hidden rounded-[1.75rem] border bg-background/92 shadow-[0_24px_70px_-46px_color-mix(in_oklab,var(--foreground)_45%,transparent)] backdrop-blur-xl">
            <div className="flex flex-col gap-4 border-b p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-emerald-500)_18%,transparent)]" />
                  <p className="font-mono text-[10px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                    Live preview · {component.registryName}
                  </p>
                </div>
                <h2 className="mt-1 truncate text-xl font-semibold tracking-tight">
                  {component.title}
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">{component.description}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div
                  className="inline-flex rounded-xl border bg-muted/45 p-1"
                  aria-label="Preview viewport"
                >
                  {(["mobile", "tablet", "desktop"] as StudioViewport[]).map((viewport) => (
                    <button
                      key={viewport}
                      aria-label={viewport}
                      title={`${viewport} preview`}
                      className={`inline-flex min-h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium capitalize transition ${document.viewport === viewport ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:bg-background hover:text-foreground"}`}
                      onClick={() => commit({ ...document, viewport })}
                    >
                      {viewport === "mobile" ? (
                        <IconDeviceMobile className="size-3.5" />
                      ) : viewport === "tablet" ? (
                        <IconDeviceTablet className="size-3.5" />
                      ) : (
                        <IconDeviceDesktop className="size-3.5" />
                      )}
                      <span className="hidden sm:inline">{viewport}</span>
                    </button>
                  ))}
                </div>
                <div
                  className="inline-flex rounded-xl border bg-muted/45 p-1"
                  aria-label="Preview zoom"
                >
                  {([0.75, 1, 1.25] as StudioZoom[]).map((zoom) => (
                    <button
                      key={zoom}
                      aria-label={`${zoom * 100}% zoom`}
                      onClick={() => commit({ ...document, zoom })}
                      className={`min-h-8 rounded-lg px-2.5 text-[11px] font-medium transition ${document.zoom === zoom ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      {zoom * 100}%
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative bg-[linear-gradient(to_right,color-mix(in_oklab,var(--border)_58%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--border)_58%,transparent)_1px,transparent_1px)] bg-[size:24px_24px] p-3 sm:p-6">
              <div className="absolute top-3 left-4 font-mono text-[9px] tracking-[0.14em] text-muted-foreground uppercase sm:top-4 sm:left-6">
                Stage / {document.viewport}
              </div>
              <div className="flex min-h-[38rem] items-start justify-center overflow-auto rounded-2xl border bg-muted/55 p-3 pt-10 shadow-inner sm:p-8 sm:pt-12">
                <div
                  ref={previewRef}
                  data-preview-mode={document.recipe.mode}
                  data-recipe-version="2"
                  className={`anuime-system anuime-system-${document.recipe.colorSystem} anuime-preview-canvas flex min-h-[30rem] w-full items-center justify-center overflow-hidden border bg-background p-4 text-foreground transition-[width] sm:p-8 ${viewportClass(document.viewport)} ${document.recipe.mode === "dark" ? "dark" : ""} ${document.recipe.motionLevel === "still" ? "anuime-motion-still" : ""}`}
                  style={{ transform: `scale(${document.zoom})`, transformOrigin: "top center" }}
                >
                  <ComponentPreview document={document} />
                </div>
              </div>
            </div>

            <div className="border-t p-4 sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold">Preview state</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    Exercise the states this component actually ships.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {component.states.map((state) => (
                    <button
                      key={state}
                      onClick={() => commit({ ...document, previewState: state })}
                      className={`min-h-9 rounded-lg border px-3 text-xs font-medium capitalize transition ${document.previewState === state ? "border-foreground bg-foreground text-background" : "bg-background hover:bg-muted"}`}
                    >
                      {state}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <aside className="grid gap-4 xl:sticky xl:top-20 xl:max-h-[calc(100svh-6.5rem)] xl:overflow-y-auto">
            <section className="overflow-hidden rounded-[1.5rem] border bg-background/92 shadow-sm backdrop-blur-xl">
              <div className="border-b p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-mono text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                      Ship it
                    </p>
                    <h2 className="mt-1 text-lg font-semibold">Production ready</h2>
                  </div>
                  <span
                    className={`grid size-9 place-items-center rounded-full ${issues.length === 0 ? "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300" : "bg-destructive/10 text-destructive"}`}
                  >
                    <IconCheck className="size-4" />
                  </span>
                </div>
                <div className="mt-4" aria-live="polite">
                  {issues.length === 0 ? (
                    <p className="flex items-start gap-2 text-xs leading-5 text-emerald-700 dark:text-emerald-300">
                      <IconCheck className="mt-0.5 size-4 shrink-0" /> No compatibility conflicts.
                    </p>
                  ) : (
                    issues.map((issue) => (
                      <p key={issue.code} className="mt-2 text-xs text-destructive">
                        {issue.message}
                      </p>
                    ))
                  )}
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold">Install this component</p>
                <div className="mt-2 overflow-hidden rounded-xl border bg-foreground text-background">
                  <pre
                    tabIndex={0}
                    className="overflow-x-auto p-3 font-mono text-[10px] leading-5 focus-visible:outline-2 focus-visible:outline-offset-[-2px]"
                  >
                    <code>{getInstallCommand(document.componentId)}</code>
                  </pre>
                </div>
                <Button
                  className="mt-3 w-full"
                  size="sm"
                  onClick={() =>
                    void (async () => {
                      trackProductEvent({
                        name: "install_copied",
                        componentId: document.componentId,
                      });
                      await copy(
                        getInstallCommand(document.componentId),
                        "Install command copied.",
                      );
                    })()
                  }
                >
                  <IconDownload data-icon="inline-start" /> Copy install command
                </Button>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <ActionButton
                    icon={<IconCode />}
                    onClick={() =>
                      void copy(JSON.stringify(document.recipe, null, 2), "Recipe JSON copied.")
                    }
                  >
                    Copy recipe JSON
                  </ActionButton>
                  <ActionButton
                    icon={<IconCopy />}
                    onClick={() => void copy(getUsageSnippet(document), "React usage copied.")}
                  >
                    Copy React usage
                  </ActionButton>
                  <ActionButton
                    icon={<IconPhoto />}
                    onClick={() => {
                      const element = previewRef.current;
                      if (!element) return;
                      void exportPreviewAsPng(
                        element,
                        `anuime-${document.componentId}-${encodeAnuimeRecipe(document.recipe)}.png`,
                      )
                        .then(() => {
                          trackProductEvent({
                            name: "preview_exported",
                            componentId: document.componentId,
                          });
                          showNotice(setNotice, "PNG exported.");
                        })
                        .catch(() =>
                          showNotice(setNotice, "PNG export is unavailable in this browser."),
                        );
                    }}
                  >
                    Export PNG
                  </ActionButton>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start"
                    nativeButton={false}
                    render={
                      <Link
                        to="/$section/$name"
                        params={{
                          section: document.componentId === "auth-panel" ? "blocks" : "components",
                          name: component.registryName,
                        }}
                        onClick={() =>
                          trackProductEvent({
                            name: "docs_opened",
                            componentId: document.componentId,
                          })
                        }
                      />
                    }
                  >
                    <IconExternalLink data-icon="inline-start" /> Open docs
                  </Button>
                </div>
              </div>
            </section>

            {featureFlags.aiDirector ? (
              <section className="rounded-[1.5rem] border bg-background/92 p-5 shadow-sm backdrop-blur-xl">
                <DirectorPanel
                  document={document}
                  apply={(recipe) => commit({ ...document, recipe })}
                />
              </section>
            ) : null}
          </aside>
        </div>
      </div>
      {notice ? (
        <div
          role="status"
          className="fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-xl border bg-foreground px-4 py-3 text-sm text-background shadow-xl"
        >
          <IconCheck className="size-4" /> {notice}
        </div>
      ) : null}
    </main>
  );
}

function DirectorPanel({
  document,
  apply,
}: {
  document: StudioDocument;
  apply: (recipe: AnuimeRecipeV2) => void;
}) {
  const [intent, setIntent] = React.useState("");
  const [proposal, setProposal] = React.useState<DirectorProposal | null>(null);
  const [status, setStatus] = React.useState<"idle" | "loading" | "error">("idle");
  const propose = async () => {
    setStatus("loading");
    setProposal(null);
    try {
      const sessionResponse = await fetch("/api/director/session", {
        credentials: "same-origin",
        headers: { accept: "application/json" },
      });
      if (!sessionResponse.ok) throw new Error("Director session unavailable");
      const session = directorSessionResponseSchema.parse(await sessionResponse.json());
      const response = await fetch("/api/director/propose", {
        method: "POST",
        credentials: "same-origin",
        headers: { "content-type": "application/json", "x-anuime-csrf": session.csrfToken },
        body: JSON.stringify({
          intent,
          componentIds: [document.componentId],
          constraints: {
            mode: document.recipe.mode === "system" ? undefined : document.recipe.mode,
            reducedMotion: document.recipe.motionLevel === "still",
            density: document.recipe.density,
          },
          currentRecipe: document.recipe,
        }),
      });
      if (!response.ok) throw new Error("Director proposal failed");
      const body = directorApiResponseSchema.parse(await response.json());
      setProposal(body.proposal);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  };
  return (
    <section>
      <h2 className="flex items-center gap-2 text-sm font-semibold">
        <IconSparkles className="size-4 text-violet-500" /> Eve AI Director
      </h2>
      <p className="mt-2 text-xs leading-5 text-muted-foreground">
        Proposals are schema-only and never alter the Studio until you apply them.
      </p>
      <label className="mt-3 grid gap-2 text-xs font-medium">
        Product intent
        <textarea
          value={intent}
          maxLength={500}
          onChange={(event) => setIntent(event.target.value)}
          placeholder="A calm operations dashboard for night shifts"
          className="min-h-24 rounded-lg border bg-background p-2 text-sm font-normal"
        />
      </label>
      <Button
        className="mt-2 w-full"
        size="sm"
        disabled={intent.trim().length < 3 || status === "loading"}
        onClick={() => void propose()}
      >
        {status === "loading" ? "Directing…" : "Propose recipe"}
      </Button>
      {status === "error" ? (
        <p role="alert" className="mt-2 text-xs text-destructive">
          Director unavailable. Your current Studio state is unchanged.
        </p>
      ) : null}
      {proposal ? (
        <div className="mt-3 rounded-xl border bg-muted/30 p-3">
          <ul className="grid gap-1 text-xs text-muted-foreground">
            {proposal.rationale.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
          <Button className="mt-3 w-full" size="sm" onClick={() => apply(proposal.recipe)}>
            Preview and apply proposal
          </Button>
        </div>
      ) : null}
    </section>
  );
}

function StudioControls({
  document,
  commit,
  recentRecipes,
}: {
  document: StudioDocument;
  commit: (next: StudioDocument) => void;
  recentRecipes: AnuimeRecipeV2[];
}) {
  const [componentQuery, setComponentQuery] = React.useState("");
  const setRecipe = (recipe: AnuimeRecipeV2) => commit({ ...document, recipe });
  const matchingComponents = registryComponentIds.filter((id) => {
    if (!componentQuery.trim()) return true;
    const query = componentQuery.trim().toLowerCase();
    const item = componentCatalog[id];
    return (
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.registryName.includes(query)
    );
  });
  const componentOptions = matchingComponents.includes(document.componentId)
    ? matchingComponents
    : [document.componentId, ...matchingComponents];

  return (
    <div className="space-y-6">
      <section>
        <ControlStep number="01" title="Choose a component" detail="What are you designing?" />
        <label className="relative mt-3 block">
          <span className="sr-only">Search registry</span>
          <IconSearch className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={componentQuery}
            onChange={(event) => setComponentQuery(event.target.value)}
            placeholder="Search 52 components…"
            className="h-10 w-full rounded-xl border bg-muted/30 pr-3 pl-9 text-sm transition outline-none placeholder:text-muted-foreground focus:border-foreground focus:bg-background focus:ring-2 focus:ring-ring/20"
          />
        </label>
        <select
          aria-label="Component"
          className="mt-2 h-11 w-full rounded-xl border bg-background px-3 text-sm font-medium"
          value={document.componentId}
          onChange={(event) => {
            const componentId = registryComponentIds.find((id) => id === event.target.value);
            if (componentId)
              commit({
                ...document,
                componentId,
                previewState: componentCatalog[componentId].states[0] ?? "default",
              });
          }}
        >
          {componentOptions.map((id) => (
            <option key={id} value={id}>
              {componentCatalog[id].title}
            </option>
          ))}
        </select>
        <div className="mt-3 rounded-xl border bg-muted/25 p-3">
          <p className="text-sm font-semibold">{componentCatalog[document.componentId].title}</p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            {componentCatalog[document.componentId].description}
          </p>
          <p className="mt-2 font-mono text-[9px] tracking-[0.1em] text-muted-foreground uppercase">
            {componentCatalog[document.componentId].registryName}
          </p>
        </div>
      </section>

      <section className="border-t pt-5">
        <ControlStep number="02" title="Cast a character" detail="Start with a complete system." />
        <div className="mt-3 grid gap-2">
          {characterIds.map((id) => {
            const selected = isPureCharacter(document.recipe, id);
            return (
              <button
                key={id}
                aria-pressed={selected}
                onClick={() => setRecipe(createAnuimeRecipe(id))}
                className={`anuime-system anuime-system-${id} group relative overflow-hidden border p-3 text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-md ${selected ? "ring-2 ring-[var(--anuime-accent)] ring-offset-2 ring-offset-background" : "bg-background"}`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute top-0 right-0 h-full w-1.5 bg-[var(--anuime-accent)] transition ${selected ? "opacity-100" : "opacity-25 group-hover:opacity-65"}`}
                />
                <span className="flex items-center gap-3">
                  <span className="relative grid size-10 shrink-0 place-items-center border border-[var(--anuime-accent)]/45 bg-[var(--anuime-accent)]/8">
                    <CharacterGlyph character={id} />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{characterSystems[id].name}</span>
                      {selected ? (
                        <span className="rounded-full bg-foreground px-2 py-0.5 font-mono text-[8px] font-semibold tracking-[0.1em] text-background uppercase">
                          Cast
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-muted-foreground">
                      {characterSystems[id].adjective} · {characterSystems[id].tagline}
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="border-t pt-5">
        <ControlStep
          number="03"
          title="Set the atmosphere"
          detail="The useful everyday controls."
        />
        <div className="mt-3 grid gap-4">
          <SegmentedField
            label="Density"
            value={document.recipe.density}
            options={anuimeDensities}
            onChange={(density) => setRecipe({ ...document.recipe, density })}
          />
          <SegmentedField
            label="Motion"
            value={document.recipe.motionLevel}
            options={anuimeMotionLevels}
            onChange={(motionLevel) => setRecipe({ ...document.recipe, motionLevel })}
          />
          <SegmentedField
            label="Mode"
            value={document.recipe.mode}
            options={anuimeModes}
            onChange={(mode) => setRecipe({ ...document.recipe, mode })}
          />
        </div>
      </section>

      <details className="group border-t pt-5">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
          <span>
            <span className="block text-sm font-semibold">Advanced character mixer</span>
            <span className="mt-0.5 block text-xs text-muted-foreground">
              Blend color, shape, structure, and motion.
            </span>
          </span>
          <span className="rounded-full border px-2.5 py-1 text-[10px] font-semibold group-open:bg-foreground group-open:text-background">
            Custom
          </span>
        </summary>
        <div className="mt-4 grid gap-4 rounded-xl border bg-muted/25 p-3">
          {recipeDimensions.map(([key, label]) => (
            <SelectField
              key={key}
              label={label}
              value={document.recipe[key]}
              options={characterIds}
              format={(id) => characterSystems[id].name}
              onChange={(value) => setRecipe({ ...document.recipe, [key]: value })}
            />
          ))}
        </div>
      </details>

      {recentRecipes.length > 0 ? (
        <fieldset className="border-t pt-4">
          <legend className="text-sm font-semibold">Recent casts</legend>
          <p className="mt-1 text-xs text-muted-foreground">
            Jump back to a recipe from this device.
          </p>
          <div className="mt-3 grid gap-2">
            {recentRecipes.map((recipe) => (
              <button
                key={encodeAnuimeRecipe(recipe)}
                className="rounded-lg border px-3 py-2 text-left text-xs transition hover:bg-muted"
                onClick={() => setRecipe(recipe)}
              >
                <span className="font-semibold capitalize">
                  {recipe.colorSystem} / {recipe.shapeSystem}
                </span>
                <span className="mt-0.5 block text-[10px] text-muted-foreground capitalize">
                  {recipe.density} · {recipe.motionLevel} · {recipe.mode}
                </span>
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}
    </div>
  );
}

function ControlStep({ number, title, detail }: { number: string; title: string; detail: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-foreground font-mono text-[9px] font-semibold text-background">
        {number}
      </span>
      <span>
        <span className="block text-sm font-semibold">{title}</span>
        <span className="mt-0.5 block text-xs text-muted-foreground">{detail}</span>
      </span>
    </div>
  );
}

function CharacterGlyph({ character }: { character: AnuimeCharacter }) {
  if (character === "kira")
    return (
      <span
        aria-hidden="true"
        className="size-4 rotate-45 border border-[var(--anuime-accent)] shadow-[6px_-6px_0_-5px_var(--anuime-accent)]"
      />
    );
  if (character === "mochi")
    return (
      <span
        aria-hidden="true"
        className="size-4 rounded-full border-2 border-[var(--anuime-accent)] shadow-[0_0_0_3px_color-mix(in_oklab,var(--anuime-accent)_14%,transparent)]"
      />
    );
  return (
    <span aria-hidden="true" className="relative size-5 border border-[var(--anuime-accent)]">
      <span className="absolute inset-1 rotate-45 border border-[var(--anuime-accent)]" />
    </span>
  );
}

function SegmentedField<Value extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: Value;
  options: readonly Value[];
  onChange: (value: Value) => void;
}) {
  return (
    <fieldset>
      <legend className="text-xs font-medium">{label}</legend>
      <div className="mt-2 grid grid-cols-3 rounded-xl border bg-muted/40 p-1">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={value === option}
            className={`min-h-8 rounded-lg px-1 text-[10px] font-medium capitalize transition ${value === option ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function SelectField<Value extends string>({
  label,
  value,
  options,
  onChange,
  format = (option) => option,
}: {
  label: string;
  value: Value;
  options: readonly Value[];
  onChange: (value: Value) => void;
  format?: (option: Value) => string;
}) {
  return (
    <label className="block text-xs font-medium">
      {label}
      <select
        className="mt-2 h-9 w-full rounded-lg border bg-background px-2.5 text-xs capitalize"
        value={value}
        onChange={(event) => {
          const next = options.find((option) => option === event.target.value);
          if (next) onChange(next);
        }}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {format(option)}
          </option>
        ))}
      </select>
    </label>
  );
}

function ActionButton({
  icon,
  children,
  onClick,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="min-w-0 justify-start overflow-hidden"
      onClick={onClick}
    >
      {icon}
      <span className="truncate">{children}</span>
    </Button>
  );
}

function RecipeSignal({ label, value }: { label: string; value: string }) {
  return (
    <span className="text-muted-foreground">
      {label} <strong className="font-medium text-foreground capitalize">{value}</strong>
    </span>
  );
}

function viewportClass(viewport: StudioViewport) {
  return viewport === "mobile"
    ? "max-w-[24rem]"
    : viewport === "tablet"
      ? "max-w-[48rem]"
      : "max-w-[72rem]";
}

function isPureCharacter(recipe: AnuimeRecipeV2, character: AnuimeCharacter) {
  return (
    recipe.colorSystem === character &&
    recipe.shapeSystem === character &&
    recipe.structureSystem === character &&
    recipe.motionSystem === character
  );
}

function documentKey(document: StudioDocument) {
  return `${encodeAnuimeRecipe(document.recipe)}:${document.componentId}:${document.previewState}:${document.viewport}:${document.zoom}`;
}

function importRecipe(value: string) {
  return decodeAnuimeRecipe(value);
}

function rememberRecipe(
  recipe: AnuimeRecipeV2,
  update: React.Dispatch<React.SetStateAction<AnuimeRecipeV2[]>>,
) {
  update((current) => {
    const encoded = encodeAnuimeRecipe(recipe);
    const next = [recipe, ...current.filter((item) => encodeAnuimeRecipe(item) !== encoded)].slice(
      0,
      5,
    );
    localStorage.setItem("anuime:recent-recipes", JSON.stringify(next.map(encodeAnuimeRecipe)));
    return next;
  });
}

function showNotice(
  setNotice: React.Dispatch<React.SetStateAction<string | null>>,
  message: string,
) {
  setNotice(message);
  window.setTimeout(() => setNotice(null), 2200);
}

function parseStoredRecipes(value: string | null): unknown[] {
  const parsed: unknown = JSON.parse(value ?? "[]");
  return Array.isArray(parsed) ? parsed : [];
}
