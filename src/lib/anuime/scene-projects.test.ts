import { IDBFactory, IDBObjectStore } from "fake-indexeddb";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  deleteLocalProject,
  duplicateLocalProject,
  listLocalProjects,
  readLocalProject,
  renameLocalProject,
  saveLocalProject,
} from "./scene-projects";
import { createScene } from "./scenes";

beforeEach(() => vi.stubGlobal("indexedDB", new IDBFactory()));
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

async function corruptStoredRecord() {
  const db = await new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open("anuime-scene-projects", 1);
    request.onsuccess = () => resolve(request.result);
    request.addEventListener("error", () => reject(request.error));
  });
  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction("projects", "readwrite");
    transaction.objectStore("projects").put({ id: "broken", scene: { version: 99 } });
    transaction.oncomplete = () => resolve();
    transaction.addEventListener("error", () => reject(transaction.error));
  });
  db.close();
}

describe("local scene projects", () => {
  it("creates and reloads a complete scene after transaction commit", async () => {
    const scene = createScene("mochi", "project-1", "Moon garden");
    const saved = await saveLocalProject(scene, {}, 0);
    expect(saved.revision).toBe(1);
    expect(await readLocalProject(scene.id, {})).toEqual(saved);
    expect((await listLocalProjects({})).projects).toEqual([saved]);
  });
  it("renames, duplicates and deletes without sharing project identity", async () => {
    const original = await saveLocalProject(createScene("atlas", "original", "Operations"), {}, 0);
    const renamed = await renameLocalProject(original, {}, "Observation deck");
    expect(renamed.revision).toBe(2);
    expect(renamed.createdAt).toBe(original.createdAt);
    const copied = await duplicateLocalProject(renamed, {}, "copy");
    expect(copied.scene.id).toBe("copy");
    expect(copied.name).toBe("Observation deck copy");
    await deleteLocalProject(original.id, {}, renamed.revision);
    expect((await listLocalProjects({})).projects.map((project) => project.id)).toEqual(["copy"]);
  });
  it("rejects stale updates and deletes, preserving the newer scene", async () => {
    const original = await saveLocalProject(createScene("kira", "shared"), {}, 0);
    const updated = await renameLocalProject(original, {}, "New name");
    await expect(renameLocalProject(original, {}, "Stale name")).rejects.toMatchObject({
      code: "conflict",
    });
    await expect(deleteLocalProject(original.id, {}, original.revision)).rejects.toMatchObject({
      code: "conflict",
    });
    expect(await readLocalProject(original.id, {})).toEqual(updated);
  });
  it("serializes simultaneous saves so exactly one tab wins", async () => {
    const original = await saveLocalProject(createScene("kira", "shared"), {}, 0);
    const results = await Promise.allSettled([
      renameLocalProject(original, {}, "Tab A"),
      renameLocalProject(original, {}, "Tab B"),
    ]);
    expect(results.filter((result) => result.status === "fulfilled")).toHaveLength(1);
    expect(results.filter((result) => result.status === "rejected")).toHaveLength(1);
    expect((await readLocalProject(original.id, {})).revision).toBe(2);
  });
  it("reports corrupt records without losing valid projects or overwriting the corrupt one", async () => {
    await saveLocalProject(createScene("mochi", "valid"), {}, 0);
    await corruptStoredRecord();
    const list = await listLocalProjects({});
    expect(list.projects.map((project) => project.id)).toEqual(["valid"]);
    expect(list.corruptIds).toEqual(["broken"]);
    await expect(readLocalProject("broken", {})).rejects.toMatchObject({ code: "corrupt" });
    await expect(saveLocalProject(createScene("kira", "broken"), {}, 0)).rejects.toMatchObject({
      code: "corrupt",
    });
  });
  it("rejects unavailable or blocked browser storage with recovery guidance", async () => {
    vi.stubGlobal("indexedDB", undefined);
    await expect(listLocalProjects({})).rejects.toMatchObject({
      code: "unavailable",
      message: expect.stringContaining("download"),
    });
    vi.stubGlobal("indexedDB", {
      open() {
        throw new DOMException("Denied", "SecurityError");
      },
    });
    await expect(saveLocalProject(createScene("kira", "new"), {}, 0)).rejects.toMatchObject({
      code: "unavailable",
    });
  });
  it("does not report success when writes fail and preserves the saved revision", async () => {
    const original = await saveLocalProject(createScene("kira", "full"), {}, 0);
    vi.spyOn(IDBObjectStore.prototype, "put").mockImplementationOnce(() => {
      throw new DOMException("Full", "QuotaExceededError");
    });
    await expect(renameLocalProject(original, {}, "Unsaved name")).rejects.toMatchObject({
      code: "unavailable",
    });
    expect(await readLocalProject(original.id, {})).toEqual(original);
  });
  it("rejects invalid scenes before opening storage", async () => {
    const invalid = { ...createScene("kira", "new"), name: "" };
    await expect(saveLocalProject(invalid, {}, 0)).rejects.toMatchObject({ code: "invalid-scene" });
    expect((await listLocalProjects({})).projects).toEqual([]);
  });
});
