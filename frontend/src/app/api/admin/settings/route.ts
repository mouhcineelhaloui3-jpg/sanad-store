import { NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/admin/api-response";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { validateCsrf } from "@/lib/admin/csrf";
import { recordAuditLog } from "@/lib/admin/audit";
import { logEnvHealth } from "@/lib/env/check";
import { defaultSiteSettings, siteSettingsSchema } from "@/lib/settings/schema";
import { getSiteSettings, saveSiteSettings } from "@/lib/settings/server";

export async function GET(request: NextRequest) {
  logEnvHealth("api/admin/settings");

  const { error } = requireAdminPermission(request, "settings:read");
  if (error) return error;

  try {
    const settings = await getSiteSettings();
    return apiSuccess(settings);
  } catch (err) {
    console.error("[api/admin/settings] GET failed, returning defaults", err);
    return apiSuccess(defaultSiteSettings());
  }
}

export async function PUT(request: NextRequest) {
  const { session, error } = requireAdminPermission(request, "settings:write");
  if (error) return error;

  if (!validateCsrf(request)) {
    return apiError("CSRF_INVALID", "Invalid CSRF token", 403);
  }

  try {
    const body = await request.json();
    const parsed = siteSettingsSchema.safeParse(body);

    if (!parsed.success) {
      return apiError("INVALID_SETTINGS", "Invalid settings payload", 400);
    }

    const saved = await saveSiteSettings(parsed.data);

    if (session) {
      recordAuditLog({
        actorId: session.userId,
        actorEmail: session.email,
        action: "update",
        resource: "settings"
      });
    }

    return apiSuccess(saved);
  } catch (err) {
    console.error("[api/admin/settings] PUT failed", err);
    return apiError("SETTINGS_SAVE_FAILED", "Failed to save settings", 500);
  }
}
