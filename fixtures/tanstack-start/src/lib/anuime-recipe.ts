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
  accordion: { specification: "specified", carrier: "disclosure" },
  alert: { specification: "derived", carrier: "severity" },
  "alert-dialog": { specification: "specified", carrier: "overlay" },
  "aspect-ratio": { specification: "specified", carrier: "frame" },
  avatar: { specification: "specified", carrier: "status-ring" },
  badge: { specification: "specified", carrier: "status-ring" },
  breadcrumb: { specification: "specified", carrier: "path-marker" },
  button: { specification: "specified", carrier: "focus-control" },
  "button-group": { specification: "specified", carrier: "segmented-strap" },
  calendar: { specification: "specified", carrier: "grid-node" },
  card: { specification: "specified", carrier: "frame" },
  checkbox: { specification: "specified", carrier: "selection-mark" },
  collapsible: { specification: "specified", carrier: "disclosure" },
  combobox: { specification: "specified", carrier: "lens-input" },
  "command-palette": { specification: "specified", carrier: "lens-overlay" },
  "context-menu": { specification: "specified", carrier: "selection-menu" },
  "data-table": { specification: "specified", carrier: "data-grid" },
  "date-control": { specification: "specified", carrier: "grid-node" },
  dialog: { specification: "specified", carrier: "overlay" },
  drawer: { specification: "specified", carrier: "docked-panel" },
  "dropdown-menu": { specification: "specified", carrier: "selection-menu" },
  "empty-state": { specification: "specified", carrier: "static-empty" },
  field: { specification: "specified", carrier: "lens-input" },
  "hover-card": { specification: "specified", carrier: "frame" },
  input: { specification: "specified", carrier: "lens-input" },
  "input-group": { specification: "specified", carrier: "segmented-strap" },
  "input-otp": { specification: "specified", carrier: "grid-node" },
  kbd: { specification: "specified", carrier: "bezel-key" },
  menubar: { specification: "specified", carrier: "segmented-strap" },
  "navigation-menu": { specification: "specified", carrier: "selection-menu" },
  pagination: { specification: "specified", carrier: "grid-node" },
  popover: { specification: "specified", carrier: "pointer-frame" },
  progress: { specification: "specified", carrier: "segmented-strap" },
  "radio-group": { specification: "specified", carrier: "status-ring" },
  "scroll-area": { specification: "specified", carrier: "segmented-strap" },
  select: { specification: "specified", carrier: "lens-input" },
  separator: { specification: "specified", carrier: "rule" },
  sheet: { specification: "specified", carrier: "docked-panel" },
  sidebar: { specification: "specified", carrier: "navigation-rail" },
  skeleton: { specification: "specified", carrier: "static-surface" },
  slider: { specification: "specified", carrier: "track-node" },
  spinner: { specification: "specified", carrier: "status-ring" },
  switch: { specification: "specified", carrier: "segmented-strap" },
  table: { specification: "specified", carrier: "data-grid" },
  tabs: { specification: "specified", carrier: "selection-menu" },
  textarea: { specification: "specified", carrier: "lens-input" },
  toast: { specification: "specified", carrier: "severity" },
  toggle: { specification: "specified", carrier: "segmented-strap" },
  toolbar: { specification: "specified", carrier: "segmented-strap" },
  tooltip: { specification: "specified", carrier: "pointer-frame" },
  typography: { specification: "specified", carrier: "type-system" },
} as const;

export type AnuimeComponentName = keyof typeof anuimeComponentConstructionMap;

export const anuimeExtendedComponentNames = [
  "radio-group",
  "select",
  "combobox",
  "input-otp",
  "input-group",
  "field",
  "date-control",
  "calendar",
  "textarea",
  "popover",
  "hover-card",
  "context-menu",
  "menubar",
  "navigation-menu",
  "sidebar",
  "drawer",
  "sheet",
  "alert-dialog",
  "command-palette",
  "accordion",
  "collapsible",
  "separator",
  "aspect-ratio",
  "scroll-area",
  "button-group",
  "toolbar",
  "spinner",
  "empty-state",
  "breadcrumb",
  "pagination",
  "table",
  "avatar",
  "kbd",
  "typography",
] as const satisfies readonly AnuimeComponentName[];

export type AnuimeExtendedComponentName = (typeof anuimeExtendedComponentNames)[number];

type ExtendedMotifSet = Record<AnuimeCharacter, readonly string[]>;

