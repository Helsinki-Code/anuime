import { validateScene } from "./scenes";
import type { SceneCatalog, SceneDocumentV1 } from "./scenes";

export interface LocalSceneProject {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  revision: number;
  scene: SceneDocumentV1;
}
export type ProjectStorageErrorCode =
  | "unavailable"
  | "blocked"
  | "corrupt"
  | "conflict"
  | "invalid-scene"
  | "missing";
export class ProjectStorageError extends Error {
  constructor(
    public readonly code: ProjectStorageErrorCode,
    message: string,
  ) {
    super(message);
    this.name = "ProjectStorageError";
  }
}

const databaseName = "anuime-scene-projects";
const storeName = "projects";

/** Open per transaction, so tab upgrades do not retain a stale database connection. */
function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(
        new ProjectStorageError(
          "unavailable",
          "Local storage is unavailable. Keep editing and download your scene JSON to preserve changes.",
        ),
      );
      return;
    }
    let request: IDBOpenDBRequest;
    try {
      request = indexedDB.open(databaseName, 1);
    } catch {
      reject(
        new ProjectStorageError(
          "unavailable",
          "This browser blocked local projects. Download your scene JSON to preserve changes.",
        ),
      );
      return;
    }
    let failed = false;
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(storeName))
        db.createObjectStore(storeName, { keyPath: "id" });
    };
    request.onblocked = () => {
      failed = true;
      reject(
        new ProjectStorageError(
          "blocked",
          "Another tab is blocking project storage. Close other AnUIme tabs, then retry. Your current scene can still be downloaded.",
        ),
      );
    };
    request.addEventListener("error", () =>
      reject(
        new ProjectStorageError(
          "unavailable",
          "Could not open local projects. Download your current scene before leaving.",
        ),
      ),
    );
    request.onsuccess = () => {
      if (failed) {
        request.result.close();
        return;
      }
      request.result.onversionchange = () => request.result.close();
      resolve(request.result);
    };
  });
}

function parseProject(value: unknown, catalog: SceneCatalog): LocalSceneProject {
  if (!value || typeof value !== "object")
    throw new ProjectStorageError(
      "corrupt",
      "A saved project could not be read. It has not been overwritten.",
    );
  const record: Record<string, unknown> = Object.fromEntries(Object.entries(value));
  const result = validateScene(record.scene, catalog);
  if (
    !result.document ||
    typeof record.id !== "string" ||
    record.id !== result.document.id ||
    typeof record.name !== "string" ||
    record.name !== result.document.name ||
    typeof record.createdAt !== "string" ||
    !Number.isFinite(Date.parse(record.createdAt)) ||
    typeof record.updatedAt !== "string" ||
    !Number.isFinite(Date.parse(record.updatedAt)) ||
    typeof record.revision !== "number" ||
    !Number.isSafeInteger(record.revision) ||
    record.revision < 1
  ) {
    throw new ProjectStorageError(
      "corrupt",
      "This saved project is invalid or uses unsupported components. Its stored data has not been changed.",
    );
  }
  return {
    id: record.id,
    name: record.name,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    revision: record.revision,
    scene: result.document,
  };
}

async function transact<T>(
  mode: IDBTransactionMode,
  work: (
    store: IDBObjectStore,
    setResult: (value: T) => void,
    fail: (error: ProjectStorageError) => void,
  ) => void,
): Promise<T> {
  const db = await openDatabase();
  return new Promise<T>((resolve, reject) => {
    let transaction: IDBTransaction;
    try {
      transaction = db.transaction(storeName, mode);
    } catch {
      db.close();
      reject(
        new ProjectStorageError(
          "unavailable",
          "Local projects are unavailable. Download your current scene and retry.",
        ),
      );
      return;
    }
    let result: { value: T } | undefined;
    let failure: ProjectStorageError | undefined;
    const fail = (error: ProjectStorageError) => {
      failure = error;
      transaction.abort();
    };
    transaction.oncomplete = () => {
      db.close();
      if (result) resolve(result.value);
      else
        reject(
          new ProjectStorageError(
            "unavailable",
            "The project transaction did not return a result.",
          ),
        );
    };
    transaction.addEventListener("abort", () => {
      db.close();
      reject(
        failure ??
          new ProjectStorageError(
            "unavailable",
            "Could not save the project, possibly because device storage is full. Download your scene JSON to preserve changes.",
          ),
      );
    });
    try {
      work(
        transaction.objectStore(storeName),
        (value) => {
          result = { value };
        },
        fail,
      );
    } catch (error) {
      fail(
        error instanceof ProjectStorageError
          ? error
          : new ProjectStorageError(
              "unavailable",
              "The project operation failed. Your current scene remains in memory.",
            ),
      );
    }
  });
}

