import type { Metadata } from 'next';
import { OrderForm } from '@/features/order/components/OrderForm';
import { RankSelector } from '@/features/boost/components/RankSelector';
import { DuoToggle } from '@/features/boost/components/DuoToggle';
import PriceSummary from '@/components/shared/PriceSummary';
import { FAQ } from '@/components/shared/FAQ';
import { CTA } from '@/components/shared/CTA';
import '../ServicePage.css';

export const metadata: Metadata = {
  title: 'CS2 Rank Boost Service | Fast & Secure',
  description:
    'Professional CS2 rank boosting service. Fast delivery, secure process, experienced boosters.',
};

export default function RankBoostPage({ params }: { params: { game: string } }) {
  const gameName = params.game.toUpperCase();

  return (
    <div className="service">
      <div className="service__container">
        {/* Service Header */}
        <div className="service__header">
          <h1 className="service__title">
            {gameName} Rank Boost
          </h1>
          <p className="service__description">
            Select your current and desired rank. Our professional players will handle the rest through manual progression.
          </p>
        </div>

        {/* Service Grid */}
        <div className="service__grid">
          {/* Order Form Section */}
          <section className="service__form-section">
            <OrderForm>
              <div className="service__form-content">
                <RankSelector />
                <DuoToggle />
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
              How It Works
            </h2>
            <p className="service__description">
              A simple and transparent process to get you to your desired rank.
            </p>
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

        {/* FAQ Section */}
        <section className="service__faq">
          <div className="service__faq-header">
            <h2 className="service__faq-title">
              Frequently Asked Questions
            </h2>
            <p className="service__description">
              Answers to common questions about our {gameName} boosting services.
            </p>
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
