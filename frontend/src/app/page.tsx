import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/lib/products";

const bodyTypeGuide = [
  {
    bodyType: "كتافك طايحين أو وضعيتك كتتعب بسرعة",
    product: "سَنَد ألاين",
    href: "/product/sanad-align",
    bestFor: "الناس اللي كيجلسو بزاف، كيخدمو قدام الكمبيوتر، أو كيبقاو بزاف مع الهاتف.",
    decision: "اختارو إذا بغيتي دعم للكتاف والظهر العلوي وتذكير بسيط بالوضعية."
  },
  {
    bodyType: "رقبتك كتشد آخر النهار",
    product: "سَنَد هيت",
    href: "/product/sanad-heat",
    bestFor: "الناس اللي كيسوقو، كيخدمو فالمكتب، أو كيبقاو الهاتف واللابتوب قدامهم بزاف.",
    decision: "اختارو إذا بغيتي حرارة لطيفة واهتزاز مريح للرقبة والكتاف."
  },
  {
    bodyType: "أسفل ظهرك كيتقل مع الوقوف أو السياقة",
    product: "سَنَد لومبو",
    href: "/product/sanad-lumbo",
    bestFor: "السياقة الطويلة، الوقوف فالخدمة، شغل الدار، أو الأيام اللي فيها حركة بزاف.",
    decision: "اختارو إذا بغيتي دعم قابل للتعديل حول أسفل الظهر."
  }
];

const trustBenefits = [
  "كنشرح لك شنو مناسب لك قبل ما نطلب منك تشري.",
  "الدفع عند الاستلام، بلا بطاقة بنكية ولا أداء مسبق.",
  "كنأكدو معاك الطلب بالهاتف قبل الإرسال.",
  "لغة واضحة: دعم وراحة يومية، وما كنبيعوش وعود طبية."
];

const steps = [
  ["01", "اختار نوع الجسم ديالك", "كتاف، رقبة، ولا أسفل الظهر. غير حدد فين كتحس بالتعب."],
  ["02", "شوف المنتج المناسب", "كل منتج عندو دور واضح باش ما تضيعش بين اختيارات بزاف."],
  ["03", "طلب وتوصل", "دخل الاسم ورقم الهاتف، كنأكدو معاك، وتخلص حتى توصلك السلعة."]
];

const faqs = [
  {
    question: "واش هاد المنتجات علاج طبي؟",
    answer: "لا. هادي منتجات دعم وراحة يومية. إذا عندك ألم قوي، مرض، أو تشخيص طبي، استشر مختص قبل الاستعمال."
  },
  {
    question: "كيفاش نعرف شنو يناسبني؟",
    answer: "ببساطة: الكتاف والوضعية = ألاين، الرقبة والشد = هيت، أسفل الظهر = لومبو."
  },
  {
    question: "واش خاصني نخلص قبل ما توصل السلعة؟",
    answer: "لا. الدفع عند الاستلام، وكنأكدو معاك الطلب بالهاتف قبل الإرسال."
  },
  {
    question: "شنو خاصني ندير باش نطلب؟",
    answer: "اختار المنتج، أضفه للسلة، دخل الاسم ورقم الهاتف، وغادي نتاصلو بك لتأكيد الطلب."
  }
];

