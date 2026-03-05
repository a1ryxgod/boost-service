import { GameHero } from '@/components/shared/GameHero';
import './GamePage.css';

const gameData = {
  name: 'Counter-Strike 2',
  description: 'Rise through the ranks with our professional CS2 boosting services.',
  accentColorClass: 'game-layout--cs2',
  heroStyle: { backgroundImage: "url('/images/CS2image.jpg')" }
};

export default function CS2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`game-layout ${gameData.accentColorClass}`}>
      <GameHero
        game={gameData}
        className="game-hero"
        style={gameData.heroStyle}
      />
<main className="game-content">
        {children}
      </main>
    </div>
  );
}
