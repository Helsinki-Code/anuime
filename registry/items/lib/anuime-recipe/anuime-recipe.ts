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

const colorStyles = {
  kira: {
    primary: "bg-primary text-primary-foreground hover:bg-primary/92",
    secondary:
      "border-[var(--anuime-border-strong,var(--border))] bg-secondary text-secondary-foreground hover:bg-[var(--anuime-subtle-hover,var(--secondary))]",
    field:
      "border-[var(--anuime-border-strong,var(--input))] bg-[var(--anuime-surface,var(--background))] text-foreground placeholder:text-muted-foreground focus-visible:ring-[var(--anuime-accent,var(--ring))]",
    accent: "text-[var(--anuime-accent,var(--accent))]",
    checkbox: "accent-[var(--anuime-accent,var(--accent))]",
  },
  mochi: {
    primary: "bg-primary text-primary-foreground hover:bg-primary/92",
    secondary:
      "border-border bg-secondary text-secondary-foreground hover:bg-[var(--anuime-subtle-hover,var(--secondary))]",
    field:
      "border-[var(--anuime-border-strong,var(--input))] bg-[var(--anuime-surface,var(--background))] text-foreground placeholder:text-muted-foreground focus-visible:ring-[var(--anuime-accent,var(--ring))]",
    accent: "text-[var(--anuime-accent,var(--accent))]",
    checkbox: "accent-[var(--anuime-accent,var(--accent))]",
  },
  atlas: {
    primary: "bg-primary text-primary-foreground hover:bg-primary/92",
    secondary:
      "border-[var(--anuime-border-strong,var(--border))] bg-secondary text-secondary-foreground hover:bg-[var(--anuime-subtle-hover,var(--secondary))]",
    field:
      "border-[var(--anuime-border-strong,var(--input))] bg-[var(--anuime-surface,var(--background))] text-foreground placeholder:text-muted-foreground focus-visible:ring-[var(--anuime-accent,var(--ring))]",
    accent: "text-[var(--anuime-accent,var(--accent))]",
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

export function resolveAnuimeRecipe(recipe?: AnuimeRecipeV2, character: AnuimeCharacter = "kira") {
  const resolved = recipe ?? createAnuimeRecipe(character);
  const color = colorStyles[resolved.colorSystem];
  const shape = shapeStyles[resolved.shapeSystem];
  const density = densityStyles[resolved.density];
  const motion = resolved.motionLevel === "still" ? "" : motionStyles[resolved.motionSystem];
  return {
    recipe: resolved,
    primary: `${shape.control} ${density.control} ${color.primary} ${motion}`,
    secondary: `${shape.control} ${density.control} border ${color.secondary} ${motion}`,
    field: `${shape.control} ${density.control} border ${color.field}`,
    surface: `${shape.surface} border ${structureStyles[resolved.structureSystem]} ${motion}`,
    accent: color.accent,
    checkbox: color.checkbox,
    control: `${shape.control} ${density.control}`,
    shapeControl: shape.control,
    indicator: `${shape.control} bg-[var(--anuime-accent,var(--accent))] ${motion}`,
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
