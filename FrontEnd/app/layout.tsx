import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Boost Service',
    default: 'Game Boosting Services | CS2, Dota 2, Valorant, LoL',
  },
  description: 'Professional boosting services for top competitive games. Rank, wins, and coaching by experienced players.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-neutral-900 text-neutral-100`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
