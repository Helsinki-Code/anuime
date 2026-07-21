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

export type LegacyAnuimeRecipeV1 = {
  version: 1;
  color: AnuimeCharacter;
  shape: AnuimeCharacter;
  structure: AnuimeCharacter;
  motion: AnuimeCharacter;
  density: AnuimeDensity;
  motionLevel?: AnuimeMotionLevel;
};

export type RecipeValidationIssue = {
  code: string;
  severity: "error" | "warning";
  message: string;
};

const colorStyles = {
  kira: {
    primary:
      "bg-cyan-300 text-zinc-950 shadow-[0_8px_24px_-10px_rgba(34,211,238,0.8)] hover:bg-cyan-200",
    secondary: "border-cyan-400/35 bg-cyan-400/8 text-cyan-100 hover:bg-cyan-400/15",
    field:
      "border-cyan-400/35 bg-zinc-950 text-zinc-50 placeholder:text-zinc-500 focus-visible:ring-cyan-300",
    accent: "text-cyan-300",
    checkbox: "accent-cyan-300",
  },
  mochi: {
    primary:
      "bg-pink-700 text-white shadow-[0_8px_24px_-12px_rgba(190,24,93,0.7)] hover:bg-pink-600",
    secondary:
      "border-pink-300 bg-white/60 text-pink-900 hover:bg-pink-100 dark:bg-pink-950 dark:text-pink-100",
    field:
      "border-pink-300 bg-white/70 text-pink-950 placeholder:text-pink-400 focus-visible:ring-pink-400 dark:bg-pink-950 dark:text-pink-50",
    accent: "text-pink-700 dark:text-pink-300",
    checkbox: "accent-pink-500",
  },
  atlas: {
    primary: "bg-blue-400 text-slate-950 hover:bg-blue-300",
    secondary: "border-blue-400/45 bg-blue-400/10 text-blue-100 hover:bg-blue-400/20",
    field:
      "border-2 border-blue-400/35 bg-slate-950 text-slate-50 placeholder:text-slate-500 focus-visible:ring-blue-400",
    accent: "text-blue-400",
    checkbox: "accent-blue-400",
  },
} as const;

const shapeStyles = {
  kira: {
    control: "rounded-md",
    surface:
      "rounded-md [clip-path:polygon(0_0,calc(100%-14px)_0,100%_14px,100%_100%,14px_100%,0_calc(100%-14px))]",
  },
  mochi: { control: "rounded-full", surface: "rounded-3xl" },
  atlas: { control: "rounded-sm", surface: "rounded-sm" },
} as const;

const structureStyles = {
  kira: "border-cyan-400/35 bg-zinc-950 text-zinc-50 shadow-[0_16px_50px_-24px_rgba(34,211,238,0.65)]",
  mochi:
    "border-pink-300/55 bg-pink-50 text-pink-950 shadow-[0_18px_45px_-24px_rgba(244,114,182,0.55)] dark:bg-pink-950 dark:text-pink-50",
  atlas:
    "border-2 border-blue-400/35 bg-slate-950 text-slate-50 shadow-[10px_10px_0_-4px_rgba(96,165,250,0.18)]",
} as const;

const motionStyles = {
  kira: "transition duration-150 ease-out motion-safe:hover:-translate-y-0.5",
  mochi:
    "transition duration-300 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.01]",
  atlas: "transition duration-200 ease-linear motion-safe:hover:translate-x-0.5",
} as const;

const densityStyles = {
  compact: { control: "min-h-9 px-3 py-1.5", surface: "p-4", gap: "gap-2" },
  comfortable: { control: "min-h-10 px-4 py-2", surface: "p-6", gap: "gap-3" },
  spacious: { control: "min-h-12 px-5 py-3", surface: "p-8", gap: "gap-5" },
} as const;

export const pureCharacterRecipes: Record<AnuimeCharacter, AnuimeRecipeV2> = {
  kira: createAnuimeRecipe("kira"),
  mochi: createAnuimeRecipe("mochi"),
  atlas: createAnuimeRecipe("atlas"),
};

export const defaultAnuimeRecipe = pureCharacterRecipes.kira;

export const anuimeCharacterStyles = {
  kira: getLegacyCharacterStyles("kira"),
  mochi: getLegacyCharacterStyles("mochi"),
  atlas: getLegacyCharacterStyles("atlas"),
} as const;

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

export function migrateAnuimeRecipe(recipe: LegacyAnuimeRecipeV1 | AnuimeRecipeV2): AnuimeRecipeV2 {
  if (recipe.version === 2) return recipe;
  return {
    version: 2,
    colorSystem: recipe.color,
    shapeSystem: recipe.shape,
    structureSystem: recipe.structure,
    motionSystem: recipe.motion,
    density: recipe.density,
    motionLevel: recipe.motionLevel ?? "calm",
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
  const parts = value.split(".");
  if (parts[0] === "v2") {
    const [
      ,
      colorSystem,
      shapeSystem,
      structureSystem,
      motionSystem,
      density,
      motionLevel,
      mode,
      ...rest
    ] = parts;
    const candidate = {
      version: 2,
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

  const [color, shape, structure, motion, density, maybeMotionLevel, ...rest] = parts;
  const hasSixPartLegacy = maybeMotionLevel !== undefined;
  if (
    rest.length > 0 ||
    !isAnuimeCharacter(color) ||
    !isAnuimeCharacter(shape) ||
    !isAnuimeCharacter(structure) ||
    !isAnuimeCharacter(motion) ||
    !isAnuimeDensity(density) ||
    (hasSixPartLegacy && !isAnuimeMotionLevel(maybeMotionLevel))
  ) {
    return null;
  }
  return migrateAnuimeRecipe({
    version: 1,
    color,
    shape,
    structure,
    motion,
    density,
    motionLevel: hasSixPartLegacy ? maybeMotionLevel : undefined,
  });
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
    field: `${shape.control} ${density.control} ${color.field}`,
    surface: `${shape.surface} border ${structureStyles[resolved.structureSystem]} ${motion}`,
    accent: color.accent,
    checkbox: color.checkbox,
    control: `${shape.control} ${density.control}`,
    shapeControl: shape.control,
    indicator: `${shape.control} ${color.primary} ${motion}`,
    surfacePadding: density.surface,
    gap: density.gap,
  };
}

export function isAnuimeCharacter(value: unknown): value is AnuimeCharacter {
  return typeof value === "string" && anuimeCharacters.some((item) => item === value);
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

function isAnuimeRecipe(value: unknown): value is AnuimeRecipeV2 {
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

function getLegacyCharacterStyles(character: AnuimeCharacter) {
  const resolved = resolveAnuimeRecipe(createAnuimeRecipe(character));
  return {
    surface: resolved.surface,
    primary: resolved.primary,
    secondary: resolved.secondary,
    field: resolved.field,
    accent: resolved.accent,
  };
}
