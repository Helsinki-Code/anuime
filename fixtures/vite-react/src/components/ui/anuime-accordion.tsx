import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeAccordionItem = { id: string; title: string; content: React.ReactNode };
export type AnuimeAccordionProps = {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  items: AnuimeAccordionItem[];
};

export function AnuimeAccordion({ character = "kira", recipe, items }: AnuimeAccordionProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  return (
    <div className={`grid w-full max-w-xl ${styles.gap}`}>
      {items.map((item, index) => (
        <details key={item.id} open={index === 0} className={`${styles.surface} overflow-hidden`}>
          <summary
            className={`cursor-pointer list-none font-semibold marker:hidden ${styles.surfacePadding}`}
          >
            <span className="flex items-center justify-between gap-4">
              {item.title}
              <span aria-hidden="true">＋</span>
            </span>
          </summary>
          <div
            className={`border-t text-sm leading-6 text-muted-foreground ${styles.surfacePadding}`}
          >
            {item.content}
          </div>
        </details>
      ))}
    </div>
  );
}
