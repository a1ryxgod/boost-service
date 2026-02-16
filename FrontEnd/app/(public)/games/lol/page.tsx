import Link from 'next/link';
import './GameOverview.css';

const gameData = {
  name: 'League of Legends',
  description: 'Professional LoL boosting from Iron to Challenger. Division boosts, placements, and more.'
};

const services = [
  {
    title: 'Win Boosting',
    href: '/games/lol/boost/wins',
    icon: '🎯',
    description: 'Order a specific number of wins. Perfect for missions and event rewards.',
    features: ['Choose number of wins', 'Play solo or duo', 'Fast completion'],
    popular: true,
  },
  {
    title: 'Rank Boosting',
    href: '/games/lol/boost/rank',
    icon: '🏆',
    description: 'Boost from your current division to your desired division. Climb efficiently.',
    features: ['Iron to Challenger', 'Manual boosting', 'Stream available'],
    popular: false,
  },
  {
    title: 'Placement Matches',
    href: '/games/lol/boost/placements',
    icon: '⚡',
    description: 'Get the best possible start to your season with placement match boosting.',
    features: ['All 10 placement games', 'Highest calibration', 'Quick turnaround'],
    popular: false,
  },
  {
    title: 'Coaching',
    href: '/games/lol/coaching',
    icon: '🎓',
    description: 'One-on-one coaching sessions with professional LoL players.',
    features: ['Personalized lessons', 'VOD reviews', 'Role-specific coaching'],
    popular: false,
  },
];

export default function LoLOverviewPage() {
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
