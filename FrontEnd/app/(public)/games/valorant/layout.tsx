import { GameHero } from '@/components/shared/GameHero';
import './GamePage.css';

const gameData = {
  name: 'Valorant',
  description: 'From Iron to Radiant, our experts will get you there.',
  accentColorClass: 'game-layout--valorant',
  heroStyle: { backgroundImage: "url('/images/Valorantimage.jpg')" }
};

export default function ValorantLayout({ children }: { children: React.ReactNode }) {
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
