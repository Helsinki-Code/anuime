import { z } from "zod/v4";

import {
  anuimeCharacters,
  anuimeDensities,
  anuimeModes,
  anuimeMotionLevels,
  createAnuimeRecipe,
} from "@/lib/anuime-recipe";
import type { AnuimeCharacter, AnuimeRecipeV2 } from "@/lib/anuime-recipe";

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };
export type PropDefinition = {
  label: string;
  required?: boolean;
} & (
  | { type: "string"; maxLength?: number; format?: "url" }
  | { type: "number"; min?: number; max?: number }
  | { type: "boolean" }
  | { type: "enum"; values: readonly string[] }
  | { type: "data" }
);
export interface ComponentDefinition {
  registryName: string;
  title: string;
  maturity: "stable" | "beta" | "experimental";
  props: Record<string, PropDefinition>;
  defaultProps: Record<string, JsonValue>;
  states: readonly string[];
  slots: Record<string, { accepts: readonly string[]; maxChildren: number }>;
  dependencies: readonly string[];
  examples: readonly string[];
  /** Explicit compatibility restrictions, independent of recipe syntax. */
  allowedShapeSystems?: readonly AnuimeCharacter[];
  allowedStructureSystems?: readonly AnuimeCharacter[];
}
export type SceneCatalog = Readonly<Record<string, ComponentDefinition>>;
export interface ResponsiveLayout {
  kind: "stack" | "grid";
  gap: "none" | "small" | "medium" | "large";
  columns: { mobile: number; tablet: number; desktop: number };
}
export interface SceneComponentNode {
  id: string;
  kind: "component";
  component: string;
  props: Record<string, JsonValue>;
  state: string;
  slots: Record<string, SceneNode[]>;
}
export interface SceneLayoutNode {
  id: string;
  kind: "section" | "stack" | "grid";
  label: string;
  layout: ResponsiveLayout;
  children: SceneNode[];
}
export type SceneNode = SceneComponentNode | SceneLayoutNode;
export interface SceneDocumentV1 {
  version: 1;
  id: string;
  name: string;
  world: AnuimeCharacter;
  recipe: AnuimeRecipeV2;
  lighting: "light" | "dark";
  sections: SceneLayoutNode[];
  attribution: { name: string; url?: string; license?: string }[];
}
export interface SceneValidationIssue {
  code: string;
  path: string;
  message: string;
}
export interface SceneValidationResult {
  valid: boolean;
  errors: SceneValidationIssue[];
  warnings: SceneValidationIssue[];
  document: SceneDocumentV1 | null;
}

export const sceneLimits = {
  bytes: 1_000_000,
  nodes: 200,
  depth: 8,
  stringLength: 20_000,
} as const;
const idSchema = z.string().regex(/^[a-zA-Z0-9_-]{1,80}$/);
const safeUrl = (value: string) =>
  /^https?:\/\//i.test(value) || /^\/(?![\\/])[^\\]*$/.test(value) || /^#[\w-]+$/.test(value);
const attributionUrl = z
  .string()
  .max(2000)
  .refine(safeUrl, "Use an HTTP(S), site-relative, or fragment URL.");
const recipeSchema = z
  .object({
    version: z.literal(2),
    colorSystem: z.enum(anuimeCharacters),
    shapeSystem: z.enum(anuimeCharacters),
    structureSystem: z.enum(anuimeCharacters),
    motionSystem: z.enum(anuimeCharacters),
    density: z.enum(anuimeDensities),
    motionLevel: z.enum(anuimeMotionLevels),
    mode: z.enum(anuimeModes),
  })
  .strict();
const layoutSchema = z
  .object({
    kind: z.enum(["stack", "grid"]),
    gap: z.enum(["none", "small", "medium", "large"]),
    columns: z
      .object({
        mobile: z.number().int().min(1).max(4),
        tablet: z.number().int().min(1).max(8),
        desktop: z.number().int().min(1).max(12),
      })
      .strict(),
  })
  .strict();
const jsonSchema: z.ZodType<JsonValue> = z.lazy(() =>
  z.union([
    z.string().max(sceneLimits.stringLength),
    z.number().finite(),
    z.boolean(),
    z.null(),
    z.array(jsonSchema).max(500),
    z.record(z.string(), jsonSchema),
  ]),
);
const nodeSchema: z.ZodType<SceneNode> = z.lazy(() =>
  z.union([
    z
      .object({
        id: idSchema,
        kind: z.literal("component"),
        component: z.string().max(100),
        props: z.record(z.string(), jsonSchema),
        state: z.string().max(60),
        slots: z.record(z.string(), z.array(nodeSchema).max(sceneLimits.nodes)),
      })
      .strict(),
    z
      .object({
        id: idSchema,
        kind: z.enum(["section", "stack", "grid"]),
        label: z.string().max(200),
        layout: layoutSchema,
        children: z.array(nodeSchema).max(sceneLimits.nodes),
      })
      .strict(),
  ]),
);
const documentSchema = z
  .object({
    version: z.literal(1),
    id: idSchema,
    name: z.string().trim().min(1).max(120),
    world: z.enum(anuimeCharacters),
    recipe: recipeSchema,
    lighting: z.enum(["light", "dark"]),
    sections: z.array(nodeSchema).max(50),
    attribution: z
      .array(
        z
          .object({
            name: z.string().min(1).max(200),
            url: attributionUrl.optional(),
            license: z.string().max(200).optional(),
          })
          .strict(),
      )
      .max(50),
  })
  .strict();

