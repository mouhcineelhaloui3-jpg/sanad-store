# 13 — AI Coder Implementation Plan

هذا الملف موجّه مباشرة للـAI coder. اقرأ كل ملفات `/docs` أولاً، ثم نفّذ بالترتيب التالي.

---

## 0. Mission

Build a DTC branded COD store for **سَنَد / SANAD** targeting Morocco, selling 3 body comfort products at premium prices through trust, authority, social proof, clear product mechanisms, and a high-converting checkout funnel.

Do not build a generic dropshipping store. Build a brand.

---

## 1. Project Setup

Create monorepo:

```txt
frontend/
backend/
docs/
```

Frontend:

- Next.js App Router.
- TypeScript.
- Tailwind CSS.
- RTL Arabic.
- shadcn/ui components only as needed.

Backend:

- FastAPI.
- SQLAlchemy.
- Alembic.
- PostgreSQL database `namabeauty`.

---

## 2. Build Order

### Phase 1 — Frontend Foundation

- Set up Next.js.
- Configure fonts: IBM Plex Sans Arabic + Inter.
- Configure Tailwind theme with colors from `04-design-system.md`.
- Build:
  - `Logo`
  - `AnnouncementBar`
  - `Header`
  - `Footer`
  - `TrustStrip`
  - basic `Button`, `Badge`, `Card`.

Acceptance:

- RTL works.
- Header has N in circle + سَنَد + SANAD.
- Mobile layout clean.

### Phase 2 — Product Catalog

- Create `src/lib/products.ts`.
- Add 3 products from `08-products.md`.
- Create product card and product gallery placeholders.

Acceptance:

- Product data is imported everywhere.
- No duplicated prices in components.

### Phase 3 — Pages

Build:

- `/`
- `/collection`
- `/product/sanad-align`
- `/product/sanad-heat`
- `/product/sanad-lumbo`
- `/about`
- `/contact`
- `/policies/shipping`
- `/policies/returns`
- `/policies/privacy`
- `/policies/terms`

Acceptance:

- Home follows `09-pages-and-routes.md`.
- Home is a long CRO brand page, not a short ecommerce template.
- Home includes hero, trust strip, problem selector, product grid, SANAD method, authority/science, comparison, social proof, COD process, FAQ, and final CTA.
- Every product card/problem card links clearly to its dedicated product page.
- Product pages follow `08-products.md`.
- Each product page is a self-contained landing page that can convert direct ad traffic by itself.
- Policy pages use `11-content-policies.md`.

### Phase 4 — Cart

- Zustand cart store with localStorage.
- Cart Drawer.
- Add/remove/update quantity.
- Cross-sells full price.

Acceptance:

- No `/cart` page.
- CTA adds item and opens drawer.
- Cart persists after refresh.

### Phase 5 — Checkout Modal

- Modal with order summary.
- Fields:
  - name
  - Moroccan phone
- zod validation.
- Calls backend `POST /api/orders`.

Acceptance:

- Invalid phone blocked.
- Example `0612345678` shown.
- No address/email fields.

### Phase 6 — Upsell

- Show after successful order creation.
- Decision matrix from `07-cro-and-funnel.md`.
- Countdown 10-15 seconds.
- Accept calls backend upsell endpoint.
- Decline continues.

Acceptance:

- Upsell not shown before valid order.
- If accepted, total updates.
- If declined, original order remains.

### Phase 7 — Thank You Page

- Fetch public order summary.
- Show order number, next steps, summary, reassurance.
- Cross-sells at original price.

Acceptance:

- Customer understands they will receive confirmation call.
- No payment requested.

### Phase 8 — Backend

- FastAPI app.
- DB models.
- Alembic migration.
- Product catalog.
- Endpoints from `10-backend-api.md`.
- Admin key protected endpoints.

Acceptance:

- `POST /api/orders` creates order.
- backend recalculates total.
- `GET /api/orders/{id}/public` works.
- CSV export works.

### Phase 9 — Tracking

- UTM capture.
- Meta/TikTok pixel helpers.
- Events from `12-tracking-and-analytics.md`.
- Optional CAPI endpoint logic.

Acceptance:

- Tracking no-ops when IDs missing.
- Order payload includes UTM/fbp/fbc.

---

## 3. Do Not Build in v1

- No Shopify.
- No `/cart` page.
- No `/checkout` page.
- No subscriptions.
- No WhatsApp/SMS automation.
- No quiz.
- No login/customer accounts.
- No online payment.
- No fake medical certificates.
- No fake doctor endorsement.

---

## 4. Copy Rules

Use Moroccan Arabic / clear Arabic.

Good:

- `الدفع عند الاستلام`
- `كنأكدو معاك قبل الإرسال`
- `دعم وراحة يومية`
- `يساعدك تحس براحة أكثر`

Avoid:

- `يعالج`
- `يشفي`
- `مضمون طبياً`
- `نتائج نهائية`
- `بديل للطبيب`

---

## 5. Quality Checklist

Before delivery:

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- Backend starts with `uvicorn app.main:app`.
- Alembic migration applies.
- Mobile QA:
  - 375px
  - 390px
  - 430px
- Checkout QA:
  - invalid phone rejected.
  - valid Moroccan phone accepted.
  - order saved.
  - upsell accept/decline works.
  - thank-you summary correct.

---

## 6. Product Image Placeholders

If real assets are missing, use clean placeholders with warm backgrounds and clear labels. Do not block implementation waiting for final photos.

Naming:

```txt
sanad-align-hero.webp
sanad-heat-hero.webp
sanad-lumbo-hero.webp
```

---

## 7. Final Definition of Done

v1 is done when:

- Visitor can understand brand in 5 seconds.
- Visitor can add any product to cart.
- Visitor can submit COD order with name + Moroccan phone.
- Backend stores the order in `namabeauty`.
- Upsell can be accepted or declined.
- Thank-you page displays final order.
- Site feels premium, Moroccan, trustworthy, and not like a generic dropshipping template.
