'use client';

import React from 'react';
import { PlacementsConfig } from '../types';
import './CounterSelector.css';

interface PlacementGamesSelectorProps {
  config: PlacementsConfig;
  games: number;
  onGamesChange: (games: number) => void;
}

const PlacementGamesSelector = ({ config, games, onGamesChange }: PlacementGamesSelectorProps) => {
  const pct = ((games - config.minGames) / (config.maxGames - config.minGames)) * 100;
  const sliderBg = `linear-gradient(to right, var(--accent-color, #7C3AED) ${pct}%, #282828 ${pct}%)`;

  return (
    <div className="counter-selector">
      <label className="counter-selector__label">Number of Placement Games</label>

      <div className="counter-selector__counter">
        <button
          type="button"
          className="counter-selector__btn"
          onClick={() => onGamesChange(games - 1)}
          disabled={games <= config.minGames}
          aria-label="Decrease games"
        >
          −
        </button>

        <div className="counter-selector__value-wrap">
          <input
            type="number"
            className="counter-selector__input"
            min={config.minGames}
            max={config.maxGames}
            value={games}
            onChange={(e) => onGamesChange(Number(e.target.value))}
            aria-label="Number of games"
          />
          <span className="counter-selector__unit">Games</span>
        </div>

        <button
          type="button"
          className="counter-selector__btn"
          onClick={() => onGamesChange(games + 1)}
          disabled={games >= config.maxGames}
          aria-label="Increase games"
        >
          +
        </button>
      </div>

      <div className="counter-selector__slider-wrap">
        <input
          type="range"
          className="counter-selector__slider"
          style={{ background: sliderBg }}
          min={config.minGames}
          max={config.maxGames}
          step={1}
          value={games}
          onChange={(e) => onGamesChange(Number(e.target.value))}
          aria-label="Games slider"
        />
        <div className="counter-selector__range">
          <span>{config.minGames}</span>
          <span>{config.maxGames}</span>
        </div>
      </div>

      <p className="counter-selector__hint">
        ${config.pricePerGame.toFixed(2)} per game
      </p>
    </div>
  );
};

export { PlacementGamesSelector };
