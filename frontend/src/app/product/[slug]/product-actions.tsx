"use client";

import { formatPrice, type Product } from "@/lib/products";
import { useCartStore } from "@/store/cartStore";

export function BuyNowButton({ product, className }: { product: Product; className?: string }) {
  const addProduct = useCartStore((state) => state.addProduct);
  const open = useCartStore((state) => state.open);

  function buyNow() {
    addProduct(product);
    open();
  }

  return (
    <button
      type="button"
      onClick={buyNow}
      className={
        className ??
        "rounded-full bg-white px-8 py-4 text-lg font-black text-sand-950 transition hover:bg-sand-100"
      }
    >
      اطلبه الآن — {formatPrice(product.price)}
    </button>
  );
}
