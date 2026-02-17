import type { Metadata } from 'next';
import { FAQ } from '@/components/shared/FAQ';
import { CTA } from '@/components/shared/CTA';
import '../../ServicePage.css';

export const metadata: Metadata = {
  title: 'Win Boosting | Fast & Secure Net Wins',
  description:
    'Purchase wins, played by professional boosters. Secure, fast, and reliable service to improve your stats.',
};

export default function WinBoostPage() {
  return (
    <div className="service">
      <div className="service__container">
        <div className="service__header">
          <h1 className="service__title">
            Win Boosting
          </h1>
          <p className="service__description">
            Select the number of wins you want. Our professionals will secure them for you.
          </p>
        </div>

        <div className="service__placeholder">
          <p>Win boosting calculator coming soon...</p>
        </div>

        <section className="service__how-it-works">
          <div className="service__how-it-works-header">
            <h2 className="service__how-it-works-title">
              A Simple Process
            </h2>
          </div>
          <div className="service__steps">
            <div className="service__step">
              <div className="service__step-number">1</div>
              <h3 className="service__step-title">Select Wins</h3>
              <p className="service__step-description">Choose the number of net wins you need.</p>
            </div>
            <div className="service__step">
              <div className="service__step-number">2</div>
              <h3 className="service__step-title">Secure Checkout</h3>
              <p className="service__step-description">Complete your payment through our secure processor.</p>
            </div>
            <div className="service__step">
              <div className="service__step-number">3</div>
              <h3 className="service__step-title">Booster In Action</h3>
              <p className="service__step-description">An experienced player starts playing on your account.</p>
            </div>
            <div className="service__step">
              <div className="service__step-number">4</div>
              <h3 className="service__step-title">Enjoy The Results</h3>
              <p className="service__step-description">We'll notify you upon completion. Enjoy your improved stats!</p>
            </div>
          </div>
        </section>

        <section className="service__faq">
          <div className="service__faq-header">
            <h2 className="service__faq-title">
              Win Boosting FAQ
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
