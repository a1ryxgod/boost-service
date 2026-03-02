import type { Metadata } from 'next';
import './About.css';

export const metadata: Metadata = {
  title: 'About Us',
};

const stats = [
  { value: '10K+', label: 'Orders Completed' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '3min', label: 'Avg. Response Time' },
  { value: '99%', label: 'Satisfaction Rate' },
];

const values = [
  {
    icon: '🔒',
    title: 'Security First',
    description: 'We use VPN protection and professional techniques to ensure your account stays safe throughout the entire process.',
  },
  {
    icon: '⚡',
    title: 'Fast Delivery',
    description: 'Our boosters are online 24/7. Most orders start within minutes of purchase and are completed ahead of schedule.',
  },
  {
    icon: '🏆',
    title: 'Top-Tier Players',
    description: 'Every booster on our platform is hand-picked and verified. We only work with players in the top 1% of their game.',
  },
  {
    icon: '💬',
    title: 'Live Support',
    description: 'Have a question? Our support team is available around the clock via live chat to assist you at any stage.',
  },
  {
    icon: '🎮',
    title: 'Multi-Game Coverage',
    description: 'From CS2 and Dota 2 to Valorant and League of Legends — we cover all the major competitive titles.',
  },
  {
    icon: '💸',
    title: 'Fair Pricing',
    description: 'We offer transparent, competitive pricing with no hidden fees. Pay only for what you need.',
  },
];

const team = [
  {
    name: 'Alex',
    role: 'Founder & CS2 Pro',
    rank: 'Global Elite',
    emoji: '🎯',
  },
  {
    name: 'Dmitry',
    role: 'Dota 2 Lead',
    rank: '9000+ MMR',
    emoji: '🛡️',
  },
  {
    name: 'Maria',
    role: 'Support Lead',
    rank: 'Always Online',
    emoji: '💬',
  },
  {
    name: 'Kevin',
    role: 'Valorant Expert',
    rank: 'Radiant',
    emoji: '⚡',
  },
];

export default function AboutPage() {
  return (
    <div className="about">

      {/* Hero */}
      <section className="about__hero">
        <div className="about__hero-inner">
          <p className="about__hero-tag">About FANCY BOOST</p>
          <h1 className="about__hero-title">
            We live and breathe<br />
            <span className="about__hero-gradient">competitive gaming</span>
          </h1>
          <p className="about__hero-desc">
            Founded by top-ranked players, FANCY BOOST was built with one mission:
            to help every gamer reach the rank they deserve — fast, safe, and hassle-free.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="about__stats">
        <div className="about__stats-inner">
          {stats.map((s) => (
            <div key={s.label} className="about__stat">
              <span className="about__stat-value">{s.value}</span>
              <span className="about__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="about__section">
        <div className="about__section-inner about__story">
          <div className="about__story-text">
            <h2 className="about__section-title">Our Story</h2>
            <p>
              FANCY BOOST started in 2021 when a group of high-ranked friends got tired of
              sketchy boosting services that put accounts at risk. We decided to do it right —
              with real pros, clean methods, and honest communication.
            </p>
            <p>
              Today we're a trusted platform serving thousands of players across CS2, Dota 2,
              Valorant, and League of Legends. Every order is handled personally, every client
              matters to us.
            </p>
            <p>
              We're not a faceless corporation. We're gamers — and we know exactly what you
              want when you hand us your account.
            </p>
          </div>
          <div className="about__story-visual">
            <div className="about__story-card">
              <div className="about__story-card-icon">🎮</div>
              <div className="about__story-card-year">Est. 2021</div>
              <div className="about__story-card-text">Built by gamers, for gamers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about__section about__section--dark">
        <div className="about__section-inner">
          <h2 className="about__section-title about__section-title--center">Why Choose Us</h2>
          <div className="about__values">
            {values.map((v) => (
              <div key={v.title} className="about__value-card">
                <span className="about__value-icon">{v.icon}</span>
                <h3 className="about__value-title">{v.title}</h3>
                <p className="about__value-desc">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about__section">
        <div className="about__section-inner">
          <h2 className="about__section-title about__section-title--center">Meet the Team</h2>
          <p className="about__section-subtitle">The pros behind every boost</p>
          <div className="about__team">
            {team.map((member) => (
              <div key={member.name} className="about__team-card">
                <div className="about__team-avatar">{member.emoji}</div>
                <h3 className="about__team-name">{member.name}</h3>
                <p className="about__team-role">{member.role}</p>
                <span className="about__team-rank">{member.rank}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about__cta">
        <div className="about__cta-inner">
          <h2 className="about__cta-title">Ready to rank up?</h2>
          <p className="about__cta-desc">Join thousands of players who already trust FANCY BOOST.</p>
          <div className="about__cta-buttons">
            <a href="/games/cs2" className="about__cta-btn about__cta-btn--primary">Browse Services</a>
            <a href="/register" className="about__cta-btn about__cta-btn--secondary">Create Account</a>
          </div>
        </div>
      </section>

    </div>
  );
}
