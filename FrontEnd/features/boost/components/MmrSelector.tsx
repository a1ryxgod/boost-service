'use client';

import React from 'react';
import { MmrConfig } from '../types';
import './MmrSelector.css';

interface MmrSelectorProps {
  config: MmrConfig;
  currentMmr: number;
  desiredMmr: number;
  currentRank: string;
  desiredRank: string;
  onCurrentMmrChange: (mmr: number) => void;
  onDesiredMmrChange: (mmr: number) => void;
}

export const MmrSelector = ({
  config,
  currentMmr,
  desiredMmr,
  currentRank,
  desiredRank,
  onCurrentMmrChange,
  onDesiredMmrChange,
}: MmrSelectorProps) => {
  return (
    <div className="mmr-selector">
      {/* Current MMR */}
      <div className="mmr-selector__section">
        <label className="mmr-selector__label">Current MMR</label>
        <div className="mmr-selector__control">
          <div className="mmr-selector__rank-badge" data-rank={currentRank.toLowerCase()}>
            {currentRank}
          </div>
          <div className="mmr-selector__inputs">
            <input
              type="range"
              className="mmr-selector__slider"
              min={config.minMmr}
              max={config.maxMmr}
              step={config.mmrStep}
              value={currentMmr}
              onChange={(e) => onCurrentMmrChange(Number(e.target.value))}
            />
            <div className="mmr-selector__info">
              <input
                type="number"
                className="mmr-selector__input"
                min={config.minMmr}
                max={config.maxMmr}
                step={config.mmrStep}
                value={currentMmr}
                onChange={(e) => onCurrentMmrChange(Number(e.target.value))}
              />
              <span className="mmr-selector__range-hint">
                {config.ranks.find(r => r.name === currentRank)?.mmrMin}–{config.ranks.find(r => r.name === currentRank)?.mmrMax} MMR
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Arrow */}
      <div className="mmr-selector__arrow">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>

      {/* Desired MMR */}
      <div className="mmr-selector__section">
        <label className="mmr-selector__label">Desired MMR</label>
        <div className="mmr-selector__control">
          <div className="mmr-selector__rank-badge" data-rank={desiredRank.toLowerCase()}>
            {desiredRank}
          </div>
          <div className="mmr-selector__inputs">
            <input
              type="range"
              className="mmr-selector__slider"
              min={config.minMmr}
              max={config.maxMmr}
              step={config.mmrStep}
              value={desiredMmr}
              onChange={(e) => onDesiredMmrChange(Number(e.target.value))}
            />
            <div className="mmr-selector__info">
              <input
                type="number"
                className="mmr-selector__input"
                min={config.minMmr}
                max={config.maxMmr}
                step={config.mmrStep}
                value={desiredMmr}
                onChange={(e) => onDesiredMmrChange(Number(e.target.value))}
              />
              <span className="mmr-selector__range-hint">
                {config.ranks.find(r => r.name === desiredRank)?.mmrMin}–{config.ranks.find(r => r.name === desiredRank)?.mmrMax} MMR
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
