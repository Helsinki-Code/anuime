import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimePaginationProps = {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  page: number;
  pageCount: number;
  onPageChange?: (page: number) => void;
};

export function AnuimePagination({
  character = "kira",
  recipe,
  page,
  pageCount,
  onPageChange,
}: AnuimePaginationProps) {
  const styles = resolveAnuimeRecipe(recipe, character, "pagination");
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);
  return (
    <nav
      aria-label="Pagination"
      data-character={styles.recipe.structureSystem}
      data-anuime-component="pagination"
      className={`flex flex-wrap items-center gap-2 ${styles.typography}`}
    >
      <button
        type="button"
        disabled={page <= 1}
        aria-label="Previous page"
        onClick={() => onPageChange?.(page - 1)}
        className={styles.secondary}
      >
        <span aria-hidden="true" className={`${styles.marker} mr-2 rotate-[225deg]`} />
        Previous
      </button>
      {pages.map((item) => (
        <button
          key={item}
          type="button"
          aria-label={`Page ${item}`}
          aria-current={item === page ? "page" : undefined}
          onClick={() => onPageChange?.(item)}
          className={item === page ? styles.primary : styles.secondary}
        >
          <span aria-hidden="true" className={item === page ? styles.node : styles.hollowNode} />
          <span className="sr-only">{item}</span>
        </button>
      ))}
      <button
        type="button"
        disabled={page >= pageCount}
        aria-label="Next page"
        onClick={() => onPageChange?.(page + 1)}
        className={styles.secondary}
      >
        Next
        <span aria-hidden="true" className={`${styles.marker} ml-2`} />
      </button>
    </nav>
  );
}
