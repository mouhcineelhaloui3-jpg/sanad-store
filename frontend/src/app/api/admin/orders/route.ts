import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "@/lib/analytics/request-meta";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { listOrders } from "@/lib/db/orders";

export async function GET(request: NextRequest) {
  const { error } = requireAdminPermission(request, "orders:read");
  if (error) return error;
  const orders = await listOrders();
  return NextResponse.json(orders);
}
