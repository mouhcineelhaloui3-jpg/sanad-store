import { NextRequest } from "next/server";
import { recordAuditLog } from "@/lib/admin/audit";
import { apiSuccess } from "@/lib/admin/api-response";
import { ADMIN_SESSION_COOKIE, CSRF_COOKIE } from "@/lib/admin/constants";
import { getSessionFromRequest, sessionCookieOptions } from "@/lib/admin/auth-server";

export async function POST(request: NextRequest) {
  try {
    const session = getSessionFromRequest(request);
    if (session) {
      recordAuditLog({
        actorId: session.userId,
        actorEmail: session.email,
        action: "logout",
        resource: "auth"
      });
    }

    const response = apiSuccess({ loggedOut: true });
    response.cookies.set(ADMIN_SESSION_COOKIE, "", { ...sessionCookieOptions, maxAge: 0 });
    response.cookies.set(CSRF_COOKIE, "", { ...sessionCookieOptions, httpOnly: false, maxAge: 0 });
    return response;
  } catch (error) {
    console.error("[api/admin/auth/logout] POST failed", error);
    const response = apiSuccess({ loggedOut: true });
    response.cookies.set(ADMIN_SESSION_COOKIE, "", { ...sessionCookieOptions, maxAge: 0 });
    return response;
  }
}
