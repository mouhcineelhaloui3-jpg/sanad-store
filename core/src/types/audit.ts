export type AuditLogRecord = {
  id: string;
  userId: string;
  action: string;
  module: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
};

export type AuditInput = Omit<AuditLogRecord, "id" | "timestamp">;
