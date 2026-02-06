import type { Metadata } from 'next';
import { GameHero } from '@/components/shared/GameHero';
import GameNavigation from '@/components/shared/GameNavigation';
import { OrderForm } from '@/features/order/components/OrderForm';
import { CoachSelector } from '@/features/boost/components/CoachSelector';
import { HoursSelector } from '@/features/boost/components/HoursSelector';
import PriceSummary from '@/components/shared/PriceSummary';
import { FAQ } from '@/components/shared/FAQ';
import { CTA } from '@/components/shared/CTA';

export const metadata: Metadata = {
  title: 'CS2 Coaching | Personalized Gameplay Improvement',
  description: 'Book a session with a professional CS2 coach. Get personalized feedback and live instruction to elevate your game.',
};

export default function CoachingPage({ params }: { params: { game: string } }) {
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
                  {gameName} Coaching
                </h1>
                <p className="text-lg text-neutral-300">
                  The fastest way to improve is to learn from the best. Book a one-on-one coaching session with a verified professional player.
                </p>
                <OrderForm>
                  <div className="space-y-8">
                    <CoachSelector />
                    <HoursSelector />
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
                How Coaching Works
              </h2>
            </div>
            <ol className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
                <li className="flex flex-col items-center text-center p-6 bg-neutral-800/50 rounded-lg">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold text-xl">1</div>
                    <h3 className="mt-5 text-lg font-medium text-white">Choose Your Coach</h3>
                    <p className="mt-2 text-sm text-neutral-400">Select a coach and the number of hours for your session.</p>
                </li>
                <li className="flex flex-col items-center text-center p-6 bg-neutral-800/50 rounded-lg">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold text-xl">2</div>
                    <h3 className="mt-5 text-lg font-medium text-white">Schedule &amp; Pay</h3>
                    <p className="mt-2 text-sm text-neutral-400">Find a time that fits your schedule and complete the payment.</p>
                </li>
                <li className="flex flex-col items-center text-center p-6 bg-neutral-800/50 rounded-lg">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold text-xl">3</div>
                    <h3 className="mt-5 text-lg font-medium text-white">Live Session</h3>
                    <p className="mt-2 text-sm text-neutral-400">Join your coach for live gameplay analysis or VOD review.</p>
                </li>
                <li className="flex flex-col items-center text-center p-6 bg-neutral-800/50 rounded-lg">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold text-xl">4</div>
                    <h3 className="mt-5 text-lg font-medium text-white">Improve Your Play</h3>
                    <p className="mt-2 text-sm text-neutral-400">Apply the lessons and see a real difference in your performance.</p>
                </li>
            </ol>
          </section>

          <section className="mt-20 lg:mt-24">
             <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Coaching FAQ
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
