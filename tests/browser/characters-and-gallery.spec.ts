import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const path of [
  "/",
  "/characters",
  "/characters/kira",
  "/characters/mochi",
  "/characters/atlas",
  "/design-philosophy",
  "/gallery",
  "/docs/mcp",
  "/components",
  "/components/anuime-radio-group",
]) {
  test(`${path} has no serious automated accessibility findings`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    expect(
      results.violations.filter((violation) =>
        ["critical", "serious"].includes(violation.impact ?? ""),
      ),
    ).toEqual([]);
  });
}

test("Extended component catalog exposes all three construction systems", async ({ page }) => {
  await page.goto("/components");
  await expect(
    page.getByRole("heading", {
      name: "One production catalog. Three unmistakable interface voices.",
    }),
  ).toBeVisible();
  await expect(page.getByText("34", { exact: true })).toBeVisible();

  await page.goto("/components/anuime-radio-group");
  await expect(page.locator("[data-extended-construction]")).toHaveCount(1);
  await expect(page.getByText("collar ring", { exact: true })).toBeVisible();
  await expect(page.getByText("gold rim", { exact: true })).toBeVisible();
  await expect(page.getByText("survey diamond", { exact: true })).toBeVisible();
});

test("examples compose real primitives and the MCP is first-class", async ({ page }) => {
  await page.goto("/gallery");
  await expect(
    page.getByRole("heading", { name: "Components make sense when they work together." }),
  ).toBeVisible();
  await expect(page.locator("[data-gallery-example]")).toHaveCount(6);
  await expect(page.getByText("Signal Launch", { exact: true })).toBeVisible();
  await expect(page.getByText("Night Shift", { exact: true })).toBeVisible();
  await expect(page.getByText("Creator Release", { exact: true })).toBeVisible();
  await expect(page.getByText("Signal Review", { exact: true })).toBeVisible();

  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Give your agent the actual system." }),
  ).toBeVisible();
  await expect(page.getByText("https://anuime.vercel.app/mcp")).toBeVisible();
  await expect(page.getByRole("link", { name: "Explore the MCP tools" })).toBeVisible();

  await page.goto("/docs/mcp");
  await expect(page.getByRole("heading", { name: "Production Endpoint" })).toBeVisible();
  await expect(page.getByText("list_components", { exact: true }).first()).toBeVisible();
});

test("site v2 exposes the approved construction systems", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Your component library just got a cast." }),
  ).toBeVisible();
  await expect(page.getByText("Artifact → geometry → carrier")).toBeVisible();
  await expect(page.getByText("Power appears only when time changes.")).toBeVisible();

  await page.goto("/characters/kira");
  await expect(
    page.getByRole("heading", { name: "Seven artifacts. Seven carriers." }),
  ).toBeVisible();
  await expect(page.getByText(/Hairpin/u)).toBeVisible();
  await expect(page.getByText(/Light shard/u)).toBeVisible();

  await page.goto("/design-philosophy");
  await expect(
    page.getByRole("heading", { name: "Workhorses abstract. Moments assemble." }),
  ).toBeVisible();
});
