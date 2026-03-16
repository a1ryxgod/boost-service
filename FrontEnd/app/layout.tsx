import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { OrganizationSchema } from '../components/seo/JsonLd';

const inter = Inter({ subsets: ['latin'] });

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL('https://fancyboost.com'),
  title: {
    template: '%s | FANCY BOOST',
    default: 'Game Boosting Services | CS2, Dota 2, Valorant, LoL',
  },
  description:
    'Professional boosting services for CS2, Valorant, League of Legends, and Dota 2. Fast, safe, and guaranteed rank boosting by verified top-tier players.',
  keywords: [
    'game boosting',
    'rank boost',
    'CS2 boost',
    'Valorant boost',
    'League of Legends boost',
    'Dota 2 boost',
    'elo boost',
    'MMR boost',
    'FACEIT boost',
    'coaching',
  ],
  authors: [{ name: 'FANCY BOOST' }],
  creator: 'FANCY BOOST',
  openGraph: {
    type: 'website',
    siteName: 'FANCY BOOST',
    title: 'Game Boosting Services | CS2, Dota 2, Valorant, LoL',
    description:
      'Professional boosting services for CS2, Valorant, League of Legends, and Dota 2. Fast, safe, and guaranteed rank boosting by verified top-tier players.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FANCY BOOST — Professional Game Boosting Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Game Boosting Services | CS2, Dota 2, Valorant, LoL',
    description:
      'Professional boosting services for CS2, Valorant, League of Legends, and Dota 2.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-neutral-900 text-neutral-100`}>
        <OrganizationSchema />
        <AuthProvider>{children}</AuthProvider>

        {GA_ID && process.env.NODE_ENV === 'production' && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
