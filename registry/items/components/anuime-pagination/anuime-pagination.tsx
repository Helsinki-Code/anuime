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
  const styles = resolveAnuimeRecipe(recipe, character);
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);
  return (
    <nav aria-label="Pagination" className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        disabled={page <= 1}
        aria-label="Previous page"
        onClick={() => onPageChange?.(page - 1)}
        className={styles.secondary}
      >
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
          {item}
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
      </button>
    </nav>
  );
}
