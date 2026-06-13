import { NextRequest, NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { createProduct, listProducts } from "@/lib/db/products";
import { getClientIp } from "@/lib/analytics/request-meta";
import { parseProductForm } from "@/lib/products/schema";

export async function GET(request: NextRequest) {
  const { error } = requireAdminPermission(request, "products:read");
  if (error) return error;
  const products = await listProducts();
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const { session, error } = requireAdminPermission(request, "products:write");
  if (error || !session) return error;

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = parseProductForm(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message ?? "Validation failed";
    return NextResponse.json({ error: firstIssue }, { status: 400 });
  }

  const product = await createProduct(
    {
      name: parsed.data.name,
      description: parsed.data.description || null,
      price: parsed.data.price,
      duration: parsed.data.duration,
      category: parsed.data.category,
      quality: parsed.data.quality,
      deviceLimit: parsed.data.deviceLimit,
      isActive: parsed.data.isActive,
      visibleFrom: parsed.data.visibleFrom || null,
      visibleTo: parsed.data.visibleTo || null
    },
    { userId: session.userId, ip: getClientIp(request) }
  );

  return NextResponse.json(product, { status: 201 });
}
