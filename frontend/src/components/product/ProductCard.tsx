"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";
import { useCartStore } from "@/store/cartStore";
import { ProductVisual } from "@/components/product/ProductVisual";

export function ProductCard({ product }: { product: Product }) {
  const addProduct = useCartStore((state) => state.addProduct);

  return (
    <article className="card-premium flex flex-col overflow-hidden">
      <Link
        href={`/product/${product.slug}`}
        aria-label={`شاهد صفحة ${product.shortName}`}
      >
        <ProductVisual product={product} size="md" showBadge />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm font-bold text-sage-700">{product.problem}</p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="mt-2 text-xl font-extrabold leading-8 text-sand-950 transition hover:text-sand-700">
            {product.nameAr}
          </h3>
        </Link>
        <ul className="mt-4 flex-1 space-y-2 text-sm text-sand-700">
          {product.bullets.slice(0, 3).map((bullet) => (
            <li key={bullet} className="flex gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage-700" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-2xl font-black text-sand-950">{formatPrice(product.price)}</span>
          <Link className="text-sm font-bold text-sand-700 underline underline-offset-2" href={`/product/${product.slug}`}>
            شوف الصفحة كاملة
          </Link>
        </div>
        <button
          type="button"
          onClick={() => addProduct(product)}
          className="btn-primary mt-4 w-full"
        >
          أضفه للسلة
        </button>
      </div>
    </article>
  );
}
