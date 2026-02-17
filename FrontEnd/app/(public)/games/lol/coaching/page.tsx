import type { Metadata } from 'next';
import { FAQ } from '@/components/shared/FAQ';
import { CTA } from '@/components/shared/CTA';
import '../ServicePage.css';
import './Coaching.css';

export const metadata: Metadata = {
  title: 'League of Legends Coaching | Learn from Professional Players',
  description: 'Improve your LoL skills with personalized coaching from top-tier players.',
};

const plans = [
  {
    title: '1 Hour',
    price: 24.99,
    features: ['Live gameplay review', 'Basic strategy tips', 'Q&A session'],
  },
  {
    title: '3 Hours',
    price: 64.99,
    features: ['In-depth replay analysis', 'Champion & role guidance', 'Personalized game plan', 'Priority scheduling'],
    popular: true,
  },
  {
    title: '5 Hours',
    price: 99.99,
    features: ['Full gameplay overhaul', 'Advanced mechanics training', 'Macro play & teamfight coaching', 'Ongoing support via chat', 'Progress tracking'],
  },
];

export default function LoLCoachingPage() {
  return (
    <div className="service">
      <div className="service__container">
        <div className="service__header">
          <h1 className="service__title">League of Legends Coaching</h1>
          <p className="service__description">
            One-on-one sessions with Challenger-ranked players. Get personalized advice, replay analysis, and actionable tips to improve your gameplay.
          </p>
        </div>

        <div className="coaching__plans">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className={`coaching__card ${plan.popular ? 'coaching__card--popular' : ''}`}
            >
              {plan.popular && <span className="coaching__card-badge">Best Value</span>}
              <h3 className="coaching__card-title">{plan.title}</h3>
              <div className="coaching__card-price">
                <span className="coaching__card-price-value">${plan.price}</span>
              </div>
              <ul className="coaching__card-features">
                {plan.features.map((f) => (
                  <li key={f} className="coaching__card-feature">{f}</li>
                ))}
              </ul>
              <button className="coaching__card-button">Select Plan</button>
            </div>
          ))}
        </div>

        <section className="service__how-it-works">
          <div className="service__how-it-works-header">
            <h2 className="service__how-it-works-title">How It Works</h2>
          </div>
          <div className="service__steps">
            <div className="service__step">
              <div className="service__step-number">1</div>
              <h3 className="service__step-title">Choose a Plan</h3>
              <p className="service__step-description">Pick the coaching package that fits your goals.</p>
            </div>
            <div className="service__step">
              <div className="service__step-number">2</div>
              <h3 className="service__step-title">Schedule</h3>
              <p className="service__step-description">Book a time that works for you with your assigned coach.</p>
            </div>
            <div className="service__step">
              <div className="service__step-number">3</div>
              <h3 className="service__step-title">Learn & Improve</h3>
              <p className="service__step-description">Join a live session via Discord. Get real-time feedback and analysis.</p>
            </div>
            <div className="service__step">
              <div className="service__step-number">4</div>
              <h3 className="service__step-title">Climb Ranks</h3>
              <p className="service__step-description">Apply what you learned and watch your rank improve.</p>
            </div>
          </div>
        </section>

        <section className="service__faq">
          <div className="service__faq-header">
            <h2 className="service__faq-title">Frequently Asked Questions</h2>
          </div>
          <div className="service__faq-content">
            <FAQ />
          </div>
        </section>

        <div className="service__cta">
          <CTA />
        </div>
      </div>
    </div>
  );
}
