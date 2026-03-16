import type { Metadata } from 'next';
import { RankBoostCalculator } from '@/features/boost/components/RankBoostCalculator';
import { CS2_RANKS } from '@/features/boost/config/cs2';
import { FAQ } from '@/components/shared/FAQ';
import { CTA } from '@/components/shared/CTA';
import { ServiceSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';
import '../../ServicePage.css';

export const metadata: Metadata = {
  title: 'CS2 Rank Boost Service | Fast & Secure',
  description:
    'Professional CS2 rank boosting service. Fast delivery, secure process, experienced boosters. Silver to Global Elite by verified Global Elite players.',
  openGraph: {
    title: 'CS2 Rank Boost | FANCY BOOST',
    description: 'CS2 rank boosting by Global Elite players. Fast, safe, and guaranteed.',
    url: '/games/cs2/boost/rank',
  },
  alternates: { canonical: '/games/cs2/boost/rank' },
};

export default function CS2RankBoostPage() {
  return (
    <div className="service">
      <ServiceSchema
        name="CS2 Rank Boost"
        description="Professional CS2 rank boosting service. Boost from Silver to Global Elite by verified top-tier players. Fast, safe, and guaranteed."
        url="/games/cs2/boost/rank"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'CS2', href: '/games/cs2' },
          { name: 'Rank Boost', href: '/games/cs2/boost/rank' },
        ]}
      />
      <div className="service__container">
        <div className="service__header">
          <h1 className="service__title">
            CS2 Rank Boost
          </h1>
          <p className="service__description">
            Select your current and desired rank. Our professional CS2 players will handle the rest through manual progression.
          </p>
        </div>

        <RankBoostCalculator config={CS2_RANKS} />

        <section className="service__how-it-works">
          <div className="service__how-it-works-header">
            <h2 className="service__how-it-works-title">
              How It Works
            </h2>
            <p className="service__description">
              A simple and transparent process to get you to your desired CS2 rank.
            </p>
          </div>
          <div className="service__steps">
            <div className="service__step">
              <div className="service__step-number">1</div>
              <h3 className="service__step-title">Configure Order</h3>
              <p className="service__step-description">Choose your current and desired CS2 ranks and any extra options.</p>
            </div>
            <div className="service__step">
              <div className="service__step-number">2</div>
              <h3 className="service__step-title">Secure Checkout</h3>
              <p className="service__step-description">Complete your payment through our secure processor.</p>
            </div>
            <div className="service__step">
              <div className="service__step-number">3</div>
              <h3 className="service__step-title">Booster In Action</h3>
              <p className="service__step-description">An experienced CS2 player starts working on your account progression.</p>
            </div>
            <div className="service__step">
              <div className="service__step-number">4</div>
              <h3 className="service__step-title">Enjoy Your Rank</h3>
              <p className="service__step-description">We'll notify you once the order is complete. Enjoy your new CS2 rank!</p>
            </div>
          </div>
        </section>

        <section className="service__faq">
          <div className="service__faq-header">
            <h2 className="service__faq-title">
              Frequently Asked Questions
            </h2>
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
