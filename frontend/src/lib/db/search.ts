import { prisma } from "./prisma";

export type SearchResult = {
  id: string;
  entityType: string;
  entityId: string;
  title: string;
  subtitle: string | null;
  href: string;
};

export async function upsertSearchIndex(input: {
  entityType: string;
  entityId: string;
  title: string;
  subtitle?: string | null;
  href: string;
  keywords?: string | null;
}) {
  return prisma.searchIndex.upsert({
    where: {
      entityType_entityId: {
        entityType: input.entityType,
        entityId: input.entityId
      }
    },
    create: {
      entityType: input.entityType,
      entityId: input.entityId,
      title: input.title,
      subtitle: input.subtitle ?? null,
      href: input.href,
      keywords: input.keywords ?? null
    },
    update: {
      title: input.title,
      subtitle: input.subtitle ?? null,
      href: input.href,
      keywords: input.keywords ?? null
    }
  });
}

export async function removeSearchIndex(entityType: string, entityId: string) {
  return prisma.searchIndex.deleteMany({
    where: { entityType, entityId }
  });
}

export async function searchGlobal(query: string, limit = 20): Promise<SearchResult[]> {
  const q = query.trim();
  if (!q) return [];

  const rows = await prisma.searchIndex.findMany({
    where: {
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { subtitle: { contains: q, mode: "insensitive" } },
        { keywords: { contains: q, mode: "insensitive" } },
        { entityId: { contains: q, mode: "insensitive" } }
      ]
    },
    orderBy: { updatedAt: "desc" },
    take: limit
  });

  return rows.map((row) => ({
    id: row.id,
    entityType: row.entityType,
    entityId: row.entityId,
    title: row.title,
    subtitle: row.subtitle,
    href: row.href
  }));
}

export async function reindexAllSearch() {
  const [products, orders, leads, customers, categories, coupons] = await Promise.all([
    prisma.product.findMany(),
    prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 500 }),
    prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 500 }),
    prisma.customer.findMany({ orderBy: { createdAt: "desc" }, take: 500 }),
    prisma.category.findMany(),
    prisma.coupon.findMany()
  ]);

  for (const product of products) {
    await upsertSearchIndex({
      entityType: "product",
      entityId: product.id,
      title: product.name,
      subtitle: `${product.duration} · ${product.price} MAD`,
      href: `/admin/products/${product.id}`,
      keywords: `${product.categorySlug} ${product.quality}`
    });
  }

  for (const order of orders) {
    await upsertSearchIndex({
      entityType: "order",
      entityId: order.id,
      title: `Order ${order.id.slice(0, 8)}`,
      subtitle: `${order.name} · ${order.planSlug}`,
      href: `/admin/orders/${order.id}`,
      keywords: `${order.phone} ${order.status}`
    });
  }

  for (const lead of leads) {
    await upsertSearchIndex({
      entityType: "lead",
      entityId: lead.id,
      title: lead.name,
      subtitle: lead.phone,
      href: `/admin/crm/${lead.id}`,
      keywords: `${lead.planSlug ?? ""} ${lead.status}`
    });
  }

  for (const customer of customers) {
    await upsertSearchIndex({
      entityType: "customer",
      entityId: customer.id,
      title: customer.name,
      subtitle: customer.phone,
      href: `/admin/customers/${customer.id}`,
      keywords: `${customer.city ?? ""} ${customer.segment}`
    });
  }

  for (const category of categories) {
    await upsertSearchIndex({
      entityType: "category",
      entityId: category.id,
      title: category.name,
      subtitle: category.slug,
      href: `/admin/categories`,
      keywords: category.slug
    });
  }

  for (const coupon of coupons) {
    await upsertSearchIndex({
      entityType: "coupon",
      entityId: coupon.id,
      title: coupon.code,
      subtitle: `${coupon.type} · ${coupon.value}`,
      href: `/admin/coupons`,
      keywords: coupon.code
    });
  }

  const routes = [
    { entityId: "dashboard", title: "Dashboard", href: "/admin" },
    { entityId: "products", title: "Products", href: "/admin/products" },
    { entityId: "orders", title: "Orders", href: "/admin/orders" },
    { entityId: "settings", title: "Settings", href: "/admin/settings" },
    { entityId: "analytics", title: "Analytics", href: "/admin/analytics" }
  ];

  for (const route of routes) {
    await upsertSearchIndex({
      entityType: "route",
      entityId: route.entityId,
      title: route.title,
      subtitle: "Admin route",
      href: route.href,
      keywords: route.title.toLowerCase()
    });
  }

  return { products: products.length, orders: orders.length, leads: leads.length, customers: customers.length, categories: categories.length, coupons: coupons.length, routes: routes.length };
}
