"use client";

import { formatPrice, type Product } from "@/lib/products";
import { useCartStore } from "@/store/cartStore";

export function MobileStickyCTA({ product }: { product: Product }) {
  const addProduct = useCartStore((state) => state.addProduct);
  const open = useCartStore((state) => state.open);

  function buyNow() {
    addProduct(product);
    open();
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-sand-100 bg-white/95 p-3 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate font-black text-sand-950">{product.shortName}</p>
          <p className="text-sm font-bold text-sand-700">{formatPrice(product.price)} · الدفع عند الاستلام</p>
        </div>
        <button
          type="button"
          onClick={buyNow}
          className="shrink-0 rounded-full bg-sand-900 px-6 py-3 font-black text-white"
        >
          اطلبه الآن
        </button>
      </div>
    </div>
  );
}
