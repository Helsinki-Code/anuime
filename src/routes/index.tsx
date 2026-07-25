import { IconArrowRight, IconBrandGithub, IconCode, IconSparkles } from "@tabler/icons-react";
import { Link, createFileRoute } from "@tanstack/react-router";

/* eslint-disable jsx-a11y/no-noninteractive-tabindex -- Scrollable install commands must be keyboard reachable. */
import {
  CharacterSystemCard,
  CharacterThemeSurface,
  ExpressiveLoader,
  SignatureControl,
} from "@/components/anuime-v2/system-preview";
import { Button } from "@/components/ui/button";
import { characterIds, characterSystems } from "@/lib/anuime/characters";

import { getSeoHead } from "../lib/seo";
import { getCanonicalRegistryItemUrl, siteConfig } from "../lib/site-config";

export const Route = createFileRoute("/")({
  head: () =>
    getSeoHead({
      title: "AnUIme — Where characters become design systems",
      description: siteConfig.description,
      path: "/",
    }),
  component: HomePage,
});

const installThemeCommand = `npx shadcn@latest add ${getCanonicalRegistryItemUrl("anuime-theme-kira")}`;
const installComponentCommand = `npx shadcn@latest add ${getCanonicalRegistryItemUrl("anuime-checkbox")}`;

function HomePage() {
  return (
    <main className="overflow-hidden">
      <section className="anuime-grid relative isolate border-b">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-28">
          <div className="flex flex-col items-start justify-center">
            <p className="mb-7 font-mono text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              Registry v2 · 51 workhorses · 12 expressive moments
            </p>
            <h1 className="max-w-3xl font-heading text-5xl leading-[0.96] font-semibold tracking-[-0.055em] text-balance sm:text-6xl lg:text-7xl">
              Your component library just got a cast.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-pretty text-muted-foreground">
              Three character systems built from artifacts, geometry, and enforceable laws—not
              decorative skins. Install accessible React source you own.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button size="lg" nativeButton={false} render={<Link to="/studio" />}>
                Direct in Studio
                <IconArrowRight data-icon="inline-end" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<Link to="/$section" params={{ section: "components" }} />}
              >
                Browse 51 components
              </Button>
            </div>
          </div>

          <div className="grid gap-3 self-center">
            {characterIds.map((character) => (
              <CharacterThemeSurface
                key={character}
                character={character}
                className="relative overflow-hidden border p-5 shadow-sm"
              >
                <div className="anuime-card-motif" aria-hidden="true" />
                <div className="relative grid items-center gap-5 sm:grid-cols-[10rem_1fr]">
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                      {characterSystems[character].adjective}
                    </p>
                    <h2 className="mt-1 text-2xl font-semibold">
                      {characterSystems[character].name}
                    </h2>
                  </div>
                  <div className="anuime-signature-panel border bg-[var(--anuime-surface)] p-4">
                    <SignatureControl character={character} compact />
                  </div>
                </div>
              </CharacterThemeSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
              Artifact → geometry → carrier
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
              Character survives without color.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Kira’s blade-trace focus, Mochi’s strung pearl, and Atlas’s docking brackets are
              construction rules. Theme tokens change the atmosphere; geometry preserves identity.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {characterIds.map((character) => (
              <CharacterSystemCard key={character} character={character} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b bg-muted/20 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
                Expressive moments
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Power appears only when time changes.
              </h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Waiting, transition, success, and empty states may assemble the full power motif.
                Everyday controls remain strictly abstract.
              </p>
              <Link
                to="/design-philosophy"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold"
              >
                Read the two-tier rule <IconArrowRight className="size-4" />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {characterIds.map((character) => (
                <CharacterThemeSurface
                  key={character}
                  character={character}
                  className="grid min-h-48 place-items-center border"
                >
                  <div className="text-center">
                    <ExpressiveLoader character={character} />
                    <p className="mt-3 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                      {characterSystems[character].name} loader
                    </p>
                  </div>
                </CharacterThemeSurface>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-24">
        <div>
          <IconCode className="size-6" />
          <h2 className="mt-5 text-3xl font-semibold tracking-tight">
            Install the system you saw.
          </h2>
          <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
            Theme and component packages come from the same registry source used by this site.
            Preview, inspect, and then own the code.
          </p>
        </div>
        <div className="grid gap-3">
          <InstallLine label="1 · Theme" command={installThemeCommand} />
          <InstallLine label="2 · Component" command={installComponentCommand} />
        </div>
      </section>

      <section className="border-t px-5 py-20 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center border bg-foreground px-6 py-16 text-center text-background sm:px-12">
          <IconSparkles className="size-7" />
          <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            Pick a construction system. Keep every line accountable.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg" nativeButton={false} render={<Link to="/studio" />}>
              Open Studio
              <IconArrowRight data-icon="inline-end" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-background/25 bg-transparent text-background hover:bg-background/10 hover:text-background"
              nativeButton={false}
              render={<a href={siteConfig.repositoryUrl} />}
            >
              <IconBrandGithub data-icon="inline-start" />
              View source
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

function InstallLine({ label, command }: { label: string; command: string }) {
  return (
    <div className="overflow-hidden border bg-foreground text-background">
      <p className="border-b border-background/15 px-4 py-2 font-mono text-[10px] tracking-[0.16em] text-background/60 uppercase">
        {label}
      </p>
      <div
        role="region"
        aria-label={`${label} install command`}
        className="overflow-x-auto"
        tabIndex={0}
      >
        <pre className="p-4 text-sm">
          <code>{command}</code>
        </pre>
      </div>
    </div>
  );
}
