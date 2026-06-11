from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.api.routes.admin import require_admin_key
from app.db.session import get_db
from app.models import (
    ActivityLog,
    AdminRole,
    Category,
    Coupon,
    Customer,
    IntegrationSetting,
    NotificationSetting,
    Order,
    Product,
    ProductReview,
    StoreSetting,
)
from app.schemas import (
    ActivityLogRead,
    CategoryCreate,
    CategoryRead,
    CouponCreate,
    CouponRead,
    CustomerRead,
    DashboardSummary,
    IntegrationSettingRead,
    IntegrationSettingUpsert,
    NotificationSettingRead,
    NotificationSettingUpsert,
    ProductCreate,
    ProductRead,
    ReviewModeration,
    ReviewRead,
    RoleCreate,
    RoleRead,
    StoreSettingRead,
    StoreSettingUpsert,
)

router = APIRouter(prefix="/admin", tags=["admin-management"], dependencies=[Depends(require_admin_key)])


@router.get("/dashboard", response_model=DashboardSummary)
def dashboard_summary(db: Session = Depends(get_db)) -> DashboardSummary:
    total_sales = db.scalar(select(func.coalesce(func.sum(Order.total), 0))) or 0
    total_orders = db.scalar(select(func.count(Order.id))) or 0
    total_customers = db.scalar(select(func.count(Customer.id))) or 0
    total_products = db.scalar(select(func.count(Product.id))) or 0
    return DashboardSummary(
        total_sales=total_sales,
        total_orders=total_orders,
        total_customers=total_customers,
        total_products=total_products,
    )


@router.get("/products", response_model=list[ProductRead])
def list_products(db: Session = Depends(get_db)) -> list[Product]:
    return list(db.scalars(select(Product).order_by(Product.created_at.desc())).all())


@router.post("/products", response_model=ProductRead)
def create_product(payload: ProductCreate, db: Session = Depends(get_db)) -> Product:
    product = Product(**payload.model_dump())
    db.add(product)
    db.commit()
    db.refresh(product)
    return product


@router.get("/products/{product_id}", response_model=ProductRead)
def get_product(product_id: UUID, db: Session = Depends(get_db)) -> Product:
    product = db.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.delete("/products/{product_id}")
def delete_product(product_id: UUID, db: Session = Depends(get_db)) -> dict[str, str]:
    product = db.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()
    return {"status": "deleted"}


@router.get("/categories", response_model=list[CategoryRead])
def list_categories(db: Session = Depends(get_db)) -> list[Category]:
    return list(db.scalars(select(Category).order_by(Category.name)).all())


@router.post("/categories", response_model=CategoryRead)
def create_category(payload: CategoryCreate, db: Session = Depends(get_db)) -> Category:
    category = Category(**payload.model_dump())
    db.add(category)
    db.commit()
    db.refresh(category)
    return category


@router.get("/customers", response_model=list[CustomerRead])
def list_customers(db: Session = Depends(get_db)) -> list[Customer]:
    return list(db.scalars(select(Customer).order_by(Customer.created_at.desc())).all())


@router.get("/coupons", response_model=list[CouponRead])
def list_coupons(db: Session = Depends(get_db)) -> list[Coupon]:
    return list(db.scalars(select(Coupon).order_by(Coupon.created_at.desc())).all())


@router.post("/coupons", response_model=CouponRead)
def create_coupon(payload: CouponCreate, db: Session = Depends(get_db)) -> Coupon:
    coupon = Coupon(**payload.model_dump())
    db.add(coupon)
    db.commit()
    db.refresh(coupon)
    return coupon


@router.get("/reviews", response_model=list[ReviewRead])
def list_reviews(status: str | None = None, db: Session = Depends(get_db)) -> list[ProductReview]:
    stmt = select(ProductReview).order_by(ProductReview.created_at.desc())
    if status:
        stmt = stmt.where(ProductReview.status == status)
    return list(db.scalars(stmt).all())


@router.patch("/reviews/{review_id}", response_model=ReviewRead)
def moderate_review(review_id: UUID, payload: ReviewModeration, db: Session = Depends(get_db)) -> ProductReview:
    review = db.get(ProductReview, review_id)
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    review.status = payload.status
    db.commit()
    db.refresh(review)
    return review


@router.get("/roles", response_model=list[RoleRead])
def list_roles(db: Session = Depends(get_db)) -> list[AdminRole]:
    return list(db.scalars(select(AdminRole).order_by(AdminRole.name)).all())


@router.post("/roles", response_model=RoleRead)
def create_role(payload: RoleCreate, db: Session = Depends(get_db)) -> AdminRole:
    role = AdminRole(**payload.model_dump())
    db.add(role)
    db.commit()
    db.refresh(role)
    return role


@router.get("/activity-logs", response_model=list[ActivityLogRead])
def list_activity_logs(db: Session = Depends(get_db)) -> list[ActivityLog]:
    return list(db.scalars(select(ActivityLog).order_by(ActivityLog.created_at.desc()).limit(200)).all())


@router.get("/store-settings", response_model=list[StoreSettingRead])
def list_store_settings(db: Session = Depends(get_db)) -> list[StoreSetting]:
    return list(db.scalars(select(StoreSetting).order_by(StoreSetting.key)).all())


@router.put("/store-settings/{key}", response_model=StoreSettingRead)
def upsert_store_setting(key: str, payload: StoreSettingUpsert, db: Session = Depends(get_db)) -> StoreSetting:
    setting = db.scalar(select(StoreSetting).where(StoreSetting.key == key))
    if not setting:
        setting = StoreSetting(key=key, value=payload.value, description=payload.description)
        db.add(setting)
    else:
        setting.value = payload.value
        setting.description = payload.description
    db.commit()
    db.refresh(setting)
    return setting


@router.get("/integrations", response_model=list[IntegrationSettingRead])
def list_integrations(db: Session = Depends(get_db)) -> list[IntegrationSetting]:
    return list(db.scalars(select(IntegrationSetting).order_by(IntegrationSetting.integration_type)).all())


@router.post("/integrations", response_model=IntegrationSettingRead)
def create_integration(payload: IntegrationSettingUpsert, db: Session = Depends(get_db)) -> IntegrationSetting:
    integration = IntegrationSetting(**payload.model_dump())
    db.add(integration)
    db.commit()
    db.refresh(integration)
    return integration


@router.get("/notification-settings", response_model=list[NotificationSettingRead])
def list_notification_settings(db: Session = Depends(get_db)) -> list[NotificationSetting]:
    return list(db.scalars(select(NotificationSetting).order_by(NotificationSetting.key)).all())


@router.put("/notification-settings/{key}", response_model=NotificationSettingRead)
def upsert_notification_setting(
    key: str,
    payload: NotificationSettingUpsert,
    db: Session = Depends(get_db),
) -> NotificationSetting:
    setting = db.scalar(select(NotificationSetting).where(NotificationSetting.key == key))
    if not setting:
        setting = NotificationSetting(key=key, value=payload.value)
        db.add(setting)
    else:
        setting.value = payload.value
    db.commit()
    db.refresh(setting)
    return setting
