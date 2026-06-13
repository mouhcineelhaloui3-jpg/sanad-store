import { NextRequest } from "next/server";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { handleExtensionRoute } from "@/lib/extensions/route-handler";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  const { error } = requireAdminPermission(request, "automation:write");
  if (error) return error;
  const { id } = await params;
  return handleExtensionRoute(request, "PUT", `/api/admin/automation/${id}`, { id });
}
