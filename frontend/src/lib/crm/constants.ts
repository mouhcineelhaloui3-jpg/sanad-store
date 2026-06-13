export const LEAD_PIPELINE = [
  "new",
  "contacted",
  "interested",
  "negotiation",
  "paid",
  "delivered",
  "renewal_due",
  "expired",
  "lost"
] as const;

export type LeadPipelineStatus = (typeof LEAD_PIPELINE)[number];
