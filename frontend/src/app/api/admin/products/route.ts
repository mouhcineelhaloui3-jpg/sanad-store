import { NextRequest } from "next/server";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { handleExtensionRoute } from "@/lib/extensions/route-handler";

export async function GET(request: NextRequest) {
  const { error } = requireAdminPermission(request, "products:read");
  if (error) return error;
  return handleExtensionRoute(request, "GET", "/api/admin/products");
}

export async function POST(request: NextRequest) {
  const { error } = requireAdminPermission(request, "products:write");
  if (error) return error;
  return handleExtensionRoute(request, "POST", "/api/admin/products");
}
