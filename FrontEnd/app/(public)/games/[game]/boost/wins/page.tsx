import type { Metadata } from 'next';
import { GameHero } from '@/components/shared/GameHero';
import GameNavigation from '@/components/shared/GameNavigation';
import { OrderForm } from '@/features/order/components/OrderForm';
import { WinsSelector } from '@/features/boost/components/WinsSelector';
import { DuoToggle } from '@/features/boost/components/DuoToggle';
import PriceSummary from '@/components/shared/PriceSummary';
import { FAQ } from '@/components/shared/FAQ';
import { CTA } from '@/components/shared/CTA';

// This metadata would be dynamically generated based on the game parameter
export const metadata: Metadata = {
  title: 'CS2 Win Boosting | Fast & Secure Net Wins',
  description:
    'Purchase CS2 wins, played by professional boosters. Secure, fast, and reliable service to improve your stats.',
};

// This page component will receive params for the specific game
export default function WinBoostPage({ params }: { params: { game: string } }) {
  const gameName = params.game.toUpperCase(); // e.g., CS2

  return (
    <>
      <header>
        <GameHero />
        <GameNav />
      </header>

      <main className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Order Form Section */}
            <section className="lg:col-span-2">
              <div className="space-y-6">
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {gameName} Win Boosting
                </h1>
                <p className="text-lg text-neutral-300">
                  Select the number of wins you want. Our professionals will secure them for you.
                </p>
                <OrderForm>
                  <div className="space-y-8">
                    <WinsSelector />
                    <DuoToggle />
                  </div>
                </OrderForm>
              </div>
            </section>

            {/* Price Summary Section */}
            <aside className="lg:col-span-1">
              <div className="sticky top-8">
                <PriceSummary />
              </div>
            </aside>
          </div>

          {/* How It Works Section (reusable) */}
          <section className="mt-20 lg:mt-24">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                A Simple Process
              </h2>
            </div>
            <ol className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
              <li className="flex flex-col items-center text-center p-6 bg-neutral-800/50 rounded-lg">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold text-xl">1</div>
                <h3 className="mt-5 text-lg font-medium text-white">Select Wins</h3>
                <p className="mt-2 text-sm text-neutral-400">Choose the number of net wins you need.</p>
              </li>
              <li className="flex flex-col items-center text-center p-6 bg-neutral-800/50 rounded-lg">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold text-xl">2</div>
                <h3 className="mt-5 text-lg font-medium text-white">Secure Checkout</h3>
                <p className="mt-2 text-sm text-neutral-400">Complete your payment through our secure processor.</p>
              </li>
              <li className="flex flex-col items-center text-center p-6 bg-neutral-800/50 rounded-lg">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold text-xl">3</div>
                <h3 className="mt-5 text-lg font-medium text-white">Booster In Action</h3>
                <p className="mt-2 text-sm text-neutral-400">An experienced player starts playing on your account.</p>
              </li>
              <li className="flex flex-col items-center text-center p-6 bg-neutral-800/50 rounded-lg">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold text-xl">4</div>
                <h3 className="mt-5 text-lg font-medium text-white">Enjoy The Results</h3>
                <p className="mt-2 text-sm text-neutral-400">We'll notify you upon completion. Enjoy your improved stats!</p>
              </li>
            </ol>
          </section>

          {/* FAQ Section */}
          <section className="mt-20 lg:mt-24">
             <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Win Boosting FAQ
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
