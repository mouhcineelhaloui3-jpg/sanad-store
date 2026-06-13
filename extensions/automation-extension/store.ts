import { dataPath, readJsonStore, writeJsonStore } from "@sanad/core";
import type { AutomationJob, AutomationRunLog } from "./types";

const JOBS_FILE = () => dataPath("automation-jobs.json");
const LOGS_FILE = () => dataPath("automation-logs.json");

const DEFAULT_JOBS: AutomationJob[] = [
  {
    id: "job_expire_subs",
    name: "Auto-expire IPTV subscriptions",
    schedule: "0 0 * * *",
    description: "Marks expired subscriptions inactive daily at midnight",
    enabled: true,
    lastRunAt: null,
    nextRunAt: null
  },
  {
    id: "job_campaign_digest",
    name: "Scheduled campaign digest",
    schedule: "0 9 * * 1",
    description: "Weekly WhatsApp campaign performance summary",
    enabled: false,
    lastRunAt: null,
    nextRunAt: null
  },
  {
    id: "job_renewal_reminder",
    name: "Auto-renewal reminders",
    schedule: "0 10 * * *",
    description: "Notify customers 3 days before subscription expiry",
    enabled: false,
    lastRunAt: null,
    nextRunAt: null
  }
];

export async function listAutomationJobs(): Promise<AutomationJob[]> {
  return readJsonStore<AutomationJob[]>(JOBS_FILE(), DEFAULT_JOBS);
}

export async function toggleAutomationJob(id: string, enabled: boolean): Promise<AutomationJob | null> {
  const jobs = await listAutomationJobs();
  const idx = jobs.findIndex((j) => j.id === id);
  if (idx < 0) return null;
  jobs[idx] = { ...jobs[idx]!, enabled };
  await writeJsonStore(JOBS_FILE(), jobs);
  return jobs[idx]!;
}

export async function runAutomationJob(id: string): Promise<AutomationRunLog> {
  const jobs = await listAutomationJobs();
  const idx = jobs.findIndex((j) => j.id === id);
  const now = new Date().toISOString();
  const log: AutomationRunLog = {
    id: `run_${Date.now()}`,
    jobId: id,
    status: "success",
    message:
      id === "job_expire_subs"
        ? "Expired subscriptions scan completed (0 expired in demo mode)"
        : "Job executed successfully",
    timestamp: now
  };
  if (idx >= 0) {
    jobs[idx] = { ...jobs[idx]!, lastRunAt: now };
    await writeJsonStore(JOBS_FILE(), jobs);
  }
  const logs = await readJsonStore<AutomationRunLog[]>(LOGS_FILE(), []);
  logs.unshift(log);
  if (logs.length > 100) logs.length = 100;
  await writeJsonStore(LOGS_FILE(), logs);
  return log;
}

export async function listAutomationLogs(limit = 20): Promise<AutomationRunLog[]> {
  const logs = await readJsonStore<AutomationRunLog[]>(LOGS_FILE(), []);
  return logs.slice(0, limit);
}

export function expireSubscriptions() {
  // Hook for cron runner / NestJS scheduler
  return { expired: 0 };
}
