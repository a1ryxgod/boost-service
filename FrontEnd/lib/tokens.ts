'use client';

import { TOKEN_KEYS } from './constants';

export const TokenStorage = {
  getAccess(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEYS.ACCESS);
  },
  getRefresh(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEYS.REFRESH);
  },
  setTokens(access: string, refresh: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(TOKEN_KEYS.ACCESS, access);
    localStorage.setItem(TOKEN_KEYS.REFRESH, refresh);
  },
  clear(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_KEYS.ACCESS);
    localStorage.removeItem(TOKEN_KEYS.REFRESH);
    localStorage.removeItem(TOKEN_KEYS.SESSION);
  },
};
