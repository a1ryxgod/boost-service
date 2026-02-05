export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  BOOSTER = 'BOOSTER',
  ADMIN = 'ADMIN',
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
