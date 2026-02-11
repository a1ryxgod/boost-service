import type { Metadata } from 'next';
import { OrderForm } from '@/features/order/components/OrderForm';
import { PlacementGamesSelector } from '@/features/boost/components/PlacementGamesSelector';
import { DuoToggle } from '@/features/boost/components/DuoToggle';
import PriceSummary from '@/components/shared/PriceSummary';
import { FAQ } from '@/components/shared/FAQ';
import { CTA } from '@/components/shared/CTA';
import '../../ServicePage.css';

export const metadata: Metadata = {
  title: 'Dota 2 Calibration Matches Boosting | Start Strong',
  description:
    'Have your Dota 2 calibration matches played by professionals. Secure a high starting MMR for the new season.',
};

export default function Dota2CalibrationBoostPage() {
  return (
    <div className="service">
      <div className="service__container">
        <div className="service__header">
          <h1 className="service__title">
            Dota 2 Calibration Matches
          </h1>
          <p className="service__description">
            Start the season with a strong advantage. Our pro Dota 2 players will play your calibration matches to aim for the best possible start.
          </p>
        </div>

        <div className="service__grid">
          <section className="service__form-section">
            <OrderForm>
              <div className="service__form-content">
                <PlacementGamesSelector />
                <DuoToggle />
              </div>
            </OrderForm>
          </section>

          <aside className="service__summary">
            <PriceSummary />
          </aside>
        </div>

        <section className="service__how-it-works">
          <div className="service__how-it-works-header">
            <h2 className="service__how-it-works-title">
              How Calibration Works
            </h2>
          </div>
          <div className="service__steps">
            <div className="service__step">
              <div className="service__step-number">1</div>
              <h3 className="service__step-title">Select Games</h3>
              <p className="service__step-description">Choose the number of Dota 2 calibration games you need played.</p>
            </div>
            <div className="service__step">
              <div className="service__step-number">2</div>
              <h3 className="service__step-title">Secure Checkout</h3>
              <p className="service__step-description">Complete your payment through our secure processor.</p>
            </div>
            <div className="service__step">
              <div className="service__step-number">3</div>
              <h3 className="service__step-title">Pro Player Assigned</h3>
              <p className="service__step-description">A top-tier Dota 2 player starts on your calibration matches.</p>
            </div>
            <div className="service__step">
              <div className="service__step-number">4</div>
              <h3 className="service__step-title">Get Your MMR</h3>
              <p className="service__step-description">We notify you once done. Discover your new starting Dota 2 MMR!</p>
            </div>
          </div>
        </section>

        <section className="service__faq">
          <div className="service__faq-header">
            <h2 className="service__faq-title">
              Calibration Matches FAQ
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
