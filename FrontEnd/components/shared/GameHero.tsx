import React from 'react';

export const GameHero = ({ game, className, style }) => {
  return (
    <div className={className} style={style}>
      <div className="game-hero__content">
        <h1 className="game-hero__title">{game.name}</h1>
        <p className="game-hero__description">{game.description}</p>
      </div>
    </div>
  );
};
