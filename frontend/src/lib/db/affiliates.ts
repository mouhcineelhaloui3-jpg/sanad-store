import type { AffiliateStatus, Prisma } from "@/generated/prisma/client";
import { appendAuditLog } from "./audit";
import { prisma } from "./prisma";
import { buildOrderBy, type ListParams, type PaginatedResult } from "./pagination";
import { upsertSearchIndex } from "./search";

export type AffiliateDto = {
  id: string;
  name: string;
  code: string;
  email: string | null;
  phone: string | null;
  commission: number;
  clicks: number;
  conversions: number;
  earnings: number;
  whatsappLeads: number;
  conversionRate: number;
  status: AffiliateStatus;
  enabled: boolean;
  createdAt: string;
};

function toDto(row: {
  id: string;
  name: string;
  code: string;
  email: string | null;
  phone: string | null;
  commission: Prisma.Decimal;
  clicks: number;
  conversions: number;
  earnings: Prisma.Decimal;
  whatsappLeads: number;
  status: AffiliateStatus;
  enabled: boolean;
  createdAt: Date;
}): AffiliateDto {
  const conversionRate = row.clicks > 0 ? Math.round((row.conversions / row.clicks) * 1000) / 10 : 0;
  return {
    id: row.id,
    name: row.name,
    code: row.code,
    email: row.email,
    phone: row.phone,
    commission: Number(row.commission),
    clicks: row.clicks,
    conversions: row.conversions,
    earnings: Number(row.earnings),
    whatsappLeads: row.whatsappLeads,
    conversionRate,
    status: row.status,
    enabled: row.enabled,
    createdAt: row.createdAt.toISOString()
  };
}

export async function listAffiliates(params: ListParams = {}): Promise<PaginatedResult<AffiliateDto>> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 20;
  const where: Prisma.AffiliateWhereInput = {};
  if (params.search) {
    where.OR = [
      { name: { contains: params.search, mode: "insensitive" } },
      { code: { contains: params.search, mode: "insensitive" } }
    ];
  }
  if (params.status) where.status = params.status as AffiliateStatus;

  const [total, rows] = await Promise.all([
    prisma.affiliate.count({ where }),
    prisma.affiliate.findMany({
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

export async function createAffiliate(
  input: { name: string; code: string; email?: string; phone?: string; commission?: number; enabled?: boolean },
  audit?: { userId: string; ip?: string | null }
) {
  const row = await prisma.affiliate.create({
    data: {
      name: input.name,
      code: input.code.toUpperCase(),
      email: input.email ?? null,
      phone: input.phone ?? null,
      commission: input.commission ?? 0,
      enabled: input.enabled ?? true,
      status: "active"
    }
  });
  const dto = toDto(row);
  await upsertSearchIndex({
    entityType: "affiliate",
    entityId: dto.id,
    title: dto.name,
    subtitle: dto.code,
    href: `/admin/integrations`,
    keywords: dto.code
  });
  if (audit) {
    await appendAuditLog({
      userId: audit.userId,
      action: "affiliate.create",
      module: "affiliates",
      entityType: "affiliate",
      entityId: dto.id,
      ip: audit.ip ?? null
    });
  }
  return dto;
}

export async function updateAffiliate(
  id: string,
  input: Partial<{
    name: string;
    code: string;
    email: string;
    phone: string;
    commission: number;
    enabled: boolean;
    status: AffiliateStatus;
  }>,
  audit?: { userId: string; ip?: string | null }
) {
  const row = await prisma.affiliate.update({
    where: { id },
    data: { ...input, code: input.code?.toUpperCase() }
  });
  if (audit) {
    await appendAuditLog({
      userId: audit.userId,
      action: "affiliate.update",
      module: "affiliates",
      entityType: "affiliate",
      entityId: id,
      ip: audit.ip ?? null
    });
  }
  return toDto(row);
}

export async function deleteAffiliate(id: string, audit?: { userId: string; ip?: string | null }) {
  await prisma.affiliate.delete({ where: { id } });
  if (audit) {
    await appendAuditLog({
      userId: audit.userId,
      action: "affiliate.delete",
      module: "affiliates",
      entityType: "affiliate",
      entityId: id,
      ip: audit.ip ?? null
    });
  }
}
