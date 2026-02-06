import type { Metadata } from 'next';
import { GameHero } from '@/components/shared/GameHero';
import GameNavigation from '@/components/shared/GameNavigation';
import { OrderForm } from '@/features/order/components/OrderForm';
import { PlacementGamesSelector } from '@/features/boost/components/PlacementGamesSelector';
import { DuoToggle } from '@/features/boost/components/DuoToggle';
import PriceSummary from '@/components/shared/PriceSummary';
import { FAQ } from '@/components/shared/FAQ';
import { CTA } from '@/components/shared/CTA';

export const metadata: Metadata = {
  title: 'CS2 Placement Matches Boosting | Start Strong',
  description:
    'Have your CS2 placement matches played by professionals. Secure a high starting rank for the new season.',
};

export default function PlacementsBoostPage({ params }: { params: { game: string } }) {
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
                  {gameName} Placement Matches
                </h1>
                <p className="text-lg text-neutral-300">
                  Start the season with a strong advantage. Our pro players will play your placement matches to aim for the best possible start.
                </p>
                <OrderForm>
                  <div className="space-y-8">
                    <PlacementGamesSelector />
                    <DuoToggle />
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
                How Placements Work
              </h2>
            </div>
            <ol className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
              <li className="flex flex-col items-center text-center p-6 bg-neutral-800/50 rounded-lg">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold text-xl">1</div>
                <h3 className="mt-5 text-lg font-medium text-white">Select Games</h3>
                <p className="mt-2 text-sm text-neutral-400">Choose the number of placement games you need played.</p>
              </li>
              <li className="flex flex-col items-center text-center p-6 bg-neutral-800/50 rounded-lg">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold text-xl">2</div>
                <h3 className="mt-5 text-lg font-medium text-white">Secure Checkout</h3>
                <p className="mt-2 text-sm text-neutral-400">Complete your payment through our secure processor.</p>
              </li>
              <li className="flex flex-col items-center text-center p-6 bg-neutral-800/50 rounded-lg">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold text-xl">3</div>
                <h3 className="mt-5 text-lg font-medium text-white">Pro Player Assigned</h3>
                <p className="mt-2 text-sm text-neutral-400">A top-tier player starts on your placement matches.</p>
              </li>
              <li className="flex flex-col items-center text-center p-6 bg-neutral-800/50 rounded-lg">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold text-xl">4</div>
                <h3 className="mt-5 text-lg font-medium text-white">Get Your Rank</h3>
                <p className="mt-2 text-sm text-neutral-400">We notify you once done. Discover your new starting rank!</p>
              </li>
            </ol>
          </section>

          <section className="mt-20 lg:mt-24">
             <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Placement Matches FAQ
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
