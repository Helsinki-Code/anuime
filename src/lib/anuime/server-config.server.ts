import { randomBytes } from "node:crypto";

const ephemeralSecrets = new Map<string, string>();

/** Production never gets a baked-in credential; development gets a process-local secret. */
export function requiredSecret(name: string): string {
  const configured = process.env[name]?.trim();
  if (configured) return configured;
  if (process.env.NODE_ENV === "production") {
    throw new Error(`${name} must be configured in production.`);
  }
  const existing = ephemeralSecrets.get(name);
  if (existing) return existing;
  const generated = randomBytes(32).toString("base64url");
  ephemeralSecrets.set(name, generated);
  return generated;
}

export function requiredProductionSecret(name: string): string {
  const configured = process.env[name]?.trim();
  if (!configured) throw new Error(`${name} must be configured before enabling this service.`);
  return configured;
}
