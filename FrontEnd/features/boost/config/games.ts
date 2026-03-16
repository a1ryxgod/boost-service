import { CS2_RANKS, CS2_FACEIT, CS2_WINS, CS2_PLACEMENTS } from './cs2';
import { DOTA2_MMR, DOTA2_PLACEMENTS } from './dota2';
import { VALORANT_RANKS, VALORANT_WINS, VALORANT_PLACEMENTS } from './valorant';
import { LOL_RANKS, LOL_WINS, LOL_PLACEMENTS } from './lol';
import { GameRankConfig, FaceitConfig, MmrConfig, WinsConfig, PlacementsConfig } from '../types';

export const GAME_RANK_CONFIGS: Record<string, GameRankConfig> = {
  cs2: CS2_RANKS,
  valorant: VALORANT_RANKS,
  lol: LOL_RANKS,
};

export const GAME_MMR_CONFIGS: Record<string, MmrConfig> = {
  dota2: DOTA2_MMR,
};

export const GAME_WINS_CONFIGS: Record<string, WinsConfig> = {
  cs2: CS2_WINS,
  valorant: VALORANT_WINS,
  lol: LOL_WINS,
};

export const GAME_PLACEMENTS_CONFIGS: Record<string, PlacementsConfig> = {
  cs2: CS2_PLACEMENTS,
  valorant: VALORANT_PLACEMENTS,
  lol: LOL_PLACEMENTS,
  dota2: DOTA2_PLACEMENTS,
};

export const FACEIT_CONFIG: FaceitConfig = CS2_FACEIT;

export function getGameConfig(gameSlug: string): GameRankConfig | undefined {
  return GAME_RANK_CONFIGS[gameSlug];
}

export function getMmrConfig(gameSlug: string): MmrConfig | undefined {
  return GAME_MMR_CONFIGS[gameSlug];
}

export function getWinsConfig(gameSlug: string): WinsConfig | undefined {
  return GAME_WINS_CONFIGS[gameSlug];
}

export function getPlacementsConfig(gameSlug: string): PlacementsConfig | undefined {
  return GAME_PLACEMENTS_CONFIGS[gameSlug];
}
