# 09 — Pages & Routes

هذا الملف يحدد صفحات الموقع، المسارات، الأقسام، والـcomponents المطلوبة.

---

## 1. Sitemap

```txt
/                       Home
/collection             All Products
/product/sanad-align    Product page
/product/sanad-heat     Product page
/product/sanad-lumbo    Product page
/about                  About us
/contact                Contact us
/policies/shipping      Shipping policy
/policies/returns       Returns/exchange policy
/policies/privacy       Privacy policy
/policies/terms         Terms
/thank-you              Thank you page
```

لا تنشئ:

```txt
/cart
/checkout
```

السلة والشيك آوت يتمان عبر drawer/modal.

---

## 2. Global Layout

### `app/layout.tsx`

Must include:

- `lang="ar"`
- `dir="rtl"`
- Arabic font.
- Header.
- Footer.
- Cart Drawer provider.
- Checkout/Upsell modals provider.
- Toaster.
- Analytics scripts.

### Global Components

- `AnnouncementBar`
- `Header`
- `Footer`
- `CartDrawer`
- `CheckoutModal`
- `UpsellModal`
- `MobileStickyCTA` (PDP only)

---

## 3. Home Page `/`

### Goal

Position SANAD as the trusted Moroccan store for daily body comfort and guide visitors to the right dedicated product page. Home must be longer than a basic storefront and should sell the brand before selling the product.

### Non-Negotiables

- Home page must be a conversion page, not just a hero + product grid.
- Product cards and problem cards must link to the dedicated product page.
- Home should educate, reduce doubt, and make the choice simple.
- Repeat trust and COD reassurance near key CTAs.
- Keep product pages fully independent landing pages for direct ad traffic.

### Sections

1. **Announcement Bar**
   - `الدفع عند الاستلام داخل المغرب • تأكيد قبل الإرسال`

2. **Hero**
   - Headline:
     > نهارك طويل؟ جسمك خاصو دعم ذكي، ماشي وعود فارغة.
   - Subheadline:
     > سَنَد متجر مغربي متخصص في حلول دعم الظهر، الرقبة، والكتفين. كل منتج عندو صفحة كاملة كتشرح المشكل، الآلية، طريقة الاستعمال، وآراء العملاء.
   - CTAs:
     - `اختار الحل المناسب`
     - `لماذا سَنَد؟`
   - Visual: 3 product stack or clean lifestyle image.

3. **Trust Strip**
   - الدفع عند الاستلام
   - توصيل داخل المغرب
   - تأكيد قبل الإرسال
   - منتجات مختارة بعناية

4. **Problem Selector**
   - Title:
     > ما تضيعش الوقت: شنو أكثر حاجة كتزعجك؟
   - Cards:
     - كتافك طايحين من الجلسة؟ -> `/product/sanad-align`
     - رقبتك مشدودة آخر النهار؟ -> `/product/sanad-heat`
     - أسفل ظهرك كيتقل؟ -> `/product/sanad-lumbo`

5. **Product Grid**
   - 3 product cards.
   - Each card has problem, price, CTA, and visible link to the full product page.

6. **SANAD Method**
   - Explain how SANAD chooses products and reduces risk.

7. **Authority / Science**
   - Title:
     > الجسم ما محتاجش تعقيد. محتاج دعم صحيح.
   - Explain posture, heat, compression.

8. **Comparison**
   - Random marketplace product vs SANAD.
   - Focus on trust, explanation, COD, support.

9. **Social Proof**
   - 6 review cards.
   - Moroccan names/cities.

10. **COD Process**
   - 3 steps: choose product, enter name/phone, confirmation call, payment on delivery.

11. **Brand Story**
   - Why SANAD exists.

12. **FAQ**

13. **Final CTA**
   - `اختار حل الراحة ديالك`

---

## 4. Collection Page `/collection`

### Goal

Help visitor choose one of the 3 products fast.

### Sections

1. Header:
   > منتجات سَنَد للراحة اليومية

2. Filter/Selector (simple, no complex filtering):
   - الكتاف والوضعية
   - الرقبة
   - أسفل الظهر

