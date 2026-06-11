from datetime import datetime
from uuid import UUID

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.models import Order, OrderItem
from app.schemas import EligibleUpsell, OrderCreate
from app.services.catalog import PRODUCTS, choose_upsell_product, get_product


def _next_order_number(db: Session) -> str:
    year = datetime.utcnow().year
    count = db.scalar(select(func.count(Order.id))) or 0
    return f"SN-{year}-{count + 1:06d}"


def create_order(db: Session, payload: OrderCreate, client_ip: str | None, user_agent: str | None) -> tuple[Order, EligibleUpsell | None]:
    subtotal = 0
    items: list[OrderItem] = []
    product_ids: list[str] = []

    for item in payload.items:
        product = get_product(item.product_id)
        line_total = product["price"] * item.quantity
        subtotal += line_total
        product_ids.append(item.product_id)
        items.append(
            OrderItem(
                product_id=item.product_id,
                product_name=product["name"],
                unit_price=product["price"],
                quantity=item.quantity,
                line_total=line_total,
                is_upsell=False,
            )
        )

    tracking = payload.tracking
    order = Order(
        order_number=_next_order_number(db),
        customer_name=payload.customer_name.strip(),
        phone=payload.phone,
        subtotal=subtotal,
        total=subtotal,
        discount_total=0,
        client_ip=client_ip,
        user_agent=user_agent,
        utm_source=tracking.utm_source if tracking else None,
        utm_campaign=tracking.utm_campaign if tracking else None,
        utm_content=tracking.utm_content if tracking else None,
        utm_term=tracking.utm_term if tracking else None,
        fbp=tracking.fbp if tracking else None,
        fbc=tracking.fbc if tracking else None,
        items=items,
        risk_flags={},
    )
    db.add(order)
    db.commit()
    db.refresh(order)

    upsell_id = choose_upsell_product(product_ids)
    eligible = None
    if upsell_id:
        product = PRODUCTS[upsell_id]
        eligible = EligibleUpsell(
            product_id=upsell_id,
            name=product["name"],
            original_price=product["price"],
            upsell_price=product["upsell_price"],
        )
        order.upsell_status = "shown"
        db.commit()
        db.refresh(order)

    return order, eligible


def add_upsell(db: Session, order_id: UUID, product_id: str) -> Order:
    order = db.get(Order, order_id)
    if not order:
        raise ValueError("Order not found")
    if order.status != "pending":
        raise ValueError("Order is not pending")
    if any(item.product_id == product_id for item in order.items):
        raise ValueError("Product already in order")

    product = get_product(product_id)
    line_total = product["upsell_price"]
    original_price = product["price"]

    order.items.append(
        OrderItem(
            product_id=product_id,
            product_name=product["name"],
            unit_price=line_total,
            quantity=1,
            line_total=line_total,
            is_upsell=True,
        )
    )
    order.subtotal += original_price
    order.discount_total += original_price - line_total
    order.total += line_total
    order.upsell_status = "accepted"
    db.commit()
    db.refresh(order)
    return order
