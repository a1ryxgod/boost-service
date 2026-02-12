import type { Metadata } from 'next';
import { RankBoostCalculator } from '@/features/boost/components/RankBoostCalculator';
import { DOTA2_RANKS } from '@/features/boost/config/dota2';
import { FAQ } from '@/components/shared/FAQ';
import { CTA } from '@/components/shared/CTA';
import '../../ServicePage.css';

export const metadata: Metadata = {
  title: 'Dota 2 MMR Boosting Service | Fast & Secure',
  description:
    'Professional Dota 2 MMR boosting service. Fast delivery, secure process, experienced boosters.',
};

export default function Dota2RankBoostPage() {
  return (
    <div className="service">
      <div className="service__container">
        <div className="service__header">
          <h1 className="service__title">
            Dota 2 MMR Boosting
          </h1>
          <p className="service__description">
            Select your current and desired MMR. Our professional Dota 2 players will handle the rest through manual progression.
          </p>
        </div>

        <RankBoostCalculator config={DOTA2_RANKS} />

        <section className="service__how-it-works">
          <div className="service__how-it-works-header">
            <h2 className="service__how-it-works-title">
              How It Works
            </h2>
            <p className="service__description">
              A simple and transparent process to get you to your desired Dota 2 MMR.
            </p>
          </div>
          <div className="service__steps">
            <div className="service__step">
              <div className="service__step-number">1</div>
              <h3 className="service__step-title">Configure Order</h3>
              <p className="service__step-description">Choose your current and desired Dota 2 MMR and any extra options.</p>
            </div>
            <div className="service__step">
              <div className="service__step-number">2</div>
              <h3 className="service__step-title">Secure Checkout</h3>
              <p className="service__step-description">Complete your payment through our secure processor.</p>
            </div>
            <div className="service__step">
              <div className="service__step-number">3</div>
              <h3 className="service__step-title">Booster In Action</h3>
              <p className="service__step-description">An experienced Dota 2 player starts working on your account progression.</p>
            </div>
            <div className="service__step">
              <div className="service__step-number">4</div>
              <h3 className="service__step-title">Enjoy Your MMR</h3>
              <p className="service__step-description">We'll notify you once the order is complete. Enjoy your new Dota 2 MMR!</p>
            </div>
          </div>
        </section>

        <section className="service__faq">
          <div className="service__faq-header">
            <h2 className="service__faq-title">
              Frequently Asked Questions
            </h2>
            <p className="service__description">
              Answers to common questions about our Dota 2 boosting services.
            </p>
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
