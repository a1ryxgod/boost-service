import { CS2_RANKS, CS2_FACEIT } from './cs2';
import { DOTA2_MMR } from './dota2';
import { VALORANT_RANKS } from './valorant';
import { LOL_RANKS } from './lol';
import { GameRankConfig, FaceitConfig, MmrConfig } from '../types';

export const GAME_RANK_CONFIGS: Record<string, GameRankConfig> = {
  cs2: CS2_RANKS,
  valorant: VALORANT_RANKS,
  lol: LOL_RANKS,
};

export const GAME_MMR_CONFIGS: Record<string, MmrConfig> = {
  dota2: DOTA2_MMR,
};

export const FACEIT_CONFIG: FaceitConfig = CS2_FACEIT;

export function getGameConfig(gameSlug: string): GameRankConfig | undefined {
  return GAME_RANK_CONFIGS[gameSlug];
}

export function getMmrConfig(gameSlug: string): MmrConfig | undefined {
  return GAME_MMR_CONFIGS[gameSlug];
}