export async function listLocalProjects(
  catalog: SceneCatalog,
): Promise<{ projects: LocalSceneProject[]; corruptIds: string[] }> {
  return transact("readonly", (store, setResult) => {
    const request = store.getAll();
    request.onsuccess = () => {
      const projects: LocalSceneProject[] = [];
      const corruptIds: string[] = [];
      for (const value of request.result) {
        try {
          projects.push(parseProject(value, catalog));
        } catch {
          corruptIds.push(value && typeof value.id === "string" ? value.id : "unknown");
        }
      }
      projects.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
      setResult({ projects, corruptIds });
    };
  });
}

export async function readLocalProject(
  id: string,
  catalog: SceneCatalog,
): Promise<LocalSceneProject> {
  return transact("readonly", (store, setResult, fail) => {
    const request = store.get(id);
    request.onsuccess = () => {
      if (!request.result) {
        fail(new ProjectStorageError("missing", "This project no longer exists on this device."));
        return;
      }
      try {
        setResult(parseProject(request.result, catalog));
      } catch (error) {
        fail(
          error instanceof ProjectStorageError
            ? error
            : new ProjectStorageError("corrupt", "The project could not be read."),
        );
      }
    };
  });
}

/** expectedRevision is zero for a new project. A stale tab must reload or save a copy. */
export async function saveLocalProject(
  scene: SceneDocumentV1,
  catalog: SceneCatalog,
  expectedRevision: number,
): Promise<LocalSceneProject> {
  const validated = validateScene(scene, catalog).document;
  if (!validated)
    throw new ProjectStorageError(
      "invalid-scene",
      "Fix scene validation errors before saving this project.",
    );
  return transact("readwrite", (store, setResult, fail) => {
    const request = store.get(validated.id);
    request.onsuccess = () => {
      let previous: LocalSceneProject | undefined;
      try {
        if (request.result) previous = parseProject(request.result, catalog);
      } catch {
        fail(
          new ProjectStorageError(
            "corrupt",
            "The saved project is corrupt. Save a copy with a new ID to preserve the original.",
          ),
        );
        return;
      }
      if ((previous?.revision ?? 0) !== expectedRevision) {
        fail(
          new ProjectStorageError(
            "conflict",
            "This project changed in another tab. Reload it or save your current scene as a copy.",
          ),
        );
        return;
      }
      const now = new Date().toISOString();
      const project: LocalSceneProject = {
        id: validated.id,
        name: validated.name,
        createdAt: previous?.createdAt ?? now,
        updatedAt: now,
        revision: expectedRevision + 1,
        scene: validated,
      };
      try {
        store.put(project);
        setResult(project);
      } catch {
        fail(
          new ProjectStorageError(
            "unavailable",
            "Could not save this project. Download your current scene JSON and retry.",
          ),
        );
      }
    };
  });
}

export async function duplicateLocalProject(
  project: LocalSceneProject,
  catalog: SceneCatalog,
  newId: string,
  name = `${project.name} copy`,
): Promise<LocalSceneProject> {
  return saveLocalProject({ ...structuredClone(project.scene), id: newId, name }, catalog, 0);
}
export async function renameLocalProject(
  project: LocalSceneProject,
  catalog: SceneCatalog,
  name: string,
): Promise<LocalSceneProject> {
  return saveLocalProject({ ...project.scene, name }, catalog, project.revision);
}
export async function deleteLocalProject(
  id: string,
  catalog: SceneCatalog,
  expectedRevision: number,
): Promise<void> {
  return transact("readwrite", (store, setResult, fail) => {
    const request = store.get(id);
    request.onsuccess = () => {
      let project: LocalSceneProject;
      try {
        project = parseProject(request.result, catalog);
      } catch {
        fail(
          new ProjectStorageError(
            "missing",
            "The project could not be found or read. Refresh the project list.",
          ),
        );
        return;
      }
      if (project.revision !== expectedRevision) {
        fail(
          new ProjectStorageError(
            "conflict",
            "This project changed in another tab. Refresh before deleting it.",
          ),
        );
        return;
      }
      try {
        store.delete(id);
        setResult(undefined);
      } catch {
        fail(
          new ProjectStorageError(
            "unavailable",
            "Could not delete this project. Refresh and retry.",
          ),
        );
      }
    };
  });
}
