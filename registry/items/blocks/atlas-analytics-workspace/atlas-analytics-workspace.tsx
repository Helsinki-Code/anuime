import { AtlasOperationsCenter } from "@/components/blocks/atlas-operations-center";
import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeProgress } from "@/components/ui/anuime-progress";
import { createAnuimeRecipe, type AnuimeRecipeV2 } from "@/lib/anuime-recipe";

export type AtlasAnalyticsWorkspaceProps = { recipe?: AnuimeRecipeV2; title?: string };
export function AtlasAnalyticsWorkspace({
  recipe = createAnuimeRecipe("atlas"),
  title = "Product intelligence",
}: AtlasAnalyticsWorkspaceProps) {
  return (
    <main className="grid gap-5 bg-slate-950 p-4 text-slate-50 sm:p-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-blue-400 uppercase">
            Atlas Analytics Workspace
          </p>
          <h1 className="mt-2 text-4xl font-bold">{title}</h1>
        </div>
        <AnuimeBadge recipe={recipe} tone="success">
          Live structure
        </AnuimeBadge>
      </header>
      <section className="grid gap-4 md:grid-cols-3">
        <AnuimeCard
          recipe={recipe}
          eyebrow="Installs"
          title="1,284"
          description="Registry additions this period."
        />
        <AnuimeCard
          recipe={recipe}
          eyebrow="Success"
          title="94.2%"
          description="Fixture builds completed."
        />
        <AnuimeCard
          recipe={recipe}
          eyebrow="Studio"
          title="7m 18s"
          description="Median recipe session."
        />
      </section>
      <AnuimeProgress recipe={recipe} label="Release acceptance" value={86} />
      <AtlasOperationsCenter recipe={recipe} />
    </main>
  );
}
