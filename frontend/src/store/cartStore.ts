"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/products";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  unitPrice: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      addProduct: (product) =>
        set((state) => {
          const existing = state.items.find((item) => item.productId === product.id);
          if (existing) {
            return {
              isOpen: true,
              items: state.items.map((item) =>
                item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
              )
            };
          }

          return {
            isOpen: true,
            items: [
              ...state.items,
              {
                productId: product.id,
                slug: product.slug,
                name: product.shortName,
                unitPrice: product.price,
                quantity: 1
              }
            ]
          };
        }),
      removeProduct: (productId) =>
        set((state) => ({ items: state.items.filter((item) => item.productId !== productId) })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity: Math.max(1, quantity) } : item
          )
        })),
      clear: () => set({ items: [] })
    }),
    { name: "sanad-cart" }
  )
);

export function getCartTotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}
