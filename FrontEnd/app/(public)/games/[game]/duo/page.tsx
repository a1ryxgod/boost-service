import type { Metadata } from 'next';
import { OrderForm } from '@/features/order/components/OrderForm';
import { DuoGamesSelector } from '@/features/boost/components/DuoGamesSelector';
import { RankSelector } from '@/features/boost/components/RankSelector';
import PriceSummary from '@/components/shared/PriceSummary';
import { FAQ } from '@/components/shared/FAQ';
import { CTA } from '@/components/shared/CTA';
import '../ServicePage.css';

export const metadata: Metadata = {
  title: 'CS2 Duo Boosting | Play with a Pro',
  description: 'Queue up with a professional player and climb the ranks together. The safest way to boost your CS2 rank.',
};

export default function DuoBoostPage({ params }: { params: { game: string } }) {
  const gameName = params.game.toUpperCase();

  return (
    <div className="service">
      <div className="service__container">
        {/* Service Header */}
        <div className="service__header">
          <h1 className="service__title">
            {gameName} Duo Boosting
          </h1>
          <p className="service__description">
            Play alongside one of our experienced boosters. Learn from the best and improve your own gameplay while ranking up. No account sharing required.
          </p>
        </div>

        {/* Service Grid */}
        <div className="service__grid">
          {/* Order Form Section */}
          <section className="service__form-section">
            <OrderForm>
              <div className="service__form-content">
                <RankSelector />
                <DuoGamesSelector />
              </div>
            </OrderForm>
          </section>

          {/* Price Summary Section */}
          <aside className="service__summary">
            <PriceSummary />
          </aside>
        </div>

        {/* How It Works Section */}
        <section className="service__how-it-works">
          <div className="service__how-it-works-header">
            <h2 className="service__how-it-works-title">
              How Duo Boosting Works
            </h2>
          </div>
          <div className="service__steps">
            <div className="service__step">
              <div className="service__step-number">1</div>
              <h3 className="service__step-title">Configure Your Order</h3>
              <p className="service__step-description">Select your rank and the number of games you want to play.</p>
            </div>
            <div className="service__step">
              <div className="service__step-number">2</div>
              <h3 className="service__step-title">Schedule & Pay</h3>
              <p className="service__step-description">Choose a time that works for you and complete the secure payment.</p>
            </div>
            <div className="service__step">
              <div className="service__step-number">3</div>
              <h3 className="service__step-title">Play with a Pro</h3>
              <p className="service__step-description">We'll invite you to the lobby at your scheduled time. Let the climbing begin!</p>
            </div>
            <div className="service__step">
              <div className="service__step-number">4</div>
              <h3 className="service__step-title">Achieve Your Goal</h3>
              <p className="service__step-description">Enjoy the wins and the lessons learned along the way.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="service__faq">
          <div className="service__faq-header">
            <h2 className="service__faq-title">
              Duo Boosting FAQ
            </h2>
          </div>
          <div className="service__faq-content">
            <FAQ />
          </div>
        </section>

        {/* CTA Footer */}
        <div className="service__cta">
          <CTA />
        </div>
      </div>
    </div>
  );
}
