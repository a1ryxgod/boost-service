import type { Metadata } from 'next';
import { GameHero } from '@/components/shared/GameHero';
import GameNavigation from '@/components/shared/GameNavigation';
import { OrderForm } from '@/features/order/components/OrderForm';
import { DuoGamesSelector } from '@/features/boost/components/DuoGamesSelector';
import { RankSelector } from '@/features/boost/components/RankSelector';
import PriceSummary from '@/components/shared/PriceSummary';
import { FAQ } from '@/components/shared/FAQ';
import { CTA } from '@/components/shared/CTA';

export const metadata: Metadata = {
  title: 'CS2 Duo Boosting | Play with a Pro',
  description: 'Queue up with a professional player and climb the ranks together. The safest way to boost your CS2 rank.',
};

export default function DuoBoostPage({ params }: { params: { game: string } }) {
  const gameName = params.game.toUpperCase();

  return (
    <>
      <header>
        <GameHero />
        <GameNav />
      </header>

      <main className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            <section className="lg:col-span-2">
              <div className="space-y-6">
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {gameName} Duo Boosting
                </h1>
                <p className="text-lg text-neutral-300">
                  Play alongside one of our experienced boosters. Learn from the best and improve your own gameplay while ranking up. No account sharing required.
                </p>
                <OrderForm>
                  <div className="space-y-8">
                    <RankSelector />
                    <DuoGamesSelector />
                  </div>
                </OrderForm>
              </div>
            </section>

            <aside className="lg:col-span-1">
              <div className="sticky top-8">
                <PriceSummary />
              </div>
            </aside>
          </div>

          <section className="mt-20 lg:mt-24">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                How Duo Boosting Works
              </h2>
            </div>
            <ol className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
                <li className="flex flex-col items-center text-center p-6 bg-neutral-800/50 rounded-lg">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold text-xl">1</div>
                    <h3 className="mt-5 text-lg font-medium text-white">Configure Your Order</h3>
                    <p className="mt-2 text-sm text-neutral-400">Select your rank and the number of games you want to play.</p>
                </li>
                <li className="flex flex-col items-center text-center p-6 bg-neutral-800/50 rounded-lg">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold text-xl">2</div>
                    <h3 className="mt-5 text-lg font-medium text-white">Schedule &amp; Pay</h3>
                    <p className="mt-2 text-sm text-neutral-400">Choose a time that works for you and complete the secure payment.</p>
                </li>
                <li className="flex flex-col items-center text-center p-6 bg-neutral-800/50 rounded-lg">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold text-xl">3</div>
                    <h3 className="mt-5 text-lg font-medium text-white">Play with a Pro</h3>
                    <p className="mt-2 text-sm text-neutral-400">We'll invite you to the lobby at your scheduled time. Let the climbing begin!</p>
                </li>
                <li className="flex flex-col items-center text-center p-6 bg-neutral-800/50 rounded-lg">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold text-xl">4</div>
                    <h3 className="mt-5 text-lg font-medium text-white">Achieve Your Goal</h3>
                    <p className="mt-2 text-sm text-neutral-400">Enjoy the wins and the lessons learned along the way.</p>
                </li>
            </ol>
          </section>

          <section className="mt-20 lg:mt-24">
             <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Duo Boosting FAQ
                </h2>
            </div>
            <div className="mt-12 max-w-4xl mx-auto">
                <FAQ />
            </div>
          </section>

        </div>
      </main>

      <footer className="mt-20 lg:mt-24">
        <CTA />
      </footer>
    </>
  );
}
