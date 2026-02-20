// ─── Enums ────────────────────────────────────────────────────────────────────

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  BOOSTER = 'BOOSTER',
  ADMIN = 'ADMIN',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  BANNED = 'BANNED',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  REFUNDED = 'REFUNDED',
  FAILED = 'FAILED',
}

export enum GameCode {
  CS2 = 'CS2',
  DOTA2 = 'DOTA2',
  LOL = 'LOL',
  VALORANT = 'VALORANT',
}

export enum ServiceType {
  RANK_BOOST = 'RANK_BOOST',
  PLACEMENT = 'PLACEMENT',
  WIN_GAMES = 'WIN_GAMES',
  COACHING = 'COACHING',
  DUO_BOOST = 'DUO_BOOST',
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  sessionId: string;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

// ─── User ─────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
  phone: string | null;
  country: string | null;
  boosterRating: number | null;
  completedOrdersCount: number;
  totalEarnings: number;
  emailNotifications: boolean;
  pushNotifications: boolean;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  country?: string;
  emailNotifications?: boolean;
  pushNotifications?: boolean;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UserStats {
  totalOrders: number;
  completedOrders: number;
  totalSpent: number;
  memberSince: string;
  boosterRating: number | null;
  completedOrdersCount: number;
  totalEarnings: number;
}

// ─── Session ──────────────────────────────────────────────────────────────────

export interface Session {
  id: string;
  userId: string;
  userAgent: string;
  ipAddress: string;
  isActive: boolean;
  createdAt: string;
  expiresAt: string;
}

// ─── Order ────────────────────────────────────────────────────────────────────

export interface Order {
  id: string;
  userId: string;
  boosterId: string | null;
  gameCode: GameCode;
  serviceType: ServiceType;
  currentRank: string;
  targetRank: string;
  currentMmr: number | null;
  targetMmr: number | null;
  numberOfGames: number | null;
  isDuo: boolean;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  price: number;
  commission: number;
  notes: string | null;
  credentials: Record<string, string> | null;
  createdAt: string;
  updatedAt: string;
  user?: Pick<User, 'id' | 'email' | 'firstName' | 'lastName'>;
  booster?: Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'boosterRating'> | null;
}

export interface CreateOrderRequest {
  gameCode: GameCode;
  serviceType: ServiceType;
  currentRank: string;
  targetRank: string;
  currentMmr?: number;
  targetMmr?: number;
  numberOfGames?: number;
  isDuo?: boolean;
  price: number;
  notes?: string;
}

export interface OrderListResponse {
  orders: Order[];
  total: number;
  page: number;
  limit: number;
}

export interface OrderStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  cancelled: number;
  totalRevenue: number;
}

// ─── Game ─────────────────────────────────────────────────────────────────────

export interface Game {
  id: string;
  code: GameCode;
  name: string;
  slug: string;
  description: string | null;
  iconUrl: string | null;
  bannerUrl: string | null;
  isActive: boolean;
  displayOrder: number;
}

// ─── Service ──────────────────────────────────────────────────────────────────

export interface GameService {
  id: string;
  gameId: string;
  serviceType: ServiceType;
  name: string;
  description: string | null;
  basePrice: number;
  pricePerUnit: number | null;
  estimatedHours: number | null;
  isActive: boolean;
  features: string[];
}

// ─── Transaction ──────────────────────────────────────────────────────────────

export interface Transaction {
  id: string;
  userId: string;
  orderId: string | null;
  transactionType: string;
  paymentMethod: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  externalId: string | null;
  createdAt: string;
}

// ─── Review ───────────────────────────────────────────────────────────────────

export interface Review {
  id: string;
  orderId: string;
  customerId: string;
  boosterId: string;
  rating: number;
  comment: string | null;
  isVisible: boolean;
  createdAt: string;
  customer?: Pick<User, 'id' | 'email' | 'firstName'>;
  booster?: Pick<User, 'id' | 'email' | 'firstName'>;
}

export interface CreateReviewRequest {
  orderId: string;
  boosterId: string;
  rating: number;
  comment?: string;
}

// ─── Admin ────────────────────────────────────────────────────────────────────

export interface AdminStats {
  users: {
    total: number;
    customers: number;
    boosters: number;
  };
  orders: {
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
  };
  revenue: {
    total: number;
  };
  transactions: {
    total: number;
  };
  reviews: {
    total: number;
    averageRating: number;
  };
}

// ─── API Helpers ──────────────────────────────────────────────────────────────

export interface ApiError {
  statusCode: number;
  message: string | string[];
  error: string;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface OrderQuery extends PaginationQuery {
  status?: OrderStatus;
  gameCode?: GameCode;
  serviceType?: ServiceType;
}
