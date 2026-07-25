/* eslint-disable jsx-a11y/no-noninteractive-tabindex -- Scrollable code samples must be keyboard reachable. */
import { IconArrowLeft, IconCode, IconEye, IconTerminal2 } from "@tabler/icons-react";
import { Link, createFileRoute } from "@tanstack/react-router";

import {
  CharacterThemeSurface,
  ExpressiveMomentRow,
  SignatureControl,
} from "@/components/anuime-v2/system-preview";
import { DocsPageActions } from "@/components/docs/docs-page-actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { characterSystems, isCharacterId } from "@/lib/anuime/characters";
import { componentCatalog } from "@/lib/anuime/studio";
import {
  getCanonicalRegistryItemUrl,
  getCanonicalSiteUrl,
  getDocsMarkdownPath,
} from "@/lib/site-config";

import { getSeoHead } from "../lib/seo";

export const Route = createFileRoute("/characters/$character")({
  head: ({ params }) => {
    const character = isCharacterId(params.character) ? characterSystems[params.character] : null;
    return getSeoHead({
      title: character
        ? `${character.name} — ${character.adjective} system`
        : "Character not found",
      description: character?.description ?? "Explore AnUIme character systems.",
      path: `/characters/${params.character}`,
    });
  },
  component: CharacterPage,
});

function CharacterPage() {
  const { character: characterId } = Route.useParams();

  if (!isCharacterId(characterId)) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-24">
        <h1 className="text-4xl font-semibold">Character not found</h1>
        <Link to="/characters" className="mt-6 inline-flex font-semibold">
          Return to character systems
        </Link>
      </main>
    );
  }

  const character = characterSystems[characterId];
  const pagePath = `/characters/${characterId}`;
  const registryName = componentCatalog[character.specialty.signatureComponent].registryName;
  const installCommand = `npx shadcn@latest add ${getCanonicalRegistryItemUrl(`anuime-theme-${characterId}`)} ${getCanonicalRegistryItemUrl(registryName)}`;
  const usageCode = getUsageCode(characterId);

  return (
    <main>
      <CharacterThemeSurface character={characterId} className="border-b">
        <section className="anuime-grid">
          <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-20">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link
                to="/characters"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <IconArrowLeft className="size-4" /> Character systems
              </Link>
              <DocsPageActions
                markdownPath={getDocsMarkdownPath(pagePath)}
                pageDescription={character.description}
                pageTitle={`${character.name} character system`}
                pageUrl={getCanonicalSiteUrl(pagePath)}
              />
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
              <div>
                <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
                  {character.adjective} · {character.themeName}
                </p>
                <h1 className="mt-4 text-6xl font-semibold tracking-tight sm:text-8xl">
                  {character.name}
                </h1>
                <p className="mt-5 text-2xl font-medium">{character.tagline}</p>
                <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                  {character.story}
                </p>
              </div>
              <div className="grid grid-cols-2 border">
                {(["light", "dark"] as const).map((mode) => (
                  <CharacterThemeSurface
                    key={mode}
                    character={characterId}
                    mode={mode}
                    className="relative grid min-h-80 content-between overflow-hidden p-5 sm:p-8"
                  >
                    <div className="anuime-card-motif" aria-hidden="true" />
                    <p className="relative font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                      {mode} variant
                    </p>
                    <div className="anuime-signature-panel relative border bg-[var(--anuime-surface)] p-4">
                      <SignatureControl character={characterId} />
                    </div>
                  </CharacterThemeSurface>
                ))}
              </div>
            </div>
          </div>
        </section>
      </CharacterThemeSurface>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
              Motif legend
            </p>
            <h2 className="mt-3 text-3xl font-semibold">Seven artifacts. Seven carriers.</h2>
            <p className="mt-4 leading-7 text-muted-foreground">{character.boardCaption}</p>
          </div>
          <div className="grid gap-px border bg-border sm:grid-cols-2">
            {character.motifLaws.map((law, index) => (
              <div key={law.artifact} className="bg-background p-4">
                <p className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                  {String(index + 1).padStart(2, "0")} · {law.artifact}
                </p>
                <p className="mt-2 font-semibold">{law.geometry}</p>
                <p className="mt-1 text-sm text-muted-foreground">{law.carrier}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CharacterThemeSurface character={characterId} className="border-y px-5 py-16 lg:px-8">
        <section className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
              Expressive tier · {character.specialty.name}
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              Waiting and transition can assemble power.
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              These four installable moments may use the complete {character.role.toLowerCase()}.
              Their geometry still comes from the same seven-artifact map.
            </p>
          </div>
          <ExpressiveMomentRow character={characterId} />
        </section>
      </CharacterThemeSurface>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
              Preview / Code
            </p>
            <h2 className="mt-3 text-3xl font-semibold">The page and package share a source.</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              The signature preview is the real v2 registry primitive. Install the theme and
              component together, then change the owned source as needed.
            </p>
          </div>
          <Tabs defaultValue="preview" className="min-w-0">
            <TabsList variant="line">
              <TabsTrigger value="preview">
                <IconEye data-icon="inline-start" /> Preview
              </TabsTrigger>
              <TabsTrigger value="code">
                <IconCode data-icon="inline-start" /> Code
              </TabsTrigger>
              <TabsTrigger value="install">
                <IconTerminal2 data-icon="inline-start" /> CLI
              </TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <CharacterThemeSurface
                character={characterId}
                className="anuime-signature-panel mt-4 border p-8"
              >
                <SignatureControl character={characterId} />
              </CharacterThemeSurface>
            </TabsContent>
            <TabsContent value="code">
              <CodePanel code={usageCode} />
            </TabsContent>
            <TabsContent value="install">
              <CodePanel code={installCommand} />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
}

function CodePanel({ code }: { code: string }) {
  return (
    <div
      role="region"
      aria-label="Code sample"
      className="mt-4 overflow-x-auto border bg-foreground text-background"
      tabIndex={0}
    >
      <pre className="p-5 text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function getUsageCode(character: "kira" | "mochi" | "atlas") {
  if (character === "kira") {
    return `<AnuimeCheckbox character="kira" label="Trace the next action" defaultChecked />`;
  }
  if (character === "mochi") {
    return `<AnuimeSwitch character="mochi" label="Settle the pearl clasp" defaultChecked />`;
  }
  return `<AnuimeProgress character="atlas" label="Dock the strap assembly" value={68} />`;
}
