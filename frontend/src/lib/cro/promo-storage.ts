const STORAGE_KEY = "sanad-promo-state-v1";
const TTL_MS = 24 * 60 * 60 * 1000;
/** Minimum time on site before exit-intent can fire */
export const PROMO_ARM_DELAY_MS = 45_000;
/** Optional banner appears after this delay (once per session if not dismissed) */
export const PROMO_BANNER_DELAY_MS = 50_000;

type PromoState = {
  dismissedAt?: number;
  interactedAt?: number;
  shownAt?: number;
};

function readState(): PromoState {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as PromoState;
  } catch {
    return {};
  }
}

function writeState(state: PromoState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function isRecent(timestamp?: number) {
  if (!timestamp) return false;
  return Date.now() - timestamp < TTL_MS;
}

/** User closed popup/banner or completed CTA — hide promos for 24h */
export function isPromoBlocked(): boolean {
  const state = readState();
  return isRecent(state.dismissedAt) || isRecent(state.interactedAt);
}

export function markPromoDismissed() {
  const state = readState();
  writeState({ ...state, dismissedAt: Date.now() });
}

export function markPromoInteracted() {
  const state = readState();
  writeState({ ...state, interactedAt: Date.now(), dismissedAt: Date.now() });
}

export function markPromoShown() {
  const state = readState();
  if (isRecent(state.shownAt)) return;
  writeState({ ...state, shownAt: Date.now() });
}

/** Exit modal: once per 24h after shown */
export function canShowExitModal(): boolean {
  if (isPromoBlocked()) return false;
  const state = readState();
  return !isRecent(state.shownAt);
}

const SESSION_BANNER_KEY = "sanad-promo-banner-session";

export function canShowSessionBanner(): boolean {
  if (isPromoBlocked()) return false;
  if (typeof window === "undefined") return false;
  return !window.sessionStorage.getItem(SESSION_BANNER_KEY);
}

export function markSessionBannerShown() {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(SESSION_BANNER_KEY, "1");
}

export function markSessionBannerDismissed() {
  markSessionBannerShown();
  markPromoDismissed();
}
