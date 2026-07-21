import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "anuime_director_session";
const MAX_AGE_SECONDS = 30 * 60;

function secret() {
  return (
    process.env.ANUIME_DIRECTOR_SESSION_SECRET ?? "local-development-director-secret-change-me"
  );
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

export function createDirectorSession() {
  const sessionId = randomUUID();
  const expiresAt = Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS;
  const payload = `${sessionId}.${expiresAt}`;
  const cookieValue = `${payload}.${sign(payload)}`;
  return {
    sessionId,
    csrfToken: sign(`${sessionId}.csrf`),
    cookie: `${COOKIE_NAME}=${cookieValue}; Path=/api/director; HttpOnly; SameSite=Strict; Max-Age=${MAX_AGE_SECONDS}${process.env.NODE_ENV === "production" ? "; Secure" : ""}`,
  };
}

export function verifyDirectorRequest(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const rawCookie = cookieHeader
    .split(";")
    .map((value) => value.trim())
    .find((value) => value.startsWith(`${COOKIE_NAME}=`))
    ?.slice(COOKIE_NAME.length + 1);
  if (!rawCookie) return null;
  const [sessionId, expiresRaw, signature, ...rest] = rawCookie.split(".");
  if (!sessionId || !expiresRaw || !signature || rest.length > 0) return null;
  if (Number(expiresRaw) < Math.floor(Date.now() / 1000)) return null;
  const expectedSignature = sign(`${sessionId}.${expiresRaw}`);
  if (!safeEqual(signature, expectedSignature)) return null;
  const csrf = request.headers.get("x-anuime-csrf") ?? "";
  if (!safeEqual(csrf, sign(`${sessionId}.csrf`))) return null;
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return null;
  return sessionId;
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}
