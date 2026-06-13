# SANAD IPTV — Enterprise Audit & Optimization Report

**Date:** June 2026  
**Production URL:** https://sanad-store.vercel.app  
**Stack:** Next.js App Router, React 19, TypeScript, Tailwind, FastAPI, PostgreSQL (schema)

---

## Executive Summary

SANAD IPTV has a **strong marketing frontend** with SEO infrastructure, performance splitting, and lead capture. The platform is **not yet enterprise-grade** due to file-based persistence, client-only admin auth, and disconnected backend services. This report documents gaps and the optimizations implemented in this sprint.

| Area | Before | After (this sprint) | Target |
|------|--------|---------------------|--------|
| Lighthouse Performance | ~70–85 (est.) | Improved (LazyMotion, splitting) | 95+ |
| SEO | Good foundation | +9 programmatic pages, Article schema, SearchAction | 100 |
| Security | Critical gaps | Headers, rate limits, PII API lockdown | Hardened |
| Admin | 10/14 modules mock | Orders wired, SEO/Blog admin | Full CRM |
| Search | None | Site search + API scaffold | PostgreSQL FTS |
| MCP | None | Architecture spec | 4 MCP servers |

---

## Phase 1 — Full Website Audit

### Architecture

**Problems**
- Dual data paths: IPTV leads → JSON files; legacy COD → FastAPI
- No shared database in production (Vercel uses ephemeral `frontend/data/`)
- Client-heavy chrome boundary (`SiteChrome`) wraps entire storefront
- No middleware-based auth until this sprint

**Opportunities**
- Migrate leads + CMS + analytics to PostgreSQL
- Unify FastAPI backend with Next.js BFF layer
- Locale routes (`/ar-ma`, `/en`) for real hreflang

### Performance Bottlenecks

| Bottleneck | Impact | Mitigation |
|------------|--------|------------|
| Framer Motion full bundle | TBT | LazyMotion + `m` components ✅ |
| 13 homepage client sections | JS weight | Dynamic imports ✅ |
| Hero TV widget client-only | LCP delay | Dynamic `IptvHeroScreen` ✅ |
| Particles / background | Main thread | Idle callback defer ✅ |
| No Suspense boundaries | TTFB perception | Added on blog; expand to home |

**Target metrics:** FCP <800ms, LCP <1.2s, TBT <100ms, CLS <0.05, TTFB <150ms — **validate with Lighthouse post-deploy**.

### SEO Weaknesses (addressed)

- Missing programmatic landing pages → **9 pages at `/iptv/[slug]`** ✅
- Blog lacked Article schema → **`articleJsonLd`** ✅
- No SearchAction → **`/search?q=`** + WebSite schema ✅
- Fake hreflang → still needs locale URLs (roadmap)
- No internal linking on landings → related links + CTAs ✅

### Security Risks (addressed)

| Risk | Severity | Status |
|------|----------|--------|
| Public GET on orders/trials (PII) | Critical | **401 + admin key** ✅ |
| Hardcoded admin password in client | Critical | Open — migrate to JWT |
| No security headers | High | **next.config + middleware** ✅ |
| No rate limiting | High | **POST rate limits** ✅ |
| Admin API key in `NEXT_PUBLIC_*` | High | Open — server-only env |
| Upload without validation | Medium | Open |

### UX / Conversion

**Implemented:** Exit intent modal, urgency banner, live visitor counter, sticky WhatsApp, sticky CTA, trust badges in hero.

**Roadmap:** A/B test hooks, cookie consent before pixels, real social proof from order count.

### Database & API

- FastAPI + Alembic migrations exist but **not deployed** with frontend
- PostgreSQL FTS: **0%** — search uses in-memory index (scaffold for FTS migration)
- JWT: schema only — runtime uses `X-Admin-Key`

---

## Phase 2 — Performance Implementation

### Done
- Server Components for all marketing/SEO pages
- LazyMotion across IPTV components
- Dynamic imports for non-critical sections
- AVIF/WebP via `next/image`
- Lazy loading on showcase images
- `next/font` self-hosted (IBM Plex Arabic + Inter)
- ISR: home `revalidate=60`, programmatic/blog `3600`
- `optimizePackageImports` for framer-motion, lucide, sonner

### Next
- Add `loading.tsx` per route group
- Font subsetting audit
- Bundle analyzer in CI
- Edge runtime for `/api/search` (optional)

---

## Phase 3 — Enterprise SEO System

### Done
- `MetaTags.tsx`, `StructuredData.tsx`, `Breadcrumbs.tsx`
- `generateMetadata()` on all public pages
- sitemap.xml, robots.txt, manifest.webmanifest
- JSON-LD: Organization, Website (+ SearchAction), Product, Offer, Review, FAQPage, BreadcrumbList, Article

