import { Banknote, Headphones, MapPin, PhoneCall, ShieldCheck } from "lucide-react";

const items = [
  { icon: Banknote, label: "الدفع عند الاستلام", detail: "بلا بطاقة بنكية" },
  { icon: PhoneCall, label: "تأكيد قبل الإرسال", detail: "كنتاصلو بك بالهاتف" },
  { icon: MapPin, label: "توصيل للمغرب", detail: "لجميع المدن الرئيسية" },
  { icon: ShieldCheck, label: "وعود واضحة", detail: "دعم يومي، ماشي علاج طبي" },
  { icon: Headphones, label: "دعم واتساب", detail: "نجاوبو قبل وبعد الطلب" }
];

export function HomeTrustStrip() {
  return (
    <section className="border-y border-sand-100 bg-white px-4 py-5">
      <div className="mx-auto flex max-w-6xl gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <div key={item.label} className="trust-pill min-w-[11rem] shrink-0">
            <item.icon className="h-4 w-4 shrink-0 text-sage-700" />
            <span>
              <span className="block font-black text-sand-950">{item.label}</span>
              <span className="block text-xs text-sand-600">{item.detail}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
