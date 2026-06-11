import { ProductCard } from "@/components/product/ProductCard";
import { TrustStrip } from "@/components/product/TrustStrip";
import { products } from "@/lib/products";

export const metadata = {
  title: "منتجات سَنَد | دعم الظهر والرقبة",
  description: "ثلاثة حلول عملية للكتاف والوضعية، الرقبة، وأسفل الظهر — بالدفع عند الاستلام داخل المغرب."
};

export default function CollectionPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="max-w-2xl">
        <p className="section-eyebrow">منتجات سَنَد</p>
        <h1 className="section-title">اختار الحل المناسب لمنطقة التعب</h1>
        <p className="mt-4 leading-8 text-sand-700">
          ثلاثة حلول عملية للكتاف والوضعية، الرقبة، وأسفل الظهر.
          كل المنتجات بالدفع عند الاستلام داخل المغرب.
        </p>
      </div>
      <div className="mt-8">
        <TrustStrip />
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
