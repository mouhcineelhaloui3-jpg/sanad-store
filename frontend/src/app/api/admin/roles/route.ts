import { NextRequest, NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { listRolesWithStats } from "@/lib/db/roles";

export async function GET(request: NextRequest) {
  const { error } = requireAdminPermission(request, "users:read");
  if (error) return error;

  const roles = await listRolesWithStats();
  return NextResponse.json(roles);
}
