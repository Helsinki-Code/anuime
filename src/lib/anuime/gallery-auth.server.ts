import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "anuime_gallery_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

function secret() {
  return process.env.ANUIME_GALLERY_SESSION_SECRET ?? "local-gallery-secret-change-me";
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

export function createGallerySession() {
  const userId = randomUUID();
  const expiresAt = Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS;
  const payload = `${userId}.${expiresAt}`;
  return {
    userId,
    cookie: `${COOKIE_NAME}=${payload}.${sign(payload)}; Path=/api/gallery; HttpOnly; SameSite=Strict; Max-Age=${MAX_AGE_SECONDS}${process.env.NODE_ENV === "production" ? "; Secure" : ""}`,
  };
}

export function readGallerySession(request: Request) {
  const cookie = (request.headers.get("cookie") ?? "")
    .split(";")
    .map((value) => value.trim())
    .find((value) => value.startsWith(`${COOKIE_NAME}=`))
    ?.slice(COOKIE_NAME.length + 1);
  if (!cookie) return null;
  const [userId, expiresRaw, signature, ...rest] = cookie.split(".");
  if (!userId || !expiresRaw || !signature || rest.length > 0) return null;
  if (Number(expiresRaw) < Math.floor(Date.now() / 1000)) return null;
  const expected = sign(`${userId}.${expiresRaw}`);
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right) ? userId : null;
}

export function clearGallerySessionCookie() {
  return `${COOKIE_NAME}=; Path=/api/gallery; HttpOnly; SameSite=Strict; Max-Age=0`;
}
