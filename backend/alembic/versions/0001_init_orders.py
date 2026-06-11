"""init orders

Revision ID: 0001_init_orders
Revises:
Create Date: 2026-06-11
"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision: str = "0001_init_orders"
down_revision: str | None = None
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "orders",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("order_number", sa.String(length=32), nullable=False),
        sa.Column("customer_name", sa.String(length=160), nullable=False),
        sa.Column("phone", sa.String(length=20), nullable=False),
        sa.Column("status", sa.String(length=32), nullable=False, server_default="pending"),
        sa.Column("subtotal", sa.Integer(), nullable=False),
        sa.Column("discount_total", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("total", sa.Integer(), nullable=False),
        sa.Column("currency", sa.String(length=8), nullable=False, server_default="MAD"),
        sa.Column("upsell_status", sa.String(length=32), nullable=False, server_default="none"),
        sa.Column("source", sa.String(length=64), nullable=False, server_default="website"),
        sa.Column("utm_source", sa.String(length=255), nullable=True),
        sa.Column("utm_campaign", sa.String(length=255), nullable=True),
        sa.Column("utm_content", sa.String(length=255), nullable=True),
        sa.Column("utm_term", sa.String(length=255), nullable=True),
        sa.Column("fbp", sa.String(length=255), nullable=True),
        sa.Column("fbc", sa.String(length=255), nullable=True),
        sa.Column("client_ip", sa.String(length=64), nullable=True),
        sa.Column("user_agent", sa.Text(), nullable=True),
        sa.Column("risk_flags", postgresql.JSONB(astext_type=sa.Text()), nullable=False, server_default="{}"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_orders_order_number", "orders", ["order_number"], unique=True)
    op.create_index("ix_orders_phone", "orders", ["phone"])
    op.create_index("ix_orders_status", "orders", ["status"])

    op.create_table(
        "order_items",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("order_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("orders.id"), nullable=False),
        sa.Column("product_id", sa.String(length=64), nullable=False),
        sa.Column("product_name", sa.String(length=160), nullable=False),
        sa.Column("unit_price", sa.Integer(), nullable=False),
        sa.Column("quantity", sa.Integer(), nullable=False),
        sa.Column("line_total", sa.Integer(), nullable=False),
        sa.Column("is_upsell", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_order_items_order_id", "order_items", ["order_id"])


def downgrade() -> None:
    op.drop_index("ix_order_items_order_id", table_name="order_items")
    op.drop_table("order_items")
    op.drop_index("ix_orders_status", table_name="orders")
    op.drop_index("ix_orders_phone", table_name="orders")
    op.drop_index("ix_orders_order_number", table_name="orders")
    op.drop_table("orders")
