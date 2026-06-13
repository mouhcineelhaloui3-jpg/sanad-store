import { NextRequest } from "next/server";
import { recordAuditLog } from "@/lib/admin/audit";
import { apiError, apiSuccess, parseJsonBody } from "@/lib/admin/api-response";
import {
  createAdminSessionToken,
  sessionCookieOptions
} from "@/lib/admin/auth-server";
import { ADMIN_SESSION_COOKIE, CSRF_COOKIE } from "@/lib/admin/constants";
import { createCsrfToken } from "@/lib/admin/csrf";
import { rateLimit } from "@/lib/admin/rate-limit";
import { roleLabel } from "@/lib/admin/rbac";
import { authenticateAdminAccessCode, authenticateAdminUser } from "@/lib/admin/users";
import { loginSchema, accessCodeSchema } from "@/lib/settings/schema";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "local";
  if (!rateLimit(`admin-login:${ip}`, 8, 60_000)) {
    return apiError("RATE_LIMITED", "Too many login attempts. Try again later.", 429);
  }

  try {
    const body = await parseJsonBody<unknown>(request);
    const loginParsed = loginSchema.safeParse(body);
    const codeParsed = accessCodeSchema.safeParse(body);

    let user = null;

    if (loginParsed.success) {
      user = authenticateAdminUser(loginParsed.data.email, loginParsed.data.password);
    } else if (codeParsed.success) {
      user = authenticateAdminAccessCode(codeParsed.data.password);
    } else {
      return apiError("INVALID_PAYLOAD", "Invalid login payload", 400);
    }
    if (!user) {
      return apiError("INVALID_CREDENTIALS", "Invalid email or password", 401);
    }

    const token = createAdminSessionToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    });

    const csrfToken = createCsrfToken();
    const response = apiSuccess({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        roleLabel: roleLabel(user.role)
      }
    });

    response.cookies.set(ADMIN_SESSION_COOKIE, token, sessionCookieOptions);
    response.cookies.set(CSRF_COOKIE, csrfToken, {
      ...sessionCookieOptions,
      httpOnly: false
    });

    recordAuditLog({
      actorId: user.id,
      actorEmail: user.email,
      action: "login",
      resource: "auth"
    });

    return response;
  } catch (error) {
    console.error("[api/admin/auth/login] POST failed", error);
    return apiError("LOGIN_FAILED", "Login failed", 500);
  }
}
