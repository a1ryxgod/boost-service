'use client';

import { useState, useMemo, useCallback } from 'react';
import { PlacementsConfig } from '../types';
import { calculatePlacementsPrice } from '../utils/calculatePrice';

export function usePlacementsCalculator(config: PlacementsConfig) {
  const [games, setGamesState] = useState(5);
  const [isDuo, setIsDuo] = useState(false);

  const price = useMemo(
    () => calculatePlacementsPrice(config, games, isDuo),
    [config, games, isDuo],
  );

  const options = useMemo(() => {
    const opts = [{ label: 'Number of Games', value: String(games) }];
    if (isDuo) opts.push({ label: 'Duo Queue', value: 'Yes (+40%)' });
    return opts;
  }, [games, isDuo]);

  const handleGamesChange = useCallback(
    (value: number) => {
      setGamesState(Math.max(config.minGames, Math.min(config.maxGames, value)));
    },
    [config.minGames, config.maxGames],
  );

  return {
    games,
    isDuo,
    price,
    options,
    serviceName: `${config.gameName} Placement Matches`,
    setGames: handleGamesChange,
    setIsDuo,
  };
}
