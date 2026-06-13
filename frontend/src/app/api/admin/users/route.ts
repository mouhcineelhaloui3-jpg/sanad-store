import { NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/admin/api-response";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { getPublicAdminUsers } from "@/lib/admin/users";

export async function GET(request: NextRequest) {
  const { error } = requireAdminPermission(request, "users:read");
  if (error) return error;

  try {
    return apiSuccess({ users: getPublicAdminUsers(), tenantId: "sanad-default" });
  } catch (err) {
    console.error("[api/admin/users] GET failed", err);
    return apiError("USERS_FETCH_FAILED", "Failed to load users", 500);
  }
}
