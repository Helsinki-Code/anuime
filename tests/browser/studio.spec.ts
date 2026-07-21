import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

async function waitForStudio(page: import("@playwright/test").Page) {
  await expect(page.locator('[data-studio-ready="true"]')).toBeVisible({ timeout: 20_000 });
}

test("restores shared Studio state and browser history", async ({ page }) => {
  await page.goto(
    "/studio?recipe=v2.mochi.mochi.mochi.mochi.spacious.calm.light&component=popover&state=open&viewport=tablet&zoom=1",
  );
  await waitForStudio(page);
  await expect(page.getByRole("heading", { name: "Popover" })).toBeVisible();
  const componentPicker = page.locator("aside").getByLabel("Component");
  await expect(componentPicker).toHaveValue("popover");
  await componentPicker.selectOption("accordion");
  await expect(page).toHaveURL(/component=accordion/u);
  await page.goBack();
  await expect(componentPicker).toHaveValue("popover");
});

test("recovers from invalid recipes", async ({ page }) => {
  await page.goto("/studio?recipe=not-a-recipe");
  await waitForStudio(page);
  await expect(page.getByRole("alert")).toContainText("invalid");
  await expect(page.getByText("No compatibility conflicts")).toBeVisible();
});

test("undo, redo, component switching, and responsive controls work", async ({ page }) => {
  await page.goto("/studio");
  await waitForStudio(page);
  const componentPicker = page.locator("aside").getByLabel("Component");
  await componentPicker.selectOption("switch");
  await page.getByRole("button", { name: "mobile", exact: true }).click();
  await page.getByRole("button", { name: "Undo" }).click();
  await expect(componentPicker).toHaveValue("switch");
  await page.getByRole("button", { name: "Redo" }).click();
  await expect(page.getByRole("button", { name: "mobile", exact: true })).toHaveClass(
    /bg-foreground/u,
  );
});

test("clipboard failure is friendly", async ({ page }) => {
  await page.goto("/studio");
  await waitForStudio(page);
  await page.evaluate(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: () => Promise.reject(new Error("Denied")) },
    });
  });
  await page.getByRole("button", { name: "Copy recipe JSON" }).click();
  await expect(page.getByRole("status")).toContainText("Clipboard blocked");
});

test("Studio has no serious automated accessibility findings", async ({ page }) => {
  await page.goto("/studio");
  await waitForStudio(page);
  const results = await new AxeBuilder({ page }).analyze();
  expect(
    results.violations.filter((violation) =>
      ["critical", "serious"].includes(violation.impact ?? ""),
    ),
  ).toEqual([]);
});

test("signature component matrix is visually stable", async ({ page }) => {
  const cases = [
    ["kira", "command-palette"],
    ["mochi", "popover"],
    ["atlas", "accordion"],
  ] as const;
  for (const [character, component] of cases) {
    // eslint-disable-next-line no-await-in-loop -- one browser page must navigate sequentially.
    await page.goto(
      `/studio?recipe=v2.${character}.${character}.${character}.${character}.comfortable.calm.dark&component=${component}&viewport=desktop&zoom=1`,
    );
    // eslint-disable-next-line no-await-in-loop -- each visual case must hydrate before capture.
    await waitForStudio(page);
    // eslint-disable-next-line no-await-in-loop -- screenshot follows its matching navigation.
    await expect(page.locator(".anuime-preview-canvas")).toHaveScreenshot(
      `${character}-${component}.png`,
      {
        animations: "disabled",
        maxDiffPixelRatio: 0.01,
      },
    );
  }
});
