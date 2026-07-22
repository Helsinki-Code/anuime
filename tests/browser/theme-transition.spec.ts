import { expect, test } from "@playwright/test";

async function selectTheme(page: import("@playwright/test").Page, theme: "Light" | "Dark") {
  await page.getByRole("button", { name: "Toggle theme" }).click();
  await page.getByRole("menuitemradio", { name: theme }).click();
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => window.localStorage.setItem("theme", "light"));
});

test("theme switch powers on from the control without browser errors", async ({ page }) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/light/u);

  await selectTheme(page, "Dark");

  await expect(page.locator("html")).toHaveClass(/dark/u);
  await expect
    .poll(() => page.locator("html").getAttribute("class"))
    .not.toContain("theme-switching");
  await expect(page.getByRole("button", { name: "Toggle theme" })).toHaveAttribute(
    "data-resolved-theme",
    "dark",
  );
  expect(pageErrors).toEqual([]);
});

test("reduced motion changes theme without the power-on animation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await selectTheme(page, "Dark");

  await expect(page.locator("html")).toHaveClass(/dark/u);
  await expect(page.locator("html")).not.toHaveClass(/theme-switching/u);
});
