import { expect, test } from "@playwright/test";

import themes from "../../design-spec/themes.json" with { type: "json" };

test.setTimeout(90_000);

type Character = "kira" | "mochi" | "atlas";
type Mode = "light" | "dark";

const previewItems = [
  { name: "anuime-accordion", title: "AnUIme Accordion" },
  { name: "anuime-alert", title: "AnUIme Alert" },
  { name: "anuime-alert-dialog", title: "AnUIme Alert Dialog" },
  { name: "anuime-aspect-ratio", title: "AnUIme Aspect Ratio" },
  { name: "anuime-avatar", title: "AnUIme Avatar" },
  { name: "anuime-badge", title: "AnUIme Badge" },
  { name: "anuime-breadcrumb", title: "AnUIme Breadcrumb" },
  { name: "anuime-button", title: "AnUIme Button" },
  { name: "anuime-button-group", title: "AnUIme Button Group" },
  { name: "anuime-calendar", title: "AnUIme Calendar" },
  { name: "anuime-card", title: "AnUIme Card" },
  { name: "anuime-checkbox", title: "AnUIme Checkbox" },
  { name: "anuime-collapsible", title: "AnUIme Collapsible" },
  { name: "anuime-combobox", title: "AnUIme Combobox" },
  { name: "anuime-command-palette", title: "AnUIme Command Palette" },
  { name: "anuime-context-menu", title: "AnUIme Context Menu" },
  { name: "anuime-data-table", title: "AnUIme Data Table" },
  { name: "anuime-date-control", title: "AnUIme Date Control" },
  { name: "anuime-dialog", title: "AnUIme Dialog" },
  { name: "anuime-drawer", title: "AnUIme Drawer" },
  { name: "anuime-dropdown-menu", title: "AnUIme Dropdown Menu" },
  { name: "anuime-empty-state", title: "AnUIme Empty State" },
  { name: "anuime-field", title: "AnUIme Field" },
  { name: "anuime-hover-card", title: "AnUIme Hover Card" },
  { name: "anuime-input", title: "AnUIme Input" },
  { name: "anuime-input-group", title: "AnUIme Input Group" },
  { name: "anuime-input-otp", title: "AnUIme Input Otp" },
  { name: "anuime-kbd", title: "AnUIme Kbd" },
  { name: "anuime-menubar", title: "AnUIme Menubar" },
  { name: "anuime-navigation-menu", title: "AnUIme Navigation Menu" },
  { name: "anuime-pagination", title: "AnUIme Pagination" },
  { name: "anuime-popover", title: "AnUIme Popover" },
  { name: "anuime-progress", title: "AnUIme Progress" },
  { name: "anuime-radio-group", title: "AnUIme Radio Group" },
  { name: "anuime-scroll-area", title: "AnUIme Scroll Area" },
  { name: "anuime-select", title: "AnUIme Select" },
  { name: "anuime-separator", title: "AnUIme Separator" },
  { name: "anuime-sheet", title: "AnUIme Sheet" },
  { name: "anuime-sidebar", title: "AnUIme Sidebar" },
  { name: "anuime-skeleton", title: "AnUIme Skeleton" },
  { name: "anuime-slider", title: "AnUIme Slider" },
  { name: "anuime-spinner", title: "AnUIme Spinner" },
  { name: "anuime-switch", title: "AnUIme Switch" },
  { name: "anuime-table", title: "AnUIme Table" },
  { name: "anuime-tabs", title: "AnUIme Tabs" },
  { name: "anuime-textarea", title: "AnUIme Textarea" },
  { name: "anuime-toast", title: "AnUIme Toast" },
  { name: "anuime-toggle", title: "AnUIme Toggle" },
  { name: "anuime-toolbar", title: "AnUIme Toolbar" },
  { name: "anuime-tooltip", title: "AnUIme Tooltip" },
  { name: "anuime-typography", title: "AnUIme Typography" },
] as const;

const characters = {
  kira: { transitionMs: "240", frameLaw: "kira.fringe", accentToken: "--accent-edge" },
  mochi: { transitionMs: "250", frameLaw: "mochi.veil", accentToken: "--rose" },
  atlas: { transitionMs: "180", frameLaw: "atlas.panel", accentToken: "--cobalt-line" },
} as const;

for (const item of previewItems) {
  test(`${item.title} supports the character-aware preview in both themes`, async ({ page }) => {
    await page.goto(`/components/${item.name}`);
    await page.addStyleTag({
      content:
        "*, *::before, *::after { animation-duration: 0s !important; transition-duration: 0s !important; }",
    });

    await expect(page.getByRole("heading", { level: 1, name: item.title })).toBeVisible();
    const previewTab = page.getByRole("tab", { name: "Preview" });
    const pageTabs = previewTab.locator("..");
    await expect(previewTab).toBeVisible();
    await expect(pageTabs.getByRole("tab", { name: "Code" })).toBeVisible();
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
      await expect
        .poll(() => stage.locator(`[data-character="${character}"]`).count())
        .toBeGreaterThan(0);
      await verifyMode(character, "light");
      await verifyMode(character, "dark");
    };

    await verifyCharacter("kira");
    await verifyCharacter("mochi");
    await verifyCharacter("atlas");
    await verifyCharacter("kira");

    await disclosure.click();
    await expect(provenance).toBeVisible();
    await expect(provenance).toContainText(/Law|No artifact claims this/u);
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
