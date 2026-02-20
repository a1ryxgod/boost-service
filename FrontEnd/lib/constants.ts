export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4001/api/v1';

export const TOKEN_KEYS = {
  ACCESS: 'boost_access_token',
  REFRESH: 'boost_refresh_token',
  SESSION: 'boost_session_id',
} as const;

export const ORDER_STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pending',
  PAID: 'Paid',
  ASSIGNED: 'Assigned',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

export const ORDER_STATUS_COLORS: Record<string, string> = {
  PENDING: '#f59e0b',
  PAID: '#3b82f6',
  ASSIGNED: '#8b5cf6',
  IN_PROGRESS: '#6366f1',
  COMPLETED: '#10b981',
  CANCELLED: '#ef4444',
};

export const GAME_LABELS: Record<string, string> = {
  CS2: 'Counter-Strike 2',
  DOTA2: 'Dota 2',
  LOL: 'League of Legends',
  VALORANT: 'Valorant',
};

export const SERVICE_TYPE_LABELS: Record<string, string> = {
  RANK_BOOST: 'Rank Boost',
  PLACEMENT: 'Placement Games',
  WIN_GAMES: 'Win Boost',
  COACHING: 'Coaching',
  DUO_BOOST: 'Duo Boost',
};
