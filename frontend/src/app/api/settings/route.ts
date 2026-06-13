import { NextResponse } from "next/server";
import { apiSuccess } from "@/lib/admin/api-response";
import { defaultSiteSettings } from "@/lib/settings/schema";
import { getSiteSettings } from "@/lib/settings/server";
import { logEnvHealth } from "@/lib/env/check";

export async function GET() {
  logEnvHealth("api/settings");

  try {
    const settings = await getSiteSettings();
    return apiSuccess(settings);
  } catch (error) {
    console.error("[api/settings] GET failed, returning defaults", error);
    return apiSuccess(defaultSiteSettings());
  }
}
