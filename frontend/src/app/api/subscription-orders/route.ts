import { NextResponse } from "next/server";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const ORDERS_FILE = path.join(DATA_DIR, "subscription-orders.json");

type SubscriptionOrder = {
  id: string;
  name: string;
  phone: string;
  device: string;
  planSlug: string;
  notes?: string;
  status: "new" | "contacted" | "completed" | "cancelled";
  createdAt: string;
};

async function readOrders(): Promise<SubscriptionOrder[]> {
  try {
    const raw = await readFile(ORDERS_FILE, "utf-8");
    return JSON.parse(raw) as SubscriptionOrder[];
  } catch {
    return [];
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      phone?: string;
      device?: string;
      planSlug?: string;
      notes?: string;
    };

    if (!body.name?.trim() || !body.phone?.trim() || !body.planSlug) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await mkdir(DATA_DIR, { recursive: true });
    const orders = await readOrders();
    const order: SubscriptionOrder = {
      id: crypto.randomUUID(),
      name: body.name.trim(),
      phone: body.phone.trim(),
      device: body.device ?? "unknown",
      planSlug: body.planSlug,
      notes: body.notes?.trim(),
      status: "new",
      createdAt: new Date().toISOString()
    };
    orders.unshift(order);
    await writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");

    return NextResponse.json({ ok: true, id: order.id });
  } catch {
    return NextResponse.json({ error: "Failed to save order" }, { status: 500 });
  }
}

export async function GET() {
  const orders = await readOrders();
  return NextResponse.json(orders);
}
