# 15 — Admin Dashboard

The admin dashboard lives at:

```txt
/admin
```

It is a modern eCommerce operations dashboard with:

- Responsive sidebar navigation.
- Top navbar with search, notifications, messages, profile.
- Dark/light mode.
- Dashboard analytics cards and revenue charts.
- Products, orders, customers, categories, coupons, reviews, analytics, roles, settings, and activity logs pages.
- Storefront CMS controls for Home page, Product pages, WhatsApp icon, footer copy, SEO, and custom scripts.
- Integrations/API tools page for Meta CAPI, TikTok, Sheets webhook, WhatsApp, delivery APIs, SMTP, and custom webhooks.
- Notifications control for real-time alerts, cache behavior, low-stock alerts, and alert channels.
- API-ready frontend architecture using reusable components.

---

## Frontend Structure

```txt
frontend/src/app/admin/
├── page.tsx
├── products/
├── orders/
├── customers/
├── categories/
├── coupons/
├── reviews/
├── analytics/
├── storefront/
├── integrations/
├── notifications/
├── roles/
├── settings/
└── activity-logs/
```

Reusable components:

```txt
frontend/src/components/admin/
├── AdminShell.tsx
├── AdminPageHeader.tsx
├── AdminCard.tsx
├── AdminTable.tsx
├── StatCard.tsx
├── RevenueChart.tsx
├── StatusBadge.tsx
└── AdminForm.tsx
```

---

## Backend API

All management endpoints are protected with:

```txt
X-Admin-Key: ADMIN_API_KEY
```

Routes:

```txt
GET    /api/admin/dashboard
GET    /api/admin/products
POST   /api/admin/products
GET    /api/admin/products/{product_id}
DELETE /api/admin/products/{product_id}
GET    /api/admin/categories
POST   /api/admin/categories
GET    /api/admin/customers
GET    /api/admin/coupons
POST   /api/admin/coupons
GET    /api/admin/reviews
PATCH  /api/admin/reviews/{review_id}
GET    /api/admin/roles
POST   /api/admin/roles
GET    /api/admin/activity-logs
GET    /api/admin/store-settings
PUT    /api/admin/store-settings/{key}
GET    /api/admin/integrations
POST   /api/admin/integrations
GET    /api/admin/notification-settings
PUT    /api/admin/notification-settings/{key}
```

---

## Database Schema

Migration:

```txt
backend/alembic/versions/0002_admin_dashboard_schema.py
```

Tables:

- `admin_roles`
- `admin_users`
- `categories`
- `products`
- `product_images`
- `customers`
- `payments`
- `coupons`
- `product_reviews`
- `activity_logs`
- `admin_notifications`
- `store_settings`
- `integration_settings`
- `notification_settings`

---

## Security Notes

Current v1 backend protection uses `ADMIN_API_KEY`. For full production auth, add:

- Password hashing with `passlib`.
- JWT or secure session cookies.
- Login/logout endpoints.
- CSRF protection if using cookies.
- Role permission checks per route.
- Audit logs on every write.

The frontend layout is ready for auth integration and protected route logic.
