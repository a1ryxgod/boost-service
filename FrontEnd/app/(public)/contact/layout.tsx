import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Support',
  description:
    '24/7 live support for all your game boosting questions. Get help with orders, payments, and account issues. Average response time under 3 minutes.',
  openGraph: {
    title: 'Contact Support | FANCY BOOST',
    description:
      '24/7 live support. Get help with orders, payments, and account issues in minutes.',
    url: '/contact',
  },
  alternates: { canonical: '/contact' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
