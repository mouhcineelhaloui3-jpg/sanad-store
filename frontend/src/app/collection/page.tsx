import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/lib/products";

export const metadata = {
  title: "منتجات سَنَد | دعم الظهر والرقبة"
};

export default function CollectionPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="max-w-2xl">
        <p className="font-bold text-sage-700">منتجات سَنَد</p>
        <h1 className="mt-2 text-4xl font-black text-sand-950">اختار الحل المناسب لمنطقة التعب</h1>
        <p className="mt-4 leading-8 text-sand-700">
          ثلاثة حلول عملية للكتاف والوضعية، الرقبة، وأسفل الظهر. كل المنتجات بالدفع عند الاستلام داخل المغرب.
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
