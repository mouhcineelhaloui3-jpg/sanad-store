import { NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/admin/api-response";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { getAnalyticsSummary } from "@/lib/analytics/server";

export async function GET(request: NextRequest) {
  const { error } = requireAdminPermission(request, "analytics:read");
  if (error) return error;

  try {
    const summary = await getAnalyticsSummary();
    return apiSuccess(summary);
  } catch (err) {
    console.error("[api/admin/analytics] GET failed", err);
    return apiError("ANALYTICS_FETCH_FAILED", "Failed to load analytics", 500);
  }
}
