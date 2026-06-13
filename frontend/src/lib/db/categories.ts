import type { Prisma } from "@/generated/prisma/client";
import { appendAuditLog } from "./audit";
import { prisma } from "./prisma";
import { buildOrderBy, type ListParams, type PaginatedResult } from "./pagination";
import { removeSearchIndex, upsertSearchIndex } from "./search";

export type CategoryDto = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  isActive: boolean;
  sortOrder: number;
  productCount: number;
  createdAt: string;
};

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function toDto(category: {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  _count?: { products: number };
}) {
  const count =
    category._count?.products ??
    (await prisma.product.count({ where: { categoryId: category.id } }));
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    isActive: category.isActive,
    sortOrder: category.sortOrder,
    productCount: count,
    createdAt: category.createdAt.toISOString()
  };
}

export async function listCategories(params: ListParams = {}): Promise<PaginatedResult<CategoryDto>> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 50;
  const where: Prisma.CategoryWhereInput = {};
  if (params.search) {
    where.OR = [
      { name: { contains: params.search, mode: "insensitive" } },
      { slug: { contains: params.search, mode: "insensitive" } }
    ];
  }

  const [total, rows] = await Promise.all([
    prisma.category.count({ where }),
    prisma.category.findMany({
      where,
      orderBy: [{ sortOrder: "asc" }, buildOrderBy(params.sort)],
      skip: (page - 1) * limit,
      take: limit,
      include: { _count: { select: { products: true } } }
    })
  ]);

  const items = await Promise.all(rows.map((row) => toDto(row)));
  return { items, total, page, limit, totalPages: Math.max(1, Math.ceil(total / limit)) };
}

export async function createCategory(
  input: { name: string; slug?: string; description?: string; isActive?: boolean; sortOrder?: number },
  audit?: { userId: string; ip?: string | null }
) {
  const slug = input.slug?.trim() || slugify(input.name);
  const category = await prisma.category.create({
    data: {
      name: input.name,
      slug,
      description: input.description ?? null,
      isActive: input.isActive ?? true,
      sortOrder: input.sortOrder ?? 0
    },
    include: { _count: { select: { products: true } } }
  });
  const dto = await toDto(category);
  await upsertSearchIndex({
    entityType: "category",
    entityId: dto.id,
    title: dto.name,
    subtitle: dto.slug,
    href: `/admin/categories`,
    keywords: dto.slug
  });
  if (audit) {
    await appendAuditLog({
      userId: audit.userId,
      action: "category.create",
      module: "categories",
      entityType: "category",
      entityId: dto.id,
      ip: audit.ip ?? null
    });
  }
  return dto;
}

export async function updateCategory(
  id: string,
  input: Partial<{ name: string; slug: string; description: string; isActive: boolean; sortOrder: number }>,
  audit?: { userId: string; ip?: string | null }
) {
  const category = await prisma.category.update({
    where: { id },
    data: input,
    include: { _count: { select: { products: true } } }
  });
  const dto = await toDto(category);
  if (audit) {
    await appendAuditLog({
      userId: audit.userId,
      action: "category.update",
      module: "categories",
      entityType: "category",
      entityId: id,
      ip: audit.ip ?? null
    });
  }
  return dto;
}

export async function deleteCategory(id: string, audit?: { userId: string; ip?: string | null }) {
  await prisma.category.delete({ where: { id } });
  await removeSearchIndex("category", id);
  if (audit) {
    await appendAuditLog({
      userId: audit.userId,
      action: "category.delete",
      module: "categories",
      entityType: "category",
      entityId: id,
      ip: audit.ip ?? null
    });
  }
}
