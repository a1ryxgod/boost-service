'use client';

import React from 'react';
import { GameRankConfig } from '../types';
import './ValorantRankSelector.css';

interface ValorantRankSelectorProps {
  config: GameRankConfig;
  currentRankIndex: number;
  desiredRankIndex: number;
  onCurrentRankChange: (index: number) => void;
  onDesiredRankChange: (index: number) => void;
}

export const ValorantRankSelector = ({
  config,
  currentRankIndex,
  desiredRankIndex,
  onCurrentRankChange,
  onDesiredRankChange,
}: ValorantRankSelectorProps) => {
  const [selectionMode, setSelectionMode] = React.useState<'current' | 'desired' | null>(null);

  const handleRankClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectionMode === 'current') {
      onCurrentRankChange(index);
      setSelectionMode('desired');
    } else if (selectionMode === 'desired') {
      if (index > currentRankIndex) {
        onDesiredRankChange(index);
        setSelectionMode(null);
      }
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectionMode(null);
    }
  };

  const currentRank = config.ranks[currentRankIndex];
  const desiredRank = config.ranks[desiredRankIndex];

  return (
    <div className="valorant-rank-selector">
      <div className="valorant-rank-selector__selected">
        <div className="valorant-rank-selector__selected-item">
          <label className="valorant-rank-selector__label">Current Rank</label>
          <button
            className="valorant-rank-selector__badge"
            onClick={() => setSelectionMode('current')}
            data-tier={currentRank.tier.toLowerCase()}
          >
            <div className="valorant-rank-selector__badge-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 3.6v8.72c0 4.35-2.93 8.43-8 9.64-5.07-1.21-8-5.29-8-9.64V7.78l8-3.6z"/>
              </svg>
            </div>
            <span className="valorant-rank-selector__badge-text">{currentRank.name}</span>
          </button>
        </div>

        <div className="valorant-rank-selector__arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>

        <div className="valorant-rank-selector__selected-item">
          <label className="valorant-rank-selector__label">Desired Rank</label>
          <button
            className="valorant-rank-selector__badge"
            onClick={() => setSelectionMode('desired')}
            data-tier={desiredRank.tier.toLowerCase()}
          >
            <div className="valorant-rank-selector__badge-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 3.6v8.72c0 4.35-2.93 8.43-8 9.64-5.07-1.21-8-5.29-8-9.64V7.78l8-3.6z"/>
              </svg>
            </div>
            <span className="valorant-rank-selector__badge-text">{desiredRank.name}</span>
          </button>
        </div>
      </div>

      {selectionMode && (
        <div className="valorant-rank-selector__grid" onClick={handleOverlayClick}>
          <div className="valorant-rank-selector__grid-wrapper">
            <div className="valorant-rank-selector__grid-header">
              <h3 className="valorant-rank-selector__grid-title">
                {selectionMode === 'current' ? 'Select Current Rank' : 'Select Desired Rank'}
              </h3>
              <button
                className="valorant-rank-selector__grid-close"
                onClick={() => setSelectionMode(null)}
              >
                ✕
              </button>
            </div>
            <div className="valorant-rank-selector__grid-content">
              {config.ranks.map((rank, index) => {
                const isDisabled = selectionMode === 'desired' && index <= currentRankIndex;
                const isSelected = (selectionMode === 'current' && index === currentRankIndex) ||
                                   (selectionMode === 'desired' && index === desiredRankIndex);

                return (
                  <button
                    key={rank.id}
                    className={`valorant-rank-selector__rank-card ${isSelected ? 'valorant-rank-selector__rank-card--selected' : ''} ${isDisabled ? 'valorant-rank-selector__rank-card--disabled' : ''}`}
                    onClick={(e) => {
                      if (!isDisabled) {
                        handleRankClick(index, e);
                      }
                    }}
                    disabled={isDisabled}
                    data-tier={rank.tier.toLowerCase()}
                  >
                    <div className="valorant-rank-selector__rank-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 3.6v8.72c0 4.35-2.93 8.43-8 9.64-5.07-1.21-8-5.29-8-9.64V7.78l8-3.6z"/>
                      </svg>
                      {rank.division && (
                        <div className="valorant-rank-selector__rank-division">{rank.division}</div>
                      )}
                    </div>
                    <div className="valorant-rank-selector__rank-name">{rank.name}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
