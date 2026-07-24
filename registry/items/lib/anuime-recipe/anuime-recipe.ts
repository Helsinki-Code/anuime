export const anuimeCharacters = ["kira", "mochi", "atlas"] as const;
export const anuimeDensities = ["compact", "comfortable", "spacious"] as const;
export const anuimeMotionLevels = ["still", "calm", "expressive"] as const;
export const anuimeModes = ["light", "dark", "system"] as const;

export type AnuimeCharacter = (typeof anuimeCharacters)[number];
export type AnuimeDensity = (typeof anuimeDensities)[number];
export type AnuimeMotionLevel = (typeof anuimeMotionLevels)[number];
export type AnuimeMode = (typeof anuimeModes)[number];

export type AnuimeRecipeV2 = {
  version: 2;
  colorSystem: AnuimeCharacter;
  shapeSystem: AnuimeCharacter;
  structureSystem: AnuimeCharacter;
  motionSystem: AnuimeCharacter;
  density: AnuimeDensity;
  motionLevel: AnuimeMotionLevel;
  mode: AnuimeMode;
};

export type AnuimeRecipe = AnuimeRecipeV2;

export type RecipeValidationIssue = {
  code: string;
  severity: "error" | "warning";
  message: string;
};

export const anuimeComponentConstructionMap = {
  accordion: { specification: "derived", carrier: "disclosure" },
  alert: { specification: "derived", carrier: "severity" },
  "alert-dialog": { specification: "derived", carrier: "overlay" },
  "aspect-ratio": { specification: "derived", carrier: "frame" },
  avatar: { specification: "derived", carrier: "status-ring" },
  badge: { specification: "specified", carrier: "status-ring" },
  breadcrumb: { specification: "derived", carrier: "path-marker" },
  button: { specification: "specified", carrier: "focus-control" },
  "button-group": { specification: "derived", carrier: "segmented-strap" },
  calendar: { specification: "derived", carrier: "grid-node" },
  card: { specification: "specified", carrier: "frame" },
  checkbox: { specification: "specified", carrier: "selection-mark" },
  collapsible: { specification: "derived", carrier: "disclosure" },
  combobox: { specification: "derived", carrier: "lens-input" },
  "command-palette": { specification: "derived", carrier: "lens-overlay" },
  "context-menu": { specification: "derived", carrier: "selection-menu" },
  "data-table": { specification: "specified", carrier: "data-grid" },
  "date-control": { specification: "derived", carrier: "grid-node" },
  dialog: { specification: "specified", carrier: "overlay" },
  drawer: { specification: "derived", carrier: "docked-panel" },
  "dropdown-menu": { specification: "specified", carrier: "selection-menu" },
  "empty-state": { specification: "derived", carrier: "static-empty" },
  field: { specification: "derived", carrier: "lens-input" },
  "hover-card": { specification: "derived", carrier: "frame" },
  input: { specification: "specified", carrier: "lens-input" },
  "input-group": { specification: "derived", carrier: "segmented-strap" },
  "input-otp": { specification: "derived", carrier: "grid-node" },
  kbd: { specification: "derived", carrier: "bezel-key" },
  menubar: { specification: "derived", carrier: "segmented-strap" },
  "navigation-menu": { specification: "derived", carrier: "selection-menu" },
  pagination: { specification: "derived", carrier: "grid-node" },
  popover: { specification: "derived", carrier: "pointer-frame" },
  progress: { specification: "specified", carrier: "segmented-strap" },
  "radio-group": { specification: "derived", carrier: "status-ring" },
  "scroll-area": { specification: "derived", carrier: "segmented-strap" },
  select: { specification: "derived", carrier: "lens-input" },
  separator: { specification: "derived", carrier: "rule" },
  sheet: { specification: "derived", carrier: "docked-panel" },
  sidebar: { specification: "derived", carrier: "navigation-rail" },
  skeleton: { specification: "specified", carrier: "static-surface" },
  slider: { specification: "specified", carrier: "track-node" },
  spinner: { specification: "derived", carrier: "status-ring" },
  switch: { specification: "specified", carrier: "segmented-strap" },
  table: { specification: "derived", carrier: "data-grid" },
  tabs: { specification: "specified", carrier: "selection-menu" },
  textarea: { specification: "derived", carrier: "lens-input" },
  toast: { specification: "specified", carrier: "severity" },
  toggle: { specification: "specified", carrier: "segmented-strap" },
  toolbar: { specification: "derived", carrier: "segmented-strap" },
  tooltip: { specification: "specified", carrier: "pointer-frame" },
  typography: { specification: "derived", carrier: "type-system" },
} as const;