/**
 * The Extended boards explicitly specify these 34 constructions. This map is
 * intentionally exported so Studio, docs, MCP consumers, and tests all read the
 * same motif authority instead of inferring a look from a generic carrier.
 */
export const anuimeExtendedConstructionMap: Record<AnuimeExtendedComponentName, ExtendedMotifSet> =
  {
    "radio-group": {
      kira: ["collar ring", "circuit node"],
      mochi: ["pearl", "gold rim"],
      atlas: ["core ring", "survey diamond"],
    },
    select: {
      kira: ["buckle field", "hairpin chevron"],
      mochi: ["clasp field", "crescent caret"],
      atlas: ["lens bezel", "panel bracket"],
    },
    combobox: {
      kira: ["cyan match underline", "hairpin chevron"],
      mochi: ["gold match underline", "crescent"],
      atlas: ["cobalt scan line", "survey diamond"],
    },
    "input-otp": {
      kira: ["shard cells", "collar focus"],
      mochi: ["pearl cells", "veil focus"],
      atlas: ["lens cells", "dock brackets"],
    },
    "input-group": {
      kira: ["continuous strap", "circuit seams"],
      mochi: ["clasp", "gold seams"],
      atlas: ["banded bezel", "buckle plates"],
    },
    field: {
      kira: ["circuit rhythm", "destructive shard"],
      mochi: ["ribbon rhythm", "destructive star"],
      atlas: ["banded row", "destructive beam"],
    },
    "date-control": {
      kira: ["kite"],
      mochi: ["gold crescent"],
      atlas: ["hollow survey diamond"],
    },
    calendar: {
      kira: ["hairpin navigation", "circuit nodes", "kite selection"],
      mochi: ["crescent navigation", "pearls", "gold-rim selection"],
      atlas: ["panel brackets", "survey diamonds", "blueprint grid"],
    },
    textarea: {
      kira: ["114-degree fringe hatches"],
      mochi: ["drape curves"],
      atlas: ["76-degree beam hatches"],
    },
    popover: {
      kira: ["kite pointer", "fringe line"],
      mochi: ["paper-fold pointer", "ribbon rule"],
      atlas: ["square pointer", "panel brackets"],
    },
    "hover-card": {
      kira: ["114-degree sweep"],
      mochi: ["veil surface"],
      atlas: ["blueprint grid"],
    },
    "context-menu": {
      kira: ["hairpin active row", "circuit divider"],
      mochi: ["crescent active row", "gold divider"],
      atlas: ["survey diamond", "state bands"],
    },
    menubar: {
      kira: ["strap", "descending circuit stem"],
      mochi: ["clasp", "ribbon"],
      atlas: ["title band", "state band"],
    },
    "navigation-menu": {
      kira: ["hairpin active marker", "114-degree viewport sweep"],
      mochi: ["crescent active marker", "ribbon rule"],
      atlas: ["state band", "horizontal blueprint grid"],
    },
    sidebar: {
      kira: ["vertical circuit run", "filled and hollow nodes"],
      mochi: ["pearl rail", "gold edge"],
      atlas: ["survey stations", "leading state band"],
    },
    drawer: {
      kira: ["strap handle"],
      mochi: ["gold handle", "drape edge"],
      atlas: ["segmented band handle"],
    },
    sheet: {
      kira: ["114-degree fringe beam", "shard fragment"],
      mochi: ["veil", "gold leading edge"],
      atlas: ["76-degree beam", "square dock"],
    },
    "alert-dialog": {
      kira: ["destructive shard"],
      mochi: ["destructive star"],
      atlas: ["destructive brackets", "beam tick"],
    },
    "command-palette": {
      kira: ["circuit caret", "hairpin active row"],
      mochi: ["pearl caret", "gold rule"],
      atlas: ["scan rule", "survey diamond"],
    },
    accordion: {
      kira: ["hairpin chevron", "circuit rule"],
      mochi: ["crescent", "ribbon rule"],
      atlas: ["panel bracket", "state band"],
    },
    collapsible: {
      kira: ["hairpin chevron", "circuit stem"],
      mochi: ["crescent", "Q-curve drape"],
      atlas: ["panel bracket", "state band"],
    },
    separator: {
      kira: ["circuit trace", "optional node"],
      mochi: ["gold ribbon rule", "optional pearl"],
      atlas: ["survey rule", "optional title band"],
    },
    "aspect-ratio": { kira: [], mochi: [], atlas: [] },
    "scroll-area": {
      kira: ["fixed-gauge strap"],
      mochi: ["gold-rim track"],
      atlas: ["segmented strap"],
    },
    "button-group": {
      kira: ["continuous strap", "square joints"],
      mochi: ["gold clasp seams", "square joints"],
      atlas: ["banded buckle", "square joints"],
    },
    toolbar: {
      kira: ["strap", "circuit seams"],
      mochi: ["clasp", "ribbon rule"],
      atlas: ["frame", "state bands"],
    },
    spinner: {
      kira: ["collar arc"],
      mochi: ["four pearls"],
      atlas: ["core ring", "survey diamond"],
    },
    "empty-state": {
      kira: ["static wisp", "shard"],
      mochi: ["waning crescent", "sparkles"],
      atlas: ["dormant grid", "survey station"],
    },
    breadcrumb: {
      kira: ["hairpin separators"],
      mochi: ["crescent separators"],
      atlas: ["hollow survey diamonds"],
    },
    pagination: {
      kira: ["circuit nodes", "hairpin navigation"],
      mochi: ["pearls", "crescent navigation"],
      atlas: ["band segments", "panel brackets"],
    },
    table: {
      kira: ["circuit nodes", "shard sort"],
      mochi: ["gold header rule", "pearl rows", "crescent sort"],
      atlas: ["title-block header", "survey diamonds", "state bands"],
    },
    avatar: {
      kira: ["square buckle", "circuit presence"],
      mochi: ["gold-rim pearl", "rose presence"],
      atlas: ["square lens", "core-ring presence"],
    },
    kbd: {
      kira: ["buckle keycap", "inset top edge"],
      mochi: ["gold clasp keycap"],
      atlas: ["lens keycap", "inset bottom edge"],
    },
    typography: { kira: [], mochi: [], atlas: [] },
  };

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

