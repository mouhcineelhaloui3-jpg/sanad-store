"""store control settings

Revision ID: 0003_store_control_settings
Revises: 0002_admin_dashboard_schema
Create Date: 2026-06-11
"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision: str = "0003_store_control_settings"
down_revision: str | None = "0002_admin_dashboard_schema"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "store_settings",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("key", sa.String(120), nullable=False),
        sa.Column("value", postgresql.JSONB(astext_type=sa.Text()), nullable=False, server_default="{}"),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_store_settings_key", "store_settings", ["key"], unique=True)

    op.create_table(
        "integration_settings",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("name", sa.String(160), nullable=False),
        sa.Column("integration_type", sa.String(80), nullable=False),
        sa.Column("endpoint_url", sa.Text(), nullable=True),
        sa.Column("secret_env_key", sa.String(160), nullable=True),
        sa.Column("config", postgresql.JSONB(astext_type=sa.Text()), nullable=False, server_default="{}"),
        sa.Column("is_enabled", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_integration_settings_name", "integration_settings", ["name"])
    op.create_index("ix_integration_settings_integration_type", "integration_settings", ["integration_type"])

    op.create_table(
        "notification_settings",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("key", sa.String(120), nullable=False),
        sa.Column("value", postgresql.JSONB(astext_type=sa.Text()), nullable=False, server_default="{}"),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_notification_settings_key", "notification_settings", ["key"], unique=True)


def downgrade() -> None:
    op.drop_index("ix_notification_settings_key", table_name="notification_settings")
    op.drop_table("notification_settings")
    op.drop_index("ix_integration_settings_integration_type", table_name="integration_settings")
    op.drop_index("ix_integration_settings_name", table_name="integration_settings")
    op.drop_table("integration_settings")
    op.drop_index("ix_store_settings_key", table_name="store_settings")
    op.drop_table("store_settings")
