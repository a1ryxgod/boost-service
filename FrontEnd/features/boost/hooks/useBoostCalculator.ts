'use client';

import { useState, useMemo, useCallback } from 'react';
import { GameRankConfig } from '../types';
import { calculateRankBoostPrice } from '../utils/calculatePrice';

export function useBoostCalculator(config: GameRankConfig) {
  const [currentRankIndex, setCurrentRankIndex] = useState(0);
  const [desiredRankIndex, setDesiredRankIndex] = useState(1);
  const [isDuo, setIsDuo] = useState(false);

  const price = useMemo(
    () => calculateRankBoostPrice(config, currentRankIndex, desiredRankIndex, isDuo),
    [config, currentRankIndex, desiredRankIndex, isDuo],
  );

  const currentRank = config.ranks[currentRankIndex];
  const desiredRank = config.ranks[desiredRankIndex];

  const options = useMemo(() => {
    const opts = [
      { label: 'Current Rank', value: currentRank?.name ?? '' },
      { label: 'Desired Rank', value: desiredRank?.name ?? '' },
    ];
    if (isDuo) {
      opts.push({ label: 'Duo Queue', value: 'Yes (+40%)' });
    }
    return opts;
  }, [currentRank, desiredRank, isDuo]);

  const handleCurrentRankChange = useCallback(
    (index: number) => {
      setCurrentRankIndex(index);
      if (index >= desiredRankIndex) {
        setDesiredRankIndex(Math.min(index + 1, config.ranks.length - 1));
      }
    },
    [desiredRankIndex, config.ranks.length],
  );

  const handleDesiredRankChange = useCallback(
    (index: number) => {
      if (index > currentRankIndex) {
        setDesiredRankIndex(index);
      }
    },
    [currentRankIndex],
  );

  return {
    currentRankIndex,
    desiredRankIndex,
    isDuo,
    price,
    options,
    serviceName: `${config.gameName} Rank Boost`,
    setCurrentRank: handleCurrentRankChange,
    setDesiredRank: handleDesiredRankChange,
    setIsDuo,
    config,
  };
}
