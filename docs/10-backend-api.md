# 10 — Backend API (FastAPI + PostgreSQL)

Backend v1 يستقبل الطلبات، يخزنها في PostgreSQL `namabeauty`، يضيف upsell إذا قبل الزبون، ويوفر endpoints بسيطة للأدمين.

---

## 1. Backend Responsibilities

- Validate incoming orders.
- Recalculate prices server-side.
- Store orders and order items.
- Prevent obvious spam/fake submissions.
- Return public order summary for thank-you page.
- Provide admin endpoints for listing/exporting/updating order status.
- Optionally send Meta CAPI events from server.

---

## 2. Database

Database name:

```txt
namabeauty
```

Even if brand is SANAD, keep DB name as provided by client.

---

## 3. Tables

### `orders`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID PK | generated server-side |
| `order_number` | text unique | e.g. `SN-2026-000123` |
| `customer_name` | text | required |
| `phone` | text | Moroccan phone |
| `status` | text | pending/confirmed/cancelled/shipped/delivered/returned |
| `subtotal` | integer | in MAD, server-calculated |
| `discount_total` | integer | upsell discount only |
| `total` | integer | final total |
| `currency` | text | `MAD` |
| `upsell_status` | text | none/shown/accepted/declined/expired |
| `source` | text | website |
| `utm_source` | text nullable | tracking |
| `utm_campaign` | text nullable | tracking |
| `utm_content` | text nullable | tracking |
| `utm_term` | text nullable | tracking |
| `fbp` | text nullable | Meta browser id |
| `fbc` | text nullable | Meta click id |
| `client_ip` | text nullable | fraud/risk |
| `user_agent` | text nullable | fraud/risk |
| `risk_flags` | jsonb | duplicate phone, rapid submit... |
| `created_at` | timestamptz | default now |
| `updated_at` | timestamptz | auto update |

### `order_items`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID PK | |
| `order_id` | UUID FK | orders.id |
| `product_id` | text | `sanad-align`... |
| `product_name` | text | snapshot |
| `unit_price` | integer | server-calculated |
| `quantity` | integer | min 1 |
| `line_total` | integer | unit_price * quantity |
| `is_upsell` | boolean | true only for accepted upsell |
| `created_at` | timestamptz | |

### `contact_messages` (optional v1)

| Column | Type |
|---|---|
| `id` | UUID PK |
| `name` | text |
| `phone` | text nullable |
| `message` | text |
| `created_at` | timestamptz |

---

## 4. Product Catalog in Backend

Backend must maintain its own product catalog, not trust frontend prices.

```py
PRODUCTS = {
    "sanad-align": {
        "name": "سَنَد ألاين",
        "price": 249,
        "upsell_price": 199,
    },
    "sanad-heat": {
        "name": "سَنَد هيت",
        "price": 299,
        "upsell_price": 249,
    },
    "sanad-lumbo": {
        "name": "سَنَد لومبو",
        "price": 249,
        "upsell_price": 199,
    },
}
```

If product prices change, update frontend and backend together.

---

## 5. API Endpoints

Base URL:

```txt
https://api.sanad.ma/api
```

### Health

```txt
GET /health
```

Response:

```json
{ "status": "ok" }
```

### Create Order

```txt
POST /orders
```

Request:

```json
{
  "customer_name": "أمين العلوي",
  "phone": "0612345678",
  "items": [
    { "product_id": "sanad-align", "quantity": 1 }
  ],
  "tracking": {
    "utm_source": "facebook",
    "utm_campaign": "align_test_1",
    "utm_content": "video_1",
    "utm_term": "",
    "fbp": "fb.1...",
    "fbc": "fb.1..."
  }
}
```

Validation:

- phone regex: `^0[5-7][0-9]{8}$`
- 1 to 10 total quantity.
- product IDs must exist.

Response:

```json
{
  "id": "uuid",
  "order_number": "SN-2026-000123",
  "total": 249,
  "currency": "MAD",
  "eligible_upsell": {
    "product_id": "sanad-heat",
    "name": "سَنَد هيت",
    "original_price": 299,
    "upsell_price": 249,
    "expires_in_seconds": 15
  }
}
```

### Accept Upsell

```txt
POST /orders/{order_id}/upsell
```

Request:

```json
{
  "product_id": "sanad-heat"
}
```

Rules:

- order must be `pending`.
- product cannot already be in order.
- product must match eligible upsell matrix or be allowed by server.
- add item with `is_upsell=true`, `unit_price=upsell_price`.

Response:

```json
{
  "id": "uuid",
  "order_number": "SN-2026-000123",
  "total": 498,
  "items": []
}
```

### Decline Upsell

```txt
POST /orders/{order_id}/upsell/decline
```

Marks `upsell_status=declined`.

### Public Order Summary

```txt
GET /orders/{order_id}/public
```

Response:

```json
{
  "order_number": "SN-2026-000123",
  "customer_name": "أمين",
  "status": "pending",
  "items": [
    { "product_name": "سَنَد ألاين", "quantity": 1, "unit_price": 249 }
  ],
  "total": 249,
  "currency": "MAD"
}
```

Do not return:

- IP
- user-agent
- admin notes
- risk flags

---

## 6. Admin Endpoints

Protect with header:

```txt
X-Admin-Key: ADMIN_API_KEY
```

### List Orders

```txt
GET /admin/orders?status=pending&limit=50&offset=0
```

### Update Status

```txt
PATCH /admin/orders/{order_id}/status
```

Request:

```json
{ "status": "confirmed" }
```

### Export CSV

```txt
GET /admin/orders/export.csv?status=pending
```

Columns:

- order_number
- customer_name
- phone
- items
- total
- status
- created_at
- utm_campaign

---

## 7. Anti-Fraud Rules

Add risk flags, not hard rejection unless severe:

- same phone submitted 3+ times in 24h.
- same IP submitted 5+ times in 1h.
- customer name too short or repeated characters.
- invalid user-agent.

Do not block legitimate orders too aggressively in COD. Mark as risk and let human confirmation decide.

---

## 8. CORS

Only allow:

```txt
https://sanad.ma
https://www.sanad.ma
http://localhost:3000
```

---

## 9. Dockerfile

```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["gunicorn", "app.main:app", "-k", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8000"]
```

---

## 10. EasyPanel Deployment

1. Create new app/service from Git repository or Dockerfile.
2. Set build context to `backend/`.
3. Add environment variables:
   - `DATABASE_URL`
   - `ALLOWED_ORIGINS`
   - `ADMIN_API_KEY`
   - `ENV=production`
4. Expose port `8000`.
5. Add domain `api.sanad.ma`.
6. Enable HTTPS.
7. Run migrations:
   ```bash
   alembic upgrade head
   ```
8. Test:
   ```bash
   curl https://api.sanad.ma/api/health
   ```

---

## 11. Error Responses

Use consistent shape:

```json
{
  "error": {
    "code": "INVALID_PHONE",
    "message": "دخل رقم مغربي صحيح، مثال: 0612345678."
  }
}
```

Frontend should show `message`.

---

## 12. Logging

Log:

- order created.
- upsell accepted/declined.
- validation failures count.
- admin status changes.

Do not log full secrets or tokens.
