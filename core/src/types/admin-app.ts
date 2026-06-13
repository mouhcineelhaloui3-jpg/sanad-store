export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ApiHandler = (ctx: ApiContext) => Promise<ApiResponse> | ApiResponse;

export type ApiContext = {
  params: Record<string, string>;
  query: Record<string, string>;
  body: unknown;
  userId?: string;
  userRole?: string;
};

export type ApiResponse = {
  status: number;
  body: unknown;
};

export type AdminNavItem = {
  label: string;
  href: string;
  section: "core" | "commerce" | "system" | "extensions";
  permission?: string;
};

export type CronJob = {
  name: string;
  schedule: string;
  run: () => void | Promise<void>;
};

export interface AdminApp {
  registerRoute(method: HttpMethod, path: string, handler: ApiHandler): void;
  registerNav(item: AdminNavItem): void;
  registerCron(job: CronJob): void;
  registerPermission(permission: string): void;
}
