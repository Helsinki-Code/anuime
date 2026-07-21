import { randomUUID } from "node:crypto";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";

import { z } from "zod";

import { directorRecipeSchema } from "./director";
import { registryComponentIds, type RegistryComponentId } from "./studio";

const databasePath =
  process.env.ANUIME_GALLERY_DB_PATH ?? resolve(process.cwd(), ".data/anuime-gallery.sqlite");
mkdirSync(dirname(databasePath), { recursive: true });
const database = new DatabaseSync(databasePath);
const galleryEntryInputSchema = z.object({
  title: z.string(),
  description: z.string(),
  recipe: directorRecipeSchema,
  componentIds: z.array(z.enum(registryComponentIds)).min(1).max(registryComponentIds.length),
  tags: z.array(z.string()).max(8).optional(),
  remixOf: z.string().nullable().optional(),
});
database.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;
  CREATE TABLE IF NOT EXISTS gallery_users (
    id TEXT PRIMARY KEY,
    display_name TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS gallery_entries (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES gallery_users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    recipe_json TEXT NOT NULL,
    component_ids_json TEXT NOT NULL,
    tags_json TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('draft','pending','approved','rejected','removed')),
    remix_of TEXT REFERENCES gallery_entries(id),
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS gallery_reports (
    id TEXT PRIMARY KEY,
    entry_id TEXT NOT NULL REFERENCES gallery_entries(id) ON DELETE CASCADE,
    reporter_id TEXT REFERENCES gallery_users(id) ON DELETE SET NULL,
    reason TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'open',
    created_at TEXT NOT NULL
  );
`);

export function ensureGalleryUser(id: string, displayName: string) {
  const safeName = cleanText(displayName, 40);
  if (safeName.length < 2) throw new Error("Display name is too short.");
  database
    .prepare("INSERT OR IGNORE INTO gallery_users (id, display_name, created_at) VALUES (?, ?, ?)")
    .run(id, safeName, new Date().toISOString());
  return { id, displayName: safeName };
}

export function createGalleryEntry(userId: string, input: unknown, submit: boolean) {
  const value = parseEntryInput(input);
  const user = database.prepare("SELECT id FROM gallery_users WHERE id = ?").get(userId);
  if (!user) throw new Error("Gallery account not found.");
  const id = randomUUID();
  const timestamp = new Date().toISOString();
  database
    .prepare(`INSERT INTO gallery_entries
    (id, user_id, title, description, recipe_json, component_ids_json, tags_json, status, remix_of, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(
      id,
      userId,
      value.title,
      value.description,
      JSON.stringify(value.recipe),
      JSON.stringify(value.componentIds),
      JSON.stringify(value.tags),
      submit ? "pending" : "draft",
      value.remixOf,
      timestamp,
      timestamp,
    );
  return { id, status: submit ? "pending" : "draft" };
}

export function listGalleryEntries(status: "approved" | "pending" = "approved") {
  return database
    .prepare(
      `SELECT e.*, u.display_name FROM gallery_entries e JOIN gallery_users u ON u.id = e.user_id WHERE e.status = ? ORDER BY e.created_at DESC`,
    )
    .all(status);
}

export function reportGalleryEntry(entryId: string, reporterId: string | null, reason: string) {
  const safeReason = cleanText(reason, 240);
  if (safeReason.length < 3) throw new Error("Report reason is too short.");
  database
    .prepare(
      "INSERT INTO gallery_reports (id, entry_id, reporter_id, reason, created_at) VALUES (?, ?, ?, ?, ?)",
    )
    .run(randomUUID(), entryId, reporterId, safeReason, new Date().toISOString());
}

export function moderateGalleryEntry(entryId: string, status: "approved" | "rejected" | "removed") {
  database
    .prepare("UPDATE gallery_entries SET status = ?, updated_at = ? WHERE id = ?")
    .run(status, new Date().toISOString(), entryId);
}

export function exportGalleryAccount(userId: string) {
  const user = database.prepare("SELECT * FROM gallery_users WHERE id = ?").get(userId);
  const entries = database.prepare("SELECT * FROM gallery_entries WHERE user_id = ?").all(userId);
  return { user, entries };
}

export function deleteGalleryAccount(userId: string) {
  database.prepare("DELETE FROM gallery_users WHERE id = ?").run(userId);
}

function parseEntryInput(input: unknown) {
  const value = galleryEntryInputSchema.parse(input);
  return {
    title: cleanText(value.title, 80),
    description: cleanText(value.description, 400),
    recipe: value.recipe,
    componentIds: value.componentIds satisfies RegistryComponentId[],
    tags: (value.tags ?? []).map((tag) => cleanText(tag, 32)).filter(Boolean),
    remixOf: value.remixOf ?? null,
  };
}

function cleanText(value: string, max: number) {
  return value.replace(/[<>]/gu, "").trim().slice(0, max);
}
