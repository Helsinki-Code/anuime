import { MochiCreatorCompanion } from "@/components/blocks/mochi-creator-companion";
import { AnuimeAvatar, AnuimeAvatarGroup } from "@/components/ui/anuime-avatar";
import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { createAnuimeRecipe, type AnuimeRecipeV2 } from "@/lib/anuime-recipe";

export type MochiCommunityHubProps = { recipe?: AnuimeRecipeV2; community?: string };
export function MochiCommunityHub({
  recipe = createAnuimeRecipe("mochi"),
  community = "Dream Makers",
}: MochiCommunityHubProps) {
  return (
    <main data-character="mochi" className="grid gap-6 bg-background p-4 text-foreground sm:p-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <AnuimeBadge recipe={recipe}>Mochi Community Hub</AnuimeBadge>
          <h1 className="mt-3 text-4xl font-bold">{community}</h1>
          <p className="mt-2 opacity-70">
            A welcoming home for creators, drafts, and gentle momentum.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <AnuimeAvatarGroup>
            <AnuimeAvatar recipe={recipe} fallback="YU" />
            <AnuimeAvatar recipe={recipe} fallback="MI" />
            <AnuimeAvatar recipe={recipe} fallback="SO" />
          </AnuimeAvatarGroup>
          <AnuimeButton recipe={recipe}>Create post</AnuimeButton>
        </div>
      </header>
      <MochiCreatorCompanion recipe={recipe} />
      <section className="grid gap-4 md:grid-cols-3">
        <AnuimeCard
          recipe={recipe}
          eyebrow="Featured remix"
          title="Soft launch kit"
          description="Remixed by 14 creators."
        />
        <AnuimeCard
          recipe={recipe}
          eyebrow="Prompt"
          title="Show your first component"
          description="Small beginnings are welcome."
        />
        <AnuimeCard
          recipe={recipe}
          eyebrow="Community"
          title="Kind feedback circle"
          description="Accessible critique and encouragement."
        />
      </section>
    </main>
  );
}