/** Reject cycles, functions, accessors and prototype-bearing data before recursive parsing. */
function inspectPortableData(value: unknown, depth = 0, ancestors = new Set<object>()): boolean {
  if (depth > 40) return false;
  if (value === null || typeof value === "boolean") return true;
  if (typeof value === "string") return value.length <= sceneLimits.stringLength;
  if (typeof value === "number") return Number.isFinite(value);
  if (!value || typeof value !== "object" || ancestors.has(value)) return false;
  if (
    !Array.isArray(value) &&
    Object.getPrototypeOf(value) !== Object.prototype &&
    Object.getPrototypeOf(value) !== null
  )
    return false;
  ancestors.add(value);
  const descriptors = Object.getOwnPropertyDescriptors(value);
  const valid = Object.entries(descriptors).every(([key, descriptor]) => {
    if (
      ["__proto__", "prototype", "constructor"].includes(key) ||
      !Object.hasOwn(descriptor, "value")
    )
      return false;
    return inspectPortableData(descriptor.value, depth + 1, ancestors);
  });
  ancestors.delete(value);
  return valid;
}

function propMatches(value: JsonValue, definition: PropDefinition): boolean {
  switch (definition.type) {
    case "string":
      return (
        typeof value === "string" &&
        value.length <= (definition.maxLength ?? sceneLimits.stringLength) &&
        (definition.format !== "url" || safeUrl(value))
      );
    case "number":
      return (
        typeof value === "number" &&
        value >= (definition.min ?? -Infinity) &&
        value <= (definition.max ?? Infinity)
      );
    case "boolean":
      return typeof value === "boolean";
    case "enum":
      return typeof value === "string" && definition.values.includes(value);
    case "data":
      return true;
    default:
      return false;
  }
}

