'use client';

import { useState, useMemo, useCallback } from 'react';
import { GameRankConfig } from '../types';
import { calculateValorantPlacementsPrice } from '../utils/calculatePrice';

const VALORANT_PLACEMENTS_GAMES = 5;

export function useValorantPlacementsCalculator(config: GameRankConfig) {
  const [rankIndex, setRankIndexState] = useState(0);
  const [isDuo, setIsDuo] = useState(false);

  const currentRank = useMemo(() => config.ranks[rankIndex], [config.ranks, rankIndex]);

  const price = useMemo(
    () => calculateValorantPlacementsPrice(config, rankIndex, isDuo),
    [config, rankIndex, isDuo],
  );

  const options = useMemo(() => {
    const opts = [
      { label: 'Previous rank', value: currentRank?.name ?? '' },
      { label: 'Games', value: `${VALORANT_PLACEMENTS_GAMES} (fixed)` },
    ];
    if (isDuo) opts.push({ label: 'Duo Queue', value: 'Yes (+40%)' });
    return opts;
  }, [currentRank, isDuo]);

  const handleRankChange = useCallback(
    (index: number) => {
      setRankIndexState(Math.max(0, Math.min(config.ranks.length - 1, index)));
    },
    [config.ranks.length],
  );

  return {
    rankIndex,
    currentRank,
    isDuo,
    price,
    options,
    serviceName: 'Valorant Placements',
    setRankIndex: handleRankChange,
    setIsDuo,
  };
}
