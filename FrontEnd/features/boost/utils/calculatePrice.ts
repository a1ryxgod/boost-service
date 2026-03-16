import { GameRankConfig, FaceitConfig, MmrConfig, WinsConfig, PlacementsConfig } from '../types';

const DUO_MULTIPLIER = 1.4;

export function calculateRankBoostPrice(
  config: GameRankConfig,
  currentRankIndex: number,
  desiredRankIndex: number,
  isDuo: boolean = false,
): number {
  if (desiredRankIndex <= currentRankIndex) return 0;

  const steps = desiredRankIndex - currentRankIndex;
  let basePrice = steps * config.pricePerStep;

  const avgRankIndex = (currentRankIndex + desiredRankIndex) / 2;
  const totalRanks = config.ranks.length;
  const tierMultiplier = 1 + (avgRankIndex / totalRanks) * 0.8;

  basePrice *= tierMultiplier;

  if (isDuo) {
    basePrice *= DUO_MULTIPLIER;
  }

  return Math.round(basePrice * 100) / 100;
}

export function calculateFaceitBoostPrice(
  config: FaceitConfig,
  currentElo: number,
  desiredElo: number,
  isDuo: boolean = false,
): number {
  if (desiredElo <= currentElo) return 0;

  const eloDiff = desiredElo - currentElo;
  let basePrice = eloDiff * config.pricePerEloPoint;

  const avgElo = (currentElo + desiredElo) / 2;
  const tierMultiplier = 1 + (avgElo / config.maxElo) * 1.2;

  basePrice *= tierMultiplier;

  if (isDuo) {
    basePrice *= DUO_MULTIPLIER;
  }

  return Math.round(basePrice * 100) / 100;
}

export function getEloLevel(config: FaceitConfig, elo: number): number {
  for (const level of config.levels) {
    if (elo >= level.eloMin && elo <= level.eloMax) {
      return level.level;
    }
  }
  return 1;
}

const DUO_MMR_MULTIPLIER = 1.4;

export function calculateMmrBoostPrice(
  config: MmrConfig,
  currentMmr: number,
  desiredMmr: number,
  isDuo: boolean = false,
): number {
  if (desiredMmr <= currentMmr) return 0;

  const mmrDiff = desiredMmr - currentMmr;
  let basePrice = mmrDiff * config.pricePerMmrPoint;

  const avgMmr = (currentMmr + desiredMmr) / 2;
  const tierMultiplier = 1 + (avgMmr / config.maxMmr) * 1.2;
  basePrice *= tierMultiplier;

  if (isDuo) {
    basePrice *= DUO_MMR_MULTIPLIER;
  }

  return Math.round(basePrice * 100) / 100;
}

export function getMmrRank(config: MmrConfig, mmr: number): string {
  for (const rank of config.ranks) {
    if (mmr >= rank.mmrMin && mmr <= rank.mmrMax) {
      return rank.name;
    }
  }
  return config.ranks[config.ranks.length - 1].name;
}

const DUO_WINS_MULTIPLIER = 1.4;

export function calculateWinsBoostPrice(
  config: WinsConfig,
  wins: number,
  isDuo: boolean = false,
): number {
  if (wins <= 0) return 0;
  let basePrice = wins * config.pricePerWin;
  if (isDuo) {
    basePrice *= DUO_WINS_MULTIPLIER;
  }
  return Math.round(basePrice * 100) / 100;
}

export function calculatePlacementsPrice(
  config: PlacementsConfig,
  games: number,
  isDuo: boolean = false,
): number {
  if (games <= 0) return 0;
  const base = games * config.pricePerGame;
  return Math.round(base * (isDuo ? DUO_MULTIPLIER : 1) * 100) / 100;
}

export function calculateValorantPlacementsPrice(
  config: GameRankConfig,
  rankIndex: number,
  isDuo: boolean = false,
): number {
  const totalRanks = config.ranks.length;
  const tierMultiplier = 1 + (rankIndex / totalRanks) * 0.8;
  const basePrice = 29.99;
  return Math.round(basePrice * tierMultiplier * (isDuo ? DUO_MULTIPLIER : 1) * 100) / 100;
}

export function calculateDota2CalibrationPrice(
  basePrice: number,
  preMmr: number,
  maxMmr: number,
  isDuo: boolean = false,
): number {
  const tierMultiplier = 1 + (preMmr / maxMmr) * 0.8;
  return Math.round(basePrice * tierMultiplier * (isDuo ? DUO_MULTIPLIER : 1) * 100) / 100;
}
