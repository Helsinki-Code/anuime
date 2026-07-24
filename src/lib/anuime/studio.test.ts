import { describe, expect, it } from "vitest";

import { createAnuimeRecipe } from "./recipe";
import {
  getInstallCommand,
  parseStudioSearch,
  studioDocumentFromSearch,
  studioSearchFromDocument,
} from "./studio";

describe("Component Lab URL state", () => {
  it("round trips the complete Studio document", () => {
    const document = {
      recipe: { ...createAnuimeRecipe("atlas"), density: "compact" as const },
      componentId: "data-table" as const,
      previewState: "empty",
      viewport: "tablet" as const,
      zoom: 1.25 as const,
    };
    expect(studioDocumentFromSearch(studioSearchFromDocument(document))).toEqual(document);
  });

  it("rejects v1 recipes and reports invalid recipes without a compatibility shim", () => {
    const legacy = parseStudioSearch({
      recipe: "mochi.mochi.mochi.mochi.spacious.calm",
      component: "card",
    });
    expect(legacy.recipe).toBeUndefined();
    expect(legacy.warning).toBe("invalid-recipe");
    expect(parseStudioSearch({ recipe: "not-a-recipe" }).warning).toBe("invalid-recipe");
  });

  it("falls back from unsupported component states", () => {
    expect(studioDocumentFromSearch({ component: "dialog", state: "loading" }).previewState).toBe(
      "default",
    );
  });

  it("builds canonical install commands", () => {
    expect(getInstallCommand("checkbox")).toBe(
      "npx shadcn@latest add https://anuime.vercel.app/r/anuime-checkbox.json",
    );
  });
});
