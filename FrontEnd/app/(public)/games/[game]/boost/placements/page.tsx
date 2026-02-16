import type { Metadata } from 'next';
import { FAQ } from '@/components/shared/FAQ';
import { CTA } from '@/components/shared/CTA';
import '../../ServicePage.css';

export const metadata: Metadata = {
  title: 'Placement Matches Boosting | Start Strong',
  description:
    'Have your placement matches played by professionals. Secure a high starting rank for the new season.',
};

export default function PlacementsBoostPage({ params }: { params: { game: string } }) {
  const gameName = params.game.toUpperCase();

  return (
    <div className="service">
      <div className="service__container">
        <div className="service__header">
          <h1 className="service__title">
            {gameName} Placement Matches
          </h1>
          <p className="service__description">
            Start the season with a strong advantage. Our pro players will play your placement matches to aim for the best possible start.
          </p>
        </div>

        <div className="service__grid">
          <section className="service__form-section">
            <p style={{ color: '#A0A0A0', padding: '2rem' }}>Placement selector coming soon</p>
          </section>
        </div>

        {/* How It Works Section */}
        <section className="service__how-it-works">
          <div className="service__how-it-works-header">
            <h2 className="service__how-it-works-title">
              How Placements Work
            </h2>
          </div>
          <div className="service__steps">
            <div className="service__step">
              <div className="service__step-number">1</div>
              <h3 className="service__step-title">Select Games</h3>
              <p className="service__step-description">Choose the number of placement games you need played.</p>
            </div>
            <div className="service__step">
              <div className="service__step-number">2</div>
              <h3 className="service__step-title">Secure Checkout</h3>
              <p className="service__step-description">Complete your payment through our secure processor.</p>
            </div>
            <div className="service__step">
              <div className="service__step-number">3</div>
              <h3 className="service__step-title">Pro Player Assigned</h3>
              <p className="service__step-description">A top-tier player starts on your placement matches.</p>
            </div>
            <div className="service__step">
              <div className="service__step-number">4</div>
              <h3 className="service__step-title">Get Your Rank</h3>
              <p className="service__step-description">We notify you once done. Discover your new starting rank!</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="service__faq">
          <div className="service__faq-header">
            <h2 className="service__faq-title">
              Placement Matches FAQ
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
