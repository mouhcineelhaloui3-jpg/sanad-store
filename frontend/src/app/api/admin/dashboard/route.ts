import { NextRequest, NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { getDashboardOverview } from "@/lib/db/dashboard";

export async function GET(request: NextRequest) {
  const { error } = requireAdminPermission(request, "dashboard:read");
  if (error) return error;
  const overview = await getDashboardOverview();
  return NextResponse.json(overview);
}
