# 01 — المعمارية (Architecture)

## 1. نظرة عامة

نظام من ثلاث طبقات منفصلة:

```
[ المتصفّح / الهاتف ]
        │  HTTPS
        ▼
[ Next.js Frontend ]  ──────fetch /api──────▶  [ FastAPI Backend ]
   (Vercel)                                       (EasyPanel, Docker)
        │                                              │ SQLAlchemy
        │ Meta Pixel / TikTok                          ▼
        ▼                                       [ PostgreSQL: namabeauty ]
   [ أدوات التتبّع ]                              (EasyPanel, منصّبة مسبقاً)
```

- **الواجهة الأمامية (Frontend):** Next.js App Router. تعرض الصفحات، تدير السلة (Cart Drawer)، نافذة الشيك آوت، والـUpsell. ترسل الطلب إلى الـBackend عبر REST.
- **الواجهة الخلفية (Backend):** FastAPI. تستقبل الطلبات، تتحقّق منها (Pydantic)، تخزّنها في Postgres، وتوفّر لوحة/نقاط للأدمين لتأكيد الطلبات وتصديرها.
- **قاعدة البيانات:** PostgreSQL باسم `namabeauty` (منصّبة مسبقاً على EasyPanel).

> لماذا Backend منفصل بدل Webhook إلى Google Sheet؟ لأنّ العميل يملك سيرفر EasyPanel + Postgres جاهز، وهذا يعطي تحكّماً كاملاً، تقارير، حماية من الطلبات الوهمية، وقابلية للتوسّع (تكامل شركات التوصيل لاحقاً).

---

## 2. بنية المستودع (Monorepo)

مستودع واحد بمجلّدين رئيسيين:

```
sanad-store/
├── docs/                      # هذا المجلد (مرجع البناء)
├── frontend/                  # تطبيق Next.js
│   ├── src/
│   │   ├── app/               # App Router (الصفحات والـlayouts)
│   │   │   ├── (shop)/        # مجموعة المتجر
│   │   │   │   ├── page.tsx                 # الصفحة الرئيسية
│   │   │   │   ├── collection/page.tsx      # صفحة المجموعة
│   │   │   │   ├── product/[slug]/page.tsx  # صفحة المنتج
│   │   │   │   ├── about/page.tsx
│   │   │   │   ├── contact/page.tsx
│   │   │   │   └── policies/[slug]/page.tsx # السياسات
│   │   │   ├── thank-you/page.tsx
│   │   │   ├── layout.tsx     # الـRoot layout (RTL, الخطوط, الهيدر/الفوتر)
│   │   │   └── globals.css
│   │   ├── components/        # مكوّنات قابلة لإعادة الاستخدام
│   │   │   ├── layout/        # Header, Footer, AnnouncementBar
│   │   │   ├── cart/          # CartDrawer, CartItem, CartButton
│   │   │   ├── checkout/      # CheckoutModal, UpsellModal
│   │   │   ├── product/       # ProductCard, Gallery, BuyBox, Crosssell
│   │   │   ├── home/          # Hero, Bestsellers, ProofSection, Reviews...
│   │   │   └── ui/            # أزرار, مودالات, badges (shadcn/ui)
│   │   ├── lib/               # data, api client, validation (zod), utils
│   │   │   ├── products.ts    # بيانات المنتجات الثلاثة (مصدر واحد)
│   │   │   ├── api.ts         # عميل fetch نحو الـBackend
│   │   │   ├── validation.ts  # سكيمات zod (الهاتف المغربي…)
│   │   │   └── analytics.ts   # Pixel/TikTok events
│   │   ├── store/             # حالة السلة (Zustand)
│   │   └── styles/
│   ├── public/                # الصور, الأيقونات, الشهادات
│   ├── next.config.mjs
│   ├── tailwind.config.ts
│   └── package.json
├── backend/                   # تطبيق FastAPI
│   ├── app/
│   │   ├── main.py            # نقطة الدخول + CORS + routers
│   │   ├── core/config.py     # الإعدادات (Pydantic Settings, env)
│   │   ├── db/                # الجلسة, الـengine
│   │   ├── models/            # نماذج SQLAlchemy (Order, OrderItem...)
│   │   ├── schemas/           # سكيمات Pydantic (طلب/استجابة)
│   │   ├── api/routes/        # orders.py, admin.py, health.py
│   │   └── services/          # منطق الأعمال (حساب الإجمالي, anti‑fraud)
│   ├── alembic/               # الهجرات (migrations)
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
└── README.md
```

