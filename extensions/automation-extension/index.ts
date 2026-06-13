import type { Extension } from "@sanad/core";
import { appendAuditLog } from "@sanad/core";
import { expireSubscriptions, listAutomationJobs, listAutomationLogs, runAutomationJob, toggleAutomationJob } from "./store";

export const automationExtension: Extension = {
  name: "automation-extension",
  version: "1.0.0",
  enabled: true,
  description: "Cron jobs for IPTV lifecycle and campaigns",
  register(app) {
    app.registerPermission("automation:read");
    app.registerPermission("automation:write");
    app.registerNav({
      label: "Automation",
      href: "/admin/automation",
      section: "extensions",
      permission: "automation:read"
    });

    app.registerCron({
      name: "expire-subscriptions",
      schedule: "0 0 * * *",
      run: () => {
        expireSubscriptions();
      }
    });

    app.registerRoute("GET", "/api/admin/automation", async () => ({
      status: 200,
      body: { ok: true, data: { jobs: await listAutomationJobs(), logs: await listAutomationLogs() } }
    }));

    app.registerRoute("PUT", "/api/admin/automation/:id", async ({ params, body, userId }) => {
      const { enabled } = body as { enabled: boolean };
      const job = await toggleAutomationJob(params.id ?? "", enabled);
      if (!job) return { status: 404, body: { ok: false, error: "Job not found" } };
      await appendAuditLog({
        userId: userId ?? "system",
        action: "AUTOMATION_TOGGLE",
        module: "automation-extension",
        metadata: { jobId: job.id, enabled: String(enabled) }
      });
      return { status: 200, body: { ok: true, data: job } };
    });

    app.registerRoute("POST", "/api/admin/automation/:id/run", async ({ params, userId }) => {
      const log = await runAutomationJob(params.id ?? "");
      await appendAuditLog({
        userId: userId ?? "system",
        action: "AUTOMATION_RUN",
        module: "automation-extension",
        metadata: { jobId: params.id }
      });
      return { status: 200, body: { ok: true, data: log } };
    });
  }
};

export * from "./types";
export * from "./store";
