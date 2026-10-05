import { toPng } from "html-to-image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";

import { ExperienceControls } from "@/components/worlds/experience-provider";
import { WorldStage } from "@/components/worlds/world-stage";
import { createAnuimeRecipe } from "@/lib/anuime/recipe";
import { sceneCatalog, createSceneComponent, createStarterScene } from "@/lib/anuime/scene-catalog";
import {
  editScene,
  recordScene,
  redoScene,
  shouldHandleSceneUndo,
  undoScene,
} from "@/lib/anuime/scene-editor";
import type { SceneEdit, SceneHistory } from "@/lib/anuime/scene-editor";
import { exportSceneSource } from "@/lib/anuime/scene-export";
import {
  deleteLocalProject,
  listLocalProjects,
  readLocalProject,
  saveLocalProject,
} from "@/lib/anuime/scene-projects";
import type { LocalSceneProject } from "@/lib/anuime/scene-projects";
import {
  createSection,
  importScene,
  sceneFromLegacy,
  sceneLimits,
  validateScene,
} from "@/lib/anuime/scenes";
import type { SceneDocumentV1, SceneNode } from "@/lib/anuime/scenes";
import type { StudioDocument } from "@/lib/anuime/studio";
import { worldIds, worlds, isWorldId } from "@/lib/anuime/worlds";

import { ScenePreview } from "./scene-preview";

