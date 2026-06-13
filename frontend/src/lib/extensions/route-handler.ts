import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { HttpMethod } from "@sanad/core";
import { parseAdminSessionToken } from "@/lib/admin/auth-server";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin/constants";
import { dispatchExtensionApi } from "./server";

export async function handleExtensionRoute(
  request: NextRequest,
  method: HttpMethod,
  pathname: string,
  params: Record<string, string> = {}
) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const session = parseAdminSessionToken(token);

  let body: unknown = undefined;
  if (method !== "GET" && method !== "DELETE") {
    try {
      body = await request.json();
    } catch {
      body = undefined;
    }
  }

  const query = Object.fromEntries(request.nextUrl.searchParams.entries());
  const result = await dispatchExtensionApi(method, pathname, {
    params,
    query,
    body,
    userId: session?.userId,
    userRole: session?.role
  });

  if (!result) {
    return NextResponse.json({ ok: false, error: "Route not found" }, { status: 404 });
  }

  return NextResponse.json(result.body, { status: result.status });
}
