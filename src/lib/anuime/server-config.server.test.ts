import { afterEach, describe, expect, it, vi } from "vitest";

import { requiredProductionSecret, requiredSecret } from "./server-config.server";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("server credential configuration", () => {
  it("fails closed for blank production credentials", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("ANUIME_TEST_SECRET", " ");
    expect(() => requiredSecret("ANUIME_TEST_SECRET")).toThrow("ANUIME_TEST_SECRET");
    expect(() => requiredProductionSecret("ANUIME_TEST_SECRET")).toThrow("ANUIME_TEST_SECRET");
  });

  it("uses a process-local random development secret instead of a baked-in default", () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("ANUIME_TEST_SECRET", "");
    const first = requiredSecret("ANUIME_TEST_SECRET");
    expect(first.length).toBeGreaterThan(30);
    expect(requiredSecret("ANUIME_TEST_SECRET")).toBe(first);
    expect(() => requiredProductionSecret("ANUIME_TEST_SECRET")).toThrow("ANUIME_TEST_SECRET");
  });

  it("trims configured values", () => {
    vi.stubEnv("ANUIME_TEST_SECRET", "  configured-secret  ");
    expect(requiredSecret("ANUIME_TEST_SECRET")).toBe("configured-secret");
    expect(requiredProductionSecret("ANUIME_TEST_SECRET")).toBe("configured-secret");
  });
});
