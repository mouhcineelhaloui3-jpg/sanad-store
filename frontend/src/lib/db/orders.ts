import type { OrderStatus, PaymentStatus, ShippingStatus, Prisma } from "@/generated/prisma/client";
import { defaultPlans } from "@/lib/plans";
import { appendAuditLog } from "./audit";
import { prisma } from "./prisma";
import { removeSearchIndex, upsertSearchIndex } from "./search";

export type OrderDto = {
  id: string;
  name: string;
  phone: string;
  device: string;
  planSlug: string;
  notes: string | null;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  shippingStatus: ShippingStatus;
  total: number;
  ip: string | null;
  userAgent: string | null;
  tracking: Prisma.JsonValue;
  createdAt: string;
  updatedAt: string;
};

function planPrice(planSlug: string) {
  return defaultPlans.find((p) => p.slug === planSlug)?.price ?? 0;
}

function toOrderDto(order: {
  id: string;
  name: string;
  phone: string;
  device: string;
  planSlug: string;
  notes: string | null;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  shippingStatus: ShippingStatus;
  total: Prisma.Decimal;
  ip: string | null;
  userAgent: string | null;
  tracking: Prisma.JsonValue;
  createdAt: Date;
  updatedAt: Date;
}): OrderDto {
  return {
    id: order.id,
    name: order.name,
    phone: order.phone,
    device: order.device,
    planSlug: order.planSlug,
    notes: order.notes,
    status: order.status,
    paymentStatus: order.paymentStatus,
    shippingStatus: order.shippingStatus,
    total: Number(order.total),
    ip: order.ip,
    userAgent: order.userAgent,
    tracking: order.tracking,
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString()
  };
}

async function upsertCustomer(name: string, phone: string) {
  return prisma.customer.upsert({
    where: { phone },
    create: { name, phone },
    update: { name }
  });
}

export async function listOrders(limit = 200): Promise<OrderDto[]> {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: limit
  });
  return orders.map(toOrderDto);
}

export async function getOrderById(id: string): Promise<OrderDto | null> {
  const order = await prisma.order.findUnique({ where: { id } });
  return order ? toOrderDto(order) : null;
}

export async function createSubscriptionOrder(input: {
  name: string;
  phone: string;
  device: string;
  planSlug: string;
  notes?: string;
  ip?: string | null;
  userAgent?: string | null;
  tracking?: Prisma.InputJsonValue;
}) {
  const customer = await upsertCustomer(input.name, input.phone);
  const total = planPrice(input.planSlug);

  const order = await prisma.order.create({
    data: {
      customerId: customer.id,
      name: input.name,
      phone: input.phone,
      device: input.device,
      planSlug: input.planSlug,
      notes: input.notes ?? null,
      status: "new",
      total,
      ip: input.ip ?? null,
      userAgent: input.userAgent ?? null,
      tracking: input.tracking ?? undefined
    }
  });

  await upsertSearchIndex({
    entityType: "order",
    entityId: order.id,
    title: `Order ${order.id.slice(0, 8)}`,
    subtitle: `${order.name} · ${order.planSlug}`,
    href: `/admin/orders/${order.id}`,
    keywords: `${order.phone} ${order.status}`
  });

  await appendActivityLogForOrder("order.created", order.id, { planSlug: order.planSlug });

  if (customer.id) {
    const { syncCustomerStats } = await import("./customers");
    await syncCustomerStats(customer.id);
  }

  return toOrderDto(order);
}

async function appendActivityLogForOrder(action: string, orderId: string, metadata?: Prisma.InputJsonValue) {
  const { appendActivityLog } = await import("./audit");
  await appendActivityLog({ action, resource: `order:${orderId}`, metadata });
}

export async function updateOrder(
  id: string,
  input: {
    status?: OrderStatus;
    paymentStatus?: PaymentStatus;
    shippingStatus?: ShippingStatus;
    notes?: string;
  },
  audit?: { userId: string; ip?: string | null }
) {
  const order = await prisma.order.update({
    where: { id },
    data: {
      status: input.status,
      paymentStatus: input.paymentStatus,
      shippingStatus: input.shippingStatus,
      notes: input.notes
    }
  });

  await upsertSearchIndex({
    entityType: "order",
    entityId: order.id,
    title: `Order ${order.id.slice(0, 8)}`,
    subtitle: `${order.name} · ${order.planSlug}`,
    href: `/admin/orders/${order.id}`,
    keywords: `${order.phone} ${order.status}`
  });

  if (audit) {
    await appendAuditLog({
      userId: audit.userId,
      action: "order.update",
      module: "orders",
      entityType: "order",
      entityId: id,
      metadata: input as Prisma.InputJsonValue,
      ip: audit.ip ?? null
    });
  }

  await appendActivityLogForOrder("order.updated", id, input as Prisma.InputJsonValue);

  return toOrderDto(order);
}

export async function deleteOrder(id: string, audit?: { userId: string; ip?: string | null }) {
  await prisma.order.delete({ where: { id } });
  await removeSearchIndex("order", id);

  if (audit) {
    await appendAuditLog({
      userId: audit.userId,
      action: "order.delete",
      module: "orders",
      entityType: "order",
      entityId: id,
      ip: audit.ip ?? null
    });
  }
}
