import { createHmac, randomBytes, timingSafeEqual } from "crypto";
import type { NextRequest } from "next/server";
import { CSRF_COOKIE } from "./constants";

function getCsrfSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? process.env.ADMIN_API_KEY ?? "sanad-admin-dev";
}

export function createCsrfToken(): string {
  const nonce = randomBytes(16).toString("hex");
  const signature = createHmac("sha256", getCsrfSecret()).update(nonce).digest("hex");
  return `${nonce}.${signature}`;
}

export function verifyCsrfToken(token: string | undefined): boolean {
  if (!token) return false;

  try {
    const [nonce, signature] = token.split(".");
    if (!nonce || !signature) return false;

    const expected = createHmac("sha256", getCsrfSecret()).update(nonce).digest("hex");
    const sigBuffer = Buffer.from(signature, "utf8");
    const expectedBuffer = Buffer.from(expected, "utf8");

    if (sigBuffer.length !== expectedBuffer.length) return false;
    return timingSafeEqual(sigBuffer, expectedBuffer);
  } catch {
    return false;
  }
}

export function validateCsrf(request: NextRequest): boolean {
  const cookieToken = request.cookies.get(CSRF_COOKIE)?.value;
  const headerToken = request.headers.get("x-csrf-token");
  if (!cookieToken || !headerToken) return false;
  if (cookieToken !== headerToken) return false;
  return verifyCsrfToken(cookieToken);
}