export type AnuimeComponentName = keyof typeof anuimeComponentConstructionMap;

const framedCarriers = new Set([
  "frame",
  "overlay",
  "lens-overlay",
  "docked-panel",
  "pointer-frame",
  "static-empty",
  "static-surface",
  "data-grid",
]);

const controlledCarriers = new Set([
  "focus-control",
  "selection-mark",
  "segmented-strap",
  "grid-node",
  "lens-input",
  "selection-menu",
  "bezel-key",
  "track-node",
]);

const characterFrameStyles = {
  kira: "relative before:pointer-events-none before:absolute before:top-0 before:right-4 before:z-10 before:h-px before:w-8 before:bg-[var(--anuime-accent,var(--accent))] before:content-[''] after:pointer-events-none after:absolute after:bottom-0 after:left-4 after:z-10 after:h-px after:w-5 after:-skew-x-[18deg] after:bg-[var(--anuime-accent,var(--accent))] after:content-['']",
  mochi:
    "relative before:pointer-events-none before:absolute before:top-0 before:right-5 before:left-5 before:z-10 before:h-px before:bg-[var(--anuime-secondary-accent,var(--border))] before:content-[''] after:pointer-events-none after:absolute after:top-[-3px] after:left-5 after:z-10 after:size-[7px] after:rounded-full after:border after:border-[var(--anuime-secondary-accent,var(--border))] after:bg-[var(--anuime-surface,var(--card))] after:content-['']",
  atlas:
    "relative before:pointer-events-none before:absolute before:top-1 before:left-1 before:z-10 before:size-3 before:border-t-2 before:border-l-2 before:border-[var(--anuime-accent,var(--accent))] before:content-[''] after:pointer-events-none after:absolute after:right-1 after:bottom-1 after:z-10 after:size-3 after:border-r-2 after:border-b-2 after:border-[var(--anuime-accent,var(--accent))] after:content-['']",
} as const;

const characterControlStyles = {
  kira: "focus-visible:ring-[1.5px] focus-visible:ring-[var(--anuime-accent,var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  mochi:
    "focus-visible:ring-[1.5px] focus-visible:ring-[var(--anuime-accent,var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:shadow-[0_0_0_6px_color-mix(in_oklab,var(--anuime-accent,var(--ring))_10%,transparent)]",
  atlas:
    "focus-visible:ring-[1.5px] focus-visible:ring-[var(--anuime-accent,var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--anuime-accent,var(--ring))]",
} as const;

const characterIndicatorStyles = {
  kira: "rounded-[2px]",
  mochi: "rounded-full shadow-[inset_0_0_0_1px_var(--anuime-secondary-accent,var(--border))]",
  atlas: "rounded-[1px]",
} as const;

const characterRuleStyles = {
  kira: "border-[var(--anuime-accent,var(--border))]",
  mochi: "border-[var(--anuime-secondary-accent,var(--border))]",
  atlas: "border-[var(--anuime-accent,var(--border))]",
} as const;

