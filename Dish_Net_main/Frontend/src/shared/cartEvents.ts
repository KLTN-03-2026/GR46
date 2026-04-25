'use client';

export const USER_CART_REFRESH_EVENT = 'user-cart-should-refresh';

export function emitUserCartRefreshEvent() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(USER_CART_REFRESH_EVENT));
}
