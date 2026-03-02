import type { Metadata } from 'next';
import Link from 'next/link';
import './HowItWorks.css';

export const metadata: Metadata = {
  title: 'How It Works',
};

const steps = [
  {
    number: '01',
    icon: '🎮',
    title: 'Choose Your Service',
    description:
      'Browse our catalog and pick the service you need — rank boost, FACEIT boost, MMR boost, coaching, or a pre-ranked account. Select your current rank and desired goal.',
  },
  {
    number: '02',
    icon: '⚙️',
    title: 'Configure & Checkout',
    description:
      'Customise your order: pick duo or solo play, set extra options like stream, offline mode, or specific heroes/agents. Review the price and proceed to secure checkout.',
  },
  {
    number: '03',
    icon: '✅',
    title: 'Order Confirmed',
    description:
      'After payment your order is instantly visible in your personal dashboard. Our system notifies available boosters and one is assigned within minutes.',
  },
  {
    number: '04',
    icon: '🚀',
    title: 'Boosting Begins',
    description:
      'Your assigned pro logs in (or plays alongside you in duo mode) and starts climbing. You can follow progress live in the dashboard and chat with your booster any time.',
  },
  {
    number: '05',
    icon: '🏆',
    title: 'Goal Reached',
    description:
      'Once your target rank is achieved you get notified immediately. Your booster logs out, you log back in and enjoy your new rank. Simple as that.',
  },
  {
    number: '06',
    icon: '⭐',
    title: 'Leave a Review',
    description:
      'Happy with the result? Leave a review for your booster — it helps the community and rewards our top performers. Not happy? Contact support and we make it right.',
  },
];

const faqs = [
  {
    q: 'Is my account safe?',
    a: 'Yes. All our boosters use VPN to match your region, play at normal human speed, and avoid stream-snipers. We have never had a VAC ban or account theft in our history.',
  },
  {
    q: 'How long does an order take?',
    a: 'Most orders start within 5–15 minutes of purchase. Completion time depends on the rank gap — a single division usually takes a few hours, while larger boosts may take 1–3 days.',
  },
  {
    q: "Can I play on my account while it's being boosted?",
    a: "We recommend pausing the boost while you play to avoid conflicting sessions. You can pause/resume your order any time from the dashboard.",
  },
  {
    q: "What if I'm not satisfied?",
    a: "We offer free re-dos if the result doesn't match your order, and partial or full refunds for uncompleted work. Just open a support chat and we'll sort it out fast.",
  },
  {
    q: 'Do you offer duo boosting?',
    a: 'Yes! With duo mode the booster queues alongside you on their own account. You play your own games — they just carry. Perfect if you prefer to stay logged in.',
  },
];

export default function HowItWorksPage() {
  return (
    <div className="hiw">

      {/* Hero */}
      <section className="hiw__hero">
        <div className="hiw__hero-inner">
          <p className="hiw__hero-tag">Simple. Fast. Safe.</p>
          <h1 className="hiw__hero-title">
            How <span className="hiw__gradient">FANCY BOOST</span> works
          </h1>
          <p className="hiw__hero-desc">
            From order to achievement in just a few steps. No complicated setup — just pick your goal and let our pros handle the rest.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="hiw__steps-section">
        <div className="hiw__steps-inner">
          <div className="hiw__steps">
            {steps.map((step, i) => (
              <div key={step.number} className="hiw__step">
                <div className="hiw__step-left">
                  <div className="hiw__step-number">{step.number}</div>
                  {i < steps.length - 1 && <div className="hiw__step-line" />}
                </div>
                <div className="hiw__step-content">
                  <div className="hiw__step-icon">{step.icon}</div>
                  <div>
                    <h3 className="hiw__step-title">{step.title}</h3>
                    <p className="hiw__step-desc">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="hiw__trust">
        <div className="hiw__trust-inner">
          <div className="hiw__trust-item">
            <span className="hiw__trust-icon">🔒</span>
            <span>VPN Protected</span>
          </div>
          <div className="hiw__trust-item">
            <span className="hiw__trust-icon">⚡</span>
            <span>Starts in &lt; 15 min</span>
          </div>
          <div className="hiw__trust-item">
            <span className="hiw__trust-icon">💬</span>
            <span>24/7 Live Chat</span>
          </div>
          <div className="hiw__trust-item">
            <span className="hiw__trust-icon">🔄</span>
            <span>Pause Anytime</span>
          </div>
          <div className="hiw__trust-item">
            <span className="hiw__trust-icon">💸</span>
            <span>Money-Back Guarantee</span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="hiw__faq-section">
        <div className="hiw__faq-inner">
          <h2 className="hiw__section-title">Frequently Asked Questions</h2>
          <div className="hiw__faqs">
            {faqs.map((item) => (
              <div key={item.q} className="hiw__faq">
                <h3 className="hiw__faq-q">{item.q}</h3>
                <p className="hiw__faq-a">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hiw__cta">
        <div className="hiw__cta-inner">
          <h2 className="hiw__cta-title">Ready to get started?</h2>
          <p className="hiw__cta-desc">Pick your game and let&apos;s climb together.</p>
          <div className="hiw__cta-buttons">
            <Link href="/games/cs2" className="hiw__cta-btn hiw__cta-btn--primary">CS2</Link>
            <Link href="/games/dota2" className="hiw__cta-btn hiw__cta-btn--primary">Dota 2</Link>
            <Link href="/games/valorant" className="hiw__cta-btn hiw__cta-btn--secondary">Valorant</Link>
            <Link href="/games/lol" className="hiw__cta-btn hiw__cta-btn--secondary">LoL</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
