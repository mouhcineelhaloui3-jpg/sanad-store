import { listOrders, type OrderDto } from "@/lib/db/orders";

export type SubscriptionOrderRow = OrderDto;

export async function getSubscriptionOrders(): Promise<SubscriptionOrderRow[]> {
  return listOrders();
}
