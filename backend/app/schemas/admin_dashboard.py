from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field


class CategoryCreate(BaseModel):
    name: str
    slug: str
    description: str | None = None


class CategoryRead(CategoryCreate):
    id: UUID
    is_active: bool

    model_config = {"from_attributes": True}


class ProductCreate(BaseModel):
    name: str
    slug: str
    sku: str
    category_id: UUID | None = None
    description: str | None = None
    price: int = Field(ge=0)
    compare_at_price: int | None = None
    upsell_price: int | None = None
    stock_quantity: int = 0
    low_stock_threshold: int = 10
    seo: dict = {}


class ProductRead(ProductCreate):
    id: UUID
    is_active: bool
    created_at: datetime

    model_config = {"from_attributes": True}


class CustomerRead(BaseModel):
    id: UUID
    name: str
    phone: str
    city: str | None = None
    created_at: datetime

    model_config = {"from_attributes": True}


class CouponCreate(BaseModel):
    code: str
    discount_type: str
    value: int
    usage_limit: int | None = None
    expires_at: datetime | None = None


class CouponRead(CouponCreate):
    id: UUID
    used_count: int
    is_active: bool

    model_config = {"from_attributes": True}


class ReviewModeration(BaseModel):
    status: str


class ReviewRead(BaseModel):
    id: UUID
    product_id: UUID | None = None
    customer_name: str
    rating: int
    text: str
    status: str
    created_at: datetime

    model_config = {"from_attributes": True}


class RoleCreate(BaseModel):
    name: str
    permissions: dict = {}


class RoleRead(RoleCreate):
    id: UUID

    model_config = {"from_attributes": True}


class ActivityLogRead(BaseModel):
    id: UUID
    action: str
    target_type: str | None = None
    target_id: str | None = None
    created_at: datetime

    model_config = {"from_attributes": True}


class DashboardSummary(BaseModel):
    total_sales: int
    total_orders: int
    total_customers: int
    total_products: int


class StoreSettingUpsert(BaseModel):
    key: str
    value: dict
    description: str | None = None


class StoreSettingRead(StoreSettingUpsert):
    id: UUID

    model_config = {"from_attributes": True}


class IntegrationSettingUpsert(BaseModel):
    name: str
    integration_type: str
    endpoint_url: str | None = None
    secret_env_key: str | None = None
    config: dict = {}
    is_enabled: bool = False


class IntegrationSettingRead(IntegrationSettingUpsert):
    id: UUID

    model_config = {"from_attributes": True}


class NotificationSettingUpsert(BaseModel):
    key: str
    value: dict


class NotificationSettingRead(NotificationSettingUpsert):
    id: UUID

    model_config = {"from_attributes": True}
