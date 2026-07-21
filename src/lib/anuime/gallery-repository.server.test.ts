import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, describe, expect, test, vi } from "vitest";

describe("gallery repository storage", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  test("does not touch the filesystem until a gallery operation needs storage", async () => {
    const directory = mkdtempSync(join(tmpdir(), "anuime-gallery-test-"));
    const databasePath = join(directory, "gallery.sqlite");
    vi.stubEnv("ANUIME_GALLERY_DB_PATH", databasePath);
    vi.resetModules();

    const repository = await import("./gallery-repository.server");
    expect(existsSync(databasePath)).toBe(false);

    repository.ensureGalleryUser("test-user", "Test User");
    expect(existsSync(databasePath)).toBe(true);

    rmSync(directory, { recursive: true, force: true });
  });

  test("uses the writable operating-system temp directory on Vercel", async () => {
    vi.stubEnv("ANUIME_GALLERY_DB_PATH", "");
    vi.stubEnv("VERCEL", "1");
    vi.resetModules();

    const { getGalleryDatabasePath } = await import("./gallery-repository.server");
    expect(getGalleryDatabasePath()).toBe(join(tmpdir(), "anuime-gallery.sqlite"));
  });
});
