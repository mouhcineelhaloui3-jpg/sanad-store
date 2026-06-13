import type { Prisma } from "@/generated/prisma/client";
import { appendAuditLog } from "./audit";
import { prisma } from "./prisma";
import { removeSearchIndex, upsertSearchIndex } from "./search";

export type ProductDto = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  duration: string;
  category: string;
  quality: string;
  deviceLimit: number;
  isActive: boolean;
  visibleFrom: string | null;
  visibleTo: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateProductInput = {
  name: string;
  description?: string | null;
  price: number;
  duration: string;
  category: string;
  quality: string;
  deviceLimit: number;
  isActive: boolean;
  visibleFrom?: string | null;
  visibleTo?: string | null;
};

export type UpdateProductInput = Partial<CreateProductInput>;

function toProductDto(product: {
  id: string;
  name: string;
  description: string | null;
  price: Prisma.Decimal;
  duration: string;
  categorySlug: string;
  quality: string;
  deviceLimit: number;
  isActive: boolean;
  visibleFrom: Date | null;
  visibleTo: Date | null;
  createdAt: Date;
  updatedAt: Date;
}): ProductDto {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: Number(product.price),
    duration: product.duration,
    category: product.categorySlug,
    quality: product.quality,
    deviceLimit: product.deviceLimit,
    isActive: product.isActive,
    visibleFrom: product.visibleFrom?.toISOString() ?? null,
    visibleTo: product.visibleTo?.toISOString() ?? null,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString()
  };
}

async function indexProduct(product: ProductDto) {
  await upsertSearchIndex({
    entityType: "product",
    entityId: product.id,
    title: product.name,
    subtitle: `${product.duration} · ${product.price} MAD`,
    href: `/admin/products/${product.id}`,
    keywords: `${product.category} ${product.quality}`
  });
}

export async function listProducts(): Promise<ProductDto[]> {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  return products.map(toProductDto);
}

export async function getProductById(id: string): Promise<ProductDto | null> {
  const product = await prisma.product.findUnique({ where: { id } });
  return product ? toProductDto(product) : null;
}

export async function createProduct(
  input: CreateProductInput,
  audit?: { userId: string; ip?: string | null }
): Promise<ProductDto> {
  const product = await prisma.product.create({
    data: {
      name: input.name,
      description: input.description ?? null,
      price: input.price,
      duration: input.duration,
      categorySlug: input.category,
      quality: input.quality,
      deviceLimit: input.deviceLimit,
      isActive: input.isActive,
      visibleFrom: input.visibleFrom ? new Date(input.visibleFrom) : null,
      visibleTo: input.visibleTo ? new Date(input.visibleTo) : null
    }
  });

  const dto = toProductDto(product);
  await indexProduct(dto);

  if (audit) {
    await appendAuditLog({
      userId: audit.userId,
      action: "product.create",
      module: "products",
      entityType: "product",
      entityId: dto.id,
      metadata: { name: dto.name },
      ip: audit.ip ?? null
    });
  }

  return dto;
}

export async function updateProduct(
  id: string,
  input: UpdateProductInput,
  audit?: { userId: string; ip?: string | null }
): Promise<ProductDto | null> {
  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) return null;

  const product = await prisma.product.update({
    where: { id },
    data: {
      name: input.name,
      description: input.description === undefined ? undefined : input.description ?? null,
      price: input.price,
      duration: input.duration,
      categorySlug: input.category,
      quality: input.quality,
      deviceLimit: input.deviceLimit,
      isActive: input.isActive,
      visibleFrom: input.visibleFrom === undefined ? undefined : input.visibleFrom ? new Date(input.visibleFrom) : null,
      visibleTo: input.visibleTo === undefined ? undefined : input.visibleTo ? new Date(input.visibleTo) : null
    }
  });

  const dto = toProductDto(product);
  await indexProduct(dto);

  if (audit) {
    await appendAuditLog({
      userId: audit.userId,
      action: "product.update",
      module: "products",
      entityType: "product",
      entityId: id,
      metadata: input as Prisma.InputJsonValue,
      ip: audit.ip ?? null
    });
  }

  return dto;
}

export async function deleteProduct(id: string, audit?: { userId: string; ip?: string | null }) {
  try {
    await prisma.product.delete({ where: { id } });
    await removeSearchIndex("product", id);

    if (audit) {
      await appendAuditLog({
        userId: audit.userId,
        action: "product.delete",
        module: "products",
        entityType: "product",
        entityId: id,
        ip: audit.ip ?? null
      });
    }

    return true;
  } catch {
    return false;
  }
}
