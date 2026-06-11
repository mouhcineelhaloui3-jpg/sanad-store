from uuid import UUID

from pydantic import BaseModel, Field, field_validator


class TrackingPayload(BaseModel):
    utm_source: str | None = None
    utm_campaign: str | None = None
    utm_content: str | None = None
    utm_term: str | None = None
    fbp: str | None = None
    fbc: str | None = None


class OrderItemCreate(BaseModel):
    product_id: str
    quantity: int = Field(ge=1, le=10)


class OrderCreate(BaseModel):
    customer_name: str = Field(min_length=3, max_length=160)
    phone: str
    items: list[OrderItemCreate] = Field(min_length=1, max_length=10)
    tracking: TrackingPayload | None = None

    @field_validator("phone")
    @classmethod
    def validate_moroccan_phone(cls, value: str) -> str:
        import re

        if not re.match(r"^0[5-7][0-9]{8}$", value):
            raise ValueError("دخل رقم مغربي صحيح، مثال: 0612345678.")
        return value


class UpsellCreate(BaseModel):
    product_id: str


class EligibleUpsell(BaseModel):
    product_id: str
    name: str
    original_price: int
    upsell_price: int
    expires_in_seconds: int = 15


class OrderItemPublic(BaseModel):
    product_id: str
    product_name: str
    unit_price: int
    quantity: int
    line_total: int
    is_upsell: bool


class OrderResponse(BaseModel):
    id: UUID
    order_number: str
    total: int
    currency: str
    eligible_upsell: EligibleUpsell | None = None


class OrderPublic(BaseModel):
    id: UUID
    order_number: str
    customer_name: str
    status: str
    total: int
    currency: str
    items: list[OrderItemPublic]


class AdminStatusUpdate(BaseModel):
    status: str
