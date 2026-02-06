import React from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export const CTA = () => {
  return (
    <div>
      <h2>Ready to Boost Your Rank?</h2>
      <p>Join thousands of satisfied players and start your journey to the top today.</p>
      <Link href="/games">
        <Button>Browse Games</Button>
      </Link>
    </div>
  );
};