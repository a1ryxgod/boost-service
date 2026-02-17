import { GameHero } from '@/components/shared/GameHero';
import GameNavigation from '@/components/shared/GameNavigation';
import { notFound } from 'next/navigation';
import './GamePage.css';

const gameData = {
  cs2: {
    name: 'Counter-Strike 2',
    description: 'Rise through the ranks with our professional CS2 boosting services.',
    accentColorClass: 'game-layout--cs2',
    heroStyle: { backgroundImage: "url('/images/CS2image.jpg')" }
  },
  valorant: {
    name: 'Valorant',
    description: 'From Iron to Radiant, our experts will get you there.',
    accentColorClass: 'game-layout--valorant',
    heroStyle: { backgroundImage: "url('/images/Valorantimage.jpg')" }
  },
  lol: {
    name: 'League of Legends',
    description: 'Conquer the Summoner\'s Rift and achieve your desired division.',
    accentColorClass: 'game-layout--lol',
    heroStyle: { backgroundImage: "url('/images/Lol-image.jpg')" }
  },
  dota2: {
    name: 'Dota 2',
    description: 'Gain MMR and improve your gameplay with our top-tier players.',
    accentColorClass: 'game-layout--dota2',
    heroStyle: { backgroundImage: "url('/images/Dota2-image.jpg')" }
  },
};

export default async function GameLayout({ children, params }: { children: React.ReactNode, params: Promise<{ game: string }> }) {
  const { game: gameSlug } = await params;
  const game = gameData[gameSlug];

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
        gameSlug={gameSlug}
        className="game-nav"
      />
      <main className="game-content">
        {children}
      </main>
    </div>
  );
}
