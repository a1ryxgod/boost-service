'use client';

import { useState, useMemo, useCallback } from 'react';
import { WinsConfig } from '../types';
import { calculateWinsBoostPrice } from '../utils/calculatePrice';

export function useWinsCalculator(config: WinsConfig) {
  const [wins, setWinsState] = useState(5);
  const [isDuo, setIsDuo] = useState(false);

  const price = useMemo(
    () => calculateWinsBoostPrice(config, wins, isDuo),
    [config, wins, isDuo],
  );

  const options = useMemo(() => {
    const opts = [{ label: 'Number of Wins', value: String(wins) }];
    if (isDuo) {
      opts.push({ label: 'Duo Queue', value: 'Yes (+40%)' });
    }
    return opts;
  }, [wins, isDuo]);

  const handleWinsChange = useCallback(
    (value: number) => {
      const clamped = Math.max(config.minWins, Math.min(config.maxWins, value));
      setWinsState(clamped);
    },
    [config.minWins, config.maxWins],
  );

  return {
    wins,
    isDuo,
    price,
    options,
    serviceName: `${config.gameName} Win Boost`,
    setWins: handleWinsChange,
    setIsDuo,
  };
}
