import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function HomeFounderNote() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <div className="card-premium overflow-hidden md:grid md:grid-cols-[auto_1fr]">
        <div className="flex items-center justify-center bg-sage-100 p-8 md:p-10">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-sage-700 text-4xl font-black text-white">
            س
          </div>
        </div>
        <div className="p-6 md:p-10">
          <p className="section-eyebrow">من صاحب سَنَد</p>
          <h2 className="mt-2 text-2xl font-black text-sand-950 md:text-3xl">
            ما بغيتش نبيعك 20 منتج — بغيت نعاونك تختار الصح
          </h2>
          <div className="mt-5 space-y-4 leading-8 text-sand-700">
            <p>
              أنا بنيت سَنَد لأن بزاف ديال الناس كيتعبو فنهارهم وما كيعرفوش منين يبداو. كتاف، رقبة، أسفل
              الظهر — كل منطقة عندها حل مختلف.
            </p>
            <p>
              ما كنعدوش بوعود طبية. كنبيعو دعم وراحة يومية، وكنشرحو ليك بوضوح شنو يناسبك وشنو ما يناسبكش.
              إلا عندك ألم قوي، غادي نقول ليك تسول مختص.
            </p>
            <p>
              الطلب عندنا بسيط: الاسم، رقم الهاتف، والعنوان. الدفع عند الاستلام، وتأكيد هاتفي قبل ما نرسلو
              أي حاجة.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="trust-pill">
              <ShieldCheck className="h-4 w-4 text-sage-700" />
              وعود صادقة، ماشي ضغط
            </span>
            <Link href="/about" className="text-sm font-black text-sage-700 underline underline-offset-4">
              اعرف أكثر على سَنَد ←
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
