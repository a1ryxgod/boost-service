import Link from 'next/link';
import './GameOverview.css';

const gameData = {
  name: 'Dota 2',
  description: 'Increase your MMR with top-tier Dota 2 players. Fast delivery and guaranteed results.'
};

const services = [
  {
    title: 'Win Boosting',
    href: '/games/dota2/boost/wins',
    icon: '🎯',
    description: 'Order a specific number of wins. Perfect for climbing MMR steadily.',
    features: ['Choose number of wins', 'Play solo or party', 'Fast completion'],
    popular: true,
  },
  {
    title: 'MMR Boosting',
    href: '/games/dota2/boost/rank',
    icon: '🏆',
    description: 'Boost your MMR to the desired target. The most efficient way to climb.',
    features: ['Herald to Immortal', 'Manual boosting', 'Stream available'],
    popular: false,
  },
  {
    title: 'Calibration Matches',
    href: '/games/dota2/boost/calibration',
    icon: '⚡',
    description: 'Get the best possible start with professional calibration match boosting.',
    features: ['All calibration games', 'Highest MMR calibration', 'Quick turnaround'],
    popular: false,
  },
  {
    title: 'Coaching',
    href: '/games/dota2/coaching',
    icon: '🎓',
    description: 'One-on-one coaching sessions with professional Dota 2 players.',
    features: ['Personalized lessons', 'Replay analysis', 'Live gameplay coaching'],
    popular: false,
  },
  {
    title: 'Party Boosting',
    href: '/games/dota2/duo',
    icon: '👥',
    description: 'Play alongside a professional booster. Learn while you climb MMR.',
    features: ['Play together', 'Learn from pros', 'Safest method'],
    popular: false,
  },
];

export default function Dota2OverviewPage() {
  return (
    <div className="game-overview">
      <div className="game-overview__header">
        <h1 className="game-overview__title">{gameData.name} Services</h1>
        <p className="game-overview__description">{gameData.description}</p>
      </div>

      <div className="game-overview__services">
        <h2 className="game-overview__services-title">Choose Your Service</h2>
        <div className="game-overview__grid">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
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
