import { MmrConfig } from '../types';

export const DOTA2_MMR: MmrConfig = {
  gameCode: 'DOTA2',
  gameName: 'Dota 2',
  minMmr: 0,
  maxMmr: 12000,
  mmrStep: 50,
  pricePerMmrPoint: 0.04,
  currency: 'USD',
  ranks: [
    { name: 'Herald',   mmrMin: 0,    mmrMax: 769  },
    { name: 'Guardian', mmrMin: 770,  mmrMax: 1539 },
    { name: 'Crusader', mmrMin: 1540, mmrMax: 2309 },
    { name: 'Archon',   mmrMin: 2310, mmrMax: 3079 },
    { name: 'Legend',   mmrMin: 3080, mmrMax: 3849 },
    { name: 'Ancient',  mmrMin: 3850, mmrMax: 4619 },
    { name: 'Divine',   mmrMin: 4620, mmrMax: 5420 },
    { name: 'Immortal', mmrMin: 5421, mmrMax: 12000 },
  ],
};
