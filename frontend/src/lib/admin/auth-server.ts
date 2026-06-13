import { createHmac, timingSafeEqual } from "crypto";
import type { NextRequest } from "next/server";
import { apiError } from "./api-response";
import { hasPermission, type AdminPermission, type AdminRole } from "./rbac";
import { getAdminUserById } from "./users";
import { ADMIN_SESSION_COOKIE } from "./constants";

export { ADMIN_SESSION_COOKIE };

export type AdminSession = {
  userId: string;
  email: string;
  name: string;
  role: AdminRole;
  issuedAt: number;
};

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? process.env.ADMIN_API_KEY ?? "sanad-admin-dev";
}

export function getAdminApiKey() {
  return process.env.ADMIN_API_KEY ?? "sanad-admin-dev";
}

export function createAdminSessionToken(session: Omit<AdminSession, "issuedAt"> & { issuedAt?: number }): string {
  const issuedAt = session.issuedAt ?? Date.now();
  const payload = `${session.userId}|${session.email}|${session.name}|${session.role}|${issuedAt}`;
  const payloadB64 = Buffer.from(payload, "utf8").toString("base64url");
  const signature = createHmac("sha256", getSessionSecret()).update(payloadB64).digest("hex");
  return `${payloadB64}.${signature}`;
}

export function parseAdminSessionToken(token: string | undefined): AdminSession | null {
  if (!token) return null;

  try {
    const [payloadB64, signature] = token.split(".");
    if (!payloadB64 || !signature) return null;

    const expected = createHmac("sha256", getSessionSecret()).update(payloadB64).digest("hex");
    const sigBuffer = Buffer.from(signature, "utf8");
    const expectedBuffer = Buffer.from(expected, "utf8");

    if (sigBuffer.length !== expectedBuffer.length || !timingSafeEqual(sigBuffer, expectedBuffer)) {
      return null;
    }

    const payload = Buffer.from(payloadB64, "base64url").toString("utf8");
    const [userId, email, name, role, issuedAtRaw] = payload.split("|");
    if (!userId || !email || !name || !role || !issuedAtRaw) return null;

    const user = getAdminUserById(userId);
    if (!user || !user.active) return null;

    return {
      userId,
      email,
      name,
      role: role as AdminRole,
      issuedAt: Number(issuedAtRaw)
    };
  } catch {
    return null;
  }
}

export function getSessionFromRequest(request: NextRequest): AdminSession | null {
  const apiKey = request.headers.get("x-admin-key");
  if (apiKey && apiKey === getAdminApiKey()) {
    const superUser = getAdminUserById("usr_super");
    if (!superUser) return null;
    return {
      userId: superUser.id,
      email: superUser.email,
      name: superUser.name,
      role: superUser.role,
      issuedAt: Date.now()
    };
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return parseAdminSessionToken(token);
}

export function isAdminAuthorized(request: NextRequest): boolean {
  return getSessionFromRequest(request) !== null;
}

export function requireAdminSession(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!session) return { session: null, error: apiError("UNAUTHORIZED", "Authentication required", 401) };
  return { session, error: null };
}

export function requireAdminPermission(request: NextRequest, permission: AdminPermission) {
  const { session, error } = requireAdminSession(request);
  if (error || !session) return { session: null, error: error ?? apiError("UNAUTHORIZED", "Authentication required", 401) };

  if (!hasPermission(session.role, permission)) {
    return { session: null, error: apiError("FORBIDDEN", "Insufficient permissions", 403) };
  }

  return { session, error: null };
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7
};
