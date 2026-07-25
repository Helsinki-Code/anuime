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
