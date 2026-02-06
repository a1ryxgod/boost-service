import React from 'react';
import Link from 'next/link';

const GameNavigation = ({ game }) => {
  return (
    <nav>
      <Link href={`/games/${game}/boost`}>Boost</Link>
      <Link href={`/games/${game}/coaching`}>Coaching</Link>
      <Link href={`/games/${game}/duo`}>Duo</Link>
    </nav>
  );
};

export default GameNavigation;
