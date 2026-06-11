"use client";

import { ShoppingBag } from "lucide-react";
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
    <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-sand-100 bg-white/95 p-3 backdrop-blur md:hidden">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <p className="text-sm font-black text-sand-950">{product.shortName}</p>
          <p className="text-xs text-sage-700">الدفع عند الاستلام</p>
        </div>
        <button
          type="button"
          onClick={buyNow}
          className="btn-primary flex items-center gap-2 py-3"
        >
          <ShoppingBag className="h-4 w-4" />
          اطلب — {formatPrice(product.price)}
        </button>
      </div>
    </div>
  );
}
