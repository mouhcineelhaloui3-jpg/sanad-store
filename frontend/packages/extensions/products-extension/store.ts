import { dataPath, readJsonStore, writeJsonStore } from "@sanad/core";
import type { CreateIptvProductInput, IptvProduct, UpdateIptvProductInput } from "./types";

const FILE = () => dataPath("iptv-products.json");

const DEFAULT_PRODUCTS: IptvProduct[] = [
  {
    id: "prd_3m",
    name: "باقة 3 أشهر",
    price: 150,
    duration: "3m",
    category: "premium",
    quality: "FHD",
    deviceLimit: 2,
    isActive: true,
    visibleFrom: null,
    visibleTo: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "prd_6m",
    name: "باقة 6 أشهر",
    price: 250,
    duration: "6m",
    category: "sports",
    quality: "4K",
    deviceLimit: 3,
    isActive: true,
    visibleFrom: null,
    visibleTo: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "prd_12m",
    name: "باقة سنة كاملة",
    price: 400,
    duration: "12m",
    category: "movies",
    quality: "4K",
    deviceLimit: 5,
    isActive: true,
    visibleFrom: null,
    visibleTo: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export async function listProducts(): Promise<IptvProduct[]> {
  return readJsonStore<IptvProduct[]>(FILE(), DEFAULT_PRODUCTS);
}

export async function getProduct(id: string): Promise<IptvProduct | null> {
  const products = await listProducts();
  return products.find((p) => p.id === id) ?? null;
}

export async function createProduct(input: CreateIptvProductInput): Promise<IptvProduct> {
  const products = await listProducts();
  const now = new Date().toISOString();
  const product: IptvProduct = {
    ...input,
    id: `prd_${Date.now()}`,
    createdAt: now,
    updatedAt: now
  };
  products.unshift(product);
  await writeJsonStore(FILE(), products);
  return product;
}

export async function updateProduct(id: string, input: UpdateIptvProductInput): Promise<IptvProduct | null> {
  const products = await listProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx < 0) return null;
  products[idx] = { ...products[idx]!, ...input, updatedAt: new Date().toISOString() };
  await writeJsonStore(FILE(), products);
  return products[idx]!;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const products = await listProducts();
  const next = products.filter((p) => p.id !== id);
  if (next.length === products.length) return false;
  await writeJsonStore(FILE(), next);
  return true;
}
