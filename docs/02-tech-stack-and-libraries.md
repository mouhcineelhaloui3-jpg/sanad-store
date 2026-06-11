# 02 — Tech Stack & Libraries

هذا الملف يحدّد التقنيات والمكتبات المسموح بها في نسخة v1. الهدف: متجر سريع، عربي RTL، سهل الصيانة، ومهيّأ للتوسّع.

---

## 1. Frontend

### Core

| الحاجة | الاختيار | السبب |
|---|---|---|
| Framework | **Next.js App Router** | SEO، صفحات ثابتة/ديناميكية، أداء ممتاز، نشر سهل على Vercel |
| UI Library | **React + TypeScript** | أمان الأنواع، صيانة أسهل، قابلية للتوسّع |
| Styling | **Tailwind CSS** | سرعة بناء، تصميم ثابت، mobile-first |
| Components | **shadcn/ui + Radix UI** | مودالات/دراور/أكورديون آمنة وقابلة للوصول |
| Icons | **lucide-react** | خفيفة، متناسقة، مناسبة لهوية طبية/علمية |
| Forms | **react-hook-form** | أداء جيد، تجربة مستخدم سلسة |
| Validation | **zod** | نفس منطق التحقق في كل الفورمات |
| State | **zustand + persist middleware** | سلة بسيطة، لا نحتاج Redux |
| Animations | **framer-motion** | micro-interactions محدودة للثقة والـdrawer/upsell |
| Toasts | **sonner** | رسائل إضافة للسلة/أخطاء خفيفة |
| Analytics | Custom helpers | تحكم كامل في Pixel/TikTok/CAPI events |

### Install Command

```bash
npm install @radix-ui/react-dialog @radix-ui/react-sheet @radix-ui/react-accordion @radix-ui/react-tabs
npm install class-variance-authority clsx tailwind-merge lucide-react
npm install react-hook-form zod @hookform/resolvers zustand framer-motion sonner
npm install date-fns
npm install -D prettier prettier-plugin-tailwindcss
```

> إذا استعملت `shadcn/ui`، أضف فقط المكوّنات المطلوبة: `button`, `dialog`, `sheet`, `accordion`, `badge`, `card`, `input`, `label`, `separator`, `toast/sonner`.

---

## 2. Backend

### Core

| الحاجة | الاختيار | السبب |
|---|---|---|
| API | **FastAPI** | سريع، Pydantic validation، docs تلقائية |
| Server | **uvicorn + gunicorn** | إنتاج مستقر على Docker/EasyPanel |
| DB | **PostgreSQL** | موجود مسبقاً، مناسب للطلبات والتقارير |
| ORM | **SQLAlchemy 2.x** | واضح، قوي، لا يربطنا بإطار واحد |
| Migrations | **Alembic** | إدارة تغييرات قاعدة البيانات |
| Validation | **Pydantic v2** | تحقق قوي للطلبات |
| Settings | **pydantic-settings** | env آمن ومنظم |
| Driver | **psycopg[binary]** | PostgreSQL driver حديث |
| Rate limit | **slowapi** أو middleware بسيط | منع الطلبات الوهمية والسبام |
| CSV Export | Python stdlib `csv` | تصدير الطلبات للأوبراسيون |

### `requirements.txt`

```txt
fastapi
uvicorn[standard]
gunicorn
sqlalchemy
alembic
psycopg[binary]
pydantic-settings
python-multipart
slowapi
```

---

## 3. لماذا ليس Shopify/Platforms؟

المتجر يحتاج قمع مخصص:

- Cart Drawer دائم، بلا صفحة سلة.
- Checkout popup بحقلين فقط.
- Upsell بعد تحقق الاسم والهاتف، قبل صفحة الشكر.
- إرسال وتحديث الطلب في Postgres.
- تحكم كامل في CRO، tracking، والسرعة.

هذه الأشياء صعبة أو مكلفة على منصات جاهزة، وممكنة بسلاسة في Next.js + FastAPI.

---

## 4. Performance Rules

- الصور: WebP/AVIF، أبعاد محددة، `next/image`.
- لا تستعمل carousels ثقيلة. استعمل CSS scroll-snap أو مكوّن خفيف.
- لا تستعمل مكتبات UI كاملة مثل MUI/AntD.
- لا تستعمل Redux أو React Query في v1 إلا إذا ظهرت حاجة حقيقية. `fetch` + typed helpers كافي.
- كل سكربت tracking يُحمّل lazy وبعد consent إذا أُضيف لاحقاً.

---

## 5. Security Rules

- لا تضع `DATABASE_URL`, `ADMIN_API_KEY`, أو أي token في frontend.
- الـBackend يعيد حساب الإجمالي والأسعار من كتالوج داخلي، ولا يثق بقيمة `total` المرسلة من المتصفح.
- CORS محدود على الدومينات المعروفة فقط.
- Rate limit على `POST /api/orders`.
- خزّن IP/User-Agent فقط لأغراض fraud/risk، ولا تعرضها للعميل.

---

## 6. Recommended Package Scripts

### Frontend

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write ."
  }
}
```

### Backend

```bash
uvicorn app.main:app --reload
alembic revision --autogenerate -m "init"
alembic upgrade head
```
