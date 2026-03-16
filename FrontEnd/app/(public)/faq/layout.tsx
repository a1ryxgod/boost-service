import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ — Frequently Asked Questions',
  description:
    'Find answers to common questions about game boosting, account safety, payment, and order management. Everything you need to know about FANCY BOOST.',
  openGraph: {
    title: 'FAQ | FANCY BOOST',
    description:
      'Find answers to common questions about game boosting, account safety, payment, and order management.',
    url: '/faq',
  },
  alternates: { canonical: '/faq' },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
