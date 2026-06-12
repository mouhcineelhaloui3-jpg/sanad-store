import Link from "next/link";
import { MessageCircle, Star } from "lucide-react";
import { whatsappUrl } from "@/lib/store-config";

type ReviewItem = {
  name: string;
  city: string;
  rating: number;
  text: string;
  product?: string;
  slug?: string;
};

function Stars({ count }: { count: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${count} من 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < Math.round(count) ? "fill-amber-400 text-amber-400" : "text-sand-200"}`}
        />
      ))}
    </span>
  );
}

export function HomeTestimonials({
  reviews,
  avgRating
}: {
  reviews: ReviewItem[];
  avgRating: number;
}) {
  if (reviews.length === 0) return null;

  return (
    <section className="bg-sand-50 px-4 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="section-eyebrow">آراء العملاء</p>
            <h2 className="section-title">ناس طلبوا وعطاونا رأيهم</h2>
            <p className="section-subtitle">
              آراء حقيقية من عملاء جرّبو منتجات سَنَد. كل رأي كيذكر التجربة بصراحة.
            </p>
          </div>
          <div className="trust-pill shrink-0">
            <Stars count={avgRating} />
            <span className="font-black text-sand-950">{avgRating.toFixed(1)}/5</span>
            <span className="text-xs text-sand-600">{reviews.length} مراجعة</span>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {reviews.slice(0, 6).map((item) => (
            <figure key={`${item.name}-${item.city}-${item.text.slice(0, 20)}`} className="card-premium p-6">
              <Stars count={item.rating} />
              <blockquote className="mt-4 leading-8 text-sand-800">“{item.text}”</blockquote>
              <figcaption className="mt-5 flex items-center justify-between gap-3 border-t border-sand-100 pt-4">
                <div>
                  <span className="block font-black text-sand-950">{item.name}</span>
                  <span className="block text-sm text-sand-600">{item.city}</span>
                </div>
                {item.product ? (
                  <span className="rounded-full bg-sage-100 px-3 py-1 text-xs font-black text-sage-700">
                    {item.product}
                  </span>
                ) : null}
              </figcaption>
              {item.slug ? (
                <Link
                  href={`/product/${item.slug}`}
                  className="mt-3 inline-block text-sm font-black text-sage-700 underline underline-offset-4"
                >
                  شوف المنتج ←
                </Link>
              ) : null}
            </figure>
          ))}
        </div>

        <div className="mt-8 rounded-[1.75rem] bg-white p-6 text-center shadow-soft md:p-8">
          <p className="font-black text-sand-950">باقي محتار؟ سولني مباشرة على واتساب</p>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-5">
            <MessageCircle className="h-4 w-4" />
            كلّمنا على واتساب
          </a>
        </div>
      </div>
    </section>
  );
}
