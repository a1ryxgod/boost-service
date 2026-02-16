import type { Metadata } from 'next';
import { MmrBoostCalculator } from '@/features/boost/components/MmrBoostCalculator';
import { DOTA2_MMR } from '@/features/boost/config/dota2';
import { FAQ } from '@/components/shared/FAQ';
import { CTA } from '@/components/shared/CTA';
import '../../ServicePage.css';

export const metadata: Metadata = {
  title: 'Dota 2 MMR Boosting Service | Fast & Secure',
  description:
    'Professional Dota 2 MMR boosting service. Fast delivery, secure process, experienced boosters.',
};

export default function Dota2MmrBoostPage() {
  return (
    <div className="service">
      <div className="service__container">
        <div className="service__header">
          <h1 className="service__title">
            Dota 2 MMR Boosting
          </h1>
          <p className="service__description">
            Select your current and desired MMR. Choose party boost to play alongside our professional players.
          </p>
        </div>

        <MmrBoostCalculator config={DOTA2_MMR} />

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
              <p className="service__step-description">Choose your current and desired MMR. Enable party boost if you want to play together.</p>
            </div>
            <div className="service__step">
              <div className="service__step-number">2</div>
              <h3 className="service__step-title">Secure Checkout</h3>
              <p className="service__step-description">Complete your payment through our secure processor.</p>
            </div>
            <div className="service__step">
              <div className="service__step-number">3</div>
              <h3 className="service__step-title">Booster In Action</h3>
              <p className="service__step-description">An experienced Dota 2 player starts working on your MMR progression.</p>
            </div>
            <div className="service__step">
              <div className="service__step-number">4</div>
              <h3 className="service__step-title">Enjoy Your MMR</h3>
              <p className="service__step-description">We notify you once complete. Enjoy your new Dota 2 rank!</p>
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
