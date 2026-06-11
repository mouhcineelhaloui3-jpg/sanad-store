import type { Product } from "@/lib/products";
import { Stars } from "@/components/product/Stars";

export function SocialProof({ product }: { product: Product }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="font-bold text-sage-700">آراء العملاء</p>
          <h2 className="mt-2 text-2xl font-black text-sand-950 md:text-3xl">ناس بحالك جرّبو سَنَد</h2>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-sand-100 px-5 py-3">
          <span className="text-3xl font-black text-sand-950">{product.ratingValue.toFixed(1)}</span>
          <div>
            <Stars rating={product.ratingValue} />
            <p className="mt-1 text-xs font-semibold text-sand-700">{product.ratingCount} تقييم</p>
          </div>
        </div>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {product.reviews.map((review) => (
          <figure key={review.name} className="rounded-[1.75rem] border border-sand-100 bg-white p-6 shadow-soft">
            <Stars rating={review.rating} />
            <blockquote className="mt-4 leading-8 text-sand-800">“{review.text}”</blockquote>
            <figcaption className="mt-4 flex items-center gap-3 border-t border-sand-100 pt-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-100 font-black text-sage-700">
                {review.name.charAt(0)}
              </span>
              <span>
                <span className="block font-black text-sand-950">{review.name}</span>
                <span className="block text-sm text-sand-700">{review.city} · عميل موثّق</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
