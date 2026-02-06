import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer>
      <div>
        <p>&copy; 2024 Boost Service. All rights reserved.</p>
        <nav>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-of-service">Terms of Service</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
};
