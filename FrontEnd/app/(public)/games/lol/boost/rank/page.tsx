import type { Metadata } from 'next';
import { GameHero } from '@/components/shared/GameHero';
import GameNavigation from '@/components/shared/GameNavigation';
import PriceSummary from '@/components/shared/PriceSummary';
import { RankSelector } from '@/features/boost/components/RankSelector';
import { FAQ } from '@/components/shared/FAQ';
import { CTA } from '@/components/shared/CTA';

export const metadata: Metadata = {
  title: 'League of Legends Elo Boost | Professional Rank Boosting',
  description: 'Climb the League of Legends ladder with our fast and secure Elo boosting service. All regions and roles supported.',
};

const OrderForm = ({ children }: { children: React.ReactNode }) => <div className="space-y-6">{children}</div>;
const DuoToggle = () => <div className="p-6 bg-gray-800 rounded-lg"><h3 className="text-lg font-semibold">Service Options</h3><p className="text-sm text-gray-400 mt-2">Duo Queue/Role Preference Placeholder</p></div>;

const LolRankBoostPage = () => {
  const game = 'lol';
  const service = 'rank';

  return (
    <main>
      <GameHero game={game} />
      <GameNavigation game={game} activeService={service} />

      <section className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-6">Configure Your Elo Boost</h1>
            <OrderForm>
              <RankSelector />
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

export default LolRankBoostPage;
