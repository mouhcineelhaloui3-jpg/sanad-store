import { readFile } from "fs/promises";
import path from "path";
import { defaultPlans } from "@/lib/plans";

const ORDERS_FILE = path.join(process.cwd(), "data", "subscription-orders.json");

export type SubscriptionOrderRow = {
  id: string;
  name: string;
  phone: string;
  device: string;
  planSlug: string;
  notes?: string;
  status: string;
  createdAt: string;
  total: number;
};

export async function getSubscriptionOrders(): Promise<SubscriptionOrderRow[]> {
  try {
    const raw = await readFile(ORDERS_FILE, "utf-8");
    const orders = JSON.parse(raw) as Omit<SubscriptionOrderRow, "total">[];
    const prices = new Map(defaultPlans.map((p) => [p.slug, p.price]));
    return orders.map((order) => ({
      ...order,
      total: prices.get(order.planSlug) ?? 0
    }));
  } catch {
    return [];
  }
}
