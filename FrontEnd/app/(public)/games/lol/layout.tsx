import { GameHero } from '@/components/shared/GameHero';
import './GamePage.css';

const gameData = {
  name: 'League of Legends',
  description: 'Conquer the Summoner\'s Rift and achieve your desired division.',
  accentColorClass: 'game-layout--lol',
  heroStyle: { backgroundImage: "url('/images/Lol-image.jpg')" }
};

export default function LoLLayout({ children }: { children: React.ReactNode }) {
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
