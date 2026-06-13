import { createHmac, timingSafeEqual } from "crypto";

export type JwtPayload = {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
};

function secret() {
  return process.env.JWT_SECRET ?? process.env.ADMIN_SESSION_SECRET ?? "sanad-jwt-dev";
}

function b64url(input: string | Buffer) {
  return Buffer.from(input).toString("base64url");
}

function fromB64url(input: string) {
  return Buffer.from(input, "base64url").toString("utf8");
}

export function signJwt(payload: Omit<JwtPayload, "iat" | "exp">, ttlSeconds = 60 * 60 * 8): string {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + ttlSeconds;
  const body = b64url(JSON.stringify({ ...payload, iat, exp }));
  const sig = createHmac("sha256", secret()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verifyJwt(token: string): JwtPayload | null {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = createHmac("sha256", secret()).update(body).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(fromB64url(body)) as JwtPayload;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}
