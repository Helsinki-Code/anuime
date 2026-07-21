import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { createAnuimeRecipe } from "@/lib/anuime/recipe";
import { componentCatalog, registryComponentIds } from "@/lib/anuime/studio";

import { ComponentPreview } from "./component-preview";

describe("Component Lab registry previews", () => {
  it.each(registryComponentIds)(
    "renders the real %s component for every pure character",
    (componentId) => {
      for (const character of ["kira", "mochi", "atlas"] as const) {
        const markup = renderToStaticMarkup(
          <ComponentPreview
            document={{
              recipe: createAnuimeRecipe(character),
              componentId,
              previewState: componentCatalog[componentId].states[0] ?? "default",
              viewport: "desktop",
              zoom: 1,
            }}
          />,
        );
        expect(markup.length).toBeGreaterThan(20);
      }
    },
  );

  it("renders independently mixed dimensions", () => {
    const markup = renderToStaticMarkup(
      <ComponentPreview
        document={{
          recipe: {
            ...createAnuimeRecipe("kira"),
            shapeSystem: "mochi",
            structureSystem: "atlas",
            density: "spacious",
          },
          componentId: "button",
          previewState: "default",
          viewport: "mobile",
          zoom: 1,
        }}
      />,
    );
    expect(markup).toContain("rounded-full");
    expect(markup).toContain("min-h-12");
  });
});