const extendedSignatureStyles = {
  kira: {
    marker:
      "inline-block size-2.5 shrink-0 rotate-45 border-t-[1.5px] border-r-[1.5px] border-[var(--anuime-accent,var(--accent))]",
    node: "inline-block size-2 shrink-0 rotate-45 rounded-[1px] bg-[var(--anuime-accent,var(--accent))]",
    hollowNode:
      "inline-block size-2 shrink-0 rotate-45 rounded-[1px] border border-[var(--anuime-accent,var(--accent))]",
    handle:
      "mx-auto mb-4 h-1 w-[34px] rounded-[2px] bg-[var(--anuime-border-strong,var(--border))]",
    error:
      "before:mr-2 before:inline-block before:h-2 before:w-1 before:-skew-x-[18deg] before:bg-destructive before:content-['']",
    type: "font-sans",
  },
  mochi: {
    marker:
      "inline-block size-2.5 shrink-0 rounded-full border-r-2 border-[var(--anuime-secondary-accent,var(--accent))]",
    node: "inline-block size-2.5 shrink-0 rounded-full border border-[var(--anuime-secondary-accent,var(--border))] bg-[var(--anuime-accent,var(--accent))]",
    hollowNode:
      "inline-block size-2.5 shrink-0 rounded-full border border-[var(--anuime-secondary-accent,var(--border))] bg-[var(--anuime-surface,var(--card))]",
    handle: "mx-auto mb-4 h-1 w-9 rounded-full bg-[var(--anuime-secondary-accent,var(--border))]",
    error:
      "before:mr-2 before:inline-block before:size-2 before:rotate-45 before:bg-destructive before:[clip-path:polygon(50%_0,62%_38%,100%_50%,62%_62%,50%_100%,38%_62%,0_50%,38%_38%)] before:content-['']",
    type: "font-sans",
  },
  atlas: {
    marker:
      "inline-block size-2.5 shrink-0 border-r-2 border-b-2 border-[var(--anuime-accent,var(--accent))]",
    node: "inline-block size-2 shrink-0 rotate-45 bg-[var(--anuime-accent,var(--accent))]",
    hollowNode:
      "inline-block size-2 shrink-0 rotate-45 border border-[var(--anuime-accent,var(--accent))]",
    handle:
      "mx-auto mb-4 flex h-1 w-[37px] gap-0.5 bg-[linear-gradient(90deg,var(--anuime-accent,var(--accent))_0_30%,transparent_30%_35%,var(--anuime-accent,var(--accent))_35%_65%,transparent_65%_70%,var(--anuime-accent,var(--accent))_70%)]",
    error:
      "before:mr-2 before:inline-block before:h-[11px] before:w-[2.5px] before:bg-destructive before:content-['']",
    type: "font-sans tracking-[0.02em]",
  },
} as const;

