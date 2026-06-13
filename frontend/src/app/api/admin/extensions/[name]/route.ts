import { NextRequest } from "next/server";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { handleExtensionRoute } from "@/lib/extensions/route-handler";

type Params = { params: Promise<{ name: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  const { error } = requireAdminPermission(request, "extensions:write");
  if (error) return error;
  const { name } = await params;
  return handleExtensionRoute(request, "PUT", `/api/admin/extensions/${name}`, { name });
}