export default function HomePage() {
  return (
    <div className="bg-sand-50">
      <section className="mx-auto max-w-6xl px-4 py-16 text-center md:py-24">
        <div className="mx-auto max-w-3xl animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-sage-100 px-4 py-2 text-sm font-black text-sage-700">
            <span className="h-2 w-2 rounded-full bg-sage-700" />
            أنا هنا باش نعاونك تختار، ماشي نغرقك فالاختيارات
          </span>
          <h1 className="mt-6 text-4xl font-black leading-[1.2] text-sand-950 md:text-6xl">
            فين كتحس بالتعب؟ نختار لك الدعم المناسب.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-sand-700">
            كتاف، رقبة، ولا أسفل الظهر؟ سَنَد كيجمع حلول دعم وراحة يومية باش تختار المنتج اللي مناسب لجسمك بلا تعقيد.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="#choose" className="btn-primary">
              نعرف شنو مناسب ليا
            </Link>
          </div>
          <div className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-2 text-sm font-bold text-sand-700">
            <span className="rounded-full bg-white px-4 py-2 shadow-sm">الدفع عند الاستلام</span>
            <span className="rounded-full bg-white px-4 py-2 shadow-sm">تأكيد قبل الإرسال</span>
            <span className="rounded-full bg-white px-4 py-2 shadow-sm">اختيار حسب الجسم</span>
          </div>
        </div>
      </section>

      <section id="products" className="bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="section-eyebrow">الحلول المتوفرة</p>
            <h2 className="section-title">كل منتج عندو دور واضح</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section id="choose" className="mx-auto max-w-6xl px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="section-eyebrow">اختار بسرعة</p>
            <h2 className="section-title">شنو نوع الجسم ديالك اليوم؟</h2>
            <p className="mt-4 leading-8 text-sand-700">
              إلا كنت محتار، بدا من هنا. شوف الجملة اللي كتقرب لك أكثر، وغادي تعرف المنتج اللي تبدا به.
            </p>
          </div>
          <div className="mt-8 grid gap-4">
            {bodyTypeGuide.map((item) => (
              <Link
                key={item.product}
                href={item.href}
                className="grid gap-4 rounded-[1.75rem] border border-sand-100 bg-white p-5 shadow-sm transition hover:border-sand-500 hover:shadow-soft md:grid-cols-[1fr_1.1fr_0.7fr_auto] md:items-center"
              >
                <div>
                  <p className="text-xs font-black text-sage-700">إذا كان هذا أنت</p>
                  <h3 className="mt-1 font-black text-sand-950">{item.bodyType}</h3>
                </div>
                <p className="text-sm leading-7 text-sand-700">{item.bestFor}</p>
                <p className="text-sm font-bold leading-7 text-sand-900">{item.decision}</p>
                <span className="font-black text-sand-900">اختار {item.product} ←</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="section-eyebrow">علاش الناس كيثقو فينا؟</p>
            <h2 className="section-title">كنبيعو بوضوح، ماشي بالضغط</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {trustBenefits.map((benefit) => (
              <div key={benefit} className="rounded-[1.5rem] bg-sand-50 p-5">
                <p className="font-bold leading-7 text-sand-900">✓ {benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="max-w-2xl">
          <p className="section-eyebrow">كيفاش كتدوز العملية؟</p>
          <h2 className="section-title">3 خطوات، بلا تعقيد</h2>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {steps.map(([num, title, description]) => (
            <div key={num} className="card-premium p-6">
              <span className="text-4xl font-black text-sand-100">{num}</span>
              <h3 className="mt-3 text-xl font-black text-sand-950">{title}</h3>
              <p className="mt-2 leading-8 text-sand-700">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sand-50 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <p className="section-eyebrow">أسئلة قبل الطلب</p>
          <h2 className="section-title">الأجوبة اللي كتحتاجها قبل ما تطلب</h2>
          <div className="mt-8 space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-[1.5rem] border border-sand-100 bg-white p-5 shadow-sm">
                <h3 className="font-black text-sand-950">{faq.question}</h3>
                <p className="mt-2 leading-8 text-sand-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] bg-sand-950 p-8 text-center text-white md:p-14">
          <p className="font-bold text-sage-100">باقي محتار؟ بدا من جسمك</p>
          <h2 className="mt-3 text-3xl font-black leading-snug md:text-4xl">
            اختار فين كتحس بالتعب،<br />
            وأنا نوجّهك للمنتج المناسب.
          </h2>
          <Link href="#choose" className="mt-8 inline-block rounded-full bg-white px-8 py-4 font-black text-sand-950 transition hover:scale-105">
            بغيت نلقى الحل المناسب
          </Link>
          <p className="mt-4 text-sm text-sand-100/60">الاسم ورقم الهاتف كافيين باش نأكدو الطلب معاك</p>
        </div>
      </section>
    </div>
  );
}
