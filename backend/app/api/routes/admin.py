import csv
from io import StringIO
from uuid import UUID

from fastapi import APIRouter, Depends, Header, HTTPException, Response
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.db.session import get_db
from app.models import Order
from app.schemas import AdminStatusUpdate

router = APIRouter(prefix="/admin", tags=["admin"])


def require_admin_key(x_admin_key: str = Header(default="")) -> None:
    settings = get_settings()
    if x_admin_key != settings.admin_api_key:
        raise HTTPException(status_code=401, detail="Unauthorized")


@router.get("/orders", dependencies=[Depends(require_admin_key)])
def list_orders(status: str | None = None, limit: int = 50, offset: int = 0, db: Session = Depends(get_db)):
    stmt = select(Order).order_by(Order.created_at.desc()).limit(limit).offset(offset)
    if status:
        stmt = stmt.where(Order.status == status)
    orders = db.scalars(stmt).all()
    return [
        {
            "id": order.id,
            "order_number": order.order_number,
            "customer_name": order.customer_name,
            "phone": order.phone,
            "status": order.status,
            "total": order.total,
            "created_at": order.created_at,
        }
        for order in orders
    ]


@router.patch("/orders/{order_id}/status", dependencies=[Depends(require_admin_key)])
def update_status(order_id: UUID, payload: AdminStatusUpdate, db: Session = Depends(get_db)):
    order = db.get(Order, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    order.status = payload.status
    db.commit()
    return {"status": "ok"}


@router.get("/orders/export.csv", dependencies=[Depends(require_admin_key)])
def export_orders(status: str | None = None, db: Session = Depends(get_db)):
    stmt = select(Order).order_by(Order.created_at.desc())
    if status:
        stmt = stmt.where(Order.status == status)
    orders = db.scalars(stmt).all()

    output = StringIO()
    writer = csv.writer(output)
    writer.writerow(["order_number", "customer_name", "phone", "items", "total", "status", "created_at", "utm_campaign"])
    for order in orders:
        items = " | ".join(f"{item.product_name} x{item.quantity}" for item in order.items)
        writer.writerow([
            order.order_number,
            order.customer_name,
            order.phone,
            items,
            order.total,
            order.status,
            order.created_at.isoformat() if order.created_at else "",
            order.utm_campaign or "",
        ])

    return Response(content=output.getvalue(), media_type="text/csv")
