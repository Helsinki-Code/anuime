import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeColumn<Row> = {
  key: keyof Row;
  header: string;
  render?: (value: Row[keyof Row], row: Row) => React.ReactNode;
};
export type AnuimeDataTableProps<Row extends { id: string }> = {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  caption: string;
  columns: AnuimeColumn<Row>[];
  rows: Row[];
  emptyMessage?: string;
};

export function AnuimeDataTable<Row extends { id: string }>({
  character = "atlas",
  recipe,
  caption,
  columns,
  rows,
  emptyMessage = "No records found.",
}: AnuimeDataTableProps<Row>) {
  const styles = resolveAnuimeRecipe(recipe, character);
  return (
    <div className={`w-full overflow-x-auto ${styles.surface}`}>
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-current/15">
            {columns.map((column) => (
              <th
                key={String(column.key)}
                scope="col"
                className={`px-4 py-3 font-mono text-xs tracking-wider uppercase ${styles.accent}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className="border-b border-current/10 last:border-0 hover:bg-current/5"
            >
              {columns.map((column) => {
                const value = row[column.key];
                return (
                  <td key={String(column.key)} className="px-4 py-3">
                    {column.render ? column.render(value, row) : String(value)}
                  </td>
                );
              })}
            </tr>
          ))}
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-10 text-center opacity-60">
                {emptyMessage}
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
