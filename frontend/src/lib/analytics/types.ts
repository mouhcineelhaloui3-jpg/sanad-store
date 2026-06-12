import type { UtmPayload } from "./utm";

export type AnalyticsEventName =
  | "page_view"
  | "click"
  | "modal_open"
  | "initiate_checkout"
  | "lead"
  | "trial_submit"
  | "whatsapp_click";

export type AnalyticsEventRecord = {
  id: string;
  name: AnalyticsEventName;
  path: string;
  properties: Record<string, string | number | boolean | null>;
  ip: string | null;
  userAgent: string | null;
  utm: UtmPayload | null;
  sessionId: string | null;
  createdAt: string;
};

export type TrackingPayload = {
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  fbclid?: string | null;
  ttclid?: string | null;
  sessionId?: string | null;
};
