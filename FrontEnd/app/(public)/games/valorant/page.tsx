import Link from 'next/link';
import './GameOverview.css';

const gameData = {
  name: 'Valorant',
  description: 'Climb from Iron to Radiant with our expert Valorant boosters. Get the rank you deserve.'
};

const services = [
  {
    title: 'Win Boosting',
    href: '/games/valorant/boost/wins',
    icon: '🎯',
    description: 'Order a specific number of wins. Perfect for completing battle pass missions.',
    features: ['Choose number of wins', 'Play solo or duo', 'Fast completion'],
    popular: true,
  },
  {
    title: 'Rank Boosting',
    href: '/games/valorant/boost/rank',
    icon: '🏆',
    description: 'Boost from your current rank to your desired rank. Climb the ladder efficiently.',
    features: ['Iron to Radiant', 'Manual boosting', 'Stream available'],
    popular: false,
  },
  {
    title: 'Placement Matches',
    href: '/games/valorant/boost/placements',
    icon: '⚡',
    description: 'Get the best possible start to your act with placement match boosting.',
    features: ['All 5 placement games', 'Highest calibration', 'Quick turnaround'],
    popular: false,
  },
  {
    title: 'Coaching',
    href: '/games/valorant/coaching',
    icon: '🎓',
    description: 'One-on-one coaching sessions with professional Valorant players.',
    features: ['Personalized lessons', 'VOD reviews', 'Agent-specific coaching'],
    popular: false,
  },
];

export default function ValorantOverviewPage() {
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
