import { IconArrowLeft, IconCheck, IconSparkles } from "@tabler/icons-react";
import { Link, createFileRoute } from "@tanstack/react-router";

import { characterSystems, isCharacterId } from "@/lib/anuime/characters";
import { createAnuimeRecipe } from "@/lib/anuime/recipe";
import { componentCatalog, studioSearchFromDocument } from "@/lib/anuime/studio";

import { AnuimeButton } from "../../registry/items/components/anuime-button/anuime-button";
import { AnuimeCard } from "../../registry/items/components/anuime-card/anuime-card";
import { getSeoHead } from "../lib/seo";

export const Route = createFileRoute("/characters/$character")({
  head: ({ params }) => {
    const character = isCharacterId(params.character) ? characterSystems[params.character] : null;
    return getSeoHead({
      title: character ? `${character.name} — ${character.role}` : "Character not found — AnUIme",
      description: character?.description ?? "Explore the original AnUIme character systems.",
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
        <Link to="/characters" className="mt-6 inline-flex text-violet-600">
          Return to the cast
        </Link>
      </main>
    );
  }
  const character = characterSystems[characterId];
  const recipe = createAnuimeRecipe(characterId);
  const signatureComponent = character.specialty.signatureComponent;
  const studioSearch = studioSearchFromDocument({
    recipe,
    componentId: signatureComponent,
    previewState: componentCatalog[signatureComponent].states[0] ?? "default",
    viewport: "desktop",
    zoom: 1,
  });
  return (
    <main className={`anuime-character anuime-${characterId}`}>
      <section className="anuime-grid border-b">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 lg:py-20">
          <div className="order-2 lg:order-1">
            <Link
              to="/characters"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <IconArrowLeft className="size-4" /> The cast
            </Link>
            <p className="mt-8 font-mono text-sm tracking-[0.22em] text-[var(--anuime-accent)] uppercase">
              {character.role}
            </p>
            <h1 className="mt-3 text-6xl font-semibold tracking-tight sm:text-8xl">
              {character.name}
            </h1>
            <p className="mt-5 text-2xl font-medium">{character.tagline}</p>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              {character.story}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <AnuimeButton recipe={recipe}>Cast {character.name}</AnuimeButton>
              <Link
                to="/studio"
                search={studioSearch}
                className="inline-flex min-h-10 items-center rounded-lg border px-4 py-2 text-sm font-semibold"
              >
                Open Component Lab
              </Link>
            </div>
          </div>
          <div className="order-1 mx-auto w-full max-w-xl overflow-hidden rounded-[2rem] border bg-zinc-950 shadow-2xl lg:order-2">
            <picture>
              <source srcSet={character.keyArt.webp} type="image/webp" />
              <img
                src={character.keyArt.png}
                alt={character.keyArt.alt}
                width="1024"
                height="1536"
                className="aspect-[4/5] size-full object-cover"
              />
            </picture>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-sm font-semibold tracking-[0.18em] text-[var(--anuime-accent)] uppercase">
            Design bible
          </p>
          <h2 className="mt-3 text-3xl font-semibold">
            A recognizable system without color alone.
          </h2>
          <p className="mt-5 leading-7 text-muted-foreground">{character.silhouette}</p>
          <dl className="mt-8 grid gap-3">
            {Object.entries(character.tokens).map(([label, value]) => (
              <div key={label} className="flex justify-between gap-5 rounded-xl border p-4">
                <dt className="text-sm font-semibold capitalize">{label}</dt>
                <dd className="text-right text-sm text-muted-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="space-y-5">
          <div
            className={`overflow-hidden ${createAnuimeRecipe(characterId).shapeSystem === "mochi" ? "rounded-3xl" : "rounded-lg"} border bg-background`}
          >
            {character.specialty.designBible ? (
              <picture>
                <source srcSet={character.specialty.designBible.avif} type="image/avif" />
                <source srcSet={character.specialty.designBible.webp} type="image/webp" />
                <img
                  src={character.specialty.designBible.png}
                  alt={`${character.name} demonstrating ${character.specialty.name}, including silhouette and expression studies.`}
                  width="1536"
                  height="1024"
                  loading="lazy"
                  className="aspect-[3/2] w-full bg-zinc-950 object-cover"
                />
              </picture>
            ) : null}
            <div className="p-5">
              <p className="font-mono text-xs tracking-[0.18em] text-[var(--anuime-accent)] uppercase">
                Signature power
              </p>
              <h2 className="mt-2 text-3xl font-semibold">{character.specialty.name}</h2>
              <p className="mt-2 font-medium">{character.specialty.invocation}</p>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {character.specialty.promise}
              </p>
              <ul className="mt-5 grid gap-2">
                {character.specialty.mechanics.map((mechanic) => (
                  <li key={mechanic} className="flex items-start gap-2 text-sm">
                    <IconCheck className="mt-0.5 size-4 shrink-0 text-emerald-500" /> {mechanic}
                  </li>
                ))}
              </ul>
              <Link
                to="/studio"
                search={studioSearch}
                className="mt-5 inline-flex text-sm font-semibold text-[var(--anuime-accent)]"
              >
                Activate in {componentCatalog[signatureComponent].title} →
              </Link>
            </div>
          </div>
          <AnuimeCard
            recipe={recipe}
            eyebrow={`${character.name} system`}
            title="Production-owned source"
            description="The same canonical recipe drives this preview and the component installed into your project."
            action={
              <AnuimeButton recipe={recipe} variant="secondary">
                Inspect recipe
              </AnuimeButton>
            }
          />
          <div className="rounded-2xl border p-5">
            <h2 className="flex items-center gap-2 font-semibold">
              <IconSparkles className="size-4 text-[var(--anuime-accent)]" /> Best for
            </h2>
            <ul className="mt-4 grid gap-2">
              {character.bestFor.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <IconCheck className="size-4 text-emerald-500" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
