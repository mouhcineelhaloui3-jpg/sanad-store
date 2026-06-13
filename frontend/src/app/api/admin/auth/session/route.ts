import { NextRequest } from "next/server";
import { apiSuccess } from "@/lib/admin/api-response";
import { getSessionFromRequest } from "@/lib/admin/auth-server";
import { roleLabel } from "@/lib/admin/rbac";

export async function GET(request: NextRequest) {
  try {
    const session = getSessionFromRequest(request);

    if (!session) {
      return apiSuccess({ authenticated: false, user: null });
    }

    return apiSuccess({
      authenticated: true,
      user: {
        id: session.userId,
        email: session.email,
        name: session.name,
        role: session.role,
        roleLabel: roleLabel(session.role)
      }
    });
  } catch (error) {
    console.error("[api/admin/auth/session] GET failed", error);
    return apiSuccess({ authenticated: false, user: null });
  }
}
