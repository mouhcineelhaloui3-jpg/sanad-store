import { NextRequest } from "next/server";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { handleExtensionRoute } from "@/lib/extensions/route-handler";

type Params = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: Params) {
  const { error } = requireAdminPermission(request, "products:read");
  if (error) return error;
  const { id } = await params;
  return handleExtensionRoute(request, "GET", `/api/admin/products/${id}`, { id });
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { error } = requireAdminPermission(request, "products:write");
  if (error) return error;
  const { id } = await params;
  return handleExtensionRoute(request, "PUT", `/api/admin/products/${id}`, { id });
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const { error } = requireAdminPermission(request, "products:write");
  if (error) return error;
  const { id } = await params;
  return handleExtensionRoute(request, "DELETE", `/api/admin/products/${id}`, { id });
}
