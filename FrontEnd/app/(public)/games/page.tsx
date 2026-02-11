import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import './GamesListPage.css';

export const metadata: Metadata = {
  title: 'All Games | Boosting Services',
  description: 'Select from our list of supported games including CS2, Valorant, League of Legends, and Dota 2.',
};

const games = [
  {
    name: 'Counter-Strike 2',
    href: '/games/cs2',
    img: '/images/CS2image.jpg',
    description: 'Professional rank boosting, win boosting, and coaching services for CS2.'
  },
  {
    name: 'Valorant',
    href: '/games/valorant',
    img: '/images/Valorantimage.jpg',
    description: 'Climb from Iron to Radiant with our expert Valorant boosting services.'
  },
  {
    name: 'League of Legends',
    href: '/games/lol',
    img: '/images/Lol-image.jpg',
    description: 'Division boosting, placement matches, and coaching for League of Legends.'
  },
  {
    name: 'Dota 2',
    href: '/games/dota2',
    img: '/images/Dota2-image.jpg',
    description: 'MMR boosting and professional coaching from top-tier Dota 2 players.'
  },
];

export default function AllGamesPage() {
  return (
    <div className="games-list">
      <div className="games-list__container">
        <div className="games-list__header">
          <h1 className="games-list__title">Choose Your Game</h1>
          <p className="games-list__subtitle">
            We offer professional boosting services for the world's top competitive titles.
          </p>
        </div>

        <div className="games-list__grid">
          {games.map((game) => (
            <Link href={game.href} key={game.name} className="games-list__card">
              <div className="games-list__card-image">
                <Image
                  src={game.img}
                  alt={game.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="games-list__card-img"
                  style={{ objectFit: 'cover' }}
                />
                <div className="games-list__card-overlay"></div>
              </div>
              <div className="games-list__card-content">
                <h2 className="games-list__card-title">{game.name}</h2>
                <p className="games-list__card-description">{game.description}</p>
                <span className="games-list__card-cta">View Services</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
