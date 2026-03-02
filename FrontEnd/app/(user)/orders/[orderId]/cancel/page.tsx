'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function OrderCancelPage() {
  const { orderId } = useParams<{ orderId: string }>();

  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: 'Inter, sans-serif',
      color: '#EAEAEA',
    }}>
      <div style={{
        background: 'linear-gradient(145deg, #111118, #0d0d16)',
        border: '1px solid #1e1e2e',
        borderRadius: '16px',
        padding: '3rem 2.5rem',
        maxWidth: '480px',
        width: '100%',
        textAlign: 'center',
      }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'rgba(239, 68, 68, 0.1)',
          border: '2px solid rgba(239, 68, 68, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          fontSize: '2rem',
        }}>
          ✕
        </div>

        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginBottom: '0.75rem' }}>
          Payment Cancelled
        </h1>
        <p style={{ color: '#888899', lineHeight: 1.6, marginBottom: '2rem' }}>
          Your payment was not completed. The order has been saved — you can try again from your orders page.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Link
            href={`/orders/${orderId}`}
            style={{
              display: 'block',
              padding: '0.875rem',
              background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
              color: '#fff',
              borderRadius: '8px',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '0.9375rem',
            }}
          >
            Try Again
          </Link>
          <Link
            href="/games"
            style={{
              display: 'block',
              padding: '0.875rem',
              background: 'transparent',
              color: '#888899',
              border: '1px solid #1e1e2e',
              borderRadius: '8px',
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: '0.9375rem',
            }}
          >
            Back to Games
          </Link>
        </div>
      </div>
    </div>
  );
}