3. Product Cards:
   - Image
   - problem
   - benefit bullets
   - price
   - CTA: `أضف للسلة`
   - Secondary: `شاهد التفاصيل`

4. Trust + reviews.

5. FAQ:
   - COD.
   - delivery.
   - sizing.
   - returns.

---

## 5. Product Pages `/product/[slug]`

### Shared Structure

1. Product Hero:
   - Gallery.
   - Name.
   - Problem.
   - Price.
   - 3 bullets.
   - CTA.
   - COD reassurance.

2. Pain Section:
   - Speak to ICP.

3. Mechanism Section:
   - Unique mechanism from `05-positioning.md`.

4. Benefits:
   - 3-5 benefit cards.

5. How To Use:
   - 3 simple steps.

6. Materials/Tech:
   - No fake certificates.
   - Use real material/tech details.

7. Reviews:
   - 3-5 local reviews.

8. Cross-Sell:
   - Other two products, full price.

9. FAQ.

10. Sticky Mobile CTA:
   - product name + price + button.

### Product-Specific Above Fold

Use copy from `08-products.md`.

---

## 6. About Page `/about`

### Goal

Make the brand feel real.

Sections:

1. Hero:
   > سَنَد بدا من فكرة بسيطة: الجسم اللي كيخدم بزاف خاصو دعم موثوق.

2. Mission:
   - Help Moroccans feel more comfortable in daily routines.

3. How We Choose Products:
   - clear problem.
   - practical use.
   - easy to explain.
   - COD friendly.
   - quality checked.

4. Trust:
   - COD.
   - confirmation.
   - clear policies.

5. CTA to collection.

---

## 7. Contact Page `/contact`

### Goal

Trust + practical contact.

Fields:

- name
- phone
- message

For v1, contact form may send to backend table `contact_messages` or mail placeholder. If no backend endpoint is built, show static contact info and disable form until ready.

Include:

- support hours.
- email placeholder.
- phone placeholder.
- "For order changes, keep your order number."

---

## 8. Policy Pages

### `/policies/shipping`

Content:

- delivery inside Morocco.
- estimated timing placeholder: 24-72h major cities, 2-5 days other areas (adjust with real carrier).
- confirmation before shipping.
- COD.

### `/policies/returns`

Content:

- exchange if damaged/incorrect.
- customer must contact within 24-48h after delivery.
- product must be unused where applicable.

### `/policies/privacy`

Content:

- collect name, phone, order items, IP/user-agent for fraud prevention.
- use data for order confirmation/delivery.
- no selling data.

### `/policies/terms`

Content:

- COD terms.
- pricing.
- product support disclaimer.
- not medical treatment.

---

## 9. Thank You Page `/thank-you`

Query:

```txt
/thank-you?order=ORDER_ID
```

Fetch:

```txt
GET /api/orders/{id}/public
```

If fetch fails:

- show generic success if there is recent local order in localStorage.
- else show support message.

Sections:

- success.
- order number.
- next steps.
- summary.
- reassurance.
- cross-sells.

---

## 10. Reusable Components List

Layout:

- `Logo`
- `AnnouncementBar`
- `Header`
- `MobileMenu`
- `Footer`

Product:

- `ProductCard`
- `ProductGallery`
- `ProductBuyBox`
- `BenefitGrid`
- `MechanismBlock`
- `HowToUse`
- `ReviewCard`
- `CrossSellGrid`

Cart/Checkout:

- `CartDrawer`
- `CartItemRow`
- `CheckoutModal`
- `UpsellModal`
- `OrderSummary`

Trust:

- `TrustStrip`
- `AuthorityBox`
- `RiskReversalBox`
- `ComparisonTable`
- `FAQAccordion`

---

## 11. Navigation Labels

Header:

- الرئيسية
- المنتجات
- لماذا سَنَد؟
- آراء العملاء
- اتصل بنا

Footer:

- من نحن
- تواصل معنا
- سياسة التوصيل
- سياسة الاستبدال
- الخصوصية
- الشروط
