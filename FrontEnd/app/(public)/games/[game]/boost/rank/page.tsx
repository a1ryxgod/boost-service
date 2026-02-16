import type { Metadata } from 'next';
import { RankBoostCalculator } from '@/features/boost/components/RankBoostCalculator';
import { getGameConfig } from '@/features/boost/config/games';
import { FAQ } from '@/components/shared/FAQ';
import { CTA } from '@/components/shared/CTA';
import { notFound } from 'next/navigation';
import '../../ServicePage.css';

export const metadata: Metadata = {
  title: 'Rank Boost Service | Fast & Secure',
  description:
    'Professional rank boosting service. Fast delivery, secure process, experienced boosters.',
};

export default function RankBoostPage({ params }: { params: { game: string } }) {
  const config = getGameConfig(params.game);

  if (!config) {
    notFound();
  }

  return (
    <div className="service">
      <div className="service__container">
        <div className="service__header">
          <h1 className="service__title">
            {config.gameName} Rank Boost
          </h1>
          <p className="service__description">
            Select your current and desired rank. Our professional players will handle the rest through manual progression.
          </p>
        </div>

        <RankBoostCalculator config={config} />

        <section className="service__how-it-works">
          <div className="service__how-it-works-header">
            <h2 className="service__how-it-works-title">
              How It Works
            </h2>
          </div>
          <div className="service__steps">
            <div className="service__step">
              <div className="service__step-number">1</div>
              <h3 className="service__step-title">Configure Order</h3>
              <p className="service__step-description">Choose your current and desired ranks and any extra options.</p>
            </div>
            <div className="service__step">
              <div className="service__step-number">2</div>
              <h3 className="service__step-title">Secure Checkout</h3>
              <p className="service__step-description">Complete your payment through our secure processor.</p>
            </div>
            <div className="service__step">
              <div className="service__step-number">3</div>
              <h3 className="service__step-title">Booster In Action</h3>
              <p className="service__step-description">An experienced player starts working on your account progression.</p>
            </div>
            <div className="service__step">
              <div className="service__step-number">4</div>
              <h3 className="service__step-title">Enjoy Your Rank</h3>
              <p className="service__step-description">We'll notify you once the order is complete. Enjoy your new rank!</p>
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
