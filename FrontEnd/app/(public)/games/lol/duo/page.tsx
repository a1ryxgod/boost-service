import type { Metadata } from 'next';
import { GameHero } from '@/components/shared/GameHero';
import GameNavigation from '@/components/shared/GameNavigation';
import PriceSummary from '@/components/shared/PriceSummary';
import { RankSelector } from '@/features/boost/components/RankSelector';
import { FAQ } from '@/components/shared/FAQ';
import { CTA } from '@/components/shared/CTA';

export const metadata: Metadata = {
  title: 'League of Legends Duo Boosting | Play with a Pro',
  description: 'Team up with a professional player to climb the ranks together in League of Legends. A safe and educational experience.',
};

const DuoGamesSelector = () => <div className="p-6 bg-gray-800 rounded-lg"><h3 className="text-lg font-semibold">Number of Games</h3><p className="text-sm text-gray-400 mt-2">Game Quantity Selector Placeholder</p></div>;
const OrderForm = ({ children }: { children: React.ReactNode }) => <div className="space-y-6">{children}</div>;

const LolDuoPage = () => {
  const game = 'lol';
  const service = 'duo';

  return (
    <main>
      <GameHero game={game} />
      <GameNavigation game={game} activeService={service} />

      <section className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-6">Configure Your Duo Queue Boost</h1>
            <OrderForm>
              <RankSelector />
              <DuoGamesSelector />
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

export default LolDuoPage;
