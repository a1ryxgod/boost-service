import { GameRankConfig, FaceitConfig } from '../types';

export const CS2_RANKS: GameRankConfig = {
  gameCode: 'CS2',
  gameName: 'Counter-Strike 2',
  rankLabel: 'Rank',
  currency: 'USD',
  pricePerStep: 5.99,
  ranks: [
    { id: 'cs2_silver1',  name: 'Silver I',                    tier: 'Silver',          division: 1, order: 0 },
    { id: 'cs2_silver2',  name: 'Silver II',                   tier: 'Silver',          division: 2, order: 1 },
    { id: 'cs2_silver3',  name: 'Silver III',                  tier: 'Silver',          division: 3, order: 2 },
    { id: 'cs2_silver4',  name: 'Silver IV',                   tier: 'Silver',          division: 4, order: 3 },
    { id: 'cs2_sem',      name: 'Silver Elite Master',         tier: 'Silver',          division: 5, order: 4 },
    { id: 'cs2_gn1',      name: 'Gold Nova I',                 tier: 'Gold Nova',       division: 1, order: 5 },
    { id: 'cs2_gn2',      name: 'Gold Nova II',                tier: 'Gold Nova',       division: 2, order: 6 },
    { id: 'cs2_gn3',      name: 'Gold Nova III',               tier: 'Gold Nova',       division: 3, order: 7 },
    { id: 'cs2_gnm',      name: 'Gold Nova Master',            tier: 'Gold Nova',       division: 4, order: 8 },
    { id: 'cs2_mg1',      name: 'Master Guardian I',           tier: 'Master Guardian', division: 1, order: 9 },
    { id: 'cs2_mg2',      name: 'Master Guardian II',          tier: 'Master Guardian', division: 2, order: 10 },
    { id: 'cs2_mge',      name: 'Master Guardian Elite',       tier: 'Master Guardian',              order: 11 },
    { id: 'cs2_dmg',      name: 'Distinguished Master Guardian', tier: 'DMG',                        order: 12 },
    { id: 'cs2_le',       name: 'Legendary Eagle',             tier: 'Eagle',                        order: 13 },
    { id: 'cs2_lem',      name: 'Legendary Eagle Master',      tier: 'Eagle',                        order: 14 },
    { id: 'cs2_smfc',     name: 'Supreme Master First Class',  tier: 'Supreme',                      order: 15 },
    { id: 'cs2_ge',       name: 'Global Elite',                tier: 'Global Elite',                 order: 16 },
  ],
};

export const CS2_FACEIT: FaceitConfig = {
  currency: 'USD',
  minElo: 100,
  maxElo: 4000,
  eloStep: 25,
  pricePerEloPoint: 0.08,
  levels: [
    { level: 1,  eloMin: 100,  eloMax: 800  },
    { level: 2,  eloMin: 801,  eloMax: 950  },
    { level: 3,  eloMin: 951,  eloMax: 1100 },
    { level: 4,  eloMin: 1101, eloMax: 1250 },
    { level: 5,  eloMin: 1251, eloMax: 1400 },
    { level: 6,  eloMin: 1401, eloMax: 1550 },
    { level: 7,  eloMin: 1551, eloMax: 1700 },
    { level: 8,  eloMin: 1701, eloMax: 1850 },
    { level: 9,  eloMin: 1851, eloMax: 2000 },
    { level: 10, eloMin: 2001, eloMax: 4000 },
  ],
};
