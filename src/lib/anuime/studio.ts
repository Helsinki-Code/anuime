import { getCanonicalRegistryItemUrl } from "../site-config";
import {
  decodeAnuimeRecipe,
  defaultAnuimeRecipe,
  encodeAnuimeRecipe,
  type AnuimeRecipeV2,
} from "./recipe";

export const registryComponentIds = [
  "button",
  "input",
  "checkbox",
  "card",
  "tabs",
  "dialog",
  "select",
  "toast",
  "navigation-menu",
  "command-palette",
  "data-table",
  "auth-panel",
  "textarea",
  "switch",
  "radio-group",
  "tooltip",
  "popover",
  "combobox",
  "accordion",
  "progress",
  "skeleton",
  "pagination",
  "date-control",
  "alert",
  "alert-dialog",
  "avatar",
  "badge",
  "breadcrumb",
  "button-group",
  "calendar",
  "collapsible",
  "context-menu",
  "dropdown-menu",
  "drawer",
  "empty-state",
  "field",
  "hover-card",
  "input-group",
  "input-otp",
  "kbd",
  "menubar",
  "scroll-area",
  "separator",
  "sheet",
  "sidebar",
  "slider",
  "spinner",
  "toggle",
  "toolbar",
  "typography",
  "aspect-ratio",
  "table",
] as const;

export type RegistryComponentId = (typeof registryComponentIds)[number];
export type StudioViewport = "mobile" | "tablet" | "desktop";
export type StudioZoom = 0.75 | 1 | 1.25;

export type StudioDocument = {
  recipe: AnuimeRecipeV2;
  componentId: RegistryComponentId;
  previewState: string;
  viewport: StudioViewport;
  zoom: StudioZoom;
};

export type StudioSearch = {
  recipe?: string;
  component?: RegistryComponentId;
  state?: string;
  viewport?: StudioViewport;
  zoom?: StudioZoom;
  warning?: "invalid-recipe";
};

export const componentCatalog: Record<
  RegistryComponentId,
  { title: string; description: string; states: readonly string[]; registryName: string }
