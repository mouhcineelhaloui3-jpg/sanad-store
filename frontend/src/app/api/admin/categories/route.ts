import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "@/lib/analytics/request-meta";
import { requireAdminPermission } from "@/lib/admin/auth-server";
import { createCategory, listCategories } from "@/lib/db/categories";
import { parseListParams } from "@/lib/db/pagination";

export async function GET(request: NextRequest) {
  const { error } = requireAdminPermission(request, "categories:read");
  if (error) return error;

  const params = parseListParams(request.nextUrl.searchParams);
  const result = await listCategories(params);
  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const { session, error } = requireAdminPermission(request, "categories:write");
  if (error || !session) return error;

  const body = (await request.json()) as {
    name?: string;
    slug?: string;
    description?: string;
    isActive?: boolean;
    sortOrder?: number;
  };

  if (!body.name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const category = await createCategory(
    {
      name: body.name,
      slug: body.slug,
      description: body.description,
      isActive: body.isActive,
      sortOrder: body.sortOrder
    },
    { userId: session.userId, ip: getClientIp(request) }
  );

  return NextResponse.json(category, { status: 201 });
}
