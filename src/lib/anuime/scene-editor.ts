import { validateScene } from "./scenes";
import type {
  JsonValue,
  SceneCatalog,
  SceneDocumentV1,
  SceneNode,
  SceneValidationIssue,
} from "./scenes";

export type SceneContainer = { parentId: string; slot?: string } | { parentId: null };
export type SceneEdit =
  | { type: "insert"; target: SceneContainer; index: number; node: SceneNode }
  | { type: "remove"; id: string }
  | { type: "move"; id: string; target: SceneContainer; index: number }
  | { type: "duplicate"; id: string; nextId: () => string }
  | { type: "props"; id: string; props: Record<string, JsonValue> }
  | { type: "state"; id: string; state: string };

function locate(
  nodes: SceneNode[],
  id: string,
): { siblings: SceneNode[]; index: number; node: SceneNode } | null {
  for (let index = 0; index < nodes.length; index++) {
    const node = nodes[index];
    if (node.id === id) return { siblings: nodes, index, node };
    const groups = node.kind === "component" ? Object.values(node.slots) : [node.children];
    for (const children of groups) {
      const found = locate(children, id);
      if (found) return found;
    }
  }
  return null;
}
function container(document: SceneDocumentV1, target: SceneContainer): SceneNode[] | null {
  if (target.parentId === null) return document.sections;
  const found = locate(document.sections, target.parentId);
  if (!found) return null;
  if (found.node.kind !== "component") return target.slot ? null : found.node.children;
  if (!target.slot) return null;
  if (!Object.hasOwn(found.node.slots, target.slot)) found.node.slots[target.slot] = [];
  return found.node.slots[target.slot];
}
function renewIds(node: SceneNode, nextId: () => string) {
  node.id = nextId();
  const children = node.kind === "component" ? Object.values(node.slots).flat() : node.children;
  children.forEach((child) => renewIds(child, nextId));
}

/** Mutations are transactional: failed edits return the unchanged source document. */
export function editScene(
  source: SceneDocumentV1,
  edit: SceneEdit,
  catalog: SceneCatalog,
): { document: SceneDocumentV1; errors: SceneValidationIssue[]; changed: boolean } {
  const document = structuredClone(source);
  const failure = (message: string) => ({
    document: source,
    errors: [{ code: "invalid-edit", path: "$", message }],
    changed: false,
  });
  if (edit.type === "insert") {
    const target = container(document, edit.target);
    if (!target || !Number.isInteger(edit.index) || edit.index < 0 || edit.index > target.length)
      return failure("Choose an existing container and insertion position.");
    target.splice(edit.index, 0, structuredClone(edit.node));
  } else {
    const found = locate(document.sections, edit.id);
    if (!found) return failure("This component is no longer in the scene.");
    switch (edit.type) {
      case "remove":
        found.siblings.splice(found.index, 1);
        break;
      case "duplicate": {
        const copy = structuredClone(found.node);
        renewIds(copy, edit.nextId);
        found.siblings.splice(found.index + 1, 0, copy);
        break;
      }
      case "props":
        if (found.node.kind !== "component")
          return failure("Choose a component to edit its properties.");
        found.node.props = structuredClone(edit.props);
        break;
      case "state":
        if (found.node.kind !== "component")
          return failure("Choose a component to edit its state.");
        found.node.state = edit.state;
        break;
      case "move": {
        // Remove first: moving into oneself or a descendant cannot locate a destination.
        found.siblings.splice(found.index, 1);
        const target = container(document, edit.target);
        if (
          !target ||
          !Number.isInteger(edit.index) ||
          edit.index < 0 ||
          edit.index > target.length
        )
          return failure("Choose a valid destination outside the moved node.");
        target.splice(edit.index, 0, found.node);
        break;
      }
    }
  }
  const result = validateScene(document, catalog);
  return result.document
    ? { document: result.document, errors: [], changed: true }
    : { document: source, errors: result.errors, changed: false };
}

export interface SceneHistory {
  past: SceneDocumentV1[];
  present: SceneDocumentV1;
  future: SceneDocumentV1[];
}
export function recordScene(history: SceneHistory, document: SceneDocumentV1): SceneHistory {
  if (JSON.stringify(history.present) === JSON.stringify(document)) return history;
  return {
    past: [...history.past.slice(-49), structuredClone(history.present)],
    present: structuredClone(document),
    future: [],
  };
}
export function undoScene(history: SceneHistory): SceneHistory {
  const previous = history.past.at(-1);
  return previous
    ? {
        past: history.past.slice(0, -1),
        present: previous,
        future: [history.present, ...history.future],
      }
    : history;
}
export function redoScene(history: SceneHistory): SceneHistory {
  const next = history.future[0];
  return next
    ? { past: [...history.past, history.present], present: next, future: history.future.slice(1) }
    : history;
}

export function shouldHandleSceneUndo(target: EventTarget | null): boolean {
  if (typeof Element === "undefined" || !(target instanceof Element)) return false;
  return !target.closest(
    'input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"]',
  );
}
