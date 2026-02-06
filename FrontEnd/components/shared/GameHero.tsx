import React from 'react';

export const GameHero = ({ game }) => {
  return (
    <div>
      <h1>{game.name}</h1>
      <p>{game.description}</p>
    </div>
  );
};
