import type { Metadata } from 'next';
import { GameHero } from '@/components/shared/GameHero';
import GameNavigation from '@/components/shared/GameNavigation';
import PriceSummary from '@/components/shared/PriceSummary';
import { FAQ } from '@/components/shared/FAQ';
import { CTA } from '@/components/shared/CTA';

export const metadata: Metadata = {
  title: 'Valorant Placement Matches | Pro Boosting Service',
  description: 'Ensure a great start to your Act with our professional Valorant placement matches boosting service.',
};

const PlacementsSelector = () => <div className="p-6 bg-gray-800 rounded-lg"><h3 className="text-lg font-semibold">Placement Games</h3><p className="text-sm text-gray-400 mt-2">Number of Games Selector Placeholder</p></div>;
const DuoToggle = () => <div className="p-6 bg-gray-800 rounded-lg"><h3 className="text-lg font-semibold">Service Options</h3><p className="text-sm text-gray-400 mt-2">Duo (Play with Booster) Toggle Placeholder</p></div>;
const OrderForm = ({ children }: { children: React.ReactNode }) => <div className="space-y-6">{children}</div>;

const ValorantPlacementsPage = () => {
  const game = 'valorant';
  const service = 'placements';

  return (
    <main>
      <GameHero game={game} />
      <GameNavigation game={game} activeService={service} />

      <section className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-6">Configure Your Placement Matches</h1>
            <OrderForm>
              <PlacementsSelector />
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

export default ValorantPlacementsPage;
