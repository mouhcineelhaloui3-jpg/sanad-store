import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const pains = [
  {
    emoji: "🧍",
    pain: "كتافك طايحين وكتنسى وضعيتك فالخدمة؟",
    outcome: "دعم يومي للكتاف والوضعية بلا تعقيد",
    product: "سَنَد ألاين",
    href: "/product/sanad-align",
    cta: "حل الكتاف والوضعية"
  },
  {
    emoji: "🔥",
    pain: "رقبتك كتشد من الهاتف، السياقة، ولا التوتر؟",
    outcome: "دفء واهتزاز مريح فلحظة الراحة",
    product: "سَنَد هيت",
    href: "/product/sanad-heat",
    cta: "حل الرقبة والشد"
  },
  {
    emoji: "💪",
    pain: "أسفل ظهرك كيتقل مع الوقوف ولا السياقة الطويلة؟",
    outcome: "ضغط داعم قابل للتعديل حول الوسط",
    product: "سَنَد لومبو",
    href: "/product/sanad-lumbo",
    cta: "حل أسفل الظهر"
  }
];

export function HomePainBridge() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 md:py-16">
      <div className="max-w-2xl">
        <p className="section-eyebrow">واش هادشي يشبهك؟</p>
        <h2 className="section-title">نهارك طويل، وجسمك كيعطيك إشارة</h2>
        <p className="section-subtitle">
          ما خاصكش تختار عشوائياً. بدا من المشكل اللي كتحس بيه فعلاً، وغادي توصل للمنتج المناسب.
        </p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {pains.map((item) => (
          <article
            key={item.product}
            className="card-premium group flex flex-col p-6 transition hover:border-sage-700 hover:shadow-glow"
          >
            <span className="text-3xl" aria-hidden>
              {item.emoji}
            </span>
            <h3 className="mt-4 text-lg font-black leading-8 text-sand-950">{item.pain}</h3>
            <p className="mt-3 flex-1 text-sm leading-7 text-sand-700">{item.outcome}</p>
            <p className="mt-4 text-xs font-black text-sage-700">→ {item.product}</p>
            <Link
              href={item.href}
              className="btn-primary mt-5 w-full gap-2 text-center group-hover:scale-[1.01]"
            >
              {item.cta}
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
