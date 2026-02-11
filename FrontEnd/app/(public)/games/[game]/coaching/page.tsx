import type { Metadata } from 'next';
import { OrderForm } from '@/features/order/components/OrderForm';
import { CoachSelector } from '@/features/boost/components/CoachSelector';
import { HoursSelector } from '@/features/boost/components/HoursSelector';
import PriceSummary from '@/components/shared/PriceSummary';
import { FAQ } from '@/components/shared/FAQ';
import { CTA } from '@/components/shared/CTA';
import '../ServicePage.css';

export const metadata: Metadata = {
  title: 'CS2 Coaching | Personalized Gameplay Improvement',
  description: 'Book a session with a professional CS2 coach. Get personalized feedback and live instruction to elevate your game.',
};

export default function CoachingPage({ params }: { params: { game: string } }) {
  const gameName = params.game.toUpperCase();

  return (
    <div className="service">
      <div className="service__container">
        {/* Service Header */}
        <div className="service__header">
          <h1 className="service__title">
            {gameName} Coaching
          </h1>
          <p className="service__description">
            The fastest way to improve is to learn from the best. Book a one-on-one coaching session with a verified professional player.
          </p>
        </div>

        {/* Service Grid */}
        <div className="service__grid">
          {/* Order Form Section */}
          <section className="service__form-section">
            <OrderForm>
              <div className="service__form-content">
                <CoachSelector />
                <HoursSelector />
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
              How Coaching Works
            </h2>
          </div>
          <div className="service__steps">
            <div className="service__step">
              <div className="service__step-number">1</div>
              <h3 className="service__step-title">Choose Your Coach</h3>
              <p className="service__step-description">Select a coach and the number of hours for your session.</p>
            </div>
            <div className="service__step">
              <div className="service__step-number">2</div>
              <h3 className="service__step-title">Schedule & Pay</h3>
              <p className="service__step-description">Find a time that fits your schedule and complete the payment.</p>
            </div>
            <div className="service__step">
              <div className="service__step-number">3</div>
              <h3 className="service__step-title">Live Session</h3>
              <p className="service__step-description">Join your coach for live gameplay analysis or VOD review.</p>
            </div>
            <div className="service__step">
              <div className="service__step-number">4</div>
              <h3 className="service__step-title">Improve Your Play</h3>
              <p className="service__step-description">Apply the lessons and see a real difference in your performance.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="service__faq">
          <div className="service__faq-header">
            <h2 className="service__faq-title">
              Coaching FAQ
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
