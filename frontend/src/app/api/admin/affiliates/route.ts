import { NextRequest } from "next/server";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { handleExtensionRoute } from "@/lib/extensions/route-handler";

export async function GET(request: NextRequest) {
  const { error } = requireAdminPermission(request, "affiliate:read");
  if (error) return error;
  return handleExtensionRoute(request, "GET", "/api/admin/affiliates");
}

export async function POST(request: NextRequest) {
  const { error } = requireAdminPermission(request, "affiliate:write");
  if (error) return error;
  return handleExtensionRoute(request, "POST", "/api/admin/affiliates");
}
