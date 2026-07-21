import {
  IconArrowRight,
  IconBolt,
  IconBrandGithub,
  IconCheck,
  IconCode,
  IconCopy,
  IconSparkles,
} from "@tabler/icons-react";
import { Link, createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { characterIds, characterSystems } from "@/lib/anuime/characters";

import { getSeoHead } from "../lib/seo";
import { siteConfig } from "../lib/site-config";

export const Route = createFileRoute("/")({
  head: () =>
    getSeoHead({
      title: "AnUIme — Where characters become design systems",
      description: siteConfig.description,
      path: "/",
    }),
  component: HomePage,
});

const installCommand = "npx shadcn@latest add https://anuime.dev/r/anuime-button.json";

function HomePage() {
  return (
    <main className="overflow-hidden">
      <section className="anuime-grid relative isolate border-b">
        <div className="anuime-aurora pointer-events-none absolute inset-x-0 top-0 -z-10 h-[38rem] opacity-70" />
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
          <div className="flex flex-col items-start justify-center">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/8 px-3 py-1.5 text-xs font-semibold text-cyan-700 dark:text-cyan-300">
              <IconSparkles className="size-3.5" />
              Open-source character-driven UI
            </div>
            <h1 className="max-w-3xl font-heading text-5xl leading-[0.96] font-semibold tracking-[-0.055em] text-balance sm:text-6xl lg:text-7xl">
              Your component library just got a cast.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-pretty text-muted-foreground">
              Original anime characters become complete, accessible design systems. Choose a
              character, shape the vibe, and install production-owned React source.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button size="lg" nativeButton={false} render={<Link to="/studio" />}>
                Enter the Studio
                <IconArrowRight data-icon="inline-end" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<Link to="/$section" params={{ section: "components" }} />}
              >
                Browse components
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <IconCheck className="size-4 text-emerald-500" />
                Accessible
              </span>
              <span className="inline-flex items-center gap-1.5">
                <IconCheck className="size-4 text-emerald-500" />
                Source-owned
              </span>
              <span className="inline-flex items-center gap-1.5">
                <IconCheck className="size-4 text-emerald-500" />
                shadcn-compatible
              </span>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-xl items-center justify-center lg:justify-end">
            <div className="absolute inset-10 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="relative w-full overflow-hidden rounded-[2rem] border bg-background/88 p-3 shadow-2xl shadow-violet-500/10 backdrop-blur-xl">
              <div className="flex items-center gap-2 border-b px-3 pb-3 text-xs text-muted-foreground">
                <span className="size-2.5 rounded-full bg-rose-400" />
                <span className="size-2.5 rounded-full bg-amber-400" />
                <span className="size-2.5 rounded-full bg-emerald-400" />
                <span className="ml-2 font-mono">character-preview.tsx</span>
              </div>
              <div className="grid gap-3 py-3 sm:grid-cols-3">
                {characterIds.map((id) => (
                  <CharacterMiniCard key={id} character={id} />
                ))}
              </div>
              <div className="rounded-2xl bg-zinc-950 p-4 text-zinc-50">
                <div className="mb-6 flex items-center justify-between text-xs text-zinc-400">
                  <span className="font-mono">LIVE OUTPUT</span>
                  <span className="inline-flex items-center gap-1 text-emerald-400">
                    <span className="size-1.5 rounded-full bg-emerald-400" />
                    Ready
                  </span>
                </div>
                <div className="rounded-xl border border-cyan-400/30 bg-gradient-to-br from-cyan-400/10 via-violet-500/10 to-transparent p-5">
                  <p className="font-mono text-[10px] tracking-[0.24em] text-cyan-300">
                    KIRA // SIGNAL CARD
                  </p>
                  <h2 className="mt-3 text-xl font-semibold">Deploy at first light.</h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    A sharp, production-ready surface with visible focus and reduced-motion support.
                  </p>
                  <button className="mt-5 inline-flex items-center gap-2 rounded-md bg-cyan-300 px-4 py-2 text-sm font-bold text-zinc-950 transition-transform motion-safe:hover:-translate-y-0.5">
                    <IconBolt className="size-4" /> Activate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b bg-muted/25 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-violet-600 uppercase dark:text-violet-400">
              Meet the launch cast
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Three personalities. Three complete systems.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Not skins. Each character governs color, shape, density, motion, and interaction
              behavior.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {characterIds.map((id) => {
              const character = characterSystems[id];
              return (
                <article
                  key={id}
                  className={`anuime-character anuime-${id} group relative overflow-hidden rounded-3xl border`}
                >
                  <div className="absolute -top-10 -right-10 size-36 rounded-full bg-[var(--anuime-accent)] opacity-15 blur-3xl transition-opacity group-hover:opacity-30" />
                  <div className="aspect-[4/3] overflow-hidden bg-zinc-950">
                    <picture>
                      <source srcSet={character.keyArt.webp} type="image/webp" />
                      <img
                        src={character.keyArt.png}
                        alt=""
                        width="1024"
                        height="1536"
                        loading="lazy"
                        className="size-full object-cover object-top transition duration-500 motion-safe:group-hover:scale-[1.03]"
                      />
                    </picture>
                  </div>
                  <div className="p-6">
                    <p className="font-mono text-xs tracking-[0.2em] text-[var(--anuime-accent)]">
                      {character.role.toUpperCase()}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold">{character.name}</h3>
                    <p className="mt-2 font-medium">{character.tagline}</p>
                    <p className="mt-4 text-sm leading-6 text-muted-foreground">
                      {character.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {character.bestFor.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border bg-background/70 px-2.5 py-1 text-xs"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <Link
                      to="/characters/$character"
                      params={{ character: id }}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--anuime-accent)]"
                    >
                      Meet {character.name}
                      <IconArrowRight className="size-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div>
          <p className="text-sm font-semibold tracking-[0.18em] text-cyan-600 uppercase dark:text-cyan-400">
            The code is yours
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Expressive outside. Dependable underneath.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
            Every component arrives as readable React and TypeScript source. Modify it, audit it,
            and ship it without a runtime lock-in.
          </p>
          <ul className="mt-7 grid gap-4 text-sm">
            <Feature
              icon={<IconCode />}
              title="Production-owned source"
              copy="No black box and no arbitrary generated implementation."
            />
            <Feature
              icon={<IconBolt />}
              title="Motion with boundaries"
              copy="Characterful transitions with reduced-motion fallbacks."
            />
            <Feature
              icon={<IconSparkles />}
              title="Deterministic recipes"
              copy="Share and reproduce a design direction without prompt roulette."
            />
          </ul>
        </div>
        <div className="self-center overflow-hidden rounded-2xl border bg-zinc-950 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-xs text-zinc-400">
            <span>Install AnUIme Button</span>
            <IconCopy className="size-4" />
          </div>
          <pre className="overflow-x-auto p-5 text-sm text-cyan-200">
            <code>{installCommand}</code>
          </pre>
        </div>
      </section>

      <section className="border-t px-5 py-20 lg:px-8">
        <div className="anuime-cta mx-auto flex max-w-5xl flex-col items-center overflow-hidden rounded-[2rem] border px-6 py-16 text-center shadow-2xl sm:px-12">
          <IconSparkles className="size-8 text-cyan-300" />
          <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
            Choose a character. Shape the vibe. Ship the component.
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-violet-100/75">
            Start with the live Studio or inspect every line before it enters your project.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg" nativeButton={false} render={<Link to="/studio" />}>
              Open Studio
              <IconArrowRight data-icon="inline-end" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
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

function CharacterMiniCard({ character }: { character: (typeof characterIds)[number] }) {
  const system = characterSystems[character];
  return (
    <div className={`anuime-character anuime-${character} rounded-2xl border p-3`}>
      <div className="anuime-avatar anuime-avatar-sm" aria-hidden="true">
        {system.name.at(0)}
      </div>
      <p className="mt-3 text-sm font-semibold">{system.name}</p>
      <p className="text-[10px] tracking-wider text-muted-foreground uppercase">{system.role}</p>
    </div>
  );
}

function Feature({ icon, title, copy }: { icon: React.ReactNode; title: string; copy: string }) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400 [&>svg]:size-4">
        {icon}
      </span>
      <span>
        <strong className="block font-semibold">{title}</strong>
        <span className="mt-1 block text-muted-foreground">{copy}</span>
      </span>
    </li>
  );
}
