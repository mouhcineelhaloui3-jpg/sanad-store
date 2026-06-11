import Link from "next/link";

export const metadata = {
  title: "من نحن | سَنَد"
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <p className="font-bold text-sage-700">من نحن</p>
      <h1 className="mt-3 text-4xl font-black leading-[1.3] text-sand-950">
        سَنَد بدا من فكرة بسيطة: الجسم اللي كيخدم بزاف خاصو دعم موثوق.
      </h1>
      <p className="mt-6 text-lg leading-9 text-sand-700">
        كل يوم كنقضيو ساعات فالخدمة، الهاتف، الكرسي، الطريق، أو شغل الدار. ومع الوقت، الرقبة كتشد،
        الكتاف كيطيحو، وأسفل الظهر كيولي ثقيل. سَنَد جاء باش يقدّم حلول عملية وبسيطة تساعدك تحس براحة أكثر.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {["مشكلة يومية واضحة", "استعمال بسيط", "دفع عند الاستلام"].map((item) => (
          <div key={item} className="rounded-3xl bg-white p-6 shadow-soft">
            <h2 className="font-black text-sand-950">{item}</h2>
            <p className="mt-3 text-sm leading-7 text-sand-700">
              نختار منتجات عملية، قابلة للشرح، ومناسبة للروتين اليومي داخل المغرب.
            </p>
          </div>
        ))}
      </div>
      <Link href="/collection" className="mt-10 inline-block rounded-full bg-sand-900 px-7 py-4 font-black text-white">
        اكتشف منتجات سَنَد
      </Link>
    </div>
  );
}
