'use client';

import Link from 'next/link';
import { useEffect } from 'react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
        background: '#0a0a0f',
        color: '#EAEAEA',
      }}
    >
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
      <h1
        style={{
          fontSize: '1.75rem',
          fontWeight: 700,
          marginBottom: '0.75rem',
          color: '#EAEAEA',
        }}
      >
        Something went wrong
      </h1>
      <p
        style={{
          fontSize: '1rem',
          color: '#888899',
          maxWidth: '420px',
          marginBottom: '2rem',
          lineHeight: 1.6,
        }}
      >
        An unexpected error occurred. Please try again or contact our support team if the issue persists.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={reset}
          style={{
            padding: '0.75rem 1.75rem',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #7B61FF, #5B8CFF)',
            color: '#fff',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.9375rem',
          }}
        >
          Try Again
        </button>
        <Link
          href="/"
          style={{
            padding: '0.75rem 1.75rem',
            borderRadius: '8px',
            border: '1px solid #2a2a3d',
            color: '#EAEAEA',
            fontWeight: 600,
            textDecoration: 'none',
            fontSize: '0.9375rem',
          }}
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
