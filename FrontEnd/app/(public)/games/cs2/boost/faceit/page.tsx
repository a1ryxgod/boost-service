import type { Metadata } from 'next';
import { FaceitBoostCalculator } from '@/features/boost/components/FaceitBoostCalculator';
import { CS2_FACEIT } from '@/features/boost/config/cs2';
import { FAQ } from '@/components/shared/FAQ';
import { CTA } from '@/components/shared/CTA';
import '../../ServicePage.css';

export const metadata: Metadata = {
  title: 'CS2 FACEIT Boost | Level Up Your FACEIT Account',
  description:
    'Professional CS2 FACEIT boosting service. Climb FACEIT levels 1-10 with experienced players.',
};

export default function CS2FaceitBoostPage() {
  return (
    <div className="service">
      <div className="service__container">
        <div className="service__header">
          <h1 className="service__title">
            CS2 FACEIT Boost
          </h1>
          <p className="service__description">
            Select your current and desired FACEIT level. Our professional CS2 players
            will boost your FACEIT account through manual play.
          </p>
        </div>

        <FaceitBoostCalculator config={CS2_FACEIT} />

        <section className="service__how-it-works">
          <div className="service__how-it-works-header">
            <h2 className="service__how-it-works-title">
              How FACEIT Boost Works
            </h2>
          </div>
          <div className="service__steps">
            <div className="service__step">
              <div className="service__step-number">1</div>
              <h3 className="service__step-title">Select Levels</h3>
              <p className="service__step-description">Choose your current and desired FACEIT level (1-10).</p>
            </div>
            <div className="service__step">
              <div className="service__step-number">2</div>
              <h3 className="service__step-title">Secure Checkout</h3>
              <p className="service__step-description">Complete your payment through our secure processor.</p>
            </div>
            <div className="service__step">
              <div className="service__step-number">3</div>
              <h3 className="service__step-title">Pro Player Assigned</h3>
              <p className="service__step-description">A top-tier FACEIT player starts boosting your account ELO.</p>
            </div>
            <div className="service__step">
              <div className="service__step-number">4</div>
              <h3 className="service__step-title">Level Achieved</h3>
              <p className="service__step-description">We notify you once your desired FACEIT level is reached!</p>
            </div>
          </div>
        </section>

        <section className="service__faq">
          <div className="service__faq-header">
            <h2 className="service__faq-title">
              FACEIT Boost FAQ
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
