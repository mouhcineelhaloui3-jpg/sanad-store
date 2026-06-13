import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { hasPermission, permissionForAdminPath, type AdminRole } from "@/lib/admin/rbac";
import { hasValidAdminSessionCookie, parseAdminSessionFromRequest } from "@/lib/admin/session-edge";

const securityHeaders: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "X-DNS-Prefetch-Control": "on"
};

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  for (const [key, value] of Object.entries(securityHeaders)) {
    response.headers.set(key, value);
  }

  const path = request.nextUrl.pathname;

  if (path.startsWith("/api/subscription-orders") || path.startsWith("/api/trial-requests")) {
    if (request.method === "GET") {
      const adminKey = request.headers.get("x-admin-key");
      const expected = process.env.ADMIN_API_KEY ?? "";
      if (!expected || adminKey !== expected) {
        return NextResponse.json({ ok: false, error: { code: "UNAUTHORIZED", message: "Unauthorized" } }, { status: 401 });
      }
    }
  }

  if (path.startsWith("/admin") && path !== "/admin/login") {
    const session = await parseAdminSessionFromRequest(request);
    if (!session) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("next", path);
      return NextResponse.redirect(loginUrl);
    }

    const requiredPermission = permissionForAdminPath(path);
    if (requiredPermission && !hasPermission(session.role as AdminRole, requiredPermission)) {
      return NextResponse.redirect(new URL("/admin?forbidden=1", request.url));
    }
  }

  if (path === "/admin/login") {
    const validSession = await hasValidAdminSessionCookie(request);
    if (validSession) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|opengraph-image).*)"]
};
