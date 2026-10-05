import { anuimeExtendedComponentNames } from "../../../registry/items/lib/anuime-recipe/anuime-recipe";
import type { AnuimeCharacter } from "./recipe";
import { createScene, createSection } from "./scenes";
import type { ComponentDefinition, SceneCatalog, SceneComponentNode } from "./scenes";
import { componentCatalog, registryComponentIds } from "./studio";
import { worlds } from "./worlds";

const betaComponents = new Set<string>(anuimeExtendedComponentNames);

/** Existing preview adapters retain their state contracts while prop adapters are audited. */
export const sceneCatalog: SceneCatalog = Object.fromEntries(
  registryComponentIds.map((id) => {
    const item = componentCatalog[id];
    const definition: ComponentDefinition = {
      registryName: item.registryName,
      title: item.title,
      maturity: betaComponents.has(id) ? "beta" : "stable",
      props: {},
      defaultProps: {},
      states: item.states,
      slots: {},
      dependencies: ["anuime-recipe"],
      examples: [],
    };
    switch (id) {
      case "button":
        definition.props = {
          label: { type: "string", label: "Label", required: true, maxLength: 120 },
        };
        definition.defaultProps = { label: "Continue" };
        break;
      case "input":
        definition.props = {
          label: { type: "string", label: "Label", required: true },
          placeholder: { type: "string", label: "Placeholder" },
          hint: { type: "string", label: "Hint" },
        };
        definition.defaultProps = {
          label: "Project name",
          placeholder: "Name your project",
          hint: "Only saved on this device",
        };
        break;
      case "card":
        definition.props = {
          title: { type: "string", label: "Title", required: true },
          description: { type: "string", label: "Description" },
          eyebrow: { type: "string", label: "Eyebrow" },
        };
        definition.defaultProps = {
          title: "Your next project",
          description: "A place for the work that matters.",
        };
        definition.slots = { action: { accepts: ["button"], maxChildren: 2 } };
        break;
      case "typography":
        definition.props = {
          title: { type: "string", label: "Heading", required: true },
          text: { type: "string", label: "Body", required: true },
        };
        definition.defaultProps = {
          title: "A world of your own",
          text: "Make something with character.",
        };
        break;
      case "progress":
        definition.props = {
          label: { type: "string", label: "Label", required: true, maxLength: 120 },
          value: { type: "number", label: "Value", min: 0, max: 100 },
        };
        definition.defaultProps = { label: "Deployment signal", value: 72 };
        break;
      case "alert":
        definition.props = {
          title: { type: "string", label: "Title", required: true, maxLength: 160 },
          description: { type: "string", label: "Description", maxLength: 400 },
          tone: { type: "enum", label: "Tone", values: ["info", "success", "warning", "error"] },
        };
        definition.defaultProps = {
          title: "All checks passed",
          description: "The next action is ready.",
          tone: "success",
        };
        break;
    }
    return [id, definition];
  }),
);

export function createSceneComponent(component: string, id: string): SceneComponentNode {
  const definition = sceneCatalog[component];
  if (!definition) throw new Error("Unknown scene component");
  return {
    id,
    kind: "component",
    component,
    props: structuredClone(definition.defaultProps),
    state: definition.states[0],
    slots: {},
  };
}

export function createStarterScene(world: AnuimeCharacter, id: string) {
  const scene = createScene(world, id, worlds[world].flagship.name);
  const title = createSceneComponent("typography", "intro");
  title.props = { title: worlds[world].flagship.name, text: worlds[world].flagship.task };
  const input = createSceneComponent("input", "name");
  input.props = {
    label: world === "mochi" ? "Collection name" : world === "atlas" ? "Task name" : "Release name",
    placeholder: "Give it a name",
  };
  const action = createSceneComponent("button", "confirm");
  action.props.label = worlds[world].flagship.action;
  const card = createSceneComponent("card", "summary");
  card.props = {
    eyebrow: worlds[world].name,
    title: "Ready when you are",
    description: "Edit the details, then try the action.",
  };
  card.slots = { action: [action] };
  scene.sections = [createSection("main", [title, input, card])];
  return scene;
}
