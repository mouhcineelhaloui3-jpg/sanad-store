# SANAD Backend

FastAPI API for SANAD COD orders.

## Run Locally

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

API docs:

```txt
http://localhost:8000/docs
```

## Database

PostgreSQL database name:

```txt
namabeauty
```

Run migrations:

```bash
alembic upgrade head
```

## Endpoints

- `GET /api/health`
- `POST /api/orders`
- `POST /api/orders/{order_id}/upsell`
- `POST /api/orders/{order_id}/upsell/decline`
- `GET /api/orders/{order_id}/public`
- `GET /api/admin/orders`
- `PATCH /api/admin/orders/{order_id}/status`
- `GET /api/admin/orders/export.csv`

Admin endpoints require:

```txt
X-Admin-Key: ADMIN_API_KEY
```
