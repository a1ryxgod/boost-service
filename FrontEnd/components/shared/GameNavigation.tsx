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
      <Link
        href={`/games/${gameSlug}/boost/wins`}
        className={`game-nav__link ${isActive('/boost') ? 'game-nav__link--active' : ''}`}
      >
        Boost
      </Link>
      <Link
        href={`/games/${gameSlug}/coaching`}
        className={`game-nav__link ${isActive('/coaching') ? 'game-nav__link--active' : ''}`}
      >
        Coaching
      </Link>
      <Link
        href={`/games/${gameSlug}/duo`}
        className={`game-nav__link ${isActive('/duo') ? 'game-nav__link--active' : ''}`}
      >
        Duo
      </Link>
    </nav>
  );
};

export default GameNavigation;
