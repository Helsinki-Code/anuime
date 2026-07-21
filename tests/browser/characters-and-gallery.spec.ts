import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const path of [
  "/characters",
  "/characters/kira",
  "/characters/mochi",
  "/characters/atlas",
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
