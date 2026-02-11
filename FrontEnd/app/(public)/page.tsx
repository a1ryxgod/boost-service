import Link from 'next/link';
import Image from 'next/image';
import './HomePage.css';

// Let's define our games here for easy mapping.
// In a real app, this would come from a CMS or a config file.
const games = [
  { name: 'Counter-Strike 2', href: '/games/cs2', img: '/images/CS2image.jpg' },
  { name: 'Valorant', href: '/games/valorant', img: '/images/Valorantimage.jpg' },
  { name: 'League of Legends', href: '/games/lol', img: '/images/Lol-image.jpg' },
  { name: 'Dota 2', href: '/games/dota2', img: '/images/Dota2-image.jpg' },
];

const features = [
    { name: 'Experienced Players', description: 'Our team consists of verified, top-tier players.' },
    { name: 'Secure Process', description: 'Account safety is our priority. We use secure methods for all services.' },
    { name: 'Fast Delivery', description: 'We work efficiently to complete your order as quickly as possible.' },
    { name: '24/7 Support', description: 'Our customer support team is available around the clock to assist you.' },
];

export default function HomePage() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="home__hero">
        <h1 className="home__hero-title">
          Reach Your Desired Rank in Your Favorite Games
        </h1>
        <p className="home__hero-subtitle">
          Professional and reliable boosting services by experienced players. Select your game and start climbing today.
        </p>
        <div className="home__hero-cta">
          <Link href="/games" className="button button--primary button--lg">
            Browse Games
          </Link>
        </div>
      </section>

      {/* Games Section */}
      <section className="home__games">
        <div className="home__games-header">
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
                  <h3 className="home__game-card-title">
                    {game.name}
                  </h3>
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
          <h2 className="home__features-title">Why Choose Us?</h2>
          <p className="home__features-subtitle">A professional service you can trust.</p>
        </div>
        <div className="home__features-grid">
            {features.map((feature) => (
                <div key={feature.name} className="home__feature-item">
                    <h3 className="home__feature-item-title">{feature.name}</h3>
                    <p className="home__feature-item-description">{feature.description}</p>
                </div>
            ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="home__testimonials">
        <h2 className="home__testimonials-title">What Our Customers Say</h2>
        <div className="home__testimonial-card">
            <blockquote>
                <p className="home__testimonial-quote">"The service was incredibly fast and professional. I was kept updated throughout the entire process. Highly recommend!"</p>
            </blockquote>
            <figcaption className="home__testimonial-author">- Alex_P, CS2 Rank Boost</figcaption>
        </div>
      </section>

      {/* Final CTA */}
      <section className="home__cta">
        <div className="home__cta-box">
            <h2 className="home__cta-title">Ready to Climb the Ranks?</h2>
            <p className="home__cta-subtitle">Don't let the grind hold you back. Let our experts help you achieve your goals.</p>
            <div className="home__cta-button">
                <Link href="/games" className="button button--light button--lg">
                  Start Your Order
                </Link>
            </div>
        </div>
      </section>
    </div>
  );
}