const extendedComponentGeometry: Partial<
  Record<
    AnuimeExtendedComponentName,
    Partial<Record<"surface" | "field" | "control" | "indicator" | "accent", string>>
  >
> = {
  "radio-group": {
    indicator:
      "appearance-none rounded-full border-[1.5px] border-[var(--anuime-border-strong,var(--border))] bg-[var(--anuime-surface,var(--background))] checked:border-[var(--anuime-accent,var(--accent))] checked:shadow-[inset_0_0_0_3px_var(--anuime-surface,var(--background)),inset_0_0_0_8px_var(--anuime-accent,var(--accent))]",
  },
  select: { field: "h-9 appearance-none pr-10" },
  combobox: {
    field:
      "h-9 border-b-2 border-b-[var(--anuime-accent,var(--accent))] bg-[linear-gradient(90deg,color-mix(in_oklab,var(--anuime-accent,var(--accent))_8%,transparent),transparent_45%)]",
  },
  "input-otp": {
    field:
      "h-11 bg-[repeating-linear-gradient(90deg,var(--anuime-surface,var(--background))_0_32px,var(--anuime-border-strong,var(--border))_32px_33px,transparent_33px_38px)] px-3",
  },
  "input-group": { field: "h-9 overflow-hidden [&>*+*]:border-l [&>*+*]:border-border" },
  "date-control": { field: "h-9 pr-10 font-mono" },
  calendar: {
    surface:
      "bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:16px_16px]",
  },
  textarea: {
    field:
      "bg-[linear-gradient(114deg,transparent_0_92%,color-mix(in_oklab,var(--anuime-accent,var(--accent))_28%,transparent)_92%_93%,transparent_93%)]",
  },
  popover: { surface: "rounded-[var(--anuime-control-radius,6px)]" },
  menubar: { surface: "min-h-9 rounded-[var(--anuime-control-radius,6px)]" },
  sidebar: { surface: "border-l-2 border-l-[var(--anuime-accent,var(--accent))]" },
  drawer: { surface: "rounded-t-[var(--anuime-surface-radius,8px)] rounded-b-none" },
  sheet: { surface: "rounded-none" },
  "alert-dialog": { surface: "border-l-2 border-l-destructive" },
  "command-palette": { field: "rounded-none border-x-0 border-t-0" },
  separator: { accent: "border-0" },
  "scroll-area": {
    surface:
      "[scrollbar-color:var(--anuime-accent,var(--accent))_transparent] [scrollbar-width:thin]",
  },
  "button-group": { surface: "[&>*+*]:border-l [&>*+*]:border-border" },
  toolbar: { surface: "rounded-[var(--anuime-control-radius,6px)]" },
  spinner: { indicator: "border-[1.5px] border-current border-r-transparent" },
  table: { surface: "rounded-[var(--anuime-surface-radius,8px)]" },
  kbd: { control: "h-[22px] min-h-[22px]" },
  typography: { accent: "decoration-[var(--anuime-accent,var(--accent))]" },
};

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

export function isAnuimeExtendedComponent(
  component: AnuimeComponentName,
): component is AnuimeExtendedComponentName {
  return anuimeExtendedComponentNames.some((item) => item === component);
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
  const extendedComponent =
    component && isAnuimeExtendedComponent(component) ? extendedComponentGeometry[component] : {};
  const signature = extendedSignatureStyles[resolved.structureSystem];
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
    field: `border ${color.field} ${control} ${extendedComponent?.field ?? ""}`,
    surface: `${shape.surface} border ${structureStyles[resolved.structureSystem]} ${motion} ${frame} ${extendedComponent?.surface ?? ""}`,
    accent: `${color.accent} ${rule} ${extendedComponent?.accent ?? ""}`,
    checkbox: color.checkbox,
    control: `${shape.control} ${density.control} ${control} ${extendedComponent?.control ?? ""}`,
    shapeControl:
      component === "avatar"
        ? resolved.structureSystem === "mochi"
          ? "rounded-full"
          : resolved.structureSystem === "kira"
            ? "rounded-[5px]"
            : "rounded-[7px]"
        : shape.control,
    indicator: `${indicator} bg-[var(--anuime-accent,var(--accent))] ${motion} ${extendedComponent?.indicator ?? ""}`,
    marker: signature.marker,
    node: signature.node,
    hollowNode: signature.hollowNode,
    handle: signature.handle,
    errorMarker: signature.error,
    typography: signature.type,
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
