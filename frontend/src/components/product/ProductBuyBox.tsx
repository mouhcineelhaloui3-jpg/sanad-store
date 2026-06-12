"use client";

import { Check, ShieldCheck } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";
import { Stars } from "@/components/product/Stars";
import { useCartStore } from "@/store/cartStore";

export function ProductBuyBox({ product }: { product: Product }) {
  const addProduct = useCartStore((state) => state.addProduct);
  const open = useCartStore((state) => state.open);
  const hasReviews = product.reviews.length > 0;
  const rating =
    product.ratingValue > 0
      ? product.ratingValue
      : product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length;
  const count = product.ratingCount > 0 ? product.ratingCount : product.reviews.length;

  function addToCart() {
    addProduct(product);
  }

  function buyNow() {
    addProduct(product);
    open();
  }

  return (
    <div>
      <span className="inline-flex rounded-full bg-sage-100 px-4 py-2 text-sm font-bold text-sage-700">
        {product.problem}
      </span>
      <h1 className="mt-5 text-3xl font-black leading-[1.3] text-sand-950 md:text-4xl">{product.nameAr}</h1>

      {hasReviews ? (
        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-sand-100 bg-white px-4 py-3 shadow-sm">
          <Stars rating={rating} />
          <span className="text-sm font-black text-sand-950">{rating.toFixed(1)} / 5</span>
          <span className="text-sm font-bold text-sand-600">
            ({count} {count === 1 ? "مراجعة" : "مراجعات"})
          </span>
        </div>
      ) : null}

      <p className="mt-4 text-lg leading-9 text-sand-700">{product.headline}</p>

      <ul className="mt-6 space-y-2">
        {product.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2 text-sand-800">
            <Check className="mt-1 h-5 w-5 shrink-0 text-sage-700" />
            <span className="font-semibold">{bullet}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 rounded-2xl border border-sand-100 bg-white p-4 shadow-sm">
        <p className="text-3xl font-black text-sand-950">{formatPrice(product.price)}</p>
        <div className="mt-3 grid gap-2 text-sm font-semibold text-sand-800">
          <p>✓ الثمن واضح قبل ما تطلب</p>
          <p>✓ لا بطاقة بنكية ولا أداء مسبق</p>
          <p>✓ الاسم ورقم الهاتف كافيين لتأكيد الطلب</p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3">
        <button
          type="button"
          onClick={buyNow}
          className="w-full rounded-full bg-sand-900 px-6 py-4 text-lg font-black text-white transition hover:bg-sand-950"
        >
          اطلبه الآن — {formatPrice(product.price)}
        </button>
        <button
          type="button"
          onClick={addToCart}
          className="w-full rounded-full border border-sand-100 bg-white px-6 py-4 text-lg font-bold text-sand-900 transition hover:border-sand-700"
        >
          أضفه للسلة
        </button>
      </div>

      <p className="mt-4 flex items-center justify-center gap-2 text-center text-sm font-bold text-sage-700">
        <ShieldCheck className="h-4 w-4" />
        الدفع عند الاستلام • تأكيد هاتفي قبل الإرسال
      </p>
    </div>
  );
}
