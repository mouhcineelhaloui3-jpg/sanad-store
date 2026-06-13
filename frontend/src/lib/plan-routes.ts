const PLAN_LANDING_PATHS: Record<string, string> = {
  "plan-3-months": "/iptv-3-months",
  "plan-6-months": "/iptv-6-months",
  "plan-12-months": "/iptv-12-months",
  "plan-2-screens": "/iptv-2-screens"
};

export function planLandingPath(slug: string): string {
  return PLAN_LANDING_PATHS[slug] ?? "/pricing";
}

export type PlanSlug =
  | "plan-3-months"
  | "plan-6-months"
  | "plan-12-months"
  | "plan-2-screens";
