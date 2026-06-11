export const metadata = {
  title: "اتصل بنا | سَنَد"
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <p className="font-bold text-sage-700">تواصل معنا</p>
      <h1 className="mt-3 text-4xl font-black text-sand-950">تواصل مع فريق سَنَد</h1>
      <p className="mt-5 leading-8 text-sand-700">
        عندك سؤال حول منتج، طلب، أو طريقة التوصيل؟ راسلنا وسنحاول نجاوبك في أقرب وقت.
      </p>
      <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-soft">
        <p className="font-bold text-sand-950">البريد الإلكتروني</p>
        <p className="mt-1 text-sand-700">support@sanad.ma</p>
        <p className="mt-6 font-bold text-sand-950">أوقات الدعم</p>
        <p className="mt-1 text-sand-700">من الإثنين إلى السبت، 9:00 - 18:00</p>
        <p className="mt-6 rounded-2xl bg-sand-50 p-4 text-sm leading-7 text-sand-700">
          إذا كان عندك طلب سابق، رجاءً احتفظ برقم الطلب باش نقدر نساعدك بسرعة.
        </p>
      </div>
    </div>
  );
}
