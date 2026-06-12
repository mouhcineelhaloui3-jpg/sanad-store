import Link from "next/link";
import { Banknote, Headphones, PhoneCall, RefreshCw, ShieldCheck, Truck } from "lucide-react";
import { whatsappUrl } from "@/lib/store-config";

const promises = [
  {
    icon: Banknote,
    title: "الدفع عند الاستلام",
    copy: "تخلص حتى توصلك السلعة. بلا بطاقة بنكية ولا أداء مسبق."
  },
  {
    icon: PhoneCall,
    title: "تأكيد هاتفي قبل الإرسال",
    copy: "كنتاصلو بك باش نتأكدو من المنتج والعنوان قبل ما نرسلو الطلب."
  },
  {
    icon: Truck,
    title: "توصيل للمغرب",
    copy: "كنأكدو العنوان والمدينة ونعطيوك المدة المتوقعة للتوصيل."
  },
  {
    icon: RefreshCw,
    title: "سياسة استبدال واضحة",
    copy: "عندك شروط استبدال شفافة. دخل لصفحة السياسات قبل الطلب."
  },
  {
    icon: ShieldCheck,
    title: "وعود صادقة",
    copy: "دعم وراحة يومية — ماشي علاج طبي وما كنبالغوش فالنتائج."
  },
  {
    icon: Headphones,
    title: "دعم واتساب",
    copy: "نجاوبوك قبل وبعد الطلب. سول على أي حاجة قبل ما تقرر."
  }
];

export function HomeSanadPromise() {
  return (
    <section className="bg-white px-4 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="section-eyebrow">وعد سَنَد</p>
          <h2 className="section-title">شنو كتضمن ليك قبل ما تطلب؟</h2>
          <p className="section-subtitle">
            فالمغرب، الثقة هي اللي كتبيع. هادو الضمانات اللي كنعطيكها من الأول.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {promises.map((item) => (
            <div key={item.title} className="card-premium p-6">
              <item.icon className="h-6 w-6 text-sage-700" />
              <h3 className="mt-4 text-lg font-black text-sand-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-sand-700">{item.copy}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/policies/shipping" className="text-sm font-black text-sage-700 underline underline-offset-4">
            سياسة التوصيل
          </Link>
          <Link href="/policies/returns" className="text-sm font-black text-sage-700 underline underline-offset-4">
            سياسة الاستبدال
          </Link>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-black text-sage-700 underline underline-offset-4"
          >
            تواصل واتساب
          </a>
        </div>
      </div>
    </section>
  );
}