const colorStyles = {
  kira: {
    primary: "bg-primary text-primary-foreground hover:bg-primary/92",
    secondary:
      "border-[var(--anuime-border-strong,var(--border))] bg-secondary text-secondary-foreground hover:bg-[var(--anuime-subtle-hover,var(--secondary))]",
    field:
      "border-[var(--anuime-border-strong,var(--input))] bg-[var(--anuime-surface,var(--background))] text-foreground placeholder:text-muted-foreground focus-visible:ring-[var(--anuime-accent,var(--ring))]",
    accent: "text-[var(--anuime-accent,var(--foreground))]",
    checkbox: "accent-[var(--anuime-accent,var(--accent))]",
  },
  mochi: {
    primary: "bg-primary text-primary-foreground hover:bg-primary/92",
    secondary:
      "border-border bg-secondary text-secondary-foreground hover:bg-[var(--anuime-subtle-hover,var(--secondary))]",
    field:
      "border-[var(--anuime-border-strong,var(--input))] bg-[var(--anuime-surface,var(--background))] text-foreground placeholder:text-muted-foreground focus-visible:ring-[var(--anuime-accent,var(--ring))]",
    accent: "text-[var(--anuime-accent,var(--foreground))]",
    checkbox: "accent-[var(--anuime-accent,var(--accent))]",
  },
  atlas: {
    primary: "bg-primary text-primary-foreground hover:bg-primary/92",
    secondary:
      "border-[var(--anuime-border-strong,var(--border))] bg-secondary text-secondary-foreground hover:bg-[var(--anuime-subtle-hover,var(--secondary))]",
    field:
      "border-[var(--anuime-border-strong,var(--input))] bg-[var(--anuime-surface,var(--background))] text-foreground placeholder:text-muted-foreground focus-visible:ring-[var(--anuime-accent,var(--ring))]",
    accent: "text-[var(--anuime-accent,var(--foreground))]",
    checkbox: "accent-[var(--anuime-accent,var(--accent))]",
  },
} as const;

const shapeStyles = {
  kira: { control: "rounded-[5px]", surface: "rounded-[8px]" },
  mochi: { control: "rounded-[10px]", surface: "rounded-[14px]" },
  atlas: { control: "rounded-[7px]", surface: "rounded-[9px]" },
} as const;

const structureStyles = {
  kira: "border-[var(--anuime-border-strong,var(--border))] bg-[var(--anuime-surface,var(--card))] text-foreground",
  mochi:
    "border-border bg-[var(--anuime-surface,var(--card))] text-foreground shadow-[0_12px_32px_-24px_color-mix(in_oklab,var(--foreground)_24%,transparent)]",
  atlas:
    "border-[var(--anuime-border-strong,var(--border))] bg-[var(--anuime-surface,var(--card))] text-foreground shadow-[0_0_0_1px_var(--background)]",
} as const;

const motionStyles = {
  kira: "transition-[background-color,border-color,color,opacity] duration-[120ms] ease-out",
  mochi: "transition-[background-color,border-color,color,opacity] duration-[250ms] ease-out",
  atlas: "transition-[background-color,border-color,color,opacity] duration-[180ms] ease-linear",
} as const;

const densityStyles = {
  compact: { control: "min-h-8 px-3 py-1.5", surface: "p-4", gap: "gap-2" },
  comfortable: { control: "min-h-9 px-4 py-2", surface: "p-6", gap: "gap-3" },
  spacious: { control: "min-h-12 px-5 py-3", surface: "p-8", gap: "gap-5" },
} as const;

export const pureCharacterRecipes: Record<AnuimeCharacter, AnuimeRecipeV2> = {
  kira: createAnuimeRecipe("kira"),
  mochi: createAnuimeRecipe("mochi"),
  atlas: createAnuimeRecipe("atlas"),
};

export const defaultAnuimeRecipe = pureCharacterRecipes.kira;

export function createAnuimeRecipe(character: AnuimeCharacter): AnuimeRecipeV2 {
  return {
    version: 2,
    colorSystem: character,
    shapeSystem: character,
    structureSystem: character,
    motionSystem: character,
    density: "comfortable",
    motionLevel: character === "kira" ? "expressive" : "calm",
    mode: "system",
  };
}

export function encodeAnuimeRecipe(recipe: AnuimeRecipeV2): string {
  return [
    "v2",
    recipe.colorSystem,
    recipe.shapeSystem,
    recipe.structureSystem,
    recipe.motionSystem,
    recipe.density,
    recipe.motionLevel,
    recipe.mode,
  ].join(".");
}

