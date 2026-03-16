import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dota 2 Account Shop | Buy Pre-Calibrated Dota 2 Accounts',
  description:
    'Buy pre-calibrated Dota 2 accounts from Guardian to Divine. High behavior score, ranked calibrated, instant delivery. Ready for ranked matches.',
  openGraph: {
    title: 'Dota 2 Account Shop | FANCY BOOST',
    description:
      'Pre-calibrated Dota 2 accounts. High behavior score, ranked ready, instant delivery.',
    url: '/games/dota2/accounts',
  },
  alternates: { canonical: '/games/dota2/accounts' },
};

export default function Dota2AccountsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
