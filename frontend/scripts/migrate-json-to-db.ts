import { readFile } from "fs/promises";
import path from "path";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient, type Prisma } from "../src/generated/prisma/client";
import { defaultPlans } from "../src/lib/plans";

function createClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }
  const pool = new Pool({ connectionString });
  return new PrismaClient({ adapter: new PrismaPg(pool) });
}

const prisma = createClient();
const DATA_DIR = path.join(process.cwd(), "data");

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await readFile(file, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function main() {
  const ordersFile = path.join(DATA_DIR, "subscription-orders.json");
  const trialsFile = path.join(DATA_DIR, "trial-requests.json");
  const productsFile = path.join(DATA_DIR, "iptv-products.json");
  const analyticsFile = path.join(DATA_DIR, "analytics-events.json");
  const cmsFile = path.join(DATA_DIR, "store-content.json");
  const settingsFile = path.join(DATA_DIR, "site-settings.json");
  const affiliatesFile = path.join(DATA_DIR, "affiliate-partners.json");

  type JsonOrder = {
    id: string;
    name: string;
    phone: string;
    device: string;
    planSlug: string;
    notes?: string;
    status: string;
    createdAt: string;
  };

  const [orders, trials, products, analytics, cms, settings, affiliates] = await Promise.all([
    readJson<JsonOrder[]>(ordersFile, []),
    readJson<{ id: string; name: string; phone: string; createdAt: string }[]>(trialsFile, []),
    readJson<
      {
        id: string;
        name: string;
        price: number;
        duration: string;
        category: string;
        quality: string;
        deviceLimit: number;
        isActive: boolean;
      }[]
    >(productsFile, []),
    readJson<
      {
        id: string;
        name: string;
        path: string;
        properties: Record<string, unknown>;
        ip: string | null;
        userAgent: string | null;
        utm: unknown;
        sessionId: string | null;
        createdAt: string;
      }[]
    >(analyticsFile, []),
    readJson<Record<string, unknown>>(cmsFile, {}),
    readJson<Record<string, unknown>>(settingsFile, {}),
    readJson<{ id: string; name: string; code: string; enabled: boolean }[]>(affiliatesFile, [])
  ]);

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      create: {
        id: product.id,
        name: product.name,
        price: product.price,
        duration: product.duration,
        categorySlug: product.category,
        quality: product.quality,
        deviceLimit: product.deviceLimit,
        isActive: product.isActive
      },
      update: {
        name: product.name,
        price: product.price,
        duration: product.duration,
        categorySlug: product.category,
        quality: product.quality,
        deviceLimit: product.deviceLimit,
        isActive: product.isActive
      }
    });
  }

  const planPrices = new Map(defaultPlans.map((p) => [p.slug, p.price]));

  for (const order of orders) {
    const customer = await prisma.customer.upsert({
      where: { phone: order.phone },
      create: { name: order.name, phone: order.phone },
      update: { name: order.name }
    });

    await prisma.order.upsert({
      where: { id: order.id },
      create: {
        id: order.id,
        customerId: customer.id,
        name: order.name,
        phone: order.phone,
        device: order.device,
        planSlug: order.planSlug,
        notes: order.notes ?? null,
        status: order.status as "new",
        total: planPrices.get(order.planSlug) ?? 0,
        createdAt: new Date(order.createdAt)
      },
      update: {
        name: order.name,
        phone: order.phone,
        device: order.device,
        planSlug: order.planSlug,
        notes: order.notes ?? null,
        status: order.status as "new",
        total: planPrices.get(order.planSlug) ?? 0
      }
    });
  }

  for (const trial of trials) {
    await prisma.lead
      .create({
        data: {
          id: trial.id,
          name: trial.name,
          phone: trial.phone,
          source: "trial-request",
          createdAt: new Date(trial.createdAt)
        }
      })
      .catch(() => undefined);
  }

  for (const event of analytics) {
    await prisma.analyticsEvent
      .create({
        data: {
          id: event.id,
          name: event.name,
          path: event.path,
          properties: event.properties as Prisma.InputJsonValue,
          ip: event.ip,
          userAgent: event.userAgent,
          utm: (event.utm ?? undefined) as Prisma.InputJsonValue | undefined,
          sessionId: event.sessionId,
          createdAt: new Date(event.createdAt)
        }
      })
      .catch(() => undefined);
  }

  if (Object.keys(cms).length > 0) {
    const cmsJson = cms as Prisma.InputJsonValue;
    await prisma.cmsContent.upsert({
      where: { id: "storefront" },
      create: { id: "storefront", content: cmsJson },
      update: { content: cmsJson }
    });
  }

  if (Object.keys(settings).length > 0) {
    const settingsJson = settings as Prisma.InputJsonValue;
    await prisma.siteSetting.upsert({
      where: { key: "site_settings" },
      create: { key: "site_settings", value: settingsJson },
      update: { value: settingsJson }
    });
  }

  for (const affiliate of affiliates) {
    await prisma.affiliate
      .upsert({
        where: { code: affiliate.code },
        create: {
          id: affiliate.id,
          name: affiliate.name,
          code: affiliate.code,
          enabled: affiliate.enabled,
          status: affiliate.enabled ? "active" : "inactive"
        },
        update: {
          name: affiliate.name,
          enabled: affiliate.enabled,
          status: affiliate.enabled ? "active" : "inactive"
        }
      })
      .catch(() => undefined);
  }

  console.log(
    `Migrated ${products.length} products, ${orders.length} orders, ${trials.length} trials, ${analytics.length} analytics events, ${affiliates.length} affiliates.`
  );
}
main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