export function decodeAnuimeRecipe(value: string): AnuimeRecipeV2 | null {
  const [
    version,
    colorSystem,
    shapeSystem,
    structureSystem,
    motionSystem,
    density,
    motionLevel,
    mode,
    ...rest
  ] = value.split(".");
  const candidate = {
    version: version === "v2" ? 2 : undefined,
    colorSystem,
    shapeSystem,
    structureSystem,
    motionSystem,
    density,
    motionLevel,
    mode,
  };
  return rest.length === 0 && isAnuimeRecipe(candidate) ? candidate : null;
}

export function validateAnuimeRecipe(value: unknown): RecipeValidationIssue[] {
  if (isAnuimeRecipe(value)) return [];
  return [
    {
      code: "invalid_recipe",
      severity: "error",
      message: "The recipe contains unsupported or incomplete values.",
    },
  ];
}

export function resolveAnuimeRecipe(
  recipe?: AnuimeRecipeV2,
  character: AnuimeCharacter = "kira",
  component?: AnuimeComponentName,
) {
  const resolved = recipe ?? createAnuimeRecipe(character);
  const color = colorStyles[resolved.colorSystem];
  const shape = shapeStyles[resolved.shapeSystem];
  const density = densityStyles[resolved.density];
  const motion = resolved.motionLevel === "still" ? "" : motionStyles[resolved.motionSystem];
  const carrier = component ? anuimeComponentConstructionMap[component].carrier : undefined;
  const frame =
    carrier && framedCarriers.has(carrier) ? characterFrameStyles[resolved.structureSystem] : "";
  const control =
    carrier && controlledCarriers.has(carrier)
      ? characterControlStyles[resolved.structureSystem]
      : "";
  const indicator = component ? characterIndicatorStyles[resolved.structureSystem] : "";
  const rule = carrier === "rule" ? characterRuleStyles[resolved.structureSystem] : "";
  return {
    recipe: resolved,
    component,
    construction: component ? anuimeComponentConstructionMap[component] : undefined,
    primary: `${color.primary} ${motion} ${control}`,
    secondary: `border ${color.secondary} ${motion} ${control}`,
    field: `border ${color.field} ${control}`,
    surface: `${shape.surface} border ${structureStyles[resolved.structureSystem]} ${motion} ${frame}`,
    accent: `${color.accent} ${rule}`,
    checkbox: color.checkbox,
    control: `${shape.control} ${density.control} ${control}`,
    shapeControl: shape.control,
    indicator: `${indicator} bg-[var(--anuime-accent,var(--accent))] ${motion}`,
    surfacePadding: density.surface,
    gap: density.gap,
  };
}

export function isAnuimeCharacter(value: unknown): value is AnuimeCharacter {
  return typeof value === "string" && anuimeCharacters.some((item) => item === value);
}

export function isAnuimeRecipe(value: unknown): value is AnuimeRecipeV2 {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<AnuimeRecipeV2>;
  return (
    candidate.version === 2 &&
    isAnuimeCharacter(candidate.colorSystem) &&
    isAnuimeCharacter(candidate.shapeSystem) &&
    isAnuimeCharacter(candidate.structureSystem) &&
    isAnuimeCharacter(candidate.motionSystem) &&
    isAnuimeDensity(candidate.density) &&
    isAnuimeMotionLevel(candidate.motionLevel) &&
    isAnuimeMode(candidate.mode)
  );
}

function isAnuimeDensity(value: unknown): value is AnuimeDensity {
  return typeof value === "string" && anuimeDensities.some((item) => item === value);
}

function isAnuimeMotionLevel(value: unknown): value is AnuimeMotionLevel {
  return typeof value === "string" && anuimeMotionLevels.some((item) => item === value);
}

function isAnuimeMode(value: unknown): value is AnuimeMode {
  return typeof value === "string" && anuimeModes.some((item) => item === value);
}
