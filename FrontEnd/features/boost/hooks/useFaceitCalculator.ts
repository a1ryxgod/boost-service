'use client';

import { useState, useMemo } from 'react';
import { FaceitConfig } from '../types';
import { calculateFaceitBoostPrice, getEloLevel } from '../utils/calculatePrice';

export function useFaceitCalculator(config: FaceitConfig) {
  const [currentElo, setCurrentElo] = useState(config.minElo);
  const [desiredElo, setDesiredElo] = useState(config.minElo + 200);
  const [isDuo, setIsDuo] = useState(false);

  const price = useMemo(
    () => calculateFaceitBoostPrice(config, currentElo, desiredElo, isDuo),
    [config, currentElo, desiredElo, isDuo],
  );

  const currentLevel = getEloLevel(config, currentElo);
  const desiredLevel = getEloLevel(config, desiredElo);

  const options = useMemo(() => {
    const opts = [
      { label: 'Current ELO', value: `${currentElo} (Level ${currentLevel})` },
      { label: 'Desired ELO', value: `${desiredElo} (Level ${desiredLevel})` },
      { label: 'ELO Difference', value: `+${Math.max(0, desiredElo - currentElo)}` },
    ];
    if (isDuo) opts.push({ label: 'Duo Queue', value: 'Yes (+40%)' });
    return opts;
  }, [currentElo, desiredElo, currentLevel, desiredLevel, isDuo]);

  const handleCurrentEloChange = (elo: number) => {
    const clamped = Math.max(config.minElo, Math.min(config.maxElo, elo));
    setCurrentElo(clamped);
    if (clamped >= desiredElo) {
      setDesiredElo(Math.min(clamped + config.eloStep, config.maxElo));
    }
  };

  const handleDesiredEloChange = (elo: number) => {
    const clamped = Math.max(currentElo + config.eloStep, Math.min(config.maxElo, elo));
    setDesiredElo(clamped);
  };

  return {
    currentElo,
    desiredElo,
    currentLevel,
    desiredLevel,
    isDuo,
    price,
    options,
    serviceName: 'CS2 FACEIT Boost',
    setCurrentElo: handleCurrentEloChange,
    setDesiredElo: handleDesiredEloChange,
    setIsDuo,
    config,
  };
}
