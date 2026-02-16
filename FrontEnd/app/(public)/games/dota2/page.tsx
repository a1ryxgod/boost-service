import Link from 'next/link';
import './GameOverview.css';

const gameData = {
  name: 'Dota 2',
  description: 'Increase your MMR with top-tier Dota 2 players. Fast delivery and guaranteed results.'
};

const services = [
  {
    title: 'MMR Boosting',
    href: '/games/dota2/boost/rank',
    icon: '\u{1F3C6}',
    description: 'Boost your MMR to the desired target. Solo or party \u2014 choose your preferred method.',
    features: ['Herald to Immortal', 'Solo or Party boost', 'Manual play only'],
    popular: true,
  },
  {
    title: 'Coaching',
    href: '/games/dota2/coaching',
    icon: '\u{1F393}',
    description: 'One-on-one coaching sessions with professional Dota 2 players.',
    features: ['Personalized lessons', 'Replay analysis', 'Live gameplay coaching'],
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
