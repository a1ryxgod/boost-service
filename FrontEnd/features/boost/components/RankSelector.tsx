'use client';

import React from 'react';
import { GameRankConfig } from '../types';
import './RankSelector.css';

interface RankSelectorProps {
  config: GameRankConfig;
  currentRankIndex: number;
  desiredRankIndex: number;
  onCurrentRankChange: (index: number) => void;
  onDesiredRankChange: (index: number) => void;
}

export const RankSelector = ({
  config,
  currentRankIndex,
  desiredRankIndex,
  onCurrentRankChange,
  onDesiredRankChange,
}: RankSelectorProps) => {
  const tiers = config.ranks.reduce<Record<string, { name: string; ranks: { index: number; name: string }[] }>>(
    (acc, rank, index) => {
      if (!acc[rank.tier]) {
        acc[rank.tier] = { name: rank.tier, ranks: [] };
      }
      acc[rank.tier].ranks.push({ index, name: rank.name });
      return acc;
    },
    {},
  );

  const tierGroups = Object.values(tiers);

  return (
    <div className="rank-selector">
      <div className="rank-selector__row">
        {/* Current Rank */}
        <div className="rank-selector__group">
          <label className="rank-selector__label">Current {config.rankLabel}</label>
          <select
            className="rank-selector__dropdown rank-selector__dropdown--current"
            value={currentRankIndex}
            onChange={(e) => onCurrentRankChange(Number(e.target.value))}
          >
            {tierGroups.map((group) => (
              <optgroup key={group.name} label={group.name}>
                {group.ranks.map((rank) => (
                  <option key={rank.index} value={rank.index}>
                    {rank.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Arrow */}
        <div className="rank-selector__arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>

        {/* Desired Rank */}
        <div className="rank-selector__group">
          <label className="rank-selector__label">Desired {config.rankLabel}</label>
          <select
            className="rank-selector__dropdown rank-selector__dropdown--desired"
            value={desiredRankIndex}
            onChange={(e) => onDesiredRankChange(Number(e.target.value))}
          >
            {tierGroups.map((group) => (
              <optgroup key={group.name} label={group.name}>
                {group.ranks
                  .filter((rank) => rank.index > currentRankIndex)
                  .map((rank) => (
                    <option key={rank.index} value={rank.index}>
                      {rank.name}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
