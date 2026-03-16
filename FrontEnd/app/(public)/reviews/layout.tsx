import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customer Reviews',
  description:
    'Read verified reviews from real players who used FANCY BOOST. See ratings for CS2, Valorant, League of Legends, and Dota 2 boosting services.',
  openGraph: {
    title: 'Customer Reviews | FANCY BOOST',
    description:
      'Verified reviews from real players. 4.9★ average rating across 10,000+ orders.',
    url: '/reviews',
  },
  alternates: { canonical: '/reviews' },
};

export default function ReviewsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
