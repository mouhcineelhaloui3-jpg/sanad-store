import type { AuditInput, AuditLogRecord } from "../types/audit";
import { dataPath, readJsonStore, writeJsonStore } from "../storage/json-store";

const FILE = () => dataPath("saas-audit-logs.json");
const MAX = 500;

export async function appendAuditLog(input: AuditInput): Promise<AuditLogRecord> {
  const logs = await readJsonStore<AuditLogRecord[]>(FILE(), []);
  const record: AuditLogRecord = {
    ...input,
    id: `audit_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    timestamp: new Date().toISOString()
  };
  logs.unshift(record);
  if (logs.length > MAX) logs.length = MAX;
  await writeJsonStore(FILE(), logs);
  return record;
}

export async function listAuditLogs(limit = 50): Promise<AuditLogRecord[]> {
  const logs = await readJsonStore<AuditLogRecord[]>(FILE(), []);
  return logs.slice(0, limit);
}
