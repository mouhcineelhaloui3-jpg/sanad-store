import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { formatPrice, products } from "@/lib/products";

const proof = [
  "الدفع عند الاستلام",
  "توصيل داخل المغرب",
  "تأكيد قبل الإرسال",
  "منتجات مختارة بعناية"
];

const problemPaths = [
  {
    title: "كتافك طايحين من الجلسة؟",
    description: "اختار دعم الوضعية والظهر العلوي.",
    productId: "sanad-align"
  },
  {
    title: "رقبتك مشدودة آخر النهار؟",
    description: "اختار الحرارة والاهتزاز للرقبة.",
    productId: "sanad-heat"
  },
  {
    title: "أسفل ظهرك كيتقل؟",
    description: "اختار ضغط داعم وثبات أكثر.",
    productId: "sanad-lumbo"
  }
];

const methodCards = [
  {
    title: "1. كنحددو منطقة التعب",
    description: "ما كنبيعوش منتج عشوائي. كل منتج مربوط بمشكل واضح: وضعية، رقبة، أو أسفل الظهر."
  },
  {
    title: "2. كنشرحوا الآلية ببساطة",
    description: "شد تدريجي، حرارة واهتزاز، أو ضغط داعم. الزبون يفهم علاش المنتج مناسب لروتينه."
  },
  {
    title: "3. كنقللو المخاطرة",
    description: "الدفع عند الاستلام، تأكيد قبل الإرسال، وسياسات واضحة باش القرار يكون سهل."
  }
];

const productChoiceGuide = [
  ["كنجلس بزاف وكتافي طايحين", "سَنَد ألاين", "sanad-align"],
  ["رقبتي كتشد من الهاتف/الكمبيوتر", "سَنَد هيت", "sanad-heat"],
  ["كنسوق/كنوقف بزاف وأسفل ظهري كيتقل", "سَنَد لومبو", "sanad-lumbo"]
];

const reviews = [
  {
    name: "ياسين",
    city: "الدار البيضاء",
    text: "دخلت من إعلان ديال مصحّح الوضعية، الموقع شرح ليا مزيان شنو غادي ناخد. الدفع عند الاستلام خلاني نطلب بلا تردد."
  },
  {
    name: "نعيمة",
    city: "فاس",
    text: "عجبني أن كل منتج عندو شرح وطريقة استعمال، ماشي غير صور وثمن. وسادة الرقبة ولات عندي فآخر النهار."
  },
  {
    name: "محمد",
    city: "مكناس",
    text: "كنسوق بزاف وخديت حزام أسفل الظهر. تأكدو معايا قبل الإرسال والتوصيل كان واضح."
  }
];

const faqs = [
  {
    question: "واش سَنَد متجر مغربي؟",
    answer: "نعم، المتجر موجّه للمغرب: الدفع عند الاستلام، تأكيد هاتفي، وتوصيل داخل المدن المغربية."
  },
  {
    question: "واش المنتجات علاج طبي؟",
    answer: "لا. المنتجات مخصصة للدعم والراحة اليومية، وليست بديلاً عن استشارة مختص عند وجود ألم قوي أو مستمر."
  },
  {
    question: "علاش الثمن أعلى من منتجات كاينة فالسوق؟",
    answer: "لأن سَنَد يقدّم تجربة موثوقة: اختيار منتج مناسب، شرح واضح، تأكيد قبل الإرسال، وسياسات شفافة."
  },
  {
    question: "شنو خاصني ندير باش نطلب؟",
    answer: "اختار المنتج، أضفه للسلة، دخل الاسم ورقم الهاتف المغربي، وفريقنا يتاصل بك لتأكيد الطلب."
  }
];

