import { GameRankConfig, FaceitConfig } from '../types';

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
): number {
  if (desiredElo <= currentElo) return 0;

  const eloDiff = desiredElo - currentElo;
  let basePrice = eloDiff * config.pricePerEloPoint;

  const avgElo = (currentElo + desiredElo) / 2;
  const tierMultiplier = 1 + (avgElo / config.maxElo) * 1.2;

  basePrice *= tierMultiplier;

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
