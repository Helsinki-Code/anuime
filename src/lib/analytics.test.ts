import { describe, expect, it } from "vitest";

import { parseProductEvent } from "./analytics";

describe("privacy-safe product events", () => {
  it("accepts allowlisted non-personal fields", () => {
    expect(parseProductEvent({ name: "component_selected", componentId: "button" })).toEqual({
      name: "component_selected",
      componentId: "button",
      character: undefined,
    });
  });

  it("rejects unknown events and non-string metadata", () => {
    expect(parseProductEvent({ name: "email_captured", email: "person@example.com" })).toBeNull();
    expect(
      parseProductEvent({ name: "component_selected", componentId: { recipe: "secret" } }),
    ).toBeNull();
  });
});