> = {
  button: {
    title: "Button",
    description: "Primary and secondary actions",
    states: ["default", "secondary", "disabled", "loading"],
    registryName: "anuime-button",
  },
  input: {
    title: "Input",
    description: "Labeled text entry and validation",
    states: ["default", "focus", "disabled", "error"],
    registryName: "anuime-input",
  },
  checkbox: {
    title: "Checkbox",
    description: "Boolean choices with supporting text",
    states: ["default", "selected", "disabled"],
    registryName: "anuime-checkbox",
  },
  card: {
    title: "Card",
    description: "Expressive content surface",
    states: ["default", "selected"],
    registryName: "anuime-card",
  },
  tabs: {
    title: "Tabs",
    description: "Keyboard-navigable sections",
    states: ["default", "selected"],
    registryName: "anuime-tabs",
  },
  dialog: {
    title: "Dialog",
    description: "Focused confirmation workflow",
    states: ["default"],
    registryName: "anuime-dialog",
  },
  select: {
    title: "Select",
    description: "Accessible native option picker",
    states: ["default", "disabled"],
    registryName: "anuime-select",
  },
  toast: {
    title: "Toast",
    description: "Polite semantic feedback",
    states: ["info", "success", "warning"],
    registryName: "anuime-toast",
  },
  "navigation-menu": {
    title: "Navigation Menu",
    description: "Responsive primary navigation",
    states: ["default"],
    registryName: "anuime-navigation-menu",
  },
  "command-palette": {
    title: "Command Palette",
    description: "Searchable action launcher",
    states: ["default", "empty"],
    registryName: "anuime-command-palette",
  },
  "data-table": {
    title: "Data Table",
    description: "Responsive structured data",
    states: ["default", "empty"],
    registryName: "anuime-data-table",
  },
  "auth-panel": {
    title: "Authentication Panel",
    description: "Presentational sign-in block",
    states: ["default", "loading"],
    registryName: "anuime-auth-panel",
  },
  textarea: {
    title: "Textarea",
    description: "Multiline entry with validation",
    states: ["default", "focus", "disabled", "error"],
    registryName: "anuime-textarea",
  },
  switch: {
    title: "Switch",
    description: "Immediate boolean setting",
    states: ["default", "selected", "disabled"],
    registryName: "anuime-switch",
  },
  "radio-group": {
    title: "Radio Group",
    description: "Exclusive recipe-aware choices",
    states: ["default", "selected", "disabled"],
    registryName: "anuime-radio-group",
  },
  tooltip: {
    title: "Tooltip",
    description: "Focus and hover guidance",
    states: ["default", "visible"],
    registryName: "anuime-tooltip",
  },
  popover: {
    title: "Popover",
    description: "Contextual disclosure surface",
    states: ["default", "open"],
    registryName: "anuime-popover",
  },
  combobox: {
    title: "Combobox",
    description: "Native autocomplete field",
    states: ["default", "disabled", "empty"],
    registryName: "anuime-combobox",
  },
  accordion: {
    title: "Accordion",
    description: "Inspectable disclosure group",
    states: ["default", "expanded"],
    registryName: "anuime-accordion",
  },
  progress: {
    title: "Progress",
    description: "Determinate and indeterminate status",
    states: ["default", "loading", "success"],
    registryName: "anuime-progress",
  },
  skeleton: {
    title: "Skeleton",
    description: "Reduced-motion-safe loading surface",
    states: ["default", "compact"],
    registryName: "anuime-skeleton",
  },
  pagination: {
    title: "Pagination",
    description: "Controlled page navigation",
    states: ["default", "first", "last"],
    registryName: "anuime-pagination",
  },
  "date-control": {
    title: "Date Control",
    description: "Native locale-aware date entry",
    states: ["default", "disabled"],
    registryName: "anuime-date-control",
  },
  alert: {
    title: "Alert",
    description: "Semantic status and alert messaging",
    states: ["info", "success", "warning", "error"],
    registryName: "anuime-alert",
  },
  "alert-dialog": {
    title: "Alert Dialog",
    description: "Explicit confirmation workflow",
    states: ["default", "destructive"],
    registryName: "anuime-alert-dialog",
  },
  avatar: {
    title: "Avatar",
    description: "Identity, presence, and grouped people",
    states: ["default", "group", "online", "busy"],
    registryName: "anuime-avatar",
  },
  badge: {
    title: "Badge",
    description: "Compact labels and status indicators",
    states: ["neutral", "success", "warning", "danger"],
    registryName: "anuime-badge",
  },
  breadcrumb: {
    title: "Breadcrumb",
    description: "Semantic hierarchical navigation",
    states: ["default"],
    registryName: "anuime-breadcrumb",
  },
  "button-group": {
    title: "Button Group",
    description: "Grouped actions and split controls",
    states: ["group", "split"],
    registryName: "anuime-button-group",
  },
  calendar: {
    title: "Calendar",
    description: "Native date and range selection",
    states: ["single", "range", "disabled"],
    registryName: "anuime-calendar",
  },
  collapsible: {
    title: "Collapsible",
    description: "Compact native disclosure",
    states: ["closed", "open"],
    registryName: "anuime-collapsible",
  },
  "context-menu": {
    title: "Context Menu",
    description: "Pointer and keyboard contextual actions",
    states: ["default"],
    registryName: "anuime-context-menu",
  },
  "dropdown-menu": {
    title: "Dropdown Menu",
    description: "Compact action disclosure",
    states: ["default"],
    registryName: "anuime-dropdown-menu",
  },
  drawer: {
    title: "Drawer",
    description: "Modal drawer and bottom sheet",
    states: ["bottom", "left", "right"],
    registryName: "anuime-drawer",
  },
  "empty-state": {
    title: "Empty State",
    description: "Guided recovery and first actions",
    states: ["default", "action"],
    registryName: "anuime-empty-state",
  },
  field: {
    title: "Field",
    description: "Labels, descriptions, errors, and groups",
    states: ["default", "error", "fieldset"],
    registryName: "anuime-field",
  },
  "hover-card": {
    title: "Hover Card",
    description: "Focus and hover context",
    states: ["default"],
    registryName: "anuime-hover-card",
  },
  "input-group": {
    title: "Input Group",
    description: "Inputs with leading and trailing controls",
    states: ["default", "disabled"],
    registryName: "anuime-input-group",
  },
  "input-otp": {
    title: "Input OTP",
    description: "One-time verification code entry",
    states: ["default", "disabled"],
    registryName: "anuime-input-otp",
  },
  kbd: {
    title: "Keyboard Hint",
    description: "Keyboard keys and shortcut groups",
    states: ["key", "shortcut"],
    registryName: "anuime-kbd",
  },
  menubar: {
    title: "Menubar",
    description: "Application-level menu navigation",
    states: ["default"],
    registryName: "anuime-menubar",
  },
  "scroll-area": {
    title: "Scroll Area",
    description: "Bounded keyboard-focusable scrolling",
    states: ["default", "compact"],
    registryName: "anuime-scroll-area",
  },
  separator: {
    title: "Separator",
    description: "Semantic horizontal and vertical division",
    states: ["horizontal", "vertical"],
    registryName: "anuime-separator",
  },
  sheet: {
    title: "Sheet",
    description: "Side-mounted modal inspector",
    states: ["right", "left"],
    registryName: "anuime-sheet",
  },
  sidebar: {
    title: "Sidebar",
    description: "Responsive application navigation",
    states: ["expanded", "collapsed"],
    registryName: "anuime-sidebar",
  },
  slider: {
    title: "Slider",
    description: "Single-value and range selection",
    states: ["single", "range", "disabled"],
    registryName: "anuime-slider",
  },
  spinner: {
    title: "Spinner",
    description: "Reduced-motion-safe loading status",
    states: ["small", "medium", "large"],
    registryName: "anuime-spinner",
  },
  toggle: {
    title: "Toggle",
    description: "Pressed buttons and exclusive groups",
    states: ["off", "on", "group"],
    registryName: "anuime-toggle",
  },
  toolbar: {
    title: "Toolbar",
    description: "Labeled groups of application tools",
    states: ["default"],
    registryName: "anuime-toolbar",
  },
  typography: {
    title: "Typography",
    description: "Headings, lead copy, text, and code",
    states: ["default"],
    registryName: "anuime-typography",
  },
  "aspect-ratio": {
    title: "Aspect Ratio",
    description: "Stable responsive media framing",
    states: ["landscape", "square", "portrait"],
    registryName: "anuime-aspect-ratio",
  },
  table: {
    title: "Table",
    description: "Semantic responsive table primitives",
    states: ["default", "empty"],
    registryName: "anuime-table",
  },
};

