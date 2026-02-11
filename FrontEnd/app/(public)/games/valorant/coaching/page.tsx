import type { Metadata } from 'next';
import { GameHero } from '@/components/shared/GameHero';
import GameNavigation from '@/components/shared/GameNavigation';
import PriceSummary from '@/components/shared/PriceSummary';
import { FAQ } from '@/components/shared/FAQ';
import { CTA } from '@/components/shared/CTA';

export const metadata: Metadata = {
  title: 'Valorant Coaching | Learn from Professional Players',
  description: 'Improve your Valorant skills with personalized coaching from top-tier players. One-on-one sessions available.',
};

// Placeholder components for demonstration.
const CoachingSelector = () => <div className="p-6 bg-gray-800 rounded-lg"><h3 className="text-lg font-semibold">Coaching Hours</h3><p className="text-sm text-gray-400 mt-2">Coaching Options Placeholder</p></div>;
const OrderForm = ({ children }: { children: React.ReactNode }) => <div className="space-y-6">{children}</div>;


const ValorantCoachingPage = () => {
  const game = 'valorant';
  const service = 'coaching';

  return (
    <main>
      <GameHero game={game} />
      <GameNavigation game={game} activeService={service} />

      <section className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-6">Book a Coaching Session</h1>
            <OrderForm>
              <CoachingSelector />
            </OrderForm>
          </div>

          <aside className="lg:col-span-1 sticky top-24">
            <PriceSummary />
          </aside>
        </div>
      </section>

      <FAQ />
      <CTA />
    </main>
  );
};

export default ValorantCoachingPage;
