import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { OrganizationSchema } from '../components/seo/JsonLd';

const outfit = Outfit({ subsets: ['latin'] });

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
      <body className={`${outfit.className} bg-neutral-900 text-neutral-100`}>
        <OrganizationSchema />
        <AuthProvider>{children}</AuthProvider>

        {GA_ID && process.env.NODE_ENV === 'production' && (
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
              j.src='https://www.googletagmanager.com/gtag/js?id='+i;
              f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GA_ID}');
              window.dataLayer=window.dataLayer||[];
              function gtag(){dataLayer.push(arguments);}
              gtag('js',new Date());
              gtag('config','${GA_ID}');
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
