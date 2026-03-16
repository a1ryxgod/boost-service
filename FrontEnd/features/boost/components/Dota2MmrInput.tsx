'use client';

import React from 'react';
import { MmrConfig } from '../types';
import './MmrSelector.css';

interface Dota2MmrInputProps {
  config: MmrConfig;
  mmr: number;
  rank: string;
  onMmrChange: (mmr: number) => void;
}

export const Dota2MmrInput = ({ config, mmr, rank, onMmrChange }: Dota2MmrInputProps) => {
  const rankEntry = config.ranks.find((r) => r.name === rank);

  return (
    <div className="mmr-selector">
      <div className="mmr-selector__section">
        <label className="mmr-selector__label">MMR before calibration</label>
        <div className="mmr-selector__control">
          <div
            className="mmr-selector__rank-badge"
            data-rank={rank.toLowerCase()}
          >
            {rank}
          </div>
          <div className="mmr-selector__inputs">
            <input
              type="range"
              className="mmr-selector__slider"
              min={config.minMmr}
              max={config.maxMmr}
              step={config.mmrStep}
              value={mmr}
              onChange={(e) => onMmrChange(Number(e.target.value))}
            />
            <div className="mmr-selector__info">
              <input
                type="number"
                className="mmr-selector__input"
                min={config.minMmr}
                max={config.maxMmr}
                step={config.mmrStep}
                value={mmr}
                onChange={(e) => onMmrChange(Number(e.target.value))}
              />
              {rankEntry && (
                <span className="mmr-selector__range-hint">
                  {rankEntry.mmrMin}–{rankEntry.mmrMax} MMR
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