export default function HomePage() {
  return (
    <div>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-20">
        <div>
          <p className="inline-flex rounded-full bg-sage-100 px-4 py-2 text-sm font-bold text-sage-700">
            نظام سَنَد للراحة اليومية
          </p>
          <h1 className="mt-6 text-4xl font-black leading-[1.25] text-sand-950 md:text-6xl">
            نهارك طويل؟ جسمك خاصو دعم ذكي، ماشي وعود فارغة.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-9 text-sand-700">
            سَنَد متجر مغربي متخصص في حلول دعم الظهر، الرقبة، والكتفين. كنشرح لك المشكل، الآلية،
            طريقة الاستعمال، وآراء العملاء — باش تختار بثقة وتطلب بالدفع عند الاستلام.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/collection" className="rounded-full bg-sand-900 px-7 py-4 text-center font-black text-white">
              اختار الحل المناسب
            </Link>
            <Link href="/about" className="rounded-full border border-sand-100 bg-white px-7 py-4 text-center font-black text-sand-950">
              لماذا سَنَد؟
            </Link>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {["4.7/5 تقييمات", "بدون أداء مسبق", "رقم مغربي يكفي للطلب"].map((item) => (
              <div key={item} className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-sand-900 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2.5rem] bg-sand-100 p-6 shadow-soft">
          <div className="rounded-[2rem] bg-white p-8 text-center">
            <p className="text-sm font-bold text-sage-700">اختار حسب منطقة التعب</p>
            <div className="mt-6 space-y-3">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="block rounded-2xl bg-sand-50 p-4 text-right transition hover:bg-sand-100"
                >
                  <p className="font-black text-sand-950">{product.shortName}</p>
                  <p className="mt-1 text-sm text-sand-700">{product.problem}</p>
                  <p className="mt-2 text-sm font-black text-sand-900">{formatPrice(product.price)}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-sand-100 bg-white">
        <div className="mx-auto grid max-w-6xl gap-3 px-4 py-5 sm:grid-cols-2 md:grid-cols-4">
          {proof.map((item) => (
            <div key={item} className="rounded-2xl bg-sand-50 px-4 py-3 text-center text-sm font-bold text-sand-900">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="max-w-2xl">
          <p className="font-bold text-sage-700">قرار سريع حسب المشكل</p>
          <h2 className="mt-2 text-3xl font-black text-sand-950">ما تضيعش الوقت: شنو أكثر حاجة كتزعجك؟</h2>
          <p className="mt-4 leading-8 text-sand-700">
            كل اختيار كيدخلك لصفحة منتج مستقلة، فيها كل ما تحتاجه باش تفهم وتقرر.
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {problemPaths.map((path) => {
            const product = products.find((item) => item.id === path.productId);
            if (!product) return null;
            return (
              <Link
                key={path.productId}
                href={`/product/${product.slug}`}
                className="rounded-[2rem] border border-sand-100 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:border-sand-500"
              >
                <p className="text-sm font-bold text-sage-700">{product.shortName}</p>
                <h3 className="mt-3 text-2xl font-black leading-9 text-sand-950">{path.title}</h3>
                <p className="mt-3 leading-7 text-sand-700">{path.description}</p>
                <p className="mt-5 font-black text-sand-900">شوف صفحة المنتج ←</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-sand-100 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="font-bold text-sage-700">اختيار بلا حيرة</p>
            <h2 className="mt-2 text-3xl font-black text-sand-950">إلى كنتي محتار، بدا من هنا.</h2>
          </div>
          <div className="mt-8 overflow-hidden rounded-[2rem] bg-white shadow-soft">
            {productChoiceGuide.map(([problem, solution, slug], index) => (
              <Link
                key={problem}
                href={slug === "collection" ? "/collection" : `/product/${slug}`}
                className="grid gap-3 border-b border-sand-100 p-5 transition hover:bg-sand-50 md:grid-cols-[1.1fr_0.9fr_auto]"
              >
                <div>
                  <p className="text-sm font-bold text-sage-700">الحالة {index + 1}</p>
                  <p className="mt-1 font-black text-sand-950">{problem}</p>
                </div>
                <p className="font-bold text-sand-700">{solution}</p>
                <p className="font-black text-sand-900">شوف الحل ←</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="font-bold text-sage-700">المنتجات الأساسية</p>
            <h2 className="mt-2 text-3xl font-black text-sand-950">3 حلول واضحة، كل واحد كيحل مشكل مختلف</h2>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="max-w-2xl">
          <p className="font-bold text-sage-700">طريقة سَنَد</p>
          <h2 className="mt-2 text-3xl font-black text-sand-950">ماشي متجر عشوائي. نظام اختيار وبناء ثقة.</h2>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {methodCards.map((card) => (
            <div key={card.title} className="rounded-[2rem] bg-white p-6 shadow-soft">
              <h3 className="text-xl font-black text-sand-950">{card.title}</h3>
              <p className="mt-3 leading-8 text-sand-700">{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sand-900 px-4 py-14 text-white">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-black">الجسم ما محتاجش تعقيد. محتاج دعم صحيح.</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {["شد تدريجي للوضعية", "حرارة واهتزاز للرقبة", "ضغط داعم لأسفل الظهر"].map((item) => (
              <div key={item} className="rounded-3xl bg-white/10 p-6">
                <h3 className="font-black">{item}</h3>
                <p className="mt-3 text-sm leading-7 text-sand-100">
                  شرح واضح ومنطقي يساعد الزبون يفهم علاش المنتج مناسب لروتينه اليومي بدون وعود طبية مبالغ فيها.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-bold text-sage-700">Social proof</p>
              <h2 className="mt-2 text-3xl font-black text-sand-950">ناس بحالك طلبو بثقة</h2>
            </div>
            <div className="rounded-2xl bg-sand-50 px-5 py-3 text-sm font-black text-sand-900">
              4.7/5 كتقييم متوسط على منتجات سَنَد
            </div>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {reviews.map((review) => (
              <figure key={review.name} className="rounded-[2rem] border border-sand-100 bg-sand-50 p-6">
                <p className="text-lg font-black text-sand-900">★★★★★</p>
                <blockquote className="mt-4 leading-8 text-sand-800">“{review.text}”</blockquote>
                <figcaption className="mt-5 border-t border-sand-100 pt-4 font-black text-sand-950">
                  {review.name} · {review.city}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <p className="font-bold text-sage-700">أسئلة قبل الطلب</p>
          <h2 className="mt-2 text-3xl font-black text-sand-950">جاوبنا على الاعتراضات قبل ما توقفك</h2>
          <div className="mt-8 space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-[1.5rem] border border-sand-100 bg-sand-50 p-5">
                <h3 className="font-black text-sand-950">{faq.question}</h3>
                <p className="mt-2 leading-8 text-sand-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] bg-sand-950 p-8 text-center text-white md:p-12">
          <p className="font-bold text-sage-100">دابا القرار ساهل</p>
          <h2 className="mt-3 text-3xl font-black leading-snug md:text-4xl">
            اختار منطقة التعب، دخل لصفحة المنتج، وطلب بالدفع عند الاستلام.
          </h2>
          <Link href="/collection" className="mt-8 inline-block rounded-full bg-white px-8 py-4 font-black text-sand-950">
            شوف جميع المنتجات
          </Link>
        </div>
      </section>
    </div>
  );
}
