# SANAD Frontend

Next.js storefront for SANAD Morocco COD store.

## Run

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Important Routes

- `/`
- `/collection`
- `/product/sanad-align`
- `/product/sanad-heat`
- `/product/sanad-lumbo`
- `/about`
- `/contact`
- `/policies/shipping`
- `/thank-you`

## Notes

- No `/cart` page. Cart is a global drawer.
- Checkout is a popup with name + Moroccan phone.
- Upsell appears after successful order creation.
