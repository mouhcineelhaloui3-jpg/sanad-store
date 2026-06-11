# 03 — Coding Rules

هذه القواعد إلزامية لأي AI coder يبني متجر **سَنَد**.

---

## 1. Language & UX Rules

- واجهة المتجر بالعربية/الدارجة المغربية، اتجاه `dir="rtl"`.
- لا تخلط العربية والإنجليزية في CTA الأساسي. استعمل عربية واضحة.
- لا تستعمل عبارات طبية قطعية مثل: "يعالج"، "يشفي"، "يقضي نهائياً"، "مضمون طبياً".
- استعمل عبارات آمنة إعلانياً:
  - "يساعد على تخفيف..."
  - "يدعم الوضعية..."
  - "إحساس براحة أكثر..."
  - "مناسب للاستعمال اليومي..."
- السوق المغرب: العملة `د.م.`، الهاتف يبدأ بـ0، regex: `^0[5-7][0-9]{8}$`.

---

## 2. Frontend Code Style

- TypeScript صارم. لا تستعمل `any` إلا بتعليق يبرّر.
- المكوّنات:
  - Server Components افتراضياً.
  - Client Components فقط عند الحاجة: state، event handlers، localStorage، modals.
- أسماء الملفات:
  - Components: `PascalCase.tsx`
  - Utilities/data: `camelCase.ts`
  - Routes: حسب Next.js (`page.tsx`, `layout.tsx`).
- اجعل `products.ts` هو مصدر الحقيقة للمنتجات في الواجهة.
- ممنوع تكرار أسعار المنتجات داخل الصفحات. استوردها من `products.ts`.

---

## 3. Folder Rules

```txt
src/
├── app/
├── components/
│   ├── layout/
│   ├── cart/
│   ├── checkout/
│   ├── product/
│   ├── home/
│   └── ui/
├── lib/
├── store/
└── styles/
```

- لا تضع منطق السلة داخل صفحة واحدة. السلة في `store/cartStore.ts`.
- لا تضع calls للـAPI داخل مكوّنات كثيرة. استعمل `lib/api.ts`.
- لا تضع copy طويل داخل المكوّنات إذا صار كبيراً؛ انقله إلى `lib/copy.ts` أو `products.ts`.

---

## 4. Cart Rules

- لا توجد صفحة `/cart`.
- Cart Drawer يظهر في كل الموقع.
- عند الضغط على CTA في product/collection:
  1. أضف المنتج للسلة.
  2. افتح Cart Drawer.
  3. اعرض cross-sells بالثمن الكامل.
- السلة تُحفظ في `localStorage` عبر Zustand persist.
- كل item في السلة يحتوي:
  - `productId`
  - `slug`
  - `name`
  - `unitPrice`
  - `quantity`
  - `image`

---

## 5. Checkout Rules

- Checkout عبارة عن Popup/Modal وليس صفحة.
- الحقول الوحيدة:
  - الاسم الكامل
  - الهاتف المغربي
- لا تطلب العنوان في v1. فريق التأكيد يأخذه عبر الهاتف بعد الطلب. هذا يقلّل friction.
- بعد validation والضغط على CTA:
  - أنشئ الطلب في backend.
  - اعرض upsell لمدة 10-15 ثانية.
  - ثم حوّل إلى صفحة الشكر.

---

## 6. Backend Code Style

- FastAPI routes تكون صغيرة. المنطق في `services/`.
- كل request/response عنده Pydantic schema.
- SQLAlchemy models منفصلة عن schemas.
- لا تخزّن السعر من العميل كما هو. احسب السعر من product catalog في backend.
- كل طلب يأخذ `order_number` readable مثل: `SN-2026-000123`.
- status values:
  - `pending`
  - `confirmed`
  - `cancelled`
  - `shipped`
  - `delivered`
  - `returned`

---

## 7. Accessibility & Mobile

- كل زر لديه نص واضح، ليس أيقونة فقط.
- كل Dialog/Sheet يستعمل Radix/shadcn مع focus trap.
- touch targets لا تقل عن 44px.
- sticky CTA في PDP على الهاتف.
- لا تعتمد على اللون وحده لإظهار حالة مهمة.

---

## 8. SEO Rules

- كل صفحة منتج لها:
  - `title`
  - `description`
  - Open Graph image
  - Product structured data (اختياري v1)
- استخدم slugs عربية/لاتينية واضحة. المفضّل:
  - `/product/sanad-align`
  - `/product/sanad-heat`
  - `/product/sanad-lumbo`

---

## 9. Testing Checklist

قبل اعتبار أي feature مكتمل:

- يعمل على 375px و390px و430px وDesktop.
- RTL لا يكسر layout.
- إضافة للسلة + حذف + تغيير الكمية تعمل.
- Checkout يمنع رقم غير مغربي.
- Order API يرجع `order_id` و`order_number`.
- Upsell يضيف المنتج للطلب أو يتجاوزه بدون كسر.
- صفحة الشكر تعرض الملخّص الصحيح.

---

## 10. Copy Safety

ممنوع:

- صور before/after مبالغ فيها أو مهينة للجسم.
- استهداف صفات شخصية بشكل مباشر في الإعلان: "واش عندك ألم..." داخل ad copy. في الموقع يمكن الحديث بلطف: "إذا كان نهارك طويل..." دون تخويف.
- ادعاء شهادات غير موجودة. إذا لم توجد شهادة فعلية، استعمل "مصنوع وفق معايير جودة المورد" وليس "معتمد طبياً".

مسموح:

- شرح ergonomic design.
- ذكر مواد عامة: neoprene breathable، elastic support، heat/vibration.
- مراجعات عملاء بصياغة واقعية مع تنبيه أنها تجارب فردية.
