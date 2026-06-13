import { NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/admin/api-response";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { getAuditLogs } from "@/lib/admin/audit";

export async function GET(request: NextRequest) {
  const { error } = requireAdminPermission(request, "logs:read");
  if (error) return error;

  try {
    const logs = await getAuditLogs(100);
    return apiSuccess({ logs });
  } catch (err) {
    console.error("[api/admin/logs] GET failed", err);
    return apiError("LOGS_FETCH_FAILED", "Failed to load activity logs", 500);
  }
}
