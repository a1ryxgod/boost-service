import React from 'react';
import Link from 'next/link';

export const Header = () => {
  return (
    <header>
      <Link href="/">
        <h1>Boost Service</h1>
      </Link>
      <nav>
        <Link href="/games">Games</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/how-it-works">How It Works</Link>
        <Link href="/login">Login</Link>
      </nav>
    </header>
  );
};
