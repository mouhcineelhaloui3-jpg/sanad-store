import { NextRequest, NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { listCustomers } from "@/lib/db/customers";
import { parseListParams } from "@/lib/db/pagination";

export async function GET(request: NextRequest) {
  const { error } = requireAdminPermission(request, "customers:read");
  if (error) return error;

  const params = parseListParams(request.nextUrl.searchParams);
  const result = await listCustomers(params);
  return NextResponse.json(result);
}
