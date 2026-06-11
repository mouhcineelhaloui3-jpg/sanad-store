from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models import Order
from app.schemas import OrderCreate, OrderItemPublic, OrderPublic, OrderResponse, UpsellCreate
from app.services.orders import add_upsell, create_order

router = APIRouter(prefix="/orders", tags=["orders"])


@router.post("", response_model=OrderResponse)
def create_order_endpoint(payload: OrderCreate, request: Request, db: Session = Depends(get_db)) -> OrderResponse:
    try:
        order, eligible = create_order(
            db,
            payload,
            client_ip=request.client.host if request.client else None,
            user_agent=request.headers.get("user-agent"),
        )
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    return OrderResponse(
        id=order.id,
        order_number=order.order_number,
        total=order.total,
        currency=order.currency,
        eligible_upsell=eligible,
    )


@router.post("/{order_id}/upsell", response_model=OrderResponse)
def accept_upsell_endpoint(order_id: UUID, payload: UpsellCreate, db: Session = Depends(get_db)) -> OrderResponse:
    try:
        order = add_upsell(db, order_id, payload.product_id)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    return OrderResponse(
        id=order.id,
        order_number=order.order_number,
        total=order.total,
        currency=order.currency,
        eligible_upsell=None,
    )


@router.post("/{order_id}/upsell/decline")
def decline_upsell_endpoint(order_id: UUID, db: Session = Depends(get_db)) -> dict[str, str]:
    order = db.get(Order, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    order.upsell_status = "declined"
    db.commit()
    return {"status": "ok"}


@router.get("/{order_id}/public", response_model=OrderPublic)
def public_order_endpoint(order_id: UUID, db: Session = Depends(get_db)) -> OrderPublic:
    order = db.get(Order, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    return OrderPublic(
        id=order.id,
        order_number=order.order_number,
        customer_name=order.customer_name,
        status=order.status,
        total=order.total,
        currency=order.currency,
        items=[
            OrderItemPublic(
                product_id=item.product_id,
                product_name=item.product_name,
                unit_price=item.unit_price,
                quantity=item.quantity,
                line_total=item.line_total,
                is_upsell=item.is_upsell,
            )
            for item in order.items
        ],
    )
