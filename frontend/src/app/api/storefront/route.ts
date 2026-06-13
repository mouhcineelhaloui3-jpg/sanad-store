import { NextResponse } from "next/server";
import { apiSuccess } from "@/lib/admin/api-response";
import { defaultStoreContent } from "@/lib/cms/defaults";
import { getStoreContent } from "@/lib/cms/server";
import { logEnvHealth } from "@/lib/env/check";

export async function GET() {
  logEnvHealth("api/storefront");

  try {
    const content = await getStoreContent();
    return apiSuccess(content);
  } catch (error) {
    console.error("[api/storefront] GET failed, returning defaults", error);
    return apiSuccess(defaultStoreContent());
  }
}
