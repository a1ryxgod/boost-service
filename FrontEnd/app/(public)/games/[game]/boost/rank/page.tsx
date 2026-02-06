import type { Metadata } from 'next';
import { GameHero } from '@/components/shared/GameHero';
import GameNavigation from '@/components/shared/GameNavigation';
import { OrderForm } from '@/features/order/components/OrderForm';
import { RankSelector } from '@/features/boost/components/RankSelector';
import { DuoToggle } from '@/features/boost/components/DuoToggle';
import PriceSummary from '@/components/shared/PriceSummary';
import { FAQ } from '@/components/shared/FAQ';
import { CTA } from '@/components/shared/CTA';

export const metadata: Metadata = {
  title: 'CS2 Rank Boost Service | Fast & Secure',
  description:
    'Professional CS2 rank boosting service. Fast delivery, secure process, experienced boosters.',
};

export default function Cs2RankBoostPage() {
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
                  CS2 Rank Boost
                </h1>
                <p className="text-lg text-neutral-300">
                  Select your current and desired rank. Our professional players will handle the rest through manual progression.
                </p>
                <OrderForm>
                  <div className="space-y-8">
                    <RankSelector />
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

          {/* How It Works Section */}
          <section className="mt-20 lg:mt-24">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                How It Works
              </h2>
              <p className="mt-4 text-lg text-neutral-300">
                A simple and transparent process to get you to your desired rank.
              </p>
            </div>
            <ol className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
              <li className="flex flex-col items-center text-center p-6 bg-neutral-800/50 rounded-lg">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold text-xl">1</div>
                <h3 className="mt-5 text-lg font-medium text-white">Configure Order</h3>
                <p className="mt-2 text-sm text-neutral-400">Choose your current and desired ranks and any extra options.</p>
              </li>
              <li className="flex flex-col items-center text-center p-6 bg-neutral-800/50 rounded-lg">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold text-xl">2</div>
                <h3 className="mt-5 text-lg font-medium text-white">Secure Checkout</h3>
                <p className="mt-2 text-sm text-neutral-400">Complete your payment through our secure processor.</p>
              </li>
              <li className="flex flex-col items-center text-center p-6 bg-neutral-800/50 rounded-lg">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold text-xl">3</div>
                <h3 className="mt-5 text-lg font-medium text-white">Booster In Action</h3>
                <p className="mt-2 text-sm text-neutral-400">An experienced player starts working on your account progression.</p>
              </li>
              <li className="flex flex-col items-center text-center p-6 bg-neutral-800/50 rounded-lg">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold text-xl">4</div>
                <h3 className="mt-5 text-lg font-medium text-white">Enjoy Your Rank</h3>
                <p className="mt-2 text-sm text-neutral-400">We'll notify you once the order is complete. Enjoy your new rank!</p>
              </li>
            </ol>
          </section>

          {/* FAQ Section */}
          <section className="mt-20 lg:mt-24">
             <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Frequently Asked Questions
                </h2>
                <p className="mt-4 text-lg text-neutral-300">
                    Answers to common questions about our CS2 boosting services.
                </p>
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
