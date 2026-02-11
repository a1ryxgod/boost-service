import Link from 'next/link';
import { notFound } from 'next/navigation';
import './GameOverview.css';

const gameData: Record<string, { name: string; description: string }> = {
  cs2: {
    name: 'Counter-Strike 2',
    description: 'Professional CS2 boosting services to help you reach your desired rank. Fast, secure, and reliable.'
  },
  valorant: {
    name: 'Valorant',
    description: 'Climb from Iron to Radiant with our expert Valorant boosters. Get the rank you deserve.'
  },
  lol: {
    name: 'League of Legends',
    description: 'Professional LoL boosting from Iron to Challenger. Division boosts, placements, and more.'
  },
  dota2: {
    name: 'Dota 2',
    description: 'Increase your MMR with top-tier Dota 2 players. Fast delivery and guaranteed results.'
  },
};

const services = [
  {
    title: 'Win Boosting',
    href: '/boost/wins',
    icon: '🎯',
    description: 'Order a specific number of wins. Perfect for completing missions or climbing steadily.',
    features: ['Choose number of wins', 'Play solo or duo', 'Fast completion'],
    popular: true,
  },
  {
    title: 'Rank Boosting',
    href: '/boost/rank',
    icon: '🏆',
    description: 'Boost from your current rank to your desired rank. The most efficient way to climb.',
    features: ['Any rank to any rank', 'Manual boosting', 'Stream available'],
    popular: false,
  },
  {
    title: 'Placement Matches',
    href: '/boost/placements',
    icon: '⚡',
    description: 'Get the best possible start to your season with placement match boosting.',
    features: ['All placement games', 'Highest calibration', 'Quick turnaround'],
    popular: false,
  },
  {
    title: 'Coaching',
    href: '/coaching',
    icon: '🎓',
    description: 'One-on-one coaching sessions with professional players to improve your gameplay.',
    features: ['Personalized lessons', 'VOD reviews', 'Live gameplay analysis'],
    popular: false,
  },
  {
    title: 'Duo Boosting',
    href: '/duo',
    icon: '👥',
    description: 'Play alongside a professional booster. Learn while you climb. No account sharing.',
    features: ['Play together', 'Learn from pros', 'Safest method'],
    popular: false,
  },
];

export default function GameOverviewPage({ params }: { params: { game: string } }) {
  const game = gameData[params.game];

  if (!game) {
    notFound();
  }

  return (
    <div className="game-overview">
      <div className="game-overview__header">
        <h1 className="game-overview__title">{game.name} Services</h1>
        <p className="game-overview__description">{game.description}</p>
      </div>

      <div className="game-overview__services">
        <h2 className="game-overview__services-title">Choose Your Service</h2>
        <div className="game-overview__grid">
          {services.map((service) => (
            <Link
              key={service.title}
              href={`/games/${params.game}${service.href}`}
              className={`game-overview__card ${service.popular ? 'game-overview__card--popular' : ''}`}
            >
              {service.popular && (
                <span className="game-overview__card-badge">Popular</span>
              )}
              <div className="game-overview__card-icon">{service.icon}</div>
              <h3 className="game-overview__card-title">{service.title}</h3>
              <p className="game-overview__card-description">{service.description}</p>
              <div className="game-overview__card-features">
                {service.features.map((feature) => (
                  <div key={feature} className="game-overview__card-feature">
                    {feature}
                  </div>
                ))}
              </div>
              <span className="game-overview__card-cta">Get Started</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
