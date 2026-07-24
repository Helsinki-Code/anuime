import { KiraCommandCenter } from "@/components/blocks/kira-command-center";
import { AnuimeAlert } from "@/components/ui/anuime-alert";
import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { createAnuimeRecipe, type AnuimeRecipeV2 } from "@/lib/anuime-recipe";

export type KiraDeveloperConsoleProps = { recipe?: AnuimeRecipeV2; project?: string };
export function KiraDeveloperConsole({
  recipe = createAnuimeRecipe("kira"),
  project = "anuime-production",
}: KiraDeveloperConsoleProps) {
  return (
    <main data-character="kira" className="grid gap-5 bg-background p-4 text-foreground sm:p-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-[var(--anuime-accent,var(--accent))] uppercase">
            Kira Developer Console
          </p>
          <h1 className="mt-2 text-3xl font-bold">{project}</h1>
        </div>
        <AnuimeBadge recipe={recipe} tone="success">
          Production ready
        </AnuimeBadge>
      </header>
      <AnuimeAlert
        recipe={recipe}
        tone="success"
        title="Deployment signal clear"
        description="All deterministic checks completed."
      />
      <KiraCommandCenter recipe={recipe} />
      <section className="grid gap-4 md:grid-cols-3">
        <AnuimeCard
          recipe={recipe}
          eyebrow="Build"
          title="143 routes"
          description="Prerendered and indexed."
        />
        <AnuimeCard
          recipe={recipe}
          eyebrow="Tests"
          title="201 passing"
          description="Unit and registry checks."
        />
        <AnuimeCard
          recipe={recipe}
          eyebrow="Latency"
          title="Fast path"
          description="Serverless-safe initialization."
        />
      </section>
    </main>
  );
}
