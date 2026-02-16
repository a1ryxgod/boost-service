export interface RankTier {
  id: string;
  name: string;
  tier: string;
  division?: number;
  order: number;
}

export interface GameRankConfig {
  gameCode: string;
  gameName: string;
  rankLabel: string;
  ranks: RankTier[];
  pricePerStep: number;
  currency: string;
}

export interface FaceitConfig {
  minElo: number;
  maxElo: number;
  eloStep: number;
  pricePerEloPoint: number;
  currency: string;
  levels: { level: number; eloMin: number; eloMax: number }[];
}

export interface MmrConfig {
  gameCode: string;
  gameName: string;
  minMmr: number;
  maxMmr: number;
  mmrStep: number;
  pricePerMmrPoint: number;
  currency: string;
  ranks: { name: string; mmrMin: number; mmrMax: number }[];
}
