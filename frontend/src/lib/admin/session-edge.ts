import type { NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE } from "./constants";

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? process.env.ADMIN_API_KEY ?? "sanad-admin-dev";
}

function decodeBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
  return atob(padded);
}

async function hmacSha256Hex(secret: string, message: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function parseAdminSessionFromRequest(request: NextRequest): Promise<{ userId: string; role: string } | null> {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return null;

  const [payloadB64, signature] = token.split(".");
  if (!payloadB64 || !signature) return null;

  try {
    const expected = await hmacSha256Hex(getSessionSecret(), payloadB64);
    if (expected.length !== signature.length) return null;

    let mismatch = 0;
    for (let index = 0; index < expected.length; index++) {
      mismatch |= expected.charCodeAt(index) ^ signature.charCodeAt(index);
    }

    if (mismatch !== 0) return null;

    const payload = decodeBase64Url(payloadB64);
    const [userId, , , role] = payload.split("|");
    if (!userId || !role) return null;
    return { userId, role };
  } catch {
    return null;
  }
}

export async function hasValidAdminSessionCookie(request: NextRequest): Promise<boolean> {
  return (await parseAdminSessionFromRequest(request)) !== null;
}