export const defaultStudioDocument: StudioDocument = {
  recipe: defaultAnuimeRecipe,
  componentId: "button",
  previewState: "default",
  viewport: "desktop",
  zoom: 1,
};

export function parseStudioSearch(input: Record<string, unknown>): StudioSearch {
  const recipeValue = typeof input.recipe === "string" ? input.recipe : undefined;
  const recipe = recipeValue ? decodeAnuimeRecipe(recipeValue) : null;
  const component = isRegistryComponentId(input.component) ? input.component : undefined;
  const viewport = isStudioViewport(input.viewport) ? input.viewport : undefined;
  const zoom = isStudioZoom(input.zoom) ? input.zoom : undefined;
  return {
    recipe: recipe ? encodeAnuimeRecipe(recipe) : undefined,
    component,
    state: typeof input.state === "string" ? input.state : undefined,
    viewport,
    zoom,
    warning:
      input.warning === "invalid-recipe" || (recipeValue && !recipe) ? "invalid-recipe" : undefined,
  };
}

export function studioDocumentFromSearch(search: StudioSearch): StudioDocument {
  const recipe = search.recipe ? decodeAnuimeRecipe(search.recipe) : null;
  const componentId = search.component ?? defaultStudioDocument.componentId;
  const supportedStates = componentCatalog[componentId].states;
  return {
    recipe: recipe ?? defaultStudioDocument.recipe,
    componentId,
    previewState:
      search.state && supportedStates.includes(search.state)
        ? search.state
        : (supportedStates[0] ?? "default"),
    viewport: search.viewport ?? defaultStudioDocument.viewport,
    zoom: search.zoom ?? defaultStudioDocument.zoom,
  };
}

export function studioSearchFromDocument(document: StudioDocument): StudioSearch {
  return {
    recipe: encodeAnuimeRecipe(document.recipe),
    component: document.componentId,
    state: document.previewState,
    viewport: document.viewport,
    zoom: document.zoom,
  };
}

export function getInstallCommand(componentId: RegistryComponentId) {
  return `npx shadcn@latest add ${getCanonicalRegistryItemUrl(componentCatalog[componentId].registryName)}`;
}

export function getUsageSnippet(document: StudioDocument) {
  const componentName = componentCatalog[document.componentId].registryName
    .split("-")
    .map((part) => part.at(0)?.toUpperCase() + part.slice(1))
    .join("");
  return `<${componentName} recipe={${JSON.stringify(document.recipe)}} />`;
}

export function isRegistryComponentId(value: unknown): value is RegistryComponentId {
  return typeof value === "string" && registryComponentIds.some((component) => component === value);
}

function isStudioViewport(value: unknown): value is StudioViewport {
  return value === "mobile" || value === "tablet" || value === "desktop";
}

function isStudioZoom(value: unknown): value is StudioZoom {
  const numeric = typeof value === "number" ? value : Number(value);
  return numeric === 0.75 || numeric === 1 || numeric === 1.25;
}
