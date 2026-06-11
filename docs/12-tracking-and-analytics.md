# 12 — Tracking & Analytics

هذا الملف يحدد أحداث التتبع المطلوبة للمتجر، خاصة لأن COD يحتاج قياساً دقيقاً: الطلبات، تأكيد الطلب، التسليم، والـAOV.

---

## 1. Tools

v1:

- Meta Pixel.
- Meta Conversions API (CAPI) من الـBackend، اختياري لكن مفضل.
- TikTok Pixel.
- UTM capture in localStorage.

Optional later:

- Google Analytics 4.
- Microsoft Clarity.
- Server-side dashboard.

---

## 2. Frontend Events

### Page View

Fire automatically on route change:

```txt
PageView
```

### Product View

When PDP loads:

```txt
ViewContent
```

Payload:

```json
{
  "content_ids": ["sanad-align"],
  "content_name": "سَنَد ألاين",
  "content_type": "product",
  "value": 249,
  "currency": "MAD"
}
```

### Add to Cart

When product is added:

```txt
AddToCart
```

Payload:

```json
{
  "content_ids": ["sanad-align"],
  "value": 249,
  "currency": "MAD"
}
```

### Initiate Checkout

When checkout popup opens:

```txt
InitiateCheckout
```

### Lead

When checkout form is valid and backend creates order:

```txt
Lead
```

This is very important for COD because payment is offline.

### Purchase

When order is successfully created:

```txt
Purchase
```

Use COD purchase event with order total. Some teams prefer firing `Purchase` only after confirmation, but in v1 fire it on successful order creation and later optimize with CAPI confirmation events.

### Custom Events

```txt
UpsellShown
UpsellAccepted
UpsellDeclined
ThankYouViewed
```

---

## 3. Backend CAPI Events

When order is created:

- Send Meta `Purchase` server event with:
  - event_id = order_id
  - value = total
  - currency = MAD
  - phone hashed (SHA256 normalized)
  - client IP
  - user agent
  - fbp/fbc if provided

When order is confirmed manually later:

- Optional custom event:
  - `OrderConfirmed`

When delivered:

- Optional custom event:
  - `OrderDelivered`

These later events help understand real COD quality but may not optimize directly unless integrated carefully.

---

## 4. Event ID Deduplication

Frontend and backend should use same `event_id` for purchase:

```txt
event_id = order_id
```

Frontend fires Pixel Purchase with `eventID`.
Backend sends CAPI Purchase with same `event_id`.
Meta deduplicates them.

---

## 5. UTM Capture

On first visit, save:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `fbclid`
- `ttclid`

Store in `localStorage`:

```json
{
  "utm_source": "facebook",
  "utm_campaign": "sanad_heat_video_1",
  "utm_content": "hook_neck_tension",
  "first_seen_at": "2026-06-11T00:00:00.000Z"
}
```

Include tracking object in `POST /orders`.

---

## 6. Cookies

Read and send to backend:

- `_fbp`
- `_fbc`

If `_fbc` does not exist but `fbclid` exists, generate according to Meta format if implementing CAPI.

---

## 7. Business Dashboard Metrics

Minimum metrics:

- Visitors.
- Product views.
- Add to cart rate.
- Checkout open rate.
- Order conversion rate.
- Upsell take rate.
- AOV.
- Confirmation rate.
- Delivery rate.
- Cancellation reasons.

Use admin export CSV at first. Later build dashboard.

---

## 8. COD-Specific Tracking

Add manual status updates in admin:

- pending
- confirmed
- cancelled
- shipped
- delivered
- returned

Calculate:

```txt
confirmation_rate = confirmed / pending_created
delivery_rate = delivered / shipped
rto_rate = returned / shipped
```

Track by:

- product.
- campaign.
- city (when address added during confirmation; not in checkout v1).
- phone prefix maybe useful but not critical.

---

## 9. Privacy Notes

- Do not expose private data in frontend logs.
- Hash phone before sending to Meta CAPI.
- Keep privacy policy updated.
- Add cookie consent later if required by market/legal needs.

---

## 10. Analytics Helper API

Frontend should expose:

```ts
trackPageView();
trackViewContent(product);
trackAddToCart(product, quantity);
trackInitiateCheckout(cart);
trackLead(order);
trackPurchase(order);
trackUpsellShown(product, orderId);
trackUpsellAccepted(product, orderId);
```

Each helper should no-op safely if pixel IDs are missing.
