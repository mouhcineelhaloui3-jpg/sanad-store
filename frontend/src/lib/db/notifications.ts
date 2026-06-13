import type { NotificationChannel, NotificationStatus, Prisma } from "@/generated/prisma/client";
import { appendAuditLog } from "./audit";
import { prisma } from "./prisma";
import { type ListParams, type PaginatedResult } from "./pagination";

export type NotificationDto = {
  id: string;
  title: string;
  body: string;
  channel: NotificationChannel;
  status: NotificationStatus;
  userId: string | null;
  createdAt: string;
};

export type NotificationSettingsDto = {
  realtimeEnabled: boolean;
  provider: "polling" | "websocket" | "sse";
  pollingIntervalSeconds: number;
  showLivePopup: boolean;
  cacheEnabled: boolean;
  cacheTtlSeconds: number;
  clearCacheOnOrder: boolean;
  newOrderAlerts: boolean;
  lowStockAlerts: boolean;
  lowStockThreshold: number;
  reviewApprovalAlerts: boolean;
  dashboardBell: boolean;
  emailAlerts: boolean;
  whatsappAlerts: boolean;
  adminWhatsappNumber: string;
};

const DEFAULT_SETTINGS: NotificationSettingsDto = {
  realtimeEnabled: true,
  provider: "polling",
  pollingIntervalSeconds: 15,
  showLivePopup: true,
  cacheEnabled: false,
  cacheTtlSeconds: 0,
  clearCacheOnOrder: true,
  newOrderAlerts: true,
  lowStockAlerts: true,
  lowStockThreshold: 10,
  reviewApprovalAlerts: true,
  dashboardBell: true,
  emailAlerts: false,
  whatsappAlerts: false,
  adminWhatsappNumber: "+212600000000"
};

function toDto(row: {
  id: string;
  title: string;
  body: string;
  channel: NotificationChannel;
  status: NotificationStatus;
  userId: string | null;
  createdAt: Date;
}): NotificationDto {
  return {
    id: row.id,
    title: row.title,
    body: row.body,
    channel: row.channel,
    status: row.status,
    userId: row.userId,
    createdAt: row.createdAt.toISOString()
  };
}

export async function listNotifications(params: ListParams = {}): Promise<PaginatedResult<NotificationDto>> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 20;
  const where: Prisma.AdminNotificationWhereInput = {};
  if (params.status) where.status = params.status as NotificationStatus;

  const [total, rows] = await Promise.all([
    prisma.adminNotification.count({ where }),
    prisma.adminNotification.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit
    })
  ]);

  return {
    items: rows.map(toDto),
    total,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(total / limit))
  };
}

export async function createNotification(
  input: { title: string; body: string; channel?: NotificationChannel; userId?: string },
  audit?: { userId: string; ip?: string | null }
) {
  const row = await prisma.adminNotification.create({
    data: {
      title: input.title,
      body: input.body,
      channel: input.channel ?? "dashboard",
      userId: input.userId ?? null
    }
  });
  if (audit) {
    await appendAuditLog({
      userId: audit.userId,
      action: "notification.create",
      module: "notifications",
      entityType: "notification",
      entityId: row.id,
      ip: audit.ip ?? null
    });
  }
  return toDto(row);
}

export async function updateNotificationStatus(
  id: string,
  status: NotificationStatus,
  audit?: { userId: string; ip?: string | null }
) {
  const row = await prisma.adminNotification.update({ where: { id }, data: { status } });
  if (audit) {
    await appendAuditLog({
      userId: audit.userId,
      action: "notification.update",
      module: "notifications",
      entityType: "notification",
      entityId: id,
      metadata: { status },
      ip: audit.ip ?? null
    });
  }
  return toDto(row);
}

export async function getNotificationSettings(): Promise<NotificationSettingsDto> {
  const row = await prisma.notificationSettings.findUnique({ where: { id: "default" } });
  if (!row) return DEFAULT_SETTINGS;
  return { ...DEFAULT_SETTINGS, ...(row.config as NotificationSettingsDto) };
}

export async function saveNotificationSettings(
  settings: NotificationSettingsDto,
  audit?: { userId: string; ip?: string | null }
) {
  const row = await prisma.notificationSettings.upsert({
    where: { id: "default" },
    create: { id: "default", config: settings as Prisma.InputJsonValue },
    update: { config: settings as Prisma.InputJsonValue }
  });
  if (audit) {
    await appendAuditLog({
      userId: audit.userId,
      action: "notification.settings.update",
      module: "notifications",
      ip: audit.ip ?? null
    });
  }
  return { ...DEFAULT_SETTINGS, ...(row.config as NotificationSettingsDto) };
}
