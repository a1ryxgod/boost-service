import { GameHero } from '@/components/shared/GameHero';
import GameNavigation from '@/components/shared/GameNavigation';
import { notFound } from 'next/navigation';
import './GamePage.css';

const gameData = {
  cs2: { 
    name: 'Counter-Strike 2', 
    description: 'Rise through the ranks with our professional CS2 boosting services.',
    accentColorClass: 'game-layout--cs2',
    // Example background image
    heroStyle: { backgroundImage: "url('/images/cs2-hero-bg.jpg')" }
  },
  valorant: { 
    name: 'Valorant', 
    description: 'From Iron to Radiant, our experts will get you there.',
    accentColorClass: 'game-layout--valorant',
    heroStyle: { backgroundImage: "url('/images/valorant-hero-bg.jpg')" }
  },
  lol: { 
    name: 'League of Legends', 
    description: 'Conquer the Summoner\'s Rift and achieve your desired division.',
    accentColorClass: 'game-layout--lol',
    heroStyle: { backgroundImage: "url('/images/lol-hero-bg.jpg')" }
  },
  dota2: { 
    name: 'Dota 2', 
    description: 'Gain MMR and improve your gameplay with our top-tier players.',
    accentColorClass: 'game-layout--dota2',
    heroStyle: { backgroundImage: "url('/images/dota2-hero-bg.jpg')" }
  },
};

export default function GameLayout({ children, params }: { children: React.ReactNode, params: { game: string } }) {
  const game = gameData[params.game];

  if (!game) {
    notFound();
  }

  return (
    <div className={`game-layout ${game.accentColorClass}`}>
      <GameHero 
        game={game}
        className="game-hero"
        style={game.heroStyle}
      />
      <GameNavigation
        gameSlug={params.game}
        className="game-nav"
      />
      <main className="game-content">
        {children}
      </main>
    </div>
  );
}
