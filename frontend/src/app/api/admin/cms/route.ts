import { NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/admin/api-response";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { validateCsrf } from "@/lib/admin/csrf";
import { recordAuditLog } from "@/lib/admin/audit";
import { defaultStoreContent } from "@/lib/cms/defaults";
import { getStoreContent, saveStoreContent } from "@/lib/cms/server";
import type { StoreContent } from "@/lib/cms/types";

export async function GET(request: NextRequest) {
  const { error } = requireAdminPermission(request, "cms:read");
  if (error) return error;

  try {
    const content = await getStoreContent();
    return apiSuccess(content);
  } catch (err) {
    console.error("[api/admin/cms] GET failed, returning defaults", err);
    return apiSuccess(defaultStoreContent());
  }
}

export async function PUT(request: NextRequest) {
  const { session, error } = requireAdminPermission(request, "cms:write");
  if (error) return error;

  if (!validateCsrf(request)) {
    return apiError("CSRF_INVALID", "Invalid CSRF token", 403);
  }

  try {
    const body = (await request.json()) as StoreContent;
    const saved = await saveStoreContent(body);

    if (session) {
      recordAuditLog({
        actorId: session.userId,
        actorEmail: session.email,
        action: "update",
        resource: "cms"
      });
    }

    return apiSuccess(saved);
  } catch (err) {
    console.error("[api/admin/cms] PUT failed", err);
    return apiError("CMS_SAVE_FAILED", "Failed to save CMS content", 500);
  }
}
