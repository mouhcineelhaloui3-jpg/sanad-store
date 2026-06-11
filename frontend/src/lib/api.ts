import type { CartItem } from "@/store/cartStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

export type CreateOrderPayload = {
  customer_name: string;
  phone: string;
  items: { product_id: string; quantity: number }[];
  tracking?: Record<string, string | null>;
};

export type OrderResponse = {
  id: string;
  order_number: string;
  total: number;
  currency: "MAD";
  eligible_upsell?: {
    product_id: string;
    name: string;
    original_price: number;
    upsell_price: number;
    expires_in_seconds: number;
  } | null;
};

export function cartToOrderItems(items: CartItem[]) {
  return items.map((item) => ({
    product_id: item.productId,
    quantity: item.quantity
  }));
}

export async function createOrder(payload: CreateOrderPayload) {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.error?.message ?? "تعذر تسجيل الطلب. حاول مرة أخرى.");
  }

  return (await response.json()) as OrderResponse;
}

export async function acceptUpsell(orderId: string, productId: string) {
  const response = await fetch(`${API_URL}/orders/${orderId}/upsell`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product_id: productId })
  });

  if (!response.ok) {
    throw new Error("تعذر إضافة العرض للطلب.");
  }

  return (await response.json()) as OrderResponse;
}

export async function declineUpsell(orderId: string) {
  await fetch(`${API_URL}/orders/${orderId}/upsell/decline`, {
    method: "POST"
  });
}