export function validateScene(value: unknown, catalog: SceneCatalog): SceneValidationResult {
  const errors: SceneValidationIssue[] = [];
  const warnings: SceneValidationIssue[] = [];
  const fail = (code: string, path: string, message: string) =>
    errors.push({ code, path, message });
  if (!inspectPortableData(value)) {
    fail(
      "unsafe-data",
      "$",
      "Use plain JSON data only, without functions, cycles, accessors, or prototype keys.",
    );
    return { valid: false, errors, warnings, document: null };
  }
  if (new TextEncoder().encode(JSON.stringify(value)).byteLength > sceneLimits.bytes) {
    fail("size-limit", "$", "The scene exceeds the 1 MB import limit.");
    return { valid: false, errors, warnings, document: null };
  }
  const parsed = documentSchema.safeParse(value);
  if (!parsed.success) {
    for (const issue of parsed.error.issues.slice(0, 50))
      fail("invalid-document", issue.path.join("."), issue.message);
    return { valid: false, errors, warnings, document: null };
  }
  const document = parsed.data;
  const ids = new Set<string>();
  let count = 0;
  const walk = (node: SceneNode, path: string, depth: number) => {
    count++;
    if (depth > sceneLimits.depth) {
      fail("depth-limit", path, "Use at most eight nested layout or slot levels.");
      return;
    }
    if (ids.has(node.id)) fail("duplicate-id", `${path}.id`, `Give ${node.id} a unique node ID.`);
    ids.add(node.id);
    if (node.kind !== "component") {
      if (node.kind !== "section" && node.kind !== node.layout.kind)
        fail("layout-mismatch", path, "The layout kind must match the node kind.");
      if (
        node.layout.kind === "stack" &&
        Object.values(node.layout.columns).some((columns) => columns !== 1)
      )
        fail("stack-columns", path, "Stack layouts must use one column at every breakpoint.");
      node.children.forEach((child, index) => walk(child, `${path}.children.${index}`, depth + 1));
      return;
    }
    const definition = Object.hasOwn(catalog, node.component) ? catalog[node.component] : undefined;
    if (!definition) {
      fail(
        "unknown-component",
        path,
        `Install or replace the unknown component ${node.component}.`,
      );
      return;
    }
    if (!definition.states.includes(node.state))
      fail(
        "unsupported-state",
        `${path}.state`,
        `Choose a supported state for ${definition.title}.`,
      );
    if (definition.maturity !== "stable")
      warnings.push({
        code: "component-maturity",
        path,
        message: `${definition.title} is ${definition.maturity}. Review before production use.`,
      });
    if (
      definition.allowedShapeSystems &&
      !definition.allowedShapeSystems.includes(document.recipe.shapeSystem)
    )
      fail("incompatible-shape", path, `${definition.title} does not support this shape system.`);
    if (
      definition.allowedStructureSystems &&
      !definition.allowedStructureSystems.includes(document.recipe.structureSystem)
    )
      fail(
        "incompatible-structure",
        path,
        `${definition.title} does not support this structure system.`,
      );
    for (const [key, prop] of Object.entries(node.props)) {
      const descriptor = Object.hasOwn(definition.props, key) ? definition.props[key] : undefined;
      if (!descriptor)
        fail("unsupported-prop", `${path}.props.${key}`, `Remove unsupported property ${key}.`);
      else if (!propMatches(prop, descriptor))
        fail(
          "invalid-prop",
          `${path}.props.${key}`,
          `Provide a valid ${descriptor.type} value for ${descriptor.label}.`,
        );
    }
    for (const [key, descriptor] of Object.entries(definition.props)) {
      if (descriptor.required && !Object.hasOwn(node.props, key))
        fail("required-prop", `${path}.props.${key}`, `Add ${descriptor.label}.`);
    }
    for (const [slotName, children] of Object.entries(node.slots)) {
      const slot = Object.hasOwn(definition.slots, slotName)
        ? definition.slots[slotName]
        : undefined;
      if (!slot)
        fail(
          "unsupported-slot",
          `${path}.slots.${slotName}`,
          `Remove unsupported slot ${slotName}.`,
        );
      else {
        if (children.length > slot.maxChildren)
          fail("slot-capacity", path, `${slotName} accepts at most ${slot.maxChildren} children.`);
        for (const child of children)
          if (child.kind !== "component" || !slot.accepts.includes(child.component))
            fail("slot-component", path, `${slotName} does not accept this child.`);
      }
      children.forEach((child, index) =>
        walk(child, `${path}.slots.${slotName}.${index}`, depth + 1),
      );
    }
  };
  document.sections.forEach((section, index) => {
    if (section.kind !== "section")
      fail("section-required", `sections.${index}`, "Top-level nodes must be sections.");
    walk(section, `sections.${index}`, 1);
  });
  if (count > sceneLimits.nodes)
    fail("node-limit", "sections", "A scene can contain at most 200 nodes.");
  if (document.sections.length === 0)
    warnings.push({
      code: "empty-scene",
      path: "sections",
      message: "Add a section before exporting an interface.",
    });
  // The top-level kind is checked above before the type-safe narrowing below.
  const sections = document.sections.filter(
    (section): section is SceneLayoutNode => section.kind === "section",
  );
  return {
    valid: errors.length === 0,
    errors,
    warnings,
    document: errors.length ? null : { ...document, sections },
  };
}

export function importScene(json: string, catalog: SceneCatalog): SceneValidationResult {
  if (new TextEncoder().encode(json).byteLength > sceneLimits.bytes)
    return {
      valid: false,
      document: null,
      warnings: [],
      errors: [
        { code: "size-limit", path: "$", message: "The scene exceeds the 1 MB import limit." },
      ],
    };
  try {
    return validateScene(JSON.parse(json), catalog);
  } catch {
    return {
      valid: false,
      document: null,
      warnings: [],
      errors: [{ code: "invalid-json", path: "$", message: "Choose a valid scene JSON file." }],
    };
  }
}

export function createScene(
  world: AnuimeCharacter,
  id: string,
  name = "Untitled scene",
): SceneDocumentV1 {
  return {
    version: 1,
    id,
    name,
    world,
    recipe: createAnuimeRecipe(world),
    lighting: "dark",
    sections: [],
    attribution: [],
  };
}
export function createSection(id: string, children: SceneNode[] = []): SceneLayoutNode {
  return {
    id,
    kind: "section",
    label: "Section",
    layout: { kind: "stack", gap: "medium", columns: { mobile: 1, tablet: 1, desktop: 1 } },
    children,
  };
}

/** Migration preserves every recipe dimension and preview state from a bounded legacy link. */
export function sceneFromLegacy(
  input: { recipe: AnuimeRecipeV2; component: string; state: string },
  catalog: SceneCatalog,
  id: string,
): SceneValidationResult {
  const definition = Object.hasOwn(catalog, input.component) ? catalog[input.component] : undefined;
  const scene = createScene(input.recipe.colorSystem, id, definition?.title ?? "Imported scene");
  scene.recipe = structuredClone(input.recipe);
  scene.lighting = input.recipe.mode === "light" ? "light" : "dark";
  scene.sections = [
    createSection("section-1", [
      {
        id: "component-1",
        kind: "component",
        component: input.component,
        state: input.state,
        props: structuredClone(definition?.defaultProps ?? {}),
        slots: {},
      },
    ]),
  ];
  return validateScene(scene, catalog);
}
