import type { CouponStatus, CouponType, Prisma } from "@/generated/prisma/client";
import { appendAuditLog } from "./audit";
import { prisma } from "./prisma";
import { buildOrderBy, type ListParams, type PaginatedResult } from "./pagination";
import { removeSearchIndex, upsertSearchIndex } from "./search";

export type CouponDto = {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  expiresAt: string | null;
  usageLimit: number;
  usageCount: number;
  status: CouponStatus;
  createdAt: string;
};

function toDto(coupon: {
  id: string;
  code: string;
  type: CouponType;
  value: Prisma.Decimal;
  expiresAt: Date | null;
  usageLimit: number;
  usageCount: number;
  status: CouponStatus;
  createdAt: Date;
}): CouponDto {
  return {
    id: coupon.id,
    code: coupon.code,
    type: coupon.type,
    value: Number(coupon.value),
    expiresAt: coupon.expiresAt?.toISOString() ?? null,
    usageLimit: coupon.usageLimit,
    usageCount: coupon.usageCount,
    status: coupon.status,
    createdAt: coupon.createdAt.toISOString()
  };
}

export async function listCoupons(params: ListParams = {}): Promise<PaginatedResult<CouponDto>> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 20;
  const where: Prisma.CouponWhereInput = {};
  if (params.search) where.code = { contains: params.search, mode: "insensitive" };
  if (params.status) where.status = params.status as CouponStatus;

  const [total, rows] = await Promise.all([
    prisma.coupon.count({ where }),
    prisma.coupon.findMany({
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

export async function createCoupon(
  input: {
    code: string;
    type: CouponType;
    value: number;
    expiresAt?: string | null;
    usageLimit?: number;
    status?: CouponStatus;
  },
  audit?: { userId: string; ip?: string | null }
) {
  const coupon = await prisma.coupon.create({
    data: {
      code: input.code.toUpperCase(),
      type: input.type,
      value: input.value,
      expiresAt: input.expiresAt ? new Date(input.expiresAt) : null,
      usageLimit: input.usageLimit ?? 100,
      status: input.status ?? "active"
    }
  });
  const dto = toDto(coupon);
  await upsertSearchIndex({
    entityType: "coupon",
    entityId: dto.id,
    title: dto.code,
    subtitle: `${dto.type} · ${dto.value}`,
    href: `/admin/coupons`,
    keywords: dto.code
  });
  if (audit) {
    await appendAuditLog({
      userId: audit.userId,
      action: "coupon.create",
      module: "coupons",
      entityType: "coupon",
      entityId: dto.id,
      ip: audit.ip ?? null
    });
  }
  return dto;
}

export async function updateCoupon(
  id: string,
  input: Partial<{
    code: string;
    type: CouponType;
    value: number;
    expiresAt: string | null;
    usageLimit: number;
    status: CouponStatus;
  }>,
  audit?: { userId: string; ip?: string | null }
) {
  const coupon = await prisma.coupon.update({
    where: { id },
    data: {
      ...input,
      code: input.code?.toUpperCase(),
      expiresAt: input.expiresAt === undefined ? undefined : input.expiresAt ? new Date(input.expiresAt) : null
    }
  });
  const dto = toDto(coupon);
  if (audit) {
    await appendAuditLog({
      userId: audit.userId,
      action: "coupon.update",
      module: "coupons",
      entityType: "coupon",
      entityId: id,
      ip: audit.ip ?? null
    });
  }
  return dto;
}

export async function bulkUpdateCoupons(
  ids: string[],
  status: CouponStatus,
  audit?: { userId: string; ip?: string | null }
) {
  await prisma.coupon.updateMany({ where: { id: { in: ids } }, data: { status } });
  if (audit) {
    await appendAuditLog({
      userId: audit.userId,
      action: "coupon.bulk_update",
      module: "coupons",
      metadata: { ids, status },
      ip: audit.ip ?? null
    });
  }
}

export async function deleteCoupon(id: string, audit?: { userId: string; ip?: string | null }) {
  await prisma.coupon.delete({ where: { id } });
  await removeSearchIndex("coupon", id);
  if (audit) {
    await appendAuditLog({
      userId: audit.userId,
      action: "coupon.delete",
      module: "coupons",
      entityType: "coupon",
      entityId: id,
      ip: audit.ip ?? null
    });
  }
}
