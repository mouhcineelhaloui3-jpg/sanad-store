import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductVisual } from "@/components/product/ProductVisual";
import { formatPrice, products } from "@/lib/products";

const proof = [
  { icon: "🚚", text: "توصيل داخل المغرب" },
  { icon: "💰", text: "الدفع عند الاستلام" },
  { icon: "📞", text: "تأكيد قبل الإرسال" },
  { icon: "✓", text: "بدون أداء مسبق" }
];

const problemPaths = [
  { title: "كتافك طايحين من الجلسة؟", description: "اختار دعم الوضعية والظهر العلوي.", productId: "sanad-align" },
  { title: "رقبتك مشدودة آخر النهار؟", description: "اختار الحرارة والاهتزاز للرقبة.", productId: "sanad-heat" },
  { title: "أسفل ظهرك كيتقل؟", description: "اختار ضغط داعم وثبات أكثر.", productId: "sanad-lumbo" }
];

const methodCards = [
  { num: "01", title: "كنحددو منطقة التعب", description: "كل منتج مربوط بمشكل واضح: وضعية، رقبة، أو أسفل الظهر." },
  { num: "02", title: "كنشرحوا الآلية ببساطة", description: "شد تدريجي، حرارة واهتزاز، أو ضغط داعم — الزبون يفهم علاش المنتج مناسب." },
  { num: "03", title: "كنقللو المخاطرة", description: "الدفع عند الاستلام، تأكيد قبل الإرسال، وسياسات واضحة باش القرار يكون سهل." }
];

const productChoiceGuide = [
  ["كنجلس بزاف وكتافي طايحين", "سَنَد ألاين", "sanad-align"],
  ["رقبتي كتشد من الهاتف/الكمبيوتر", "سَنَد هيت", "sanad-heat"],
  ["كنسوق/كنوقف بزاف وأسفل ظهري كيتقل", "سَنَد لومبو", "sanad-lumbo"]
];

const reviews = [
  { name: "ياسين", city: "الدار البيضاء", text: "دخلت من إعلان، الموقع شرح ليا مزيان شنو غادي ناخد. الدفع عند الاستلام خلاني نطلب بلا تردد." },
  { name: "نعيمة", city: "فاس", text: "عجبني أن كل منتج عندو شرح وطريقة استعمال. وسادة الرقبة ولات عندي فآخر النهار." },
  { name: "محمد", city: "مكناس", text: "كنسوق بزاف وخديت حزام أسفل الظهر. تأكدو معايا قبل الإرسال والتوصيل كان واضح." }
];

const faqs = [
  { question: "واش سَنَد متجر مغربي؟", answer: "نعم، الدفع عند الاستلام، تأكيد هاتفي، وتوصيل داخل المدن المغربية." },
  { question: "واش المنتجات علاج طبي؟", answer: "لا. مخصصة للدعم والراحة اليومية، وليست بديلاً عن استشارة مختص عند الألم القوي أو المستمر." },
  { question: "علاش الثمن أعلى من منتجات كاينة فالسوق؟", answer: "لأن سَنَد يقدّم تجربة موثوقة: اختيار مناسب، شرح واضح، تأكيد قبل الإرسال، وسياسات شفافة." },
  { question: "شنو خاصني ندير باش نطلب؟", answer: "اختار المنتج، أضفه للسلة، دخل الاسم ورقم الهاتف المغربي — فريقنا يتاصل بك لتأكيد الطلب." }
];

