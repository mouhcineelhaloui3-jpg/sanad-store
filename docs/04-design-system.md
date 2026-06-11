# 04 — Design System

هوية **سَنَد** يجب أن تبدو: موثوقة، صحية، مغربية، premium، وليست "دروبشيبينغ رخيصة".

---

## 1. Brand Personality

- **هادئ:** لا ألوان صاخبة ولا ضغط مبالغ.
- **علمي:** تفاصيل منظمة، badges، أيقونات بسيطة، لغة دقيقة.
- **إنساني:** صور ناس عاديين في المكتب/السيارة/الدار.
- **Premium accessible:** ثمن مرتفع لكن مبرّر، ليس luxury فارغ.

---

## 2. Logo Direction

الهيدر كما طلب العميل:

```txt
[ دائرة بلون البراند فيها N ]  سَنَد
                            SANAD
```

- حرف `N` داخل دائرة.
- النص العربي `سَنَد` هو الاسم الأساسي.
- تحته أو بجانبه صغيراً: `SANAD`.
- الدائرة في يمين الشعار لأن الموقع RTL.
- لا نحتاج logo image في v1. نبنيه بـCSS/text حتى يكون واضحاً وسريعاً.

### Logo Component Spec

```tsx
<div className="flex items-center gap-3">
  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sand-900 text-lg font-bold text-white">
    N
  </div>
  <div className="leading-tight">
    <div className="font-arabic text-2xl font-bold text-sand-950">سَنَد</div>
    <div className="text-xs font-semibold tracking-[0.22em] text-sand-600">SANAD</div>
  </div>
</div>
```

---

## 3. Color Palette

### Primary Palette

| Token | Hex | Usage |
|---|---|---|
| `sand-950` | `#1F1812` | نص رئيسي، عنوان، فوتر |
| `sand-900` | `#3A2A1C` | لون البراند الأساسي، أزرار |
| `sand-700` | `#6F5438` | hover، حدود داكنة |
| `sand-500` | `#A98255` | badges، عناصر ثقة |
| `sand-100` | `#F3E8D8` | خلفيات دافئة |
| `sand-50` | `#FBF7F0` | خلفية عامة |

### Trust & Medical Accent

| Token | Hex | Usage |
|---|---|---|
| `sage-700` | `#51715E` | علم/راحة/ضمان |
| `sage-100` | `#E8F0EA` | مربعات proof |
| `amber-500` | `#D99A2B` | نجوم reviews، إشارات محدودة |
| `red-600` | `#C24136` | أخطاء form فقط |

### Why These Colors

- البني/الرملي = ثقة، دفء، premium، طبيعي.
- الأخضر sage = راحة، صحة، علم دون ادعاء طبي صارخ.
- لا نستعمل الأزرق الطبي البارد كي لا يبان الموقع كمركز طبي وهمي.

---

## 4. Typography

### Arabic

أفضل خيارين:

1. **Tajawal** — واضح في المغرب، modern، مناسب للـUI.
2. **IBM Plex Sans Arabic** — أكثر premium/علمي.

اختيار v1: **IBM Plex Sans Arabic** للعناوين والنصوص.

### Latin

اختيار v1: **Inter**.

### Font Rules

- العناوين: وزن 700/800.
- النصوص: وزن 400/500.
- لا تستخدم خطوط زخرفية.
- line-height للعربية لا يقل عن `1.7`.

---

## 5. Layout & Spacing

- max width للمحتوى: `1120px`.
- padding mobile: `16px`.
- padding desktop: `24px–32px`.
- border radius:
  - Cards: `24px`
  - Buttons: `999px` أو `16px` حسب السياق
  - Inputs: `16px`
- Shadows: خفيفة فقط، لا dropshadow ثقيل.

---

## 6. Buttons

### Primary CTA

نصوص CTA:

- `اطلبه الآن`
- `أضفه للسلة`
- `أكمل الطلب`
- `ثبّت طلبي الآن`

Style:

```txt
bg-sand-900 text-white rounded-full h-12/14 font-bold
hover:bg-sand-950
shadow subtle
```

### Secondary CTA

- `شاهد التفاصيل`
- `قارن المنتجات`
- `لا شكراً، أكمل طلبي`

Style:

```txt
border border-sand-300 bg-white text-sand-950
```

---

## 7. Header

### Mobile Header

ترتيب RTL:

```txt
[Logo]                         [Cart Icon]
```

أسفل الهيدر أو announcement bar:

```txt
الدفع عند الاستلام • توصيل داخل المغرب • تأكيد هاتفي قبل الإرسال
```

Menu mobile يكون sheet/drawer:

- الرئيسية
- المجموعة
- من نحن
- اتصل بنا
- سياسة الاستبدال

### Desktop Header

```txt
[Logo]   الرئيسية | المنتجات | لماذا سَنَد؟ | آراء العملاء | اتصل بنا     [Cart]
```

Sticky header عند scroll مع خلفية بيضاء شفافة.

---

## 8. Footer

Sections:

- شعار سَنَد + وصف قصير.
- روابط المتجر: الرئيسية، المنتجات، من نحن، اتصل بنا.
- السياسات: سياسة التوصيل، الاستبدال، الخصوصية، الشروط.
- الثقة: COD، توصيل مغربي، دعم قبل الإرسال، فحص جودة.
- تواصل: email/phone placeholder إلى أن يعطي العميل البيانات.

Footer copy:

```txt
سَنَد هو متجر مغربي متخصص في حلول الراحة اليومية ودعم الجسم، مصمم للناس اللي نهارهم طويل وباغين يرجعو يحسو براحتهم بثقة وبساطة.
```

---

## 9. Visual Direction

### Product Images

لأن المنتجات dropshipping، يجب تحسين العرض:

- استعمل mockups clean بخلفية رملية/بيضاء.
- لا تستعمل صور AliExpress مباشرة إذا كانت رديئة.
- اعرض:
  - المنتج وحده.
  - المنتج في الاستعمال.
  - close-up للمواد/الحزام/الحرارة.
  - infographics عربية بسيطة.

### Required Image Slots Per Product

1. Hero product on warm background.
2. Lifestyle usage.
3. Feature diagram (3 benefits).
4. Material/tech close-up.
5. Size/how to use.
6. Review/UGC style image.

---

## 10. Trust Components

استعمل هذه المكوّنات في كل الصفحات المهمة:

- `TrustStrip`: الدفع عند الاستلام، تأكيد قبل الإرسال، توصيل داخل المغرب.
- `ProofCards`: 3 بطاقات: تصميم إرغونومي، مواد مريحة، فحص قبل الشحن.
- `ReviewCard`: اسم مغربي + مدينة + تجربة واقعية.
- `AuthorityBox`: شرح علمي بسيط: وضعية الجسم، الحرارة، الضغط الداعم.
- `RiskReversal`: "توصلك السلعة، تشوفها، وتخلّص عند الاستلام."

---

## 11. UI Tone

الموقع لا يصرخ. لا تستعمل:

- timer في كل مكان.
- popups مزعجة قبل intent.
- تخفيضات وهمية ضخمة.
- claims طبية.

استعمل:

- دليل واضح.
- صور نظيفة.
- تقييمات واقعية.
- خطوات سهلة.
- ضمانات عملية.
