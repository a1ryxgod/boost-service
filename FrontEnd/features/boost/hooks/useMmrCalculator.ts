'use client';

import { useState, useMemo, useCallback } from 'react';
import { MmrConfig } from '../types';
import { calculateMmrBoostPrice, getMmrRank } from '../utils/calculatePrice';

export function useMmrCalculator(config: MmrConfig) {
  const [currentMmr, setCurrentMmr] = useState(config.minMmr);
  const [desiredMmr, setDesiredMmr] = useState(config.minMmr + 500);
  const [isDuo, setIsDuo] = useState(false);

  const currentRank = useMemo(() => getMmrRank(config, currentMmr), [config, currentMmr]);
  const desiredRank = useMemo(() => getMmrRank(config, desiredMmr), [config, desiredMmr]);

  const price = useMemo(
    () => calculateMmrBoostPrice(config, currentMmr, desiredMmr, isDuo),
    [config, currentMmr, desiredMmr, isDuo],
  );

  const options = useMemo(() => {
    const opts = [
      { label: 'Current MMR', value: `${currentMmr} (${currentRank})` },
      { label: 'Desired MMR', value: `${desiredMmr} (${desiredRank})` },
    ];
    if (isDuo) {
      opts.push({ label: 'Party Boost', value: 'Yes (+40%)' });
    }
    return opts;
  }, [currentMmr, desiredMmr, currentRank, desiredRank, isDuo]);

  const handleCurrentMmrChange = useCallback(
    (mmr: number) => {
      const clamped = Math.max(config.minMmr, Math.min(config.maxMmr, mmr));
      setCurrentMmr(clamped);
      if (clamped >= desiredMmr) {
        setDesiredMmr(Math.min(clamped + config.mmrStep, config.maxMmr));
      }
    },
    [config, desiredMmr],
  );

  const handleDesiredMmrChange = useCallback(
    (mmr: number) => {
      const clamped = Math.max(config.minMmr, Math.min(config.maxMmr, mmr));
      if (clamped > currentMmr) {
        setDesiredMmr(clamped);
      }
    },
    [config, currentMmr],
  );

  return {
    currentMmr,
    desiredMmr,
    currentRank,
    desiredRank,
    isDuo,
    price,
    options,
    serviceName: `${config.gameName} MMR Boost`,
    setCurrentMmr: handleCurrentMmrChange,
    setDesiredMmr: handleDesiredMmrChange,
    setIsDuo,
  };
}
