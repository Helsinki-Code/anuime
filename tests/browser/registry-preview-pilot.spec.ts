import { expect, test } from "@playwright/test";

import themes from "../../design-spec/themes.json" with { type: "json" };

type Character = "kira" | "mochi" | "atlas";
type Mode = "light" | "dark";

const pilotItems = [
  { name: "anuime-breadcrumb", title: "AnUIme Breadcrumb" },
  { name: "anuime-checkbox", title: "AnUIme Checkbox" },
  { name: "anuime-data-table", title: "AnUIme Data Table" },
] as const;

const characters = {
  kira: { transitionMs: "240", frameLaw: "kira.fringe", accentToken: "--accent-edge" },
  mochi: { transitionMs: "2600", frameLaw: "mochi.veil", accentToken: "--rose" },
  atlas: { transitionMs: "180", frameLaw: "atlas.panel", accentToken: "--cobalt-line" },
} as const;

for (const item of pilotItems) {
  test(`${item.title} supports the three-character preview pilot in both themes`, async ({
    page,
  }) => {
    await page.goto(`/components/${item.name}`);

    await expect(page.getByRole("heading", { level: 1, name: item.title })).toBeVisible();
    await expect(page.getByRole("tab", { name: "Preview" })).toBeVisible();
    await expect(page.getByRole("tab", { name: "Code" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Copy Page" })).toBeVisible();

    const panel = page.locator("[data-character-preview-panel]");
    const frame = page.locator("[data-character-preview-frame]");
    const header = page.locator("[data-character-preview-header]");
    const stage = page.locator("[data-character-preview-stage]");
    const disclosure = panel.getByText("How this is built");
    const details = disclosure.locator("..");
    const provenance = panel.locator("[data-construction-provenance]");

    await expect(panel).toBeVisible();
    await expect(details).not.toHaveAttribute("open", "");
    await expect(provenance).not.toBeVisible();

    const verifyMode = async (character: Character, mode: Mode) => {
      await page.evaluate((nextMode) => {
        document.documentElement.classList.toggle("dark", nextMode === "dark");
      }, mode);

      const expected = getExpectedTheme(character, mode);
      await expect
        .poll(() =>
          frame.evaluate((element) => {
            const styles = getComputedStyle(element);
            return {
              surface: styles.backgroundColor,
              border: styles.borderColor,
              accent: styles.getPropertyValue("--anuime-accent").trim(),
            };
          }),
        )
        .toEqual({
          surface: hexToRgb(expected.surface),
          border: hexToRgb(expected.border),
          accent: expected.accent,
        });
      await expect
        .poll(() => header.evaluate((element) => getComputedStyle(element).backgroundColor))
        .toBe(hexToRgb(expected.elevated));
      await expect
        .poll(() => stage.evaluate((element) => getComputedStyle(element).backgroundColor))
        .toBe(hexToRgb(expected.background));
    };

    const verifyCharacter = async (character: Character) => {
      await panel.locator(`[data-preview-character-option="${character}"]`).click();
      await expect(panel).toHaveAttribute("data-preview-character", character);
      await expect(panel).toHaveAttribute("data-frame-law", characters[character].frameLaw);
      await expect(panel).toHaveAttribute("data-transition-ms", characters[character].transitionMs);
      await expect(stage.locator(`[data-character="${character}"]`)).toBeVisible();
      await verifyMode(character, "light");
      await verifyMode(character, "dark");
    };

    await verifyCharacter("kira");
    await verifyCharacter("mochi");
    await verifyCharacter("atlas");

    await disclosure.click();
    await expect(provenance).toBeVisible();
    await expect(provenance).toContainText("Law");
  });
}

function getExpectedTheme(character: Character, mode: Mode) {
  const tokens = Object.fromEntries(
    themes.characters[character].themes[mode].declaredTokens.map(({ name, value }) => [
      name,
      value,
    ]),
  );
  const borderToken = character === "mochi" && mode === "light" ? "--border-gold" : "--border";

  return {
    background: getToken(tokens, "--background"),
    surface: getToken(tokens, "--surface"),
    elevated:
      character === "kira" && mode === "dark"
        ? getToken(tokens, "--elevated")
        : getToken(tokens, "--surface"),
    border: getToken(tokens, borderToken),
    accent: getToken(tokens, characters[character].accentToken),
  };
}

function getToken(tokens: Record<string, string>, name: string) {
  const value = tokens[name];

  if (!value) throw new Error(`Missing declared theme token: ${name}`);
  return value;
}

function hexToRgb(value: string) {
  const channels = value
    .slice(1)
    .match(/.{2}/gu)
    ?.map((channel) => Number.parseInt(channel, 16));

  if (!channels || channels.length !== 3) throw new Error(`Expected six-digit hex color: ${value}`);
  return `rgb(${channels.join(", ")})`;
}
