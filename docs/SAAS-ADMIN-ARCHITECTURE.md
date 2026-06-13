# SANAD IPTV SaaS Admin Architecture

Modular plugin-based admin system (Stripe/Vercel style).

## Layout

```
/core                 Extension engine, JWT, AES encryption, audit logs
/extensions           Independent plugins (products, ads, analytics, …)
/modules              Shared domain types
/frontend             Next.js admin UI + BFF API routes
/backend/saas-admin   NestJS modular API (JWT, PostgreSQL-ready)
/backend/app          Legacy FastAPI (COD orders)
```

## Business rules

- **No payment checkout** — all sales via WhatsApp
- Track: WhatsApp clicks, leads, campaign sources, conversion events

## Extensions

Each extension implements `Extension` and registers routes + nav via the core engine.

| Extension | Routes |
|-----------|--------|
| products-extension | `/api/admin/products` |
| ads-extension | `/api/admin/ads` |
| analytics-extension | `/api/admin/analytics` (WhatsApp metrics) |
| automation-extension | `/api/admin/automation` |
| marketplace-extension | `/api/admin/marketplace`, `/api/admin/extensions` |
| affiliate-extension | `/api/admin/affiliates` (optional) |

## Run

```bash
# Frontend (Vercel / local)
cd frontend && npm run dev

# NestJS SaaS API
cd backend/saas-admin && npm install && npm run start:dev
```

## Roles

`SUPER_ADMIN`, `ADMIN`, `MARKETING_MANAGER` — mapped in frontend RBAC as `super_admin`, `admin`, `marketing_manager`.
