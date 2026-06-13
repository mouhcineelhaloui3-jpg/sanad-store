import { NextRequest } from "next/server";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { handleExtensionRoute } from "@/lib/extensions/route-handler";

type Params = { params: Promise<{ platform: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  const { error } = requireAdminPermission(request, "ads:write");
  if (error) return error;
  const { platform } = await params;
  return handleExtensionRoute(request, "PUT", `/api/admin/ads/${platform}`, { platform });
}
