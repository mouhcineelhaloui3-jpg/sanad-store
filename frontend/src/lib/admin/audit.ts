export type AuditLogEntry = {
  id: string;
  actorId: string;
  actorEmail: string;
  action: string;
  resource: string;
  metadata?: Record<string, string>;
  createdAt: string;
};

export function recordAuditLog(entry: Omit<AuditLogEntry, "id" | "createdAt">) {
  void import("@/lib/db/audit")
    .then(({ appendAuditLog, appendActivityLog }) =>
      Promise.all([
        appendAuditLog({
          userId: entry.actorId,
          action: entry.action,
          module: entry.resource.split(":")[0] ?? entry.resource,
          entityType: entry.resource.includes(":") ? entry.resource.split(":")[1] : null,
          entityId: entry.metadata?.entityId ?? null,
          metadata: entry.metadata
        }),
        appendActivityLog({
          actorId: entry.actorId,
          action: entry.action,
          resource: entry.resource,
          metadata: entry.metadata
        })
      ])
    )
    .catch((error) => {
      console.error("[audit] failed to persist", error);
    });
}

export async function getAuditLogs(limit = 50): Promise<AuditLogEntry[]> {
  const { listAuditLogs } = await import("@/lib/db/audit");
  const logs = await listAuditLogs(limit);

  return logs.map((log) => ({
    id: log.id,
    actorId: log.userId ?? "system",
    actorEmail: log.user?.email ?? "system@sanad.iptv",
    action: log.action,
    resource: log.entityType ? `${log.module}:${log.entityType}:${log.entityId ?? ""}` : log.module,
    metadata: log.metadata ? (log.metadata as Record<string, string>) : undefined,
    createdAt: log.createdAt.toISOString()
  }));
}
