"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";
import { useCartStore } from "@/store/cartStore";

export function ProductCard({ product }: { product: Product }) {
  const addProduct = useCartStore((state) => state.addProduct);

  return (
    <article className="rounded-[2rem] border border-sand-100 bg-white p-5 shadow-soft">
      <Link
        href={`/product/${product.slug}`}
        className="flex aspect-[4/3] items-center justify-center rounded-[1.5rem] bg-sand-100 text-center transition hover:bg-sand-50"
        aria-label={`شاهد صفحة ${product.shortName}`}
      >
        <div>
          <p className="text-sm font-semibold text-sand-700">{product.type}</p>
          <h3 className="mt-2 text-2xl font-black text-sand-950">{product.shortName}</h3>
        </div>
      </Link>
      <div className="mt-5">
        <p className="text-sm font-bold text-sage-700">{product.problem}</p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="mt-2 text-xl font-extrabold leading-8 text-sand-950 transition hover:text-sand-700">
            {product.nameAr}
          </h3>
        </Link>
        <ul className="mt-4 space-y-2 text-sm text-sand-700">
          {product.bullets.slice(0, 3).map((bullet) => (
            <li key={bullet} className="flex gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage-700" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-2xl font-black text-sand-950">{formatPrice(product.price)}</span>
          <Link className="text-sm font-bold text-sand-700 underline" href={`/product/${product.slug}`}>
            شوف الصفحة كاملة
          </Link>
        </div>
        <button
          type="button"
          onClick={() => addProduct(product)}
          className="mt-5 w-full rounded-full bg-sand-900 px-5 py-3 font-bold text-white transition hover:bg-sand-950"
        >
          أضفه للسلة
        </button>
      </div>
    </article>
  );
}
