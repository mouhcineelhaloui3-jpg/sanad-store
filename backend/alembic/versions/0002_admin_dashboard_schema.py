"""admin dashboard schema

Revision ID: 0002_admin_dashboard_schema
Revises: 0001_init_orders
Create Date: 2026-06-11
"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision: str = "0002_admin_dashboard_schema"
down_revision: str | None = "0001_init_orders"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "admin_roles",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("name", sa.String(80), nullable=False),
        sa.Column("permissions", postgresql.JSONB(astext_type=sa.Text()), nullable=False, server_default="{}"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_admin_roles_name", "admin_roles", ["name"], unique=True)

    op.create_table(
        "admin_users",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("role_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("admin_roles.id"), nullable=True),
        sa.Column("name", sa.String(160), nullable=False),
        sa.Column("email", sa.String(255), nullable=False),
        sa.Column("password_hash", sa.String(255), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("last_login_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_admin_users_email", "admin_users", ["email"], unique=True)

    op.create_table(
        "categories",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("name", sa.String(160), nullable=False),
        sa.Column("slug", sa.String(180), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_categories_name", "categories", ["name"], unique=True)
    op.create_index("ix_categories_slug", "categories", ["slug"], unique=True)

    op.create_table(
        "products",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("category_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("categories.id"), nullable=True),
        sa.Column("name", sa.String(180), nullable=False),
        sa.Column("slug", sa.String(200), nullable=False),
        sa.Column("sku", sa.String(80), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("price", sa.Integer(), nullable=False),
        sa.Column("compare_at_price", sa.Integer(), nullable=True),
        sa.Column("upsell_price", sa.Integer(), nullable=True),
        sa.Column("stock_quantity", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("low_stock_threshold", sa.Integer(), nullable=False, server_default="10"),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("seo", postgresql.JSONB(astext_type=sa.Text()), nullable=False, server_default="{}"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_products_name", "products", ["name"])
    op.create_index("ix_products_slug", "products", ["slug"], unique=True)
    op.create_index("ix_products_sku", "products", ["sku"], unique=True)

    op.create_table(
        "product_images",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("product_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("products.id"), nullable=False),
        sa.Column("url", sa.Text(), nullable=False),
        sa.Column("alt_text", sa.String(255), nullable=True),
        sa.Column("sort_order", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_product_images_product_id", "product_images", ["product_id"])

    op.create_table(
        "customers",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("name", sa.String(160), nullable=False),
        sa.Column("phone", sa.String(20), nullable=False),
        sa.Column("city", sa.String(120), nullable=True),
        sa.Column("metadata_json", postgresql.JSONB(astext_type=sa.Text()), nullable=False, server_default="{}"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_customers_name", "customers", ["name"])
    op.create_index("ix_customers_phone", "customers", ["phone"], unique=True)

    op.create_table(
        "payments",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("order_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("orders.id"), nullable=False),
        sa.Column("method", sa.String(60), nullable=False, server_default="cod"),
        sa.Column("status", sa.String(40), nullable=False, server_default="pending"),
        sa.Column("amount", sa.Integer(), nullable=False),
        sa.Column("transaction_ref", sa.String(255), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_payments_order_id", "payments", ["order_id"])
    op.create_index("ix_payments_status", "payments", ["status"])

    op.create_table(
        "coupons",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("code", sa.String(80), nullable=False),
        sa.Column("discount_type", sa.String(40), nullable=False),
        sa.Column("value", sa.Integer(), nullable=False),
        sa.Column("usage_limit", sa.Integer(), nullable=True),
        sa.Column("used_count", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("expires_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_coupons_code", "coupons", ["code"], unique=True)

    op.create_table(
        "product_reviews",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("product_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("products.id"), nullable=True),
        sa.Column("customer_name", sa.String(160), nullable=False),
        sa.Column("rating", sa.Integer(), nullable=False),
        sa.Column("text", sa.Text(), nullable=False),
        sa.Column("status", sa.String(40), nullable=False, server_default="pending"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_product_reviews_product_id", "product_reviews", ["product_id"])
    op.create_index("ix_product_reviews_status", "product_reviews", ["status"])

    op.create_table(
        "activity_logs",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("actor_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("admin_users.id"), nullable=True),
        sa.Column("action", sa.String(120), nullable=False),
        sa.Column("target_type", sa.String(80), nullable=True),
        sa.Column("target_id", sa.String(120), nullable=True),
        sa.Column("ip_address", sa.String(64), nullable=True),
        sa.Column("user_agent", sa.Text(), nullable=True),
        sa.Column("metadata_json", postgresql.JSONB(astext_type=sa.Text()), nullable=False, server_default="{}"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_activity_logs_action", "activity_logs", ["action"])

    op.create_table(
        "admin_notifications",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("title", sa.String(160), nullable=False),
        sa.Column("message", sa.Text(), nullable=False),
        sa.Column("notification_type", sa.String(60), nullable=False),
        sa.Column("is_read", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_admin_notifications_notification_type", "admin_notifications", ["notification_type"])


def downgrade() -> None:
    for index_name, table_name in [
        ("ix_admin_notifications_notification_type", "admin_notifications"),
        ("ix_activity_logs_action", "activity_logs"),
        ("ix_product_reviews_status", "product_reviews"),
        ("ix_product_reviews_product_id", "product_reviews"),
        ("ix_coupons_code", "coupons"),
        ("ix_payments_status", "payments"),
        ("ix_payments_order_id", "payments"),
        ("ix_customers_phone", "customers"),
        ("ix_customers_name", "customers"),
        ("ix_product_images_product_id", "product_images"),
        ("ix_products_sku", "products"),
        ("ix_products_slug", "products"),
        ("ix_products_name", "products"),
        ("ix_categories_slug", "categories"),
        ("ix_categories_name", "categories"),
        ("ix_admin_users_email", "admin_users"),
        ("ix_admin_roles_name", "admin_roles"),
    ]:
        op.drop_index(index_name, table_name=table_name)

    for table_name in [
        "admin_notifications",
        "activity_logs",
        "product_reviews",
        "coupons",
        "payments",
        "customers",
        "product_images",
        "products",
        "categories",
        "admin_users",
        "admin_roles",
    ]:
        op.drop_table(table_name)
