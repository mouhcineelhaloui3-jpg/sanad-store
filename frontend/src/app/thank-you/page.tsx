import Link from "next/link";
import { CrossSellList } from "@/components/product/CrossSellList";
import { products } from "@/lib/products";

export const metadata = {
  title: "تم تسجيل الطلب | سَنَد"
};

export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const { order: orderId } = await searchParams;

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 text-center">
      <div className="rounded-[2rem] bg-white p-8 shadow-soft">
        <p className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage-100 text-2xl font-black text-sage-700">
          ✓
        </p>
        <h1 className="mt-6 text-4xl font-black text-sand-950">تم تسجيل طلبك بنجاح</h1>
        {orderId ? <p className="mt-3 text-sm font-bold text-sand-700">رقم الطلب: {orderId}</p> : null}
        <p className="mt-5 leading-8 text-sand-700">
          شكراً على ثقتك في سَنَد. غادي نتاصلو بك قريباً لتأكيد الطلب والعنوان قبل الإرسال. الدفع عند الاستلام،
          وما كاين حتى أداء مسبق.
        </p>
        <div className="mt-8 grid gap-3 text-right md:grid-cols-3">
          {["تأكيد هاتفي", "تجهيز الطلب", "التوصيل والدفع عند الاستلام"].map((step, index) => (
            <div key={step} className="rounded-2xl bg-sand-50 p-4">
              <p className="text-sm font-bold text-sage-700">الخطوة {index + 1}</p>
              <p className="mt-1 font-black text-sand-950">{step}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 rounded-2xl bg-sage-100 px-4 py-3 text-sm font-bold text-sage-700">
          باش ما يتأخرش طلبك، خليك قريب من الهاتف اليوم.
        </p>
        <Link href="/collection" className="mt-8 inline-block rounded-full bg-sand-900 px-7 py-4 font-black text-white">
          الرجوع للمنتجات
        </Link>
      </div>

      <div className="mt-8 rounded-[2rem] bg-white p-6 text-right shadow-soft">
        <CrossSellList products={products} title="ناس زادو هاد المنتجات لطلبهم" ctaLabel="أضفه لطلب جديد" openCartOnAdd />
      </div>
    </div>
  );
}
