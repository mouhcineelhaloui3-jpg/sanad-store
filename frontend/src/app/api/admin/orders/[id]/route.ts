import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "@/lib/analytics/request-meta";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { getOrderById, updateOrder } from "@/lib/db/orders";
import type { OrderStatus, PaymentStatus, ShippingStatus } from "@/generated/prisma/client";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  const { error } = requireAdminPermission(request, "orders:read");
  if (error) return error;

  const { id } = await context.params;
  const order = await getOrderById(id);
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }
  return NextResponse.json(order);
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { session, error } = requireAdminPermission(request, "orders:write");
  if (error || !session) return error;

  const { id } = await context.params;
  const body = (await request.json()) as {
    status?: OrderStatus;
    paymentStatus?: PaymentStatus;
    shippingStatus?: ShippingStatus;
    notes?: string;
  };

  const order = await updateOrder(id, body, { userId: session.userId, ip: getClientIp(request) });
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }
  return NextResponse.json(order);
}
