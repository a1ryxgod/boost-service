'use client';

import React from 'react';
import { FaceitConfig } from '../types';
import './FaceitLevelSelector.css';

const LEVEL_COLORS: Record<number, string> = {
  1: '#EEE',
  2: '#1CE400',
  3: '#1CE400',
  4: '#FFC800',
  5: '#FFC800',
  6: '#FFC800',
  7: '#FF6309',
  8: '#FF6309',
  9: '#FF6309',
  10: '#FF0000',
};

function getLevelColor(level: number): string {
  return LEVEL_COLORS[level] || '#EEE';
}

interface FaceitEloSelectorProps {
  config: FaceitConfig;
  currentElo: number;
  desiredElo: number;
  currentLevel: number;
  desiredLevel: number;
  onCurrentEloChange: (elo: number) => void;
  onDesiredEloChange: (elo: number) => void;
}

export const FaceitEloSelector = ({
  config,
  currentElo,
  desiredElo,
  currentLevel,
  desiredLevel,
  onCurrentEloChange,
  onDesiredEloChange,
}: FaceitEloSelectorProps) => {
  return (
    <div className="faceit-selector">
      {/* Current ELO */}
      <div className="faceit-selector__section">
        <label className="faceit-selector__label">Current ELO</label>
        <div className="faceit-selector__elo-control">
          <div
            className="faceit-selector__level-icon"
            style={{
              '--level-color': getLevelColor(currentLevel),
            } as React.CSSProperties}
          >
            {currentLevel}
          </div>
          <div className="faceit-selector__elo-inputs">
            <input
              type="range"
              className="faceit-selector__slider"
              min={config.minElo}
              max={config.maxElo}
              step={config.eloStep}
              value={currentElo}
              onChange={(e) => onCurrentEloChange(Number(e.target.value))}
            />
            <div className="faceit-selector__elo-info">
              <input
                type="number"
                className="faceit-selector__input"
                min={config.minElo}
                max={config.maxElo}
                step={config.eloStep}
                value={currentElo}
                onChange={(e) => onCurrentEloChange(Number(e.target.value))}
              />
              <span className="faceit-selector__elo-range">
                {config.levels.find(l => l.level === currentLevel)?.eloMin}–{config.levels.find(l => l.level === currentLevel)?.eloMax} ELO
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Level scale */}
      <div className="faceit-selector__scale">
        {config.levels.map((level) => {
          const isInRange = level.level >= currentLevel && level.level <= desiredLevel;
          return (
            <div
              key={level.level}
              className={`faceit-selector__scale-item ${isInRange ? 'faceit-selector__scale-item--active' : ''}`}
              style={{
                '--level-color': getLevelColor(level.level),
              } as React.CSSProperties}
            >
              {level.level}
            </div>
          );
        })}
      </div>

      {/* Desired ELO */}
      <div className="faceit-selector__section">
        <label className="faceit-selector__label">Desired ELO</label>
        <div className="faceit-selector__elo-control">
          <div
            className="faceit-selector__level-icon"
            style={{
              '--level-color': getLevelColor(desiredLevel),
            } as React.CSSProperties}
          >
            {desiredLevel}
          </div>
          <div className="faceit-selector__elo-inputs">
            <input
              type="range"
              className="faceit-selector__slider"
              min={config.minElo}
              max={config.maxElo}
              step={config.eloStep}
              value={desiredElo}
              onChange={(e) => onDesiredEloChange(Number(e.target.value))}
            />
            <div className="faceit-selector__elo-info">
              <input
                type="number"
                className="faceit-selector__input"
                min={config.minElo}
                max={config.maxElo}
                step={config.eloStep}
                value={desiredElo}
                onChange={(e) => onDesiredEloChange(Number(e.target.value))}
              />
              <span className="faceit-selector__elo-range">
                {config.levels.find(l => l.level === desiredLevel)?.eloMin}–{config.levels.find(l => l.level === desiredLevel)?.eloMax} ELO
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
