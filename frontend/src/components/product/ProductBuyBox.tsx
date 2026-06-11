"use client";

import { Check, ShieldCheck } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";
import { useCartStore } from "@/store/cartStore";
import { Stars } from "@/components/product/Stars";

export function ProductBuyBox({ product }: { product: Product }) {
  const addProduct = useCartStore((state) => state.addProduct);
  const open = useCartStore((state) => state.open);

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

      <div className="mt-4 flex items-center gap-3">
        <Stars rating={product.ratingValue} />
        <span className="text-sm font-semibold text-sand-700">
          {product.ratingValue.toFixed(1)} · {product.ratingCount} تقييم
        </span>
      </div>

      <p className="mt-4 text-lg leading-9 text-sand-700">{product.headline}</p>

      <ul className="mt-6 space-y-2">
        {product.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2 text-sand-800">
            <Check className="mt-1 h-5 w-5 shrink-0 text-sage-700" />
            <span className="font-semibold">{bullet}</span>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-3xl font-black text-sand-950">{formatPrice(product.price)}</p>
      <div className="mt-4 grid gap-2 rounded-2xl bg-sand-50 p-4 text-sm font-semibold text-sand-800">
        <p>✓ الثمن النهائي واضح: {formatPrice(product.price)}</p>
        <p>✓ لا نطلب بطاقة بنكية ولا أداء مسبق</p>
        <p>✓ تحتاج غير الاسم ورقم الهاتف المغربي لتثبيت الطلب</p>
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
      <p className="mt-2 text-center text-xs leading-5 text-sand-600">
        منتجات سَنَد للدعم والراحة اليومية وليست بديلاً عن استشارة مختص عند الألم القوي أو المستمر.
      </p>
    </div>
  );
}
