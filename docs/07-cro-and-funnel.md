# 07 — CRO & Funnel

هذا الملف يحدّد قمع البيع الكامل. الهدف: أعلى conversion ممكن مع COD، تقليل friction، ورفع AOV عبر upsell ذكي.

---

## 1. Funnel Summary

```txt
Home / Collection / Product
        ↓
Add to Cart / Buy Now
        ↓
Cart Drawer (cross-sells full price)
        ↓
Checkout Popup (name + Moroccan phone)
        ↓
Order Created in Backend
        ↓
Post-Form Upsell (10-15 sec, one discounted product)
        ↓
Thank You Page (summary + reassurance + full-price cross-sells)
```

---

## 2. Key CRO Principles

- لا صفحة cart. كل شيء يتم عبر Cart Drawer.
- لا تطلب عنواناً في v1. الهاتف يكفي لتقليل الاحتكاك، وفريق التأكيد يأخذ العنوان.
- لا تخفيضات معروضة قبل إدخال الهاتف. الأسعار الرئيسية ثابتة.
- التخفيض الوحيد: **upsell بعد form validation**.
- cross-sells في PDP/Cart/Thank You تكون **بالسعر الأصلي**.
- كل CTA قريب من proof: مراجعة، trust strip، أو ضمان COD.

---

## 3. Cart Drawer

### When It Opens

- بعد "أضفه للسلة".
- عند ضغط أيقونة السلة.
- بعد "اشترِ الآن" (يضيف المنتج ثم يفتح).

### Cart Drawer Structure

1. Header:
   - `سلتك`
   - عدد المنتجات
2. Items:
   - صورة
   - اسم
   - سعر
   - quantity stepper
   - remove
3. Cross-sell block:
   - عنوان: `كمّل نظام الراحة ديالك`
   - منتجان غير موجودين في السلة
   - زر صغير: `أضف`
   - السعر الأصلي فقط
4. Trust strip:
   - الدفع عند الاستلام
   - تأكيد قبل الإرسال
   - توصيل داخل المغرب
5. Total
6. CTA:
   - `أكمل الطلب`

### Empty Cart

Message:

> سلتك فارغة. اختار الحل المناسب لمنطقة التعب اللي كتزعجك.

CTA:

> شاهد منتجات سَنَد

---

## 4. Checkout Popup

### Trigger

عند الضغط على `أكمل الطلب` في Cart Drawer.

### Layout

- أعلى: reassurance line
  - `الدفع عند الاستلام — كنأكدو معاك قبل الإرسال`
- Order summary:
  - المنتجات
  - الكمية
  - الإجمالي
- Form:
  - الاسم الكامل
  - رقم الهاتف
- CTA:
  - `ثبّت طلبي الآن`
- Microcopy:
  - `مثال: 0612345678`
  - `غادي نتاصلو بك لتأكيد الطلب والعنوان قبل الإرسال.`

### Validation

Name:

- min 3 chars
- no numbers-only

Phone:

```regex
^0[5-7][0-9]{8}$
```

Error messages:

- الاسم: `كتب الاسم الكامل باش نأكدو الطلب.`
- الهاتف: `دخل رقم مغربي صحيح، مثال: 0612345678.`

### Conversion Copy

Headline:

> خطوة أخيرة ونثبّتو طلبك

Subheadline:

> خلّي الاسم ورقم الهاتف، وفريق سَنَد يتاصل بك لتأكيد الطلب قبل الإرسال. الدفع عند الاستلام.

---

## 5. Post-Form Upsell

### Important Rule

الـUpsell يظهر **فقط بعد**:

1. الاسم صحيح.
2. الهاتف صحيح.
3. الطلب تخلق في backend.

إذا المستخدم رفض، الطلب الأصلي يبقى محفوظاً ويتحوّل لصفحة الشكر.

### Timing

- 10 إلى 15 ثانية.
- Countdown واضح لكن غير مزعج.

### Offer

الـUpsell الوحيد الذي يمكن أن يكون بسعر مخفّض.

Copy:

> عرض خاص قبل ما نرسلو طلبك: زيد هذا المنتج لطلبك بثمن أقل اليوم فقط.

CTA:

- `أضفه لطلبي`
- `لا شكراً، أكمل طلبي`

### Upsell Decision Matrix