---

## 3. تدفّق الطلب (Order Flow) — الأهم

```
1. الزائر يتصفّح ➝ يضغط "أضف للسلة" / "اشترِ الآن"
2. ينفتح Cart Drawer (مع cross‑sells بالثمن الكامل)
3. يضغط "إتمام الطلب" ➝ تنفتح نافذة CheckoutModal (Popup)
4. CheckoutModal: ملخّص الطلب + حقلان فقط:
      - الاسم الكامل
      - رقم الهاتف (يبدأ بـ 0) — تحقّق: ^0[5-7][0-9]{8}$
5. عند ضغط "تأكيد الطلب":
      - تحقّق client‑side (zod)
      - POST /api/orders  ➝  FastAPI يخزّن الطلب (status=pending)
      - يرجع order_id
6. مباشرة تظهر UpsellModal:
      - عرض حصري على منتج واحد (الأكثر احتمالاً للشراء حسب السلة)
      - عدّاد تنازلي 10–15 ثانية + سعر مخفّض
      - "أضفه لطلبي" ➝ PATCH /api/orders/{id} (يضيف العنصر) أو "لا شكراً"
7. تحويل إلى /thank-you?order={id}:
      - ملخّص نهائي + طمأنة (سيتم الاتصال للتأكيد) + cross‑sells بالثمن الكامل
8. الأدمين يرى الطلب في /admin (أو يصدّره) ➝ تأكيد بشري ➝ شركة التوصيل
```

تفاصيل CRO الكاملة في [`07-cro-and-funnel.md`](./07-cro-and-funnel.md) وتفاصيل الـAPI في [`10-backend-api.md`](./10-backend-api.md).

---

## 4. المتغيّرات البيئية (Environment Variables)

### Frontend (`frontend/.env.local`)
```bash
NEXT_PUBLIC_API_URL=https://api.sanad.ma        # عنوان الـFastAPI على EasyPanel
NEXT_PUBLIC_SITE_URL=https://sanad.ma
NEXT_PUBLIC_META_PIXEL_ID=xxxxxxxxxx
NEXT_PUBLIC_TIKTOK_PIXEL_ID=xxxxxxxxxx
NEXT_PUBLIC_CURRENCY=MAD
```

### Backend (`backend/.env`)
```bash
DATABASE_URL=postgresql+psycopg://USER:PASSWORD@HOST:5432/namabeauty
ALLOWED_ORIGINS=https://sanad.ma,https://www.sanad.ma,http://localhost:3000
ADMIN_API_KEY=ضع-مفتاحاً-سرّياً-قوياً
META_CAPI_TOKEN=xxxxxxxx        # لإرسال أحداث الشراء من الخادم (اختياري v1)
META_PIXEL_ID=xxxxxxxxxx
ENV=production
```

> **مهم:** لا تضع أي سرّ في كود الواجهة الأمامية. كل ما يبدأ بـ`NEXT_PUBLIC_` يكون مرئياً للمتصفّح.

---

## 5. النشر (Deployment)

- **Frontend → Vercel:** ربط مجلد `frontend/`، إضافة المتغيّرات، دومين `sanad.ma`.
- **Backend → EasyPanel:** خدمة Docker من `backend/Dockerfile`، ربطها بقاعدة `namabeauty` الموجودة، دومين فرعي `api.sanad.ma` مع HTTPS (Let's Encrypt من EasyPanel).
- **DB:** Postgres `namabeauty` موجودة. تُشغَّل الهجرات (`alembic upgrade head`) عند أول نشر.
- تفاصيل النشر خطوة بخطوة في [`10-backend-api.md`](./10-backend-api.md).

---

## 6. مبادئ معمارية

- **مصدر واحد للحقيقة للمنتجات:** ملف `frontend/src/lib/products.ts` (v1). الـBackend يخزّن snapshot للأسعار وقت الطلب (لا يثق بأسعار العميل — يعيد الحساب).
- **عديم الحالة (Stateless) للـAPI:** لا جلسات؛ الأدمين محمي بـ`ADMIN_API_KEY`.
- **التحقّق في الطبقتين:** zod في الواجهة + Pydantic في الخلفية (لا تثق أبداً بالعميل).
- **مقاومة الاحتيال:** الخادم يتحقّق من صيغة الهاتف، يمنع التكرار السريع (rate‑limit)، ويعلّم الطلبات المشبوهة.
