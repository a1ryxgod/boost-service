'use client';

import React from 'react';
import { WinsConfig } from '../types';
import './CounterSelector.css';

interface WinsSelectorProps {
  config: WinsConfig;
  wins: number;
  onWinsChange: (wins: number) => void;
}

const WinsSelector = ({ config, wins, onWinsChange }: WinsSelectorProps) => {
  const pct = ((wins - config.minWins) / (config.maxWins - config.minWins)) * 100;
  const sliderBg = `linear-gradient(to right, var(--accent-color, #7C3AED) ${pct}%, #282828 ${pct}%)`;

  return (
    <div className="counter-selector">
      <label className="counter-selector__label">Number of Wins</label>

      <div className="counter-selector__counter">
        <button
          type="button"
          className="counter-selector__btn"
          onClick={() => onWinsChange(wins - 1)}
          disabled={wins <= config.minWins}
          aria-label="Decrease wins"
        >
          −
        </button>

        <div className="counter-selector__value-wrap">
          <input
            type="number"
            className="counter-selector__input"
            min={config.minWins}
            max={config.maxWins}
            value={wins}
            onChange={(e) => onWinsChange(Number(e.target.value))}
            aria-label="Number of wins"
          />
          <span className="counter-selector__unit">Wins</span>
        </div>

        <button
          type="button"
          className="counter-selector__btn"
          onClick={() => onWinsChange(wins + 1)}
          disabled={wins >= config.maxWins}
          aria-label="Increase wins"
        >
          +
        </button>
      </div>

      <div className="counter-selector__slider-wrap">
        <input
          type="range"
          className="counter-selector__slider"
          style={{ background: sliderBg }}
          min={config.minWins}
          max={config.maxWins}
          step={1}
          value={wins}
          onChange={(e) => onWinsChange(Number(e.target.value))}
          aria-label="Wins slider"
        />
        <div className="counter-selector__range">
          <span>{config.minWins}</span>
          <span>{config.maxWins}</span>
        </div>
      </div>

      <p className="counter-selector__hint">
        ${config.pricePerWin.toFixed(2)} per win · duo queue adds +40%
      </p>
    </div>
  );
};

export { WinsSelector };
