import Link from 'next/link';
import Image from 'next/image';
import './HomePage.css';

const games = [
  { name: 'Counter-Strike 2', href: '/games/cs2', img: '/images/CS2image.jpg' },
  { name: 'Valorant', href: '/games/valorant', img: '/images/Valorantimage.jpg' },
  { name: 'League of Legends', href: '/games/lol', img: '/images/Lol-image.jpg' },
  { name: 'Dota 2', href: '/games/dota2', img: '/images/Dota2-image.jpg' },
];

const features = [
  {
    icon: '🏆',
    name: 'Elite Players Only',
    description: 'Every booster is handpicked from the top 1% of ranked players. We verify skill, reliability, and professionalism before hiring.',
  },
  {
    icon: '🔒',
    name: 'Secure & Private',
    description: 'VPN protection, offline mode, and strict confidentiality protocols keep your account completely safe at all times.',
  },
  {
    icon: '⚡',
    name: 'Lightning Fast',
    description: 'Most orders are picked up within minutes. We work around the clock to hit your goals as fast as possible.',
  },
  {
    icon: '💬',
    name: '24/7 Live Support',
    description: 'Got a question? Our support team is always online — via live chat, Discord, or email.',
  },
];

const heroStats = [
  { value: '10,000+', label: 'Orders Completed' },
  { value: '500+', label: 'Pro Players' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '99%', label: 'Satisfaction Rate' },
];

const testimonials = [
  {
    quote: 'The service was incredibly fast and professional. I was kept updated throughout the entire process. Highly recommend!',
    author: 'Alex_P',
    game: 'CS2 Rank Boost',
    rating: 5,
  },
  {
    quote: 'Reached Diamond in just 3 days. The booster was super communicative and even gave me tips to maintain my rank. 10/10!',
    author: 'xSakura',
    game: 'League of Legends',
    rating: 5,
  },
  {
    quote: 'Tried two other services before this one. Nothing compares — safe, fast, and real pros doing the job. Will be back!',
    author: 'Phantom_7',
    game: 'Valorant Placements',
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="home__hero">
        <div className="home__hero-badge">
          <span className="home__hero-badge-dot"></span>
          Professional Boosting Service
        </div>
        <h1 className="home__hero-title">
          Reach Your Desired Rank<br />
          <span className="home__hero-title-accent">in Record Time</span>
        </h1>
        <p className="home__hero-subtitle">
          Professional and reliable boosting by verified top-tier players. Safe, fast, and guaranteed results.
        </p>
        <div className="home__hero-cta">
          <Link href="/games" className="button home__btn-primary button--lg">
            Browse Games
          </Link>
          <Link href="/how-it-works" className="button home__btn-outline button--lg">
            How It Works
          </Link>
        </div>
        <div className="home__hero-stats">
          {heroStats.map((s) => (
            <div key={s.label} className="home__hero-stat">
              <span className="home__hero-stat-value">{s.value}</span>
              <span className="home__hero-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Games Section */}
      <section className="home__games">
        <div className="home__games-header">
          <div className="home__section-eyebrow">Supported Games</div>
          <h2 className="home__games-title">Choose Your Game</h2>
          <p className="home__games-subtitle">
            We offer professional boosting services for the world's top competitive titles.
          </p>
        </div>
        <div className="home__games-grid">
          {games.map((game) => (
            <Link href={game.href} key={game.name} className="home__game-card">
              <div className="home__game-card-image">
                <Image
                  src={game.img}
                  alt={game.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="home__game-card-img"
                  style={{ objectFit: 'cover' }}
                />
                <div className="home__game-card-overlay"></div>
                <div className="home__game-card-content">
                  <h3 className="home__game-card-title">{game.name}</h3>
                  <span className="home__game-card-cta">View Services →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="home__features">
        <div className="home__features-header">
          <div className="home__section-eyebrow">Why Us</div>
          <h2 className="home__features-title">Why Choose Us?</h2>
          <p className="home__features-subtitle">A professional service built on trust, speed, and security.</p>
        </div>
        <div className="home__features-grid">
          {features.map((feature) => (
            <div key={feature.name} className="home__feature-item">
              <div className="home__feature-icon">{feature.icon}</div>
              <h3 className="home__feature-item-title">{feature.name}</h3>
              <p className="home__feature-item-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="home__testimonials">
        <div className="home__testimonials-header">
          <div className="home__section-eyebrow">Reviews</div>
          <h2 className="home__testimonials-title">What Our Customers Say</h2>
          <p className="home__testimonials-subtitle">Trusted by thousands of gamers worldwide.</p>
        </div>
        <div className="home__testimonials-grid">
          {testimonials.map((t) => (
            <div key={t.author} className="home__testimonial-card">
              <div className="home__testimonial-stars">{'★'.repeat(t.rating)}</div>
              <p className="home__testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
              <div className="home__testimonial-footer">
                <span className="home__testimonial-author">{t.author}</span>
                <span className="home__testimonial-game">{t.game}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="home__cta">
        <div className="home__cta-box">
          <h2 className="home__cta-title">Ready to Climb the Ranks?</h2>
          <p className="home__cta-subtitle">
            Don&apos;t let the grind hold you back. Let our experts help you achieve your goals.
          </p>
          <div className="home__cta-buttons">
            <Link href="/games" className="button home__btn-light button--lg">
              Start Your Order
            </Link>
            <Link href="/pricing" className="button home__btn-cta-outline button--lg">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