| Cart Contains | Upsell Product | Reason |
|---|---|---|
| Sanad Align only | Sanad Heat | الرقبة والكتاف مرتبطان؛ heat helps tension |
| Sanad Heat only | Sanad Lumbo | بعد الرقبة، أسفل الظهر ثاني أكبر pain |
| Sanad Lumbo only | Sanad Heat | combo راحة الظهر + الرقبة |
| Align + Heat | Sanad Lumbo | يكمل نظام الراحة الكامل |
| Align + Lumbo | Sanad Heat | أعلى impulse، سريع الفهم |
| Heat + Lumbo | Sanad Align | يكمل الظهر العلوي/الوضعية |
| All 3 | لا upsell | حوّل مباشرة لصفحة الشكر |

### Suggested Upsell Prices

| Product | Original | Upsell |
|---|---:|---:|
| Sanad Align | 249 د.م. | 199 د.م. |
| Sanad Heat | 299 د.م. | 249 د.م. |
| Sanad Lumbo | 249 د.م. | 199 د.م. |

> لا تعرض هذه الأسعار في أي مكان قبل upsell.

---

## 6. Thank You Page

### Purpose

ليست فقط صفحة نجاح. هي صفحة:

- تطمّن الزبون.
- ترفع confirmation rate.
- تعطي توقعات واضحة.
- تعرض cross-sells بالثمن الكامل.

### Structure

1. Success badge:
   - `تم تسجيل طلبك بنجاح`
2. Order number:
   - `رقم الطلب: SN-2026-000123`
3. Reassurance:
   - `غادي نتاصلو بك قريباً لتأكيد الطلب والعنوان قبل الإرسال.`
4. What happens next:
   - `1. تأكيد هاتفي`
   - `2. تجهيز الطلب`
   - `3. التوصيل والدفع عند الاستلام`
5. Order summary:
   - products + quantities + total
6. Confirmation rate copy:
   - `باش ما يتأخرش طلبك، خليك قريب من الهاتف اليوم.`
7. Cross-sells:
   - منتجات غير موجودة في الطلب
   - السعر الأصلي فقط
   - CTA: `أضفه لطلب جديد`

### Thank You Copy

> شكراً على ثقتك في سَنَد. طلبك تسجل بنجاح، وفريقنا غادي يتاصل بك لتأكيد التفاصيل قبل الإرسال. الدفع عند الاستلام، وما كاين حتى أداء مسبق.

---

## 7. Home Page CRO Structure

1. Announcement bar:
   - `الدفع عند الاستلام داخل المغرب • تأكيد قبل الإرسال`
2. Hero:
   - Promise + 3 product cards + trust strip.
3. Problem section:
   - `فين كيجيك التعب؟` (رقبة، كتاف، أسفل الظهر)
4. Product solution grid:
   - 3 cards.
5. Authority/science section:
   - explain posture, heat, compression.
6. Social proof:
   - review cards.
7. Brand story:
   - why SANAD exists.
8. Comparison:
   - Random product vs SANAD.
9. FAQ.
10. Final CTA.

---

## 8. Product Page CRO Structure

1. Sticky trust bar.
2. Gallery + buy box.
3. Above fold:
   - Product name.
   - Problem solved.
   - price.
   - 3 bullets.
   - CTA.
   - COD trust.
4. Mechanism section.
5. How to use.
6. Materials/tech.
7. Reviews.
8. Cross-sells.
9. FAQ.
10. Sticky mobile CTA.

---

## 9. Metrics To Track

Frontend events:

- `ViewContent`
- `AddToCart`
- `InitiateCheckout`
- `Lead` (after valid checkout form/order created)
- `UpsellShown`
- `UpsellAccepted`
- `Purchase` (COD order submitted)

Business metrics:

- CVR: visits → orders.
- AOV: average order value.
- Upsell take rate.
- Confirmation rate.
- Delivery rate.
- RTO/cancellation reasons.

---

## 10. Anti-Friction Rules

Do not:

- Ask for city/address in checkout v1.
- Ask for email.
- Add long legal text near CTA.
- Show too many upsells.
- Show fake urgency everywhere.

Do:

- Keep checkout under 30 seconds.
- Use COD reassurance.
- Make phone example visible.
- Keep error messages human.
- Make closing modal possible but not accidental.
