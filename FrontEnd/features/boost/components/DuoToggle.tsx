'use client';

import React from 'react';
import './DuoToggle.css';

interface DuoToggleProps {
  isDuo: boolean;
  onToggle: (value: boolean) => void;
}

const DuoToggle = ({ isDuo, onToggle }: DuoToggleProps) => {
  return (
    <div
      className={`duo-toggle ${isDuo ? 'duo-toggle--active' : ''}`}
      onClick={() => onToggle(!isDuo)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle(!isDuo);
        }
      }}
    >
      <div className="duo-toggle__info">
        <span className="duo-toggle__label">Duo Queue</span>
        <span className="duo-toggle__description">Play with a booster in your team (+40% to price)</span>
      </div>
      <div className={`duo-toggle__switch ${isDuo ? 'duo-toggle__switch--active' : ''}`} />
    </div>
  );
};

export { DuoToggle };
