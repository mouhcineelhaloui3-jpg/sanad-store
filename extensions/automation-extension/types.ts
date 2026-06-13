export type AutomationJob = {
  id: string;
  name: string;
  schedule: string;
  description: string;
  enabled: boolean;
  lastRunAt: string | null;
  nextRunAt: string | null;
};

export type AutomationRunLog = {
  id: string;
  jobId: string;
  status: "success" | "failed";
  message: string;
  timestamp: string;
};
