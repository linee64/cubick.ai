import va from "@vercel/analytics";

export function trackEvent(
  name: string,
  props?: Record<string, unknown>
) {
  try {
    va.track(name, props);
  } catch {
    // Безопасно игнорируем ошибки трекинга в дев-режиме
  }
}