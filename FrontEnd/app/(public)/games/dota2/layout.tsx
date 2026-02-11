import { GameHero } from '@/components/shared/GameHero';
import GameNavigation from '@/components/shared/GameNavigation';
import './GamePage.css';

const gameData = {
  name: 'Dota 2',
  description: 'Gain MMR and improve your gameplay with our top-tier players.',
  accentColorClass: 'game-layout--dota2',
  heroStyle: { backgroundImage: "url('/images/Dota2-image.jpg')" }
};

export default function Dota2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`game-layout ${gameData.accentColorClass}`}>
      <GameHero
        game={gameData}
        className="game-hero"
        style={gameData.heroStyle}
      />
      <GameNavigation
        gameSlug="dota2"
        className="game-nav"
      />
      <main className="game-content">
        {children}
      </main>
    </div>
  );
}