### File Map
```
frontend/src/lib/seo/
├── metadata.ts
├── structured-data.ts
├── routes.ts
├── programmatic-pages.ts
frontend/src/components/seo/
├── MetaTags.tsx
├── StructuredData.tsx
├── Breadcrumbs.tsx
├── ProgrammaticLandingPage.tsx
```

---

## Phase 4 — Programmatic SEO

**Live routes (9):**
- `/iptv/iptv-maroc`
- `/iptv/iptv-smart-tv`
- `/iptv/iptv-android`
- `/iptv/iptv-iphone`
- `/iptv/iptv-firestick`
- `/iptv/iptv-4k`
- `/iptv/iptv-sports`
- `/iptv/iptv-films`
- `/iptv/iptv-series`

Each page: optimized copy, FAQ, Product JSON-LD, internal links, conversion CTAs.

---

## Phase 5 — Blog Engine

**Implemented:**
- Central registry: `lib/blog/posts.ts`
- Categories, tags, reading time, related posts
- Blog search on index
- Article + FAQ JSON-LD
- Admin preview at `/admin/blog`

**Roadmap:** CMS CRUD, scheduling, AI generation via Content MCP.

---

## Phase 6 — Search Engine

**Implemented (Phase 1):**
- `lib/search/catalog.ts` — unified index
- `GET /api/search?q=`
- `/search` results page
- `SiteSearchDialog` (Ctrl+K) in header

**Roadmap:** PostgreSQL `tsvector`, GIN index, typo tolerance, trending from analytics.

---

## Phase 7 — MCP Infrastructure

Specification: `docs/mcp/ARCHITECTURE.md`

Four servers: SEO, Analytics, Monitoring, Content — tool schemas and integration roadmap documented.

---

## Phase 8 — Admin Dashboard

| Module | Status |
|--------|--------|
| Dashboard analytics | Real ✅ |
| Analytics reports | Real ✅ |
| Storefront CMS | Real ✅ |
| Orders | **Now real** (subscription-orders.json) ✅ |
| SEO management | **New** ✅ |
| Blog management | **New** (read-only registry) ✅ |
| Products, customers, coupons, roles | Mock — needs DB |

---

## Phase 9 — Analytics

**Client:** GA4, Clarity, Meta, TikTok, Plausible via `AnalyticsScripts.tsx`  
**First-party:** Event store + funnel in `/admin/analytics`

**Configure:** Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` and `NEXT_PUBLIC_CLARITY_PROJECT_ID` in Vercel env or CMS integrations.

**Roadmap:** GSC verification, server-side Measurement Protocol, Meta CAPI.

---

## Phase 10 — CRO

Implemented: sticky WhatsApp, sticky CTA, exit intent, urgency banner, live visitor counter, testimonials, trust badges.

A/B-ready: use `data-ab-variant` attributes + feature flags (roadmap).

---

## Phase 11 — Security

Implemented this sprint:
- Security headers (HSTS, X-Frame-Options, nosniff, Referrer-Policy)
- Rate limiting on lead + analytics POST
- Protected PII GET endpoints
- Middleware security layer

Still required:
- JWT login + refresh rotation
- CSRF on admin mutations
- CSP (strict, nonce-based)
- Remove hardcoded admin password
- Zod validation on all API bodies

---

## Phase 12 — Production Deployment

**Done:**
- `frontend/vercel.json` — CDN region, cache headers
- `.github/workflows/ci.yml` — lint + build

**Required:**
- `ADMIN_API_KEY` in Vercel (never `NEXT_PUBLIC_`)
- PostgreSQL on EasyPanel/Railway + `DATABASE_URL`
- Sentry DSN for error tracking
- Backup cron for DB + CMS export

---

## Priority Roadmap (Next 30 Days)

1. **PostgreSQL migration** — orders, trials, analytics, CMS
2. **JWT admin auth** — replace client password + API key in bundle
3. **Lighthouse audit loop** — measure and tune TBT/LCP
4. **Cookie consent** — block pixels until accepted
5. **PostgreSQL FTS** — replace in-memory search
6. **MCP servers** — implement SEO + Content tools first
7. **Wire FastAPI** — single backend for IPTV + admin

---

## Validation Checklist

- [ ] Run Lighthouse on production homepage
- [ ] Submit sitemap in Google Search Console
- [ ] Set GA4 + Clarity IDs in production
- [ ] Set strong `ADMIN_API_KEY` in Vercel
- [ ] Verify `/api/subscription-orders` GET returns 401 without key
- [ ] Test all 9 `/iptv/*` pages in Rich Results Test
- [ ] Monitor Core Web Vitals in Search Console

---

*Report generated as part of the enterprise optimization sprint. Re-run audit after PostgreSQL migration and JWT auth.*
