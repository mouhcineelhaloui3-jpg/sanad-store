import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "@/lib/analytics/request-meta";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { deleteProduct, getProductById, updateProduct } from "@/lib/db/products";
import { parseProductForm, parseProductUpdate } from "@/lib/products/schema";

type RouteContext = { params: Promise<{ id: string }> };

function validationError(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export async function GET(request: NextRequest, context: RouteContext) {
  const { error } = requireAdminPermission(request, "products:read");
  if (error) return error;

  const { id } = await context.params;
  const product = await getProductById(id);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json(product);
}

async function handleUpdate(request: NextRequest, context: RouteContext) {
  const { session, error } = requireAdminPermission(request, "products:write");
  if (error || !session) return error;

  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  if (!body) return validationError("Invalid JSON body");

  const isPut = request.method === "PUT";
  const parsed = isPut ? parseProductForm(body) : parseProductUpdate(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message ?? "Validation failed";
    return validationError(firstIssue);
  }

  const product = await updateProduct(id, parsed.data, { userId: session.userId, ip: getClientIp(request) });
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  return handleUpdate(request, context);
}

export async function PUT(request: NextRequest, context: RouteContext) {
  return handleUpdate(request, context);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const { session, error } = requireAdminPermission(request, "products:write");
  if (error || !session) return error;

  const { id } = await context.params;
  const ok = await deleteProduct(id, { userId: session.userId, ip: getClientIp(request) });
  if (!ok) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
