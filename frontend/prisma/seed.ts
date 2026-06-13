import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../src/generated/prisma/client";

function createClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }
  const pool = new Pool({ connectionString });
  return new PrismaClient({ adapter: new PrismaPg(pool) });
}

const prisma = createClient();

const PERMISSIONS: { key: string; label: string }[] = [
  { key: "dashboard:read", label: "View dashboard" },
  { key: "cms:read", label: "View CMS" },
  { key: "cms:write", label: "Edit CMS" },
  { key: "settings:read", label: "View settings" },
  { key: "settings:write", label: "Edit settings" },
  { key: "users:read", label: "View users" },
  { key: "logs:read", label: "View logs" },
  { key: "analytics:read", label: "View analytics" },
  { key: "billing:read", label: "View billing" },
  { key: "products:read", label: "View products" },
  { key: "products:write", label: "Manage products" },
  { key: "orders:read", label: "View orders" },
  { key: "orders:write", label: "Manage orders" },
  { key: "leads:view", label: "View leads" },
  { key: "leads:create", label: "Create leads" },
  { key: "leads:update", label: "Update leads" },
  { key: "leads:delete", label: "Delete leads" },
  { key: "customers:read", label: "View customers" },
  { key: "customers:write", label: "Manage customers" },
  { key: "categories:read", label: "View categories" },
  { key: "categories:write", label: "Manage categories" },
  { key: "coupons:read", label: "View coupons" },
  { key: "coupons:write", label: "Manage coupons" },
  { key: "reviews:read", label: "View reviews" },
  { key: "reviews:write", label: "Manage reviews" },
  { key: "notifications:read", label: "View notifications" },
  { key: "notifications:write", label: "Manage notifications" },
  { key: "ads:read", label: "View ads" },
  { key: "ads:write", label: "Manage ads" },
  { key: "automation:read", label: "View automation" },
  { key: "automation:write", label: "Manage automation" },
  { key: "extensions:read", label: "View extensions" },
  { key: "extensions:write", label: "Manage extensions" },
  { key: "affiliate:read", label: "View affiliates" },
  { key: "affiliate:write", label: "Manage affiliates" }
];

const ROLES: Record<string, { label: string; permissions: string[] }> = {
  super_admin: { label: "Super Admin", permissions: PERMISSIONS.map((p) => p.key) },
  admin: {
    label: "Admin",
    permissions: [
      "dashboard:read",
      "cms:read",
      "cms:write",
      "settings:read",
      "settings:write",
      "analytics:read",
      "products:read",
      "products:write",
      "orders:read",
      "orders:write",
      "leads:view",
      "leads:create",
      "leads:update",
      "leads:delete",
      "customers:read",
      "customers:write",
      "categories:read",
      "categories:write",
      "coupons:read",
      "coupons:write",
      "reviews:read",
      "reviews:write",
      "notifications:read",
      "notifications:write",
      "ads:read",
      "automation:read",
      "extensions:read",
      "affiliate:read",
      "affiliate:write"
    ]
  },
  manager: {
    label: "Manager",
    permissions: [
      "dashboard:read",
      "analytics:read",
      "products:read",
      "products:write",
      "orders:read",
      "orders:write",
      "leads:view",
      "leads:create",
      "leads:update",
      "customers:read",
      "categories:read",
      "coupons:read",
      "reviews:read"
    ]
  },
  support: {
    label: "Support",
    permissions: [
      "dashboard:read",
      "cms:read",
      "analytics:read",
      "logs:read",
      "orders:read",
      "leads:view",
      "customers:read",
      "reviews:read",
      "notifications:read"
    ]
  }
};

const CATEGORIES = [
  { slug: "premium", name: "Premium" },
  { slug: "sports", name: "Sports" },
  { slug: "movies", name: "Movies" }
];

const PRODUCTS = [
  { id: "prd_3m", name: "باقة 3 أشهر", price: 150, duration: "3m", categorySlug: "premium", quality: "FHD", deviceLimit: 2 },
  { id: "prd_6m", name: "باقة 6 أشهر", price: 250, duration: "6m", categorySlug: "sports", quality: "4K", deviceLimit: 3 },
  { id: "prd_12m", name: "باقة سنة كاملة", price: 400, duration: "12m", categorySlug: "movies", quality: "4K", deviceLimit: 5 }
];

async function main() {
  for (const permission of PERMISSIONS) {
    await prisma.permission.upsert({
      where: { key: permission.key },
      create: permission,
      update: { label: permission.label }
    });
  }

  const permissionRows = await prisma.permission.findMany();
  const permissionByKey = new Map(permissionRows.map((p) => [p.key, p.id]));

  for (const [roleId, role] of Object.entries(ROLES)) {
    await prisma.role.upsert({
      where: { id: roleId },
      create: { id: roleId, name: roleId, label: role.label },
      update: { label: role.label }
    });

    await prisma.rolePermission.deleteMany({ where: { roleId } });

    for (const key of role.permissions) {
      const permissionId = permissionByKey.get(key);
      if (!permissionId) continue;
      await prisma.rolePermission.create({ data: { roleId, permissionId } });
    }
  }

  for (const category of CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      create: category,
      update: { name: category.name }
    });
  }

  for (const product of PRODUCTS) {
    await prisma.product.upsert({
      where: { id: product.id },
      create: {
        id: product.id,
        name: product.name,
        price: product.price,
        duration: product.duration,
        categorySlug: product.categorySlug,
        quality: product.quality,
        deviceLimit: product.deviceLimit,
        isActive: true
      },
      update: {
        name: product.name,
        price: product.price,
        duration: product.duration,
        categorySlug: product.categorySlug,
        quality: product.quality,
        deviceLimit: product.deviceLimit,
        isActive: true
      }
    });
  }

  await prisma.user.upsert({
    where: { email: "super@sanad.iptv" },
    create: {
      id: "usr_super",
      email: "super@sanad.iptv",
      name: "Super Admin",
      roleId: "super_admin",
      active: true
    },
    update: { name: "Super Admin", roleId: "super_admin", active: true }
  });

  console.log("Seed completed.");

  await prisma.coupon.createMany({
    data: [
      { code: "SANAD10", type: "percentage", value: 10, usageLimit: 200, status: "active" },
      { code: "WELCOME50", type: "fixed", value: 50, usageLimit: 100, status: "active" }
    ],
    skipDuplicates: true
  });

  await prisma.review.createMany({
    data: [
      {
        customerName: "Ahmed B.",
        productName: "باقة 6 أشهر",
        rating: 5,
        text: "Excellent IPTV quality and support.",
        status: "approved"
      }
    ]
  });

  await prisma.affiliate.createMany({
    data: [{ name: "Partner One", code: "PARTNER1", status: "active", enabled: true }],
    skipDuplicates: true
  });

  const { reindexAllSearch } = await import("../src/lib/db/search");
  const summary = await reindexAllSearch();
  console.log("Search index:", summary);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
