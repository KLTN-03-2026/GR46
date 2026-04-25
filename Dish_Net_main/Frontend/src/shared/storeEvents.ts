'use client';

export const STORE_OVERVIEW_REFRESH_EVENT = 'store-overview-should-refresh';

export function emitStoreOverviewRefreshEvent() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(STORE_OVERVIEW_REFRESH_EVENT));
}
