import type { ReviewStatus, Prisma } from "@/generated/prisma/client";
import { appendAuditLog } from "./audit";
import { prisma } from "./prisma";
import { buildOrderBy, type ListParams, type PaginatedResult } from "./pagination";

export type ReviewDto = {
  id: string;
  customerName: string;
  productName: string;
  rating: number;
  text: string;
  status: ReviewStatus;
  createdAt: string;
};

function toDto(review: {
  id: string;
  customerName: string;
  productName: string;
  rating: number;
  text: string;
  status: ReviewStatus;
  createdAt: Date;
}): ReviewDto {
  return {
    id: review.id,
    customerName: review.customerName,
    productName: review.productName,
    rating: review.rating,
    text: review.text,
    status: review.status,
    createdAt: review.createdAt.toISOString()
  };
}

export async function listReviews(params: ListParams = {}): Promise<PaginatedResult<ReviewDto>> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 20;
  const where: Prisma.ReviewWhereInput = {};
  if (params.search) {
    where.OR = [
      { customerName: { contains: params.search, mode: "insensitive" } },
      { productName: { contains: params.search, mode: "insensitive" } },
      { text: { contains: params.search, mode: "insensitive" } }
    ];
  }
  if (params.status) where.status = params.status as ReviewStatus;

  const [total, rows] = await Promise.all([
    prisma.review.count({ where }),
    prisma.review.findMany({
      where,
      orderBy: buildOrderBy(params.sort),
      skip: (page - 1) * limit,
      take: limit
    })
  ]);

  return {
    items: rows.map(toDto),
    total,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(total / limit))
  };
}

export async function createReview(
  input: {
    customerName: string;
    productName: string;
    rating: number;
    text: string;
    customerId?: string;
    productId?: string;
  },
  audit?: { userId: string; ip?: string | null }
) {
  const review = await prisma.review.create({
    data: {
      customerName: input.customerName,
      productName: input.productName,
      rating: input.rating,
      text: input.text,
      customerId: input.customerId ?? null,
      productId: input.productId ?? null,
      status: "pending"
    }
  });
  const dto = toDto(review);
  if (audit) {
    await appendAuditLog({
      userId: audit.userId,
      action: "review.create",
      module: "reviews",
      entityType: "review",
      entityId: dto.id,
      ip: audit.ip ?? null
    });
  }
  return dto;
}

export async function bulkUpdateReviews(
  ids: string[],
  status: ReviewStatus,
  audit?: { userId: string; ip?: string | null }
) {
  await prisma.review.updateMany({ where: { id: { in: ids } }, data: { status } });
  if (audit) {
    await appendAuditLog({
      userId: audit.userId,
      action: "review.bulk_update",
      module: "reviews",
      metadata: { ids, status },
      ip: audit.ip ?? null
    });
  }
}

export async function deleteReview(id: string, audit?: { userId: string; ip?: string | null }) {
  await prisma.review.delete({ where: { id } });
  if (audit) {
    await appendAuditLog({
      userId: audit.userId,
      action: "review.delete",
      module: "reviews",
      entityType: "review",
      entityId: id,
      ip: audit.ip ?? null
    });
  }
}
