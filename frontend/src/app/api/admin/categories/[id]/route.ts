import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "@/lib/analytics/request-meta";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { deleteCategory, updateCategory } from "@/lib/db/categories";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { session, error } = requireAdminPermission(request, "categories:write");
  if (error || !session) return error;

  const { id } = await context.params;
  const body = (await request.json()) as {
    name?: string;
    slug?: string;
    description?: string;
    isActive?: boolean;
    sortOrder?: number;
  };

  try {
    const category = await updateCategory(id, body, { userId: session.userId, ip: getClientIp(request) });
    return NextResponse.json(category);
  } catch {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const { session, error } = requireAdminPermission(request, "categories:write");
  if (error || !session) return error;

  const { id } = await context.params;

  try {
    await deleteCategory(id, { userId: session.userId, ip: getClientIp(request) });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }
}
