import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "@/lib/analytics/request-meta";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { deleteCustomers, getCustomerById, updateCustomer } from "@/lib/db/customers";
import type { CustomerSegment } from "@/generated/prisma/client";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  const { error } = requireAdminPermission(request, "customers:read");
  if (error) return error;

  const { id } = await context.params;
  const customer = await getCustomerById(id);
  if (!customer) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }
  return NextResponse.json(customer);
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { session, error } = requireAdminPermission(request, "customers:write");
  if (error || !session) return error;

  const { id } = await context.params;
  const body = (await request.json()) as {
    name?: string;
    email?: string;
    city?: string;
    country?: string;
    segment?: CustomerSegment;
    notes?: string;
  };

  try {
    const customer = await updateCustomer(id, body, { userId: session.userId, ip: getClientIp(request) });
    return NextResponse.json(customer);
  } catch {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const { session, error } = requireAdminPermission(request, "customers:write");
  if (error || !session) return error;

  const { id } = await context.params;
  const existing = await getCustomerById(id);
  if (!existing) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }

  await deleteCustomers([id], { userId: session.userId, ip: getClientIp(request) });
  return NextResponse.json({ ok: true });
}
