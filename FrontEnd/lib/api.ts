import { API_BASE_URL, TOKEN_KEYS } from './constants';
import type {
  User,
  AuthResponse,
  RefreshResponse,
  UpdateProfileRequest,
  ChangePasswordRequest,
  UserStats,
  Session,
  Order,
  CreateOrderRequest,
  OrderListResponse,
  OrderStats,
  OrderQuery,
  Transaction,
  Review,
  CreateReviewRequest,
  AdminStats,
  ApiError,
} from '../types';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  auth?: boolean;
}

// Single refresh call shared across concurrent requests
let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

function getStoredToken(key: string): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(key);
}

async function doRefresh(): Promise<string | null> {
  const refreshToken = getStoredToken(TOKEN_KEYS.REFRESH);
  if (!refreshToken) return null;

  try {
    const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
      localStorage.removeItem(TOKEN_KEYS.ACCESS);
      localStorage.removeItem(TOKEN_KEYS.REFRESH);
      return null;
    }

    const data: RefreshResponse = await res.json();
    localStorage.setItem(TOKEN_KEYS.ACCESS, data.accessToken);
    localStorage.setItem(TOKEN_KEYS.REFRESH, data.refreshToken);
    return data.accessToken;
  } catch {
    return null;
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = 'GET', body, auth = true } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (auth) {
    const token = getStoredToken(TOKEN_KEYS.ACCESS);
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  const init: RequestInit = { method, headers };
  if (body !== undefined) init.body = JSON.stringify(body);

  let response = await fetch(`${API_BASE_URL}${path}`, init);

  // Try to refresh if 401
  if (response.status === 401 && auth) {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = doRefresh().finally(() => {
        isRefreshing = false;
        refreshPromise = null;
      });
    }

    const newToken = await refreshPromise;

    if (newToken) {
      headers['Authorization'] = `Bearer ${newToken}`;
      response = await fetch(`${API_BASE_URL}${path}`, { ...init, headers });
    } else {
      if (typeof window !== 'undefined') {
        // Clear auth cookies so middleware doesn't redirect back to protected routes
        document.cookie = 'boost_access_token=; path=/; max-age=0';
        document.cookie = 'boost_user_role=; path=/; max-age=0';
        window.location.href = '/login';
      }
      throw new Error('Session expired. Please log in again.');
    }
  }

  if (!response.ok) {
    let err: Partial<ApiError> = {};
    try {
      err = await response.json();
    } catch {
      throw new Error(`HTTP ${response.status}`);
    }
    const msg = Array.isArray(err.message)
      ? err.message.join(', ')
      : err.message ?? 'An error occurred';
    throw new Error(msg);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const authApi = {
  login: (email: string, password: string) =>
    apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: { email, password },
      auth: false,
    }),

  register: (email: string, password: string) =>
    apiRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      body: { email, password },
      auth: false,
    }),

  logout: (sessionId: string) =>
    apiRequest<void>('/auth/logout', {
      method: 'POST',
      body: { sessionId },
    }),
};

// ─── Profile ──────────────────────────────────────────────────────────────────

export const profileApi = {
  get: () => apiRequest<User>('/profile'),

  update: (data: UpdateProfileRequest) =>
    apiRequest<User>('/profile', { method: 'PATCH', body: data }),

  changePassword: (data: ChangePasswordRequest) =>
    apiRequest<void>('/profile/change-password', { method: 'PATCH', body: data }),

  getSessions: () => apiRequest<Session[]>('/profile/sessions'),

  revokeSession: (id: string) =>
    apiRequest<void>(`/profile/sessions/${id}`, { method: 'DELETE' }),

  getStats: () => apiRequest<UserStats>('/profile/statistics'),
};

// ─── Orders ───────────────────────────────────────────────────────────────────

export const ordersApi = {
  create: (data: CreateOrderRequest) =>
    apiRequest<Order>('/orders', { method: 'POST', body: data }),

  list: (query?: OrderQuery) => {
    const params = new URLSearchParams();
    if (query?.page) params.set('page', String(query.page));
    if (query?.limit) params.set('limit', String(query.limit));
    if (query?.status) params.set('status', query.status);
    if (query?.gameCode) params.set('gameCode', query.gameCode);
    const qs = params.toString();
    return apiRequest<OrderListResponse>(`/orders${qs ? `?${qs}` : ''}`);
  },

  getById: (id: string) => apiRequest<Order>(`/orders/${id}`),

  cancel: (id: string) =>
    apiRequest<Order>(`/orders/${id}/status`, {
      method: 'PATCH',
      body: { status: 'CANCELLED' },
    }),

  getStats: () => apiRequest<OrderStats>('/orders/stats'),
  getAvailable: () => apiRequest<Order[]>('/orders/booster/available'),
  assignToSelf: (id: string) =>
    apiRequest<Order>(`/orders/${id}/assign`, { method: 'PATCH' }),
};

// ─── Admin ────────────────────────────────────────────────────────────────────

export const adminApi = {
  getStats: () => apiRequest<AdminStats>('/admin/statistics'),

  getUsers: (role?: string, status?: string) => {
    const params = new URLSearchParams();
    if (role) params.set('role', role);
    if (status) params.set('status', status);
    const qs = params.toString();
    return apiRequest<User[]>(`/admin/users${qs ? `?${qs}` : ''}`);
  },

  getUserById: (id: string) => apiRequest<User>(`/admin/users/${id}`),

  updateUserStatus: (id: string, status: string) =>
    apiRequest<User>(`/admin/users/${id}/status`, {
      method: 'PATCH',
      body: { status },
    }),

  updateUserRole: (id: string, role: string) =>
    apiRequest<User>(`/admin/users/${id}/role`, {
      method: 'PATCH',
      body: { role },
    }),

  getOrders: (status?: string) => {
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    const qs = params.toString();
    return apiRequest<Order[]>(`/admin/orders${qs ? `?${qs}` : ''}`);
  },

  updateOrderStatus: (id: string, status: string) =>
    apiRequest<Order>(`/admin/orders/${id}/status?status=${status}`, {
      method: 'PATCH',
    }),

  assignOrder: (orderId: string, boosterId: string) =>
    apiRequest<Order>(`/admin/orders/${orderId}/assign`, {
      method: 'POST',
      body: { boosterId },
    }),

  getTransactions: () => apiRequest<Transaction[]>('/admin/transactions'),
};

// ─── Reviews ──────────────────────────────────────────────────────────────────

export const reviewsApi = {
  create: (data: CreateReviewRequest) =>
    apiRequest<Review>('/reviews', { method: 'POST', body: data }),

  getByBooster: (boosterId: string) =>
    apiRequest<Review[]>(`/reviews/booster/${boosterId}`),

  list: () => apiRequest<Review[]>('/reviews'),
};
