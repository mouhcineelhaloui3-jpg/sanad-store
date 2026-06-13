import type { CustomerSegment, Prisma } from "@/generated/prisma/client";
import { appendAuditLog } from "./audit";
import { prisma } from "./prisma";
import { buildOrderBy, type ListParams, type PaginatedResult } from "./pagination";
import { removeSearchIndex, upsertSearchIndex } from "./search";

export type CustomerDto = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  city: string | null;
  country: string | null;
  segment: CustomerSegment;
  notes: string | null;
  totalOrders: number;
  totalSpent: number;
  createdAt: string;
  updatedAt: string;
};

function toDto(customer: {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  city: string | null;
  country: string | null;
  segment: CustomerSegment;
  notes: string | null;
  totalOrders: number;
  totalSpent: Prisma.Decimal;
  createdAt: Date;
  updatedAt: Date;
}): CustomerDto {
  return {
    id: customer.id,
    name: customer.name,
    phone: customer.phone,
    email: customer.email,
    city: customer.city,
    country: customer.country,
    segment: customer.segment,
    notes: customer.notes,
    totalOrders: customer.totalOrders,
    totalSpent: Number(customer.totalSpent),
    createdAt: customer.createdAt.toISOString(),
    updatedAt: customer.updatedAt.toISOString()
  };
}

async function indexCustomer(customer: CustomerDto) {
  await upsertSearchIndex({
    entityType: "customer",
    entityId: customer.id,
    title: customer.name,
    subtitle: customer.phone,
    href: `/admin/customers/${customer.id}`,
    keywords: `${customer.city ?? ""} ${customer.segment}`
  });
}

export async function listCustomers(params: ListParams = {}): Promise<PaginatedResult<CustomerDto>> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 20;
  const where: Prisma.CustomerWhereInput = {};

  if (params.search) {
    where.OR = [
      { name: { contains: params.search, mode: "insensitive" } },
      { phone: { contains: params.search, mode: "insensitive" } },
      { email: { contains: params.search, mode: "insensitive" } }
    ];
  }
  if (params.segment) where.segment = params.segment as CustomerSegment;

  const [total, rows] = await Promise.all([
    prisma.customer.count({ where }),
    prisma.customer.findMany({
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

export async function getCustomerById(id: string) {
  const customer = await prisma.customer.findUnique({
    where: { id },
    include: {
      orders: { orderBy: { createdAt: "desc" }, take: 20 }
    }
  });
  if (!customer) return null;
  return {
    ...toDto(customer),
    orders: customer.orders.map((o) => ({
      id: o.id,
      planSlug: o.planSlug,
      total: Number(o.total),
      status: o.status,
      createdAt: o.createdAt.toISOString()
    }))
  };
}

export async function updateCustomer(
  id: string,
  input: Partial<{ name: string; email: string; city: string; country: string; segment: CustomerSegment; notes: string }>,
  audit?: { userId: string; ip?: string | null }
) {
  const customer = await prisma.customer.update({ where: { id }, data: input });
  const dto = toDto(customer);
  await indexCustomer(dto);
  if (audit) {
    await appendAuditLog({
      userId: audit.userId,
      action: "customer.update",
      module: "customers",
      entityType: "customer",
      entityId: id,
      metadata: input as Prisma.InputJsonValue,
      ip: audit.ip ?? null
    });
  }
  return dto;
}

export async function deleteCustomers(ids: string[], audit?: { userId: string; ip?: string | null }) {
  await prisma.customer.deleteMany({ where: { id: { in: ids } } });
  for (const id of ids) await removeSearchIndex("customer", id);
  if (audit) {
    await appendAuditLog({
      userId: audit.userId,
      action: "customer.bulk_delete",
      module: "customers",
      metadata: { ids },
      ip: audit.ip ?? null
    });
  }
}

export async function syncCustomerStats(customerId: string) {
  const agg = await prisma.order.aggregate({
    where: { customerId },
    _count: { _all: true },
    _sum: { total: true }
  });
  await prisma.customer.update({
    where: { id: customerId },
    data: {
      totalOrders: agg._count._all,
      totalSpent: agg._sum.total ?? 0,
      segment: (agg._count._all ?? 0) > 3 ? "vip" : "active"
    }
  });
}