const newId = () => crypto.randomUUID();
function downloadSourceFile(scene: SceneDocumentV1, kind: "source" | "css" | "instructions") {
  const result = exportSceneSource(scene);
  const content =
    kind === "source"
      ? result.source
      : kind === "css"
        ? result.css
        : `${result.instructions}\n\n${result.installCommand}\n\nnpm install ${result.packages.join(" ")}\n`;
  const url = URL.createObjectURL(new Blob([content], { type: "text/plain" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = kind === "source" ? "Scene.tsx" : kind === "css" ? "scene.css" : "INSTALL.txt";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function downloadJson(scene: SceneDocumentV1) {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(scene, null, 2)], { type: "application/json" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = `${scene.name.replace(/[^a-zA-Z0-9_-]/g, "-") || "scene"}.json`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
async function downloadSceneImage(element: HTMLElement, scene: SceneDocumentV1) {
  if (document.fonts) await document.fonts.ready;
  await new Promise<void>((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
  );
  const dataUrl = await toPng(element, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: scene.lighting === "dark" ? "#100e24" : "#f7f5ff",
  });
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = `${scene.name.replace(/[^a-zA-Z0-9_-]/g, "-") || "scene"}.png`;
  link.click();
}
function flatten(
  nodes: SceneNode[],
  parentId: string | null = null,
  slot?: string,
  depth = 0,
): {
  node: SceneNode;
  parentId: string | null;
  slot?: string;
  index: number;
  depth: number;
  count: number;
}[] {
  return nodes.flatMap((node, index) => [
    { node, parentId, slot, index, depth, count: nodes.length },
    ...(node.kind === "component"
      ? Object.entries(node.slots).flatMap(([key, children]) =>
          flatten(children, node.id, key, depth + 1),
        )
      : flatten(node.children, node.id, undefined, depth + 1)),
  ]);
}

export function SceneStudio({
  initial,
  initialScene,
  legacyLink,
  onOpenLab,
}: {
  initial: StudioDocument;
  initialScene?: SceneDocumentV1;
  legacyLink: boolean;
  onOpenLab: () => void;
}) {
  const [history, setHistory] = useState<SceneHistory>(() => {
    if (initialScene) return { past: [], present: initialScene, future: [] };
    const migrated = sceneFromLegacy(
      { recipe: initial.recipe, component: initial.componentId, state: initial.previewState },
      sceneCatalog,
      "unsaved-scene",
    );
    return {
      past: [],
      present:
        legacyLink && migrated.document
          ? migrated.document
          : createStarterScene(initial.recipe.colorSystem, "unsaved-scene"),
      future: [],
    };
  });
  const scene = history.present;
  const [selected, setSelected] = useState<string | null>(scene.sections[0]?.id ?? null);
  const [viewport, setViewport] = useState(initial.viewport);
  const [panel, setPanel] = useState("build");
  const [component, setComponent] = useState("button");
  const [notice, setNotice] = useState(
    legacyLink
      ? "Your existing recipe and component state have been preserved."
      : "Choose a world, edit a component, then try its interaction.",
  );
  const [projects, setProjects] = useState<LocalSceneProject[]>([]);
  const [recoveryDrafts, setRecoveryDrafts] = useState<Record<string, SceneDocumentV1>>({});
  const [saveState, setSaveState] = useState("Not saved yet");
  const [dirty, setDirty] = useState(false);
  const [dragged, setDragged] = useState<string | null>(null);
  const revisions = useRef(new Map<string, number>());
  const saveQueue = useRef<Promise<void>>(Promise.resolve());
  const previewRef = useRef<HTMLDivElement>(null);
  const currentId = useRef(scene.id);
  const rows = flatten(scene.sections);
  const selectedRow = rows.find((row) => row.node.id === selected);
  const node = selectedRow?.node;
  const validation = validateScene(scene, sceneCatalog);

  const refreshProjects = useCallback(async () => {
    try {
      const result = await listLocalProjects(sceneCatalog);
      setProjects(result.projects);
      if (result.corruptIds.length)
        setNotice(
          `${result.corruptIds.length} saved projects could not be read. Their stored data has been preserved.`,
        );
    } catch (error) {
      setNotice(
        error instanceof Error
          ? error.message
          : "Project storage is unavailable. Export JSON to preserve your work.",
      );
    }
  }, []);
  useEffect(() => {
    void refreshProjects();
  }, [refreshProjects]);
  useEffect(() => {
    currentId.current = scene.id;
  }, [scene.id]);

  const commit = useCallback((next: SceneDocumentV1) => {
    const value = next.id === "unsaved-scene" ? { ...next, id: newId() } : next;
    setHistory((previous) => recordScene(previous, value));
    setDirty(true);
  }, []);
  const apply = (edit: SceneEdit) => {
    const result = editScene(scene, edit, sceneCatalog);
    if (result.changed) {
      commit(result.document);
      setNotice("Scene updated.");
    } else setNotice(result.errors.map((error) => error.message).join(" "));
  };
  const undo = useCallback(() => {
    setHistory(undoScene);
    setDirty(true);
  }, []);
  const redo = useCallback(() => {
    setHistory(redoScene);
    setDirty(true);
  }, []);
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (
        !(event.metaKey || event.ctrlKey) ||
        event.key.toLowerCase() !== "z" ||
        !shouldHandleSceneUndo(event.target)
      )
        return;
      event.preventDefault();
      if (event.shiftKey) redo();
      else undo();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [undo, redo]);

  useEffect(() => {
    if (!dirty || scene.id === "unsaved-scene") return;
    setSaveState("Unsaved changes");
    saveQueue.current = saveQueue.current.then(async () => {
      try {
        if (currentId.current === scene.id) setSaveState("Saving…");
        const saved = await saveLocalProject(
          scene,
          sceneCatalog,
          revisions.current.get(scene.id) ?? 0,
        );
        revisions.current.set(saved.id, saved.revision);
        setRecoveryDrafts((previous) => {
          const next = { ...previous };
          delete next[saved.id];
          return next;
        });
        if (currentId.current === saved.id) setSaveState("Saved on this device");
        await refreshProjects();
      } catch (error) {
        setRecoveryDrafts((previous) => ({ ...previous, [scene.id]: scene }));
        if (currentId.current === scene.id) {
          setSaveState("Not saved");
          setNotice(
            error instanceof Error ? error.message : "Save failed. Export your scene JSON.",
          );
        }
      }
    });
  }, [scene, dirty, refreshProjects]);

  const openScene = (next: SceneDocumentV1, saved = false) => {
    setHistory({ past: [], present: next, future: [] });
    setSelected(next.sections[0]?.id ?? null);
    setDirty(!saved);
    setSaveState(saved ? "Saved on this device" : "Unsaved changes");
  };
  const loadProject = async (id: string) => {
    try {
      await saveQueue.current;
      const project = await readLocalProject(id, sceneCatalog);
      revisions.current.set(id, project.revision);
      openScene(project.scene, true);
      setNotice(`Opened ${project.name}.`);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Could not open project.");
    }
  };
  const importFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (file.size > sceneLimits.bytes) {
      setNotice("Choose a scene JSON file smaller than 1 MB.");
      return;
    }
    try {
      const result = importScene(await file.text(), sceneCatalog);
      if (!result.document) {
        setNotice(result.errors.map((error) => error.message).join(" "));
        return;
      }
      openScene({ ...result.document, id: newId() });
      setNotice("Imported as a new local project.");
    } catch {
      setNotice("The file could not be read. Your current scene is unchanged.");
    }
  };
  const removeProject = async (project: LocalSceneProject) => {
    try {
      await saveQueue.current;
      await deleteLocalProject(
        project.id,
        sceneCatalog,
        revisions.current.get(project.id) ?? project.revision,
      );
      await refreshProjects();
      if (scene.id === project.id) {
        openScene({ ...scene, id: "unsaved-scene" }, true);
        setSaveState("Not saved yet");
      }
      setNotice(`Deleted ${project.name} from local storage.`);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Could not delete project.");
    }
  };
  const target = node && node.kind !== "component" ? node : scene.sections[0];
  return (
    <main className="scene-studio">
      <header className="scene-studio-bar">
        <div>
          <p className="text-xs tracking-widest uppercase">AnUIme Studio</p>
          <label className="sr-only" htmlFor="scene-name">
            Project name
          </label>
          <input
            id="scene-name"
            value={scene.name}
            maxLength={120}
            onChange={(event) => commit({ ...scene, name: event.target.value })}
          />
        </div>
        <span role="status">{saveState}</span>
        <button onClick={undo} disabled={!history.past.length}>
          Undo
        </button>
        <button onClick={redo} disabled={!history.future.length}>
          Redo
        </button>
        <button
          onClick={() => {
            openScene({
              ...structuredClone(scene),
              id: newId(),
              name: `${scene.name.slice(0, 110)} copy`,
            });
            setNotice("Created a separate project copy.");
          }}
        >
          Save a copy
        </button>
        <button onClick={onOpenLab}>Component lab</button>
      </header>
      <div className="scene-mobile-tabs" role="group" aria-label="Editor panels">
        {["build", "inspect", "export"].map((name) => (
          <button key={name} aria-pressed={panel === name} onClick={() => setPanel(name)}>
            {name}
          </button>
        ))}
      </div>
      <div className="scene-studio-grid" data-panel={panel}>
        <aside className="scene-build-panel">
          <h2>Build</h2>
          <label>
            Component
            <select value={component} onChange={(event) => setComponent(event.target.value)}>
              {Object.entries(sceneCatalog).map(([id, definition]) => (
                <option key={id} value={id}>
                  {definition.title}
                </option>
              ))}
            </select>
          </label>
          <button
            disabled={!target}
            onClick={() => {
              if (target)
                apply({
                  type: "insert",
                  target: { parentId: target.id },
                  index: target.children.length,
                  node: createSceneComponent(component, newId()),
                });
            }}
          >
            Add to {target?.label || "section"}
          </button>
          <button
            onClick={() => {
              const section = createSection(newId());
              apply({
                type: "insert",
                target: { parentId: null },
                index: scene.sections.length,
                node: section,
              });
              setSelected(section.id);
            }}
          >
            Add section
          </button>
          <h3>Outline</h3>
          <ol className="scene-outline">
            {rows.map((row) => (
              <li
                key={row.node.id}
                style={{ paddingLeft: row.depth * 10 }}
                draggable
                onDragStart={() => setDragged(row.node.id)}
                onDragEnd={() => setDragged(null)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  if (dragged && dragged !== row.node.id)
                    apply({
                      type: "move",
                      id: dragged,
                      target: row.parentId
                        ? { parentId: row.parentId, slot: row.slot }
                        : { parentId: null },
                      index: row.index,
                    });
                  setDragged(null);
                }}
              >
                <button
                  aria-pressed={selected === row.node.id}
                  onClick={() => {
                    setSelected(row.node.id);
                    setPanel("inspect");
                  }}
                >
                  {row.node.kind === "component"
                    ? sceneCatalog[row.node.component].title
                    : row.node.label || row.node.kind}
                </button>
              </li>
            ))}
          </ol>
          {Object.values(recoveryDrafts).length > 0 && (
            <div role="status">
              <h3>Unsaved recovery drafts</h3>
              <p className="text-xs">
                These edits could not be saved. Download them or reopen a copy before leaving.
              </p>
              {Object.values(recoveryDrafts).map((draft) => (
                <div key={draft.id} className="scene-node-actions">
                  <button onClick={() => downloadJson(draft)}>Download {draft.name}</button>
                  <button onClick={() => openScene({ ...draft, id: newId() })}>
                    Open recovery copy
                  </button>
                </div>
              ))}
            </div>
          )}
          <h3>Local projects</h3>
          <ul className="scene-project-list">
            {projects.map((project) => (
              <li key={project.id}>
                <button onClick={() => void loadProject(project.id)}>{project.name}</button>
                <button
                  aria-label={`Delete ${project.name}`}
                  onClick={() => void removeProject(project)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <section className="scene-center" aria-label="Scene preview">
          <div className="scene-preview-toolbar">
            <span>Interactive preview</span>
            <label>
              Device
              <select
                value={viewport}
                onChange={(event) => {
                  const value = event.target.value;
                  if (value === "mobile" || value === "tablet" || value === "desktop")
                    setViewport(value);
                }}
              >
                <option value="mobile">Mobile</option>
                <option value="tablet">Tablet</option>
                <option value="desktop">Desktop</option>
              </select>
            </label>
          </div>
          <div className="scene-preview-scroll">
            <div
              className="scene-preview-device"
              style={{ width: { mobile: 390, tablet: 768, desktop: 1100 }[viewport] }}
            >
              <div ref={previewRef}>
                <WorldStage
                  worldId={scene.world}
                  theme={scene.lighting}
                  className="scene-editor-world"
                >
                  <ScenePreview scene={scene} />
                </WorldStage>
              </div>
            </div>
          </div>
          <p className="scene-editor-notice" role="status">
            {notice}
          </p>
        </section>
        <aside className="scene-inspect-panel">
          <h2>World</h2>
          <label>
            Character
            <select
              value={scene.world}
              onChange={(event) => {
                if (isWorldId(event.target.value))
                  commit({
                    ...scene,
                    world: event.target.value,
                    recipe: { ...createAnuimeRecipe(event.target.value), mode: scene.lighting },
                  });
              }}
            >
              {worldIds.map((id) => (
                <option key={id} value={id}>
                  {worlds[id].character} · {worlds[id].name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Lighting
            <select
              value={scene.lighting}
              onChange={(event) => {
                const lighting = event.target.value;
                if (lighting === "light" || lighting === "dark")
                  commit({ ...scene, lighting, recipe: { ...scene.recipe, mode: lighting } });
              }}
            >
              <option value="dark">Night</option>
              <option value="light">Day</option>
            </select>
          </label>
          <button onClick={() => openScene(createStarterScene(scene.world, newId()))}>
            New {worlds[scene.world].flagship.name} starter
          </button>
          <h2>Inspect</h2>
          {node ? (
            <>
              <p>{node.kind === "component" ? sceneCatalog[node.component].title : node.label}</p>
              {node.kind === "component" ? (
                <>
                  <label>
                    State
                    <select
                      value={node.state}
                      onChange={(event) =>
                        apply({ type: "state", id: node.id, state: event.target.value })
                      }
                    >
                      {sceneCatalog[node.component].states.map((state) => (
                        <option key={state}>{state}</option>
                      ))}
                    </select>
                  </label>
                  {Object.entries(sceneCatalog[node.component].props).map(([key, definition]) => (
                    <label key={key}>
                      {definition.label}
                      <input
                        value={typeof node.props[key] === "string" ? node.props[key] : ""}
                        onChange={(event) =>
                          apply({
                            type: "props",
                            id: node.id,
                            props: { ...node.props, [key]: event.target.value },
                          })
                        }
                      />
                    </label>
                  ))}
                  {!Object.keys(sceneCatalog[node.component].props).length && (
                    <p className="text-xs">
                      This component currently uses its sample-data preview. Editable data adapters
                      are still being added.
                    </p>
                  )}
                </>
              ) : (
                <>
                  <label>
                    Layout
                    <select
                      value={node.layout.kind}
                      onChange={(event) => {
                        const kind = event.target.value;
                        if (kind !== "grid" && kind !== "stack") return;
                        const next = structuredClone(scene);
                        const match = flatten(next.sections).find(
                          (row) => row.node.id === node.id,
                        )?.node;
                        if (match && match.kind !== "component") {
                          match.layout.kind = kind;
                          match.layout.columns = {
                            mobile: 1,
                            tablet: kind === "grid" ? 2 : 1,
                            desktop: kind === "grid" ? 3 : 1,
                          };
                          if (match.kind !== "section") match.kind = kind;
                          commit(next);
                        }
                      }}
                    >
                      <option value="stack">Stack</option>
                      <option value="grid">Responsive grid</option>
                    </select>
                  </label>
                </>
              )}
              <div className="scene-node-actions">
                <button onClick={() => apply({ type: "duplicate", id: node.id, nextId: newId })}>
                  Duplicate
                </button>
                <button
                  onClick={() => {
                    apply({ type: "remove", id: node.id });
                    setSelected(selectedRow?.parentId ?? null);
                  }}
                >
                  Remove
                </button>
                {selectedRow && (
                  <>
                    <button
                      disabled={selectedRow.index === 0}
                      onClick={() =>
                        apply({
                          type: "move",
                          id: node.id,
                          target: selectedRow.parentId
                            ? { parentId: selectedRow.parentId, slot: selectedRow.slot }
                            : { parentId: null },
                          index: selectedRow.index - 1,
                        })
                      }
                    >
                      Move earlier
                    </button>
                    <button
                      disabled={selectedRow.index === selectedRow.count - 1}
                      onClick={() =>
                        apply({
                          type: "move",
                          id: node.id,
                          target: selectedRow.parentId
                            ? { parentId: selectedRow.parentId, slot: selectedRow.slot }
                            : { parentId: null },
                          index: selectedRow.index + 1,
                        })
                      }
                    >
                      Move later
                    </button>
                  </>
                )}
              </div>
            </>
          ) : (
            <p>Select a node in the outline.</p>
          )}
          <ExperienceControls />
        </aside>
        <section className="scene-export-panel">
          <h2>Export and validation</h2>
          <div className="scene-node-actions">
            {(["source", "css", "instructions"] as const).map((kind) => (
              <button
                key={kind}
                disabled={!validation.valid}
                onClick={() => {
                  try {
                    downloadSourceFile(scene, kind);
                  } catch (error) {
                    setNotice(error instanceof Error ? error.message : "Source export failed.");
                  }
                }}
              >
                Download{" "}
                {kind === "source"
                  ? "React source"
                  : kind === "css"
                    ? "CSS"
                    : "install instructions"}
              </button>
            ))}
          </div>
          <p>
            {validation.valid
              ? "Scene structure is valid."
              : validation.errors.map((error) => error.message).join(" ")}
          </p>
          <div className="scene-node-actions">
            <button disabled={!validation.valid} onClick={() => downloadJson(scene)}>
              Download scene JSON
            </button>
            <label className="scene-file-button">
              Import scene JSON
              <input
                type="file"
                accept="application/json,.json"
                onChange={(event) => void importFile(event)}
              />
            </label>
            <button
              disabled={!validation.valid || !previewRef.current}
              onClick={() => {
                if (!previewRef.current) return;
                void downloadSceneImage(previewRef.current, scene).catch((error) => {
                  setNotice(
                    error instanceof Error
                      ? `Image export failed: ${error.message}`
                      : "Image export failed. Download the illustrated scene instead.",
                  );
                });
              }}
            >
              Export image
            </button>
          </div>
          <p className="text-xs">
            JSON preserves the complete composition. React export includes component usage, fonts,
            and styles. The optional 3D world runtime and assets are not included yet.
          </p>
          <details>
            <summary>Scene JSON</summary>
            <pre>{JSON.stringify(scene, null, 2)}</pre>
          </details>
        </section>
      </div>
    </main>
  );
}