export default function HomePage() {
  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-24">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-sage-100 px-4 py-2 text-sm font-bold text-sage-700">
            <span className="h-2 w-2 rounded-full bg-sage-700" />
            نظام سَنَد للراحة اليومية
          </span>
          <h1 className="mt-6 text-4xl font-black leading-[1.25] text-sand-950 md:text-6xl">
            نهارك طويل؟<br />
            <span className="text-sand-700">جسمك خاصو دعم ذكي.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-9 text-sand-700">
            سَنَد متجر مغربي متخصص في حلول دعم الظهر، الرقبة، والكتفين. كنشرح لك المشكل،
            الآلية، طريقة الاستعمال، وآراء العملاء — باش تختار بثقة.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/collection" className="btn-primary">اختار الحل المناسب</Link>
            <Link href="/about" className="btn-secondary">لماذا سَنَد؟</Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {proof.map((item) => (
              <div key={item.text} className="flex items-center gap-2 rounded-2xl bg-white px-3 py-3 text-sm font-bold text-sand-900 shadow-sm">
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero product selector */}
        <div className="rounded-[2.5rem] bg-white p-5 shadow-soft">
          <p className="mb-4 text-center text-sm font-bold text-sage-700">اختار حسب منطقة التعب</p>
          <div className="space-y-3">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="flex items-center gap-4 rounded-2xl border border-sand-100 bg-sand-50 p-3 transition hover:border-sand-500 hover:bg-white"
              >
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                  <ProductVisual product={product} size="sm" showBadge={false} />
                </div>
                <div className="flex-1 text-right">
                  <p className="font-black text-sand-950">{product.shortName}</p>
                  <p className="mt-0.5 text-xs text-sand-700">{product.problem}</p>
                </div>
                <div className="text-left">
                  <p className="font-black text-sand-900">{formatPrice(product.price)}</p>
                  <p className="text-xs text-sage-700">←</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRUST BAR ═══ */}
      <section className="border-y border-sand-100 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-2 px-4 py-4">
          {[
            "4.7/5 تقييم متوسط",
            "طلب بالاسم والهاتف فقط",
            "تأكيد هاتفي قبل الإرسال",
            "بدون بطاقة بنكية"
          ].map((item) => (
            <span key={item} className="rounded-full bg-sage-100 px-4 py-2 text-sm font-bold text-sage-700">
              ✓ {item}
            </span>
          ))}
        </div>
      </section>

      {/* ═══ PROBLEM SELECTOR ═══ */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="max-w-2xl">
          <p className="section-eyebrow">قرار سريع حسب المشكل</p>
          <h2 className="section-title">شنو أكثر حاجة كتزعجك؟</h2>
          <p className="mt-4 leading-8 text-sand-700">كل اختيار كيدخلك لصفحة منتج مستقلة فيها كل ما تحتاج باش تفهم وتقرر.</p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {problemPaths.map((path) => {
            const product = products.find((p) => p.id === path.productId);
            if (!product) return null;
            return (
              <Link
                key={path.productId}
                href={`/product/${product.slug}`}
                className="card-premium group overflow-hidden"
              >
                <ProductVisual product={product} size="sm" showBadge />
                <div className="p-5">
                  <h3 className="text-xl font-black leading-8 text-sand-950">{path.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-sand-700">{path.description}</p>
                  <p className="mt-4 font-black text-sand-900 transition group-hover:translate-x-[-4px]">شوف الحل ←</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ═══ CHOICE GUIDE ═══ */}
      <section className="bg-sand-100 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="section-eyebrow">اختيار بلا حيرة</p>
            <h2 className="section-title">إلى كنتي محتار، بدا من هنا.</h2>
          </div>
          <div className="mt-8 overflow-hidden rounded-[2rem] bg-white shadow-soft">
            {productChoiceGuide.map(([problem, solution, slug], index) => (
              <Link
                key={problem}
                href={`/product/${slug}`}
                className="grid gap-3 border-b border-sand-100 p-5 transition last:border-0 hover:bg-sand-50 md:grid-cols-[1.1fr_0.9fr_auto]"
              >
                <div>
                  <p className="text-xs font-bold text-sage-700">الحالة {index + 1}</p>
                  <p className="mt-1 font-black text-sand-950">{problem}</p>
                </div>
                <p className="self-center font-bold text-sand-700">{solution}</p>
                <p className="self-center font-black text-sand-900">شوف الحل ←</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRODUCTS ═══ */}
      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="section-eyebrow">المنتجات الأساسية</p>
            <h2 className="section-title">3 حلول واضحة، كل واحد كيحل مشكل مختلف</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ METHOD ═══ */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="max-w-2xl">
          <p className="section-eyebrow">طريقة سَنَد</p>
          <h2 className="section-title">ماشي متجر عشوائي. نظام اختيار وبناء ثقة.</h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {methodCards.map((card) => (
            <div key={card.num} className="card-premium p-6">
              <span className="text-4xl font-black text-sand-100">{card.num}</span>
              <h3 className="mt-3 text-xl font-black text-sand-950">{card.title}</h3>
              <p className="mt-2 leading-8 text-sand-700">{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SCIENCE BAR ═══ */}
      <section className="bg-sand-900 px-4 py-14 text-white">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-black">الجسم ما محتاجش تعقيد. محتاج دعم صحيح.</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              { title: "شد تدريجي للوضعية", desc: "يساعد الظهر العلوي والكتفين يرجعو لوضعيتهم الطبيعية بشكل تدريجي وبدون ألم." },
              { title: "حرارة واهتزاز للرقبة", desc: "يريّح العضلات المشدودة بالجمع بين الدفء وتحفيز الدورة الدموية." },
              { title: "ضغط داعم لأسفل الظهر", desc: "يثبّت وضعية أسفل الظهر ويقلل الإجهاد خلال الوقوف والسياقة الطويلة." }
            ].map((item) => (
              <div key={item.title} className="rounded-3xl bg-white/10 p-6 backdrop-blur">
                <h3 className="font-black text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-sand-100">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ REVIEWS ═══ */}
      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-eyebrow">آراء العملاء</p>
              <h2 className="section-title">ناس بحالك طلبو بثقة</h2>
            </div>
            <span className="rounded-2xl bg-sage-100 px-5 py-3 text-sm font-black text-sage-700">★ 4.7/5 تقييم متوسط</span>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {reviews.map((review) => (
              <figure key={review.name} className="card-premium p-6">
                <p className="text-xl text-amber-400">★★★★★</p>
                <blockquote className="mt-4 leading-8 text-sand-800">"{review.text}"</blockquote>
                <figcaption className="mt-5 border-t border-sand-100 pt-4 font-black text-sand-950">
                  {review.name} · {review.city}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="bg-sand-50 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <p className="section-eyebrow">أسئلة قبل الطلب</p>
          <h2 className="section-title">جاوبنا على اعتراضاتك قبل ما توقفك</h2>
          <div className="mt-10 space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-[1.5rem] border border-sand-100 bg-white p-5 shadow-sm">
                <h3 className="font-black text-sand-950">{faq.question}</h3>
                <p className="mt-2 leading-8 text-sand-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] bg-sand-950 p-8 text-center text-white md:p-14">
          <p className="font-bold text-sage-100">دابا القرار ساهل</p>
          <h2 className="mt-3 text-3xl font-black leading-snug md:text-4xl">
            اختار منطقة التعب، شوف صفحة المنتج،<br />
            وطلب بالدفع عند الاستلام.
          </h2>
          <Link href="/collection" className="mt-8 inline-block rounded-full bg-white px-8 py-4 font-black text-sand-950 transition hover:scale-105">
            شوف جميع المنتجات
          </Link>
          <p className="mt-4 text-sm text-sand-100/60">لا بطاقة بنكية • لا أداء مسبق • رقم مغربي يكفي</p>
        </div>
      </section>
    </div>
  );
}
