import type { Metadata } from 'next';
import { GameHero } from '@/components/shared/GameHero';
import GameNavigation from '@/components/shared/GameNavigation';
import PriceSummary from '@/components/shared/PriceSummary';
import { FAQ } from '@/components/shared/FAQ';
import { CTA } from '@/components/shared/CTA';

export const metadata: Metadata = {
  title: 'CS2 Wins Boost | Professional Win Boosting Service',
  description: 'Purchase CS2 wins with our professional boosting service. Secure, fast, and handled by experienced players.',
};

// In a real scenario, these would be proper components with business logic hooks.
const WinsSelector = () => <div className="p-6 bg-gray-800 rounded-lg"><h3 className="text-lg font-semibold">Number of Wins</h3><p className="text-sm text-gray-400 mt-2">Wins Selector Placeholder</p></div>;
const DuoToggle = () => <div className="p-6 bg-gray-800 rounded-lg"><h3 className="text-lg font-semibold">Additional Options</h3><p className="text-sm text-gray-400 mt-2">Duo Toggle Placeholder</p></div>;
const OrderForm = ({ children }: { children: React.ReactNode }) => <div className="space-y-6">{children}</div>;

const CS2WinsBoostPage = () => {
  const game = 'cs2';
  const service = 'wins';

  return (
    <main>
      <GameHero game={game} />
      <GameNavigation game={game} activeService={service} />

      <section className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-6">Configure Your Wins Boost</h1>
            <OrderForm>
              <WinsSelector />
              <DuoToggle />
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

export default CS2WinsBoostPage;
