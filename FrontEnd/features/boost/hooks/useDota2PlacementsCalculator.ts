'use client';

import { useState, useMemo, useCallback } from 'react';
import { MmrConfig } from '../types';
import { calculateDota2CalibrationPrice, getMmrRank } from '../utils/calculatePrice';

const DOTA2_CALIBRATION_BASE_PRICE = 29.99;

export function useDota2PlacementsCalculator(mmrConfig: MmrConfig) {
  const [preMmr, setPreMmrState] = useState(2000);
  const [isDuo, setIsDuo] = useState(false);

  const currentRank = useMemo(() => getMmrRank(mmrConfig, preMmr), [mmrConfig, preMmr]);

  const price = useMemo(
    () => calculateDota2CalibrationPrice(DOTA2_CALIBRATION_BASE_PRICE, preMmr, mmrConfig.maxMmr, isDuo),
    [preMmr, mmrConfig.maxMmr, isDuo],
  );

  const options = useMemo(() => {
    const opts = [{ label: 'MMR before calibration', value: `${preMmr} (${currentRank})` }];
    if (isDuo) opts.push({ label: 'Party Boost', value: 'Yes (+40%)' });
    return opts;
  }, [preMmr, currentRank, isDuo]);

  const handlePreMmrChange = useCallback(
    (value: number) => {
      setPreMmrState(Math.max(mmrConfig.minMmr, Math.min(mmrConfig.maxMmr, value)));
    },
    [mmrConfig.minMmr, mmrConfig.maxMmr],
  );

  return {
    preMmr,
    currentRank,
    isDuo,
    price,
    options,
    serviceName: 'Dota 2 Calibration',
    setPreMmr: handlePreMmrChange,
    setIsDuo,
  };
}
