"use client";

import Link from "next/link";
import { Check, ShoppingBag } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";
import { useCartStore } from "@/store/cartStore";
import { ProductVisual } from "@/components/product/ProductVisual";

type ProductCardProps = {
  product: Product;
  variant?: "default" | "landing";
  highlight?: string;
};

export function ProductCard({ product, variant = "default", highlight }: ProductCardProps) {
  const addProduct = useCartStore((state) => state.addProduct);
  const isLanding = variant === "landing";

  return (
    <article
      className={`card-premium flex flex-col overflow-hidden ${isLanding ? "ring-1 ring-sand-100 transition hover:-translate-y-1 hover:shadow-glow" : ""}`}
    >
      <Link href={`/product/${product.slug}`} aria-label={`شاهد صفحة ${product.shortName}`}>
        <ProductVisual product={product} size="md" showBadge />
      </Link>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        {highlight ? (
          <span className="mb-2 inline-flex w-fit rounded-full bg-sage-100 px-3 py-1 text-xs font-black text-sage-700">
            {highlight}
          </span>
        ) : null}
        <p className="text-sm font-bold text-sage-700">{product.problem}</p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="mt-2 text-xl font-extrabold leading-8 text-sand-950 transition hover:text-sage-700 md:text-2xl">
            {product.shortName}
          </h3>
        </Link>
        {isLanding ? (
          <p className="mt-2 text-sm leading-7 text-sand-700">{product.mechanism}</p>
        ) : null}
        <ul className="mt-4 flex-1 space-y-2 text-sm text-sand-700">
          {product.bullets.slice(0, isLanding ? 4 : 3).map((bullet) => (
            <li key={bullet} className="flex gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage-700" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 border-t border-sand-100 pt-5">
          <div className="flex items-end justify-between gap-3">
            <div>
              <span className="text-2xl font-black text-sand-950 md:text-3xl">{formatPrice(product.price)}</span>
              {isLanding ? (
                <p className="mt-1 text-xs font-bold text-sand-600">الدفع عند الاستلام</p>
              ) : null}
            </div>
            <Link
              className="text-sm font-bold text-sand-700 underline underline-offset-2 hover:text-sage-700"
              href={`/product/${product.slug}`}
            >
              التفاصيل
            </Link>
          </div>
          <button
            type="button"
            onClick={() => addProduct(product)}
            className={`btn-primary mt-4 w-full ${isLanding ? "gap-2" : ""}`}
          >
            {isLanding ? <ShoppingBag className="h-4 w-4" /> : null}
            {isLanding ? "اطلب دابا — أضف للسلة" : "أضفه للسلة"}
          </button>
        </div>
      </div>
    </article>
  );
}
