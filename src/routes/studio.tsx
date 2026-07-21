import {
  IconArrowBackUp,
  IconArrowForwardUp,
  IconCheck,
  IconCode,
  IconCopy,
  IconDownload,
  IconExternalLink,
  IconPhoto,
  IconRefresh,
  IconSparkles,
} from "@tabler/icons-react";
import { Link, createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { z } from "zod";

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

  return (
    <main className="anuime-grid min-h-[calc(100svh-3.5rem)]" data-studio-ready={studioReady}>
      <div className="mx-auto max-w-[96rem] px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex flex-col justify-between gap-5 border-b pb-6 xl:flex-row xl:items-end">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-400">
              <IconSparkles className="size-4" /> Component Lab · Studio v2
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
              Direct the real component.
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Preview the exact installable source across character systems, states, viewports, and
              motion preferences.
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="Studio history and sharing">
            <Button variant="outline" size="sm" disabled={past.length === 0} onClick={undo}>
              <IconArrowBackUp data-icon="inline-start" /> Undo
            </Button>
            <Button variant="outline" size="sm" disabled={future.length === 0} onClick={redo}>
              <IconArrowForwardUp data-icon="inline-start" /> Redo
            </Button>
            <Button variant="outline" size="sm" onClick={() => commit(defaultStudioDocument)}>
              <IconRefresh data-icon="inline-start" /> Reset
            </Button>
            <Button
              size="sm"
              onClick={() => {
                trackProductEvent({ name: "recipe_shared", componentId: document.componentId });
                void copy(window.location.href, "Share URL copied.");
              }}
            >
              <IconCopy data-icon="inline-start" /> Share
            </Button>
          </div>
        </header>

        {search.warning === "invalid-recipe" ? (
          <div
            role="alert"
            className="mt-5 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm"
          >
            The shared recipe was invalid, so the safe Kira default is shown. Adjust the controls to
            create a new valid link.
          </div>
        ) : null}

        <div className="mt-6 grid gap-5 xl:grid-cols-[20rem_minmax(0,1fr)_18rem]">
          <details className="rounded-2xl border bg-background/95 p-4 xl:hidden">
            <summary className="cursor-pointer font-semibold">Open Studio controls</summary>
            <div className="mt-5">
              <StudioControls document={document} commit={commit} recentRecipes={recentRecipes} />
            </div>
          </details>
          <aside className="hidden rounded-2xl border bg-background/95 p-5 shadow-sm xl:block">
            <StudioControls document={document} commit={commit} recentRecipes={recentRecipes} />
          </aside>

          <section className="min-w-0 rounded-3xl border bg-muted/25 p-3 sm:p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-mono text-xs tracking-[0.18em] text-violet-600 uppercase dark:text-violet-400">
                  {component.registryName}
                </p>
                <h2 className="mt-1 text-xl font-semibold">{component.title}</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {(["mobile", "tablet", "desktop"] as StudioViewport[]).map((viewport) => (
                  <button
                    key={viewport}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium capitalize ${document.viewport === viewport ? "bg-foreground text-background" : "bg-background"}`}
                    onClick={() => commit({ ...document, viewport })}
                  >
                    {viewport}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex min-h-[35rem] items-start justify-center overflow-auto rounded-2xl border bg-zinc-100 p-3 sm:p-8 dark:bg-zinc-900">
              <div
                ref={previewRef}
                data-preview-mode={document.recipe.mode}
                className={`anuime-preview-canvas flex min-h-[30rem] w-full items-center justify-center overflow-hidden rounded-xl border bg-background p-4 transition-[width] sm:p-8 ${viewportClass(document.viewport)} ${document.recipe.mode === "dark" ? "dark bg-zinc-950 text-zinc-50" : document.recipe.mode === "light" ? "bg-white text-zinc-950" : ""} ${document.recipe.motionLevel === "still" ? "anuime-motion-still" : ""}`}
                style={{ transform: `scale(${document.zoom})`, transformOrigin: "top center" }}
              >
                <ComponentPreview document={document} />
              </div>
            </div>
          </section>

          <aside className="space-y-4 rounded-2xl border bg-background/95 p-5 shadow-sm">
            <section>
              <h2 className="text-sm font-semibold">Preview state</h2>
              <div className="mt-3 grid gap-2">
                {component.states.map((state) => (
                  <button
                    key={state}
                    onClick={() => commit({ ...document, previewState: state })}
                    className={`rounded-lg border px-3 py-2 text-left text-sm capitalize ${document.previewState === state ? "border-violet-500 bg-violet-500/10" : "hover:bg-muted"}`}
                  >
                    {state}
                  </button>
                ))}
              </div>
            </section>
            <section className="border-t pt-4">
              <h2 className="text-sm font-semibold">Zoom</h2>
              <div className="mt-3 flex gap-2">
                {([0.75, 1, 1.25] as StudioZoom[]).map((zoom) => (
                  <button
                    key={zoom}
                    onClick={() => commit({ ...document, zoom })}
                    className={`rounded-lg border px-2.5 py-1.5 text-xs ${document.zoom === zoom ? "bg-foreground text-background" : ""}`}
                  >
                    {zoom * 100}%
                  </button>
                ))}
              </div>
            </section>
            <section className="border-t pt-4" aria-live="polite">
              <h2 className="text-sm font-semibold">Compatibility</h2>
              {issues.length === 0 ? (
                <p className="mt-2 flex items-start gap-2 text-xs leading-5 text-emerald-600 dark:text-emerald-400">
                  <IconCheck className="mt-0.5 size-4 shrink-0" /> No compatibility conflicts.
                </p>
              ) : (
                issues.map((issue) => (
                  <p key={issue.code} className="mt-2 text-xs text-destructive">
                    {issue.message}
                  </p>
                ))
              )}
            </section>
            {featureFlags.aiDirector ? (
              <DirectorPanel
                document={document}
                apply={(recipe) => commit({ ...document, recipe })}
              />
            ) : null}
            <section className="grid gap-2 border-t pt-4">
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
                icon={<IconDownload />}
                onClick={() =>
                  void (async () => {
                    trackProductEvent({
                      name: "install_copied",
                      componentId: document.componentId,
                    });
                    await copy(getInstallCommand(document.componentId), "Install command copied.");
                  })()
                }
              >
                Copy install command
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
                nativeButton={false}
                render={
                  <Link
                    to="/$section/$name"
                    params={{
                      section: document.componentId === "auth-panel" ? "blocks" : "components",
                      name: component.registryName,
                    }}
                    onClick={() =>
                      trackProductEvent({ name: "docs_opened", componentId: document.componentId })
                    }
                  />
                }
              >
                <IconExternalLink data-icon="inline-start" /> Open docs
              </Button>
            </section>
          </aside>
        </div>
      </div>
      {notice ? (
        <div
          role="status"
          className="fixed right-4 bottom-4 z-50 rounded-xl border bg-background px-4 py-3 text-sm shadow-xl"
        >
          {notice}
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
    <section className="border-t pt-4">
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
  const setRecipe = (recipe: AnuimeRecipeV2) => commit({ ...document, recipe });
  return (
    <div className="space-y-5">
      <fieldset>
        <legend className="text-sm font-semibold">Component</legend>
        <select
          aria-label="Component"
          className="mt-2 w-full rounded-xl border bg-background px-3 py-2.5 text-sm"
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
          {registryComponentIds.map((id) => (
            <option key={id} value={id}>
              {componentCatalog[id].title}
            </option>
          ))}
        </select>
      </fieldset>
      <fieldset>
        <legend className="text-sm font-semibold">Cast a complete system</legend>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {characterIds.map((id) => (
            <button
              key={id}
              onClick={() => setRecipe(createAnuimeRecipe(id))}
              className={`anuime-character anuime-${id} rounded-xl border p-2 text-left transition hover:-translate-y-0.5 ${isPureCharacter(document.recipe, id) ? "ring-2 ring-[var(--anuime-accent)] ring-offset-2 ring-offset-background" : ""}`}
            >
              <span className="anuime-avatar anuime-avatar-xs" aria-hidden="true">
                {characterSystems[id].name.at(0)}
              </span>
              <span className="mt-2 block text-xs font-semibold">{characterSystems[id].name}</span>
            </button>
          ))}
        </div>
      </fieldset>
      <div className="h-px bg-border" />
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
      <SelectField
        label="Density"
        value={document.recipe.density}
        options={anuimeDensities}
        onChange={(density) => setRecipe({ ...document.recipe, density })}
      />
      <SelectField
        label="Motion level"
        value={document.recipe.motionLevel}
        options={anuimeMotionLevels}
        onChange={(motionLevel) => setRecipe({ ...document.recipe, motionLevel })}
      />
      <SelectField
        label="Mode"
        value={document.recipe.mode}
        options={anuimeModes}
        onChange={(mode) => setRecipe({ ...document.recipe, mode })}
      />
      {recentRecipes.length > 0 ? (
        <fieldset className="border-t pt-4">
          <legend className="text-sm font-semibold">Recent recipes</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {recentRecipes.map((recipe) => (
              <button
                key={encodeAnuimeRecipe(recipe)}
                className="rounded-full border px-2.5 py-1 text-xs hover:bg-muted"
                onClick={() => setRecipe(recipe)}
              >
                {recipe.colorSystem}/{recipe.shapeSystem}
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}
    </div>
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
    <label className="block text-sm font-medium">
      {label}
      <select
        className="mt-2 w-full rounded-xl border bg-background px-3 py-2.5 text-sm capitalize"
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
    <Button variant="outline" size="sm" className="justify-start" onClick={onClick}>
      {icon}
      {children}
    </Button>
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
