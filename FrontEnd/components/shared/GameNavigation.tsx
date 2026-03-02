'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface GameNavigationProps {
  gameSlug: string;
  className?: string;
}

const GameNavigation = ({ gameSlug, className }: GameNavigationProps) => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname?.includes(path);
  };

  return (
    <nav className={className}>
      {(gameSlug === 'cs2' || gameSlug === 'dota2') && (
        <Link
          href={`/games/${gameSlug}/accounts`}
          className={`game-nav__link ${isActive('/accounts') ? 'game-nav__link--active' : ''}`}
        >
          Accounts
        </Link>
      )}
      {gameSlug === 'dota2' && (
        <Link
          href={`/games/dota2/boost/rank`}
          className={`game-nav__link ${isActive('/boost') ? 'game-nav__link--active' : ''}`}
        >
          MMR Boost
        </Link>
      )}
      <Link
        href={`/games/${gameSlug}/coaching`}
        className={`game-nav__link ${isActive('/coaching') ? 'game-nav__link--active' : ''}`}
      >
        Coaching
      </Link>
      {gameSlug === 'cs2' && (
        <Link
          href={`/games/cs2/boost/faceit`}
          className={`game-nav__link ${isActive('/faceit') ? 'game-nav__link--active' : ''}`}
        >
          FACEIT
        </Link>
      )}
    </nav>
  );
};

export default GameNavigation;
