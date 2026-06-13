# MCP Architecture — SANAD IPTV

Enterprise AI tooling layer for SEO, analytics, monitoring, and content operations.

## Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Cursor / Agent Layer                      │
└────────────┬──────────────┬──────────────┬──────────────────┘
             │              │              │
    ┌────────▼────┐  ┌──────▼──────┐  ┌────▼─────────┐
    │  SEO MCP    │  │ Analytics   │  │ Monitoring   │
    │  Server     │  │ MCP Server  │  │ MCP Server   │
    └────────┬────┘  └──────┬──────┘  └──────┬───────┘
             │              │              │
    ┌────────▼──────────────▼──────────────▼───────────────────┐
    │              SANAD Platform (Next.js + FastAPI)           │
    │  /api/search  /api/analytics  /api/admin  PostgreSQL     │
    └──────────────────────────────────────────────────────────┘
             │
    ┌────────▼────────┐
    │  Content MCP    │
    │  Server         │
    └─────────────────┘
```

## Server Specifications

### 1. SEO MCP Server

**Tools:**
- `keyword_research` — query volume + Moroccan Arabic/English variants
- `competitor_analysis` — compare SERP snippets for target keywords
- `serp_preview` — render title/description for a URL
- `seo_audit` — crawl sitemap, check metadata, JSON-LD, CWV hints
- `optimize_content` — rewrite headings, meta, FAQ for target keyword

**Data sources:** `sitemap.xml`, `lib/seo/programmatic-pages.ts`, GSC API (future)

### 2. Analytics MCP Server

**Tools:**
- `get_visitors` — sessions, page views, unique IPs
- `get_conversions` — orders, trials, conversion rate
- `get_revenue` — MAD revenue from plan breakdown
- `funnel_report` — page_view → modal_open → lead → order
- `traffic_sources` — UTM breakdown

**Data sources:** `frontend/data/analytics-events.json`, GA4 Data API (future)

### 3. Monitoring MCP Server

**Tools:**
- `uptime_check` — ping production URL
- `error_summary` — recent `/api/report-error` events
- `performance_snapshot` — PageSpeed Insights API
- `core_web_vitals` — LCP, CLS, INP from CrUX (future)

### 4. Content MCP Server

**Tools:**
- `generate_blog_post` — Article + FAQ + metadata
- `generate_landing_page` — programmatic SEO page config
- `generate_faq` — FAQ section for any topic
- `generate_meta_tags` — title, description, OG for a path

**Output format:** TypeScript objects compatible with `lib/blog/posts.ts` and `lib/seo/programmatic-pages.ts`

## Implementation Roadmap

| Phase | Deliverable |
|-------|-------------|
| 1 | MCP tool schemas in `mcp/servers/*/tools.json` |
| 2 | Node MCP servers reading Next.js APIs |
| 3 | PostgreSQL-backed search + content store |
| 4 | GSC + GA4 API integration |
| 5 | Cursor MCP config in project `.cursor/mcp.json` |

## Local Development

```bash
# Future: run SEO MCP server
cd mcp/servers/seo-server
npm install && npm start
```

Register in Cursor Settings → MCP with server URL or stdio command.
