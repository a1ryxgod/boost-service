import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CS2 Account Shop | Buy Pre-Ranked CS2 Accounts with Prime',
  description:
    'Buy pre-ranked CS2 accounts with Prime Status. Silver to Global Elite, clean VAC history, instant delivery. All accounts hand-leveled and verified.',
  openGraph: {
    title: 'CS2 Account Shop | FANCY BOOST',
    description:
      'Buy pre-ranked CS2 accounts with Prime Status. Clean VAC history, instant delivery.',
    url: '/games/cs2/accounts',
  },
  alternates: { canonical: '/games/cs2/accounts' },
};

export default function CS2AccountsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
