export type AuditLogEntry = {
  id: string;
  actorId: string;
  actorEmail: string;
  action: string;
  resource: string;
  metadata?: Record<string, string>;
  createdAt: string;
};

const auditLogs: AuditLogEntry[] = [];

export function recordAuditLog(entry: Omit<AuditLogEntry, "id" | "createdAt">) {
  auditLogs.unshift({
    ...entry,
    id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString()
  });

  if (auditLogs.length > 200) auditLogs.length = 200;
}

export function getAuditLogs(limit = 50): AuditLogEntry[] {
  return auditLogs.slice(0, limit);
}
