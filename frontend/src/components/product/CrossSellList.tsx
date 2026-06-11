"use client";

import { Plus } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";
import { useCartStore } from "@/store/cartStore";

type CrossSellListProps = {
  products: Product[];
  title?: string;
  ctaLabel?: string;
  openCartOnAdd?: boolean;
};

export function CrossSellList({
  products,
  title = "كمّل نظام الراحة ديالك",
  ctaLabel = "أضف",
  openCartOnAdd = false
}: CrossSellListProps) {
  const addProduct = useCartStore((state) => state.addProduct);
  const open = useCartStore((state) => state.open);

  if (products.length === 0) return null;

  function handleAdd(product: Product) {
    addProduct(product);
    if (openCartOnAdd) open();
  }

  return (
    <div>
      <h3 className="font-black text-sand-950">{title}</h3>
      <div className="mt-3 space-y-3">
        {products.map((product) => (
          <div key={product.id} className="flex items-center justify-between gap-3 rounded-2xl bg-sand-50 p-3">
            <div className="min-w-0">
              <p className="truncate font-bold text-sand-950">{product.shortName}</p>
              <p className="text-sm text-sand-700">
                {product.problem} · {formatPrice(product.price)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleAdd(product)}
              className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-bold text-sand-900 shadow-sm transition hover:bg-sand-900 hover:text-white"
            >
              <Plus className="h-4 w-4" />
              {ctaLabel}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
