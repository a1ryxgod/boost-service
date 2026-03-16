import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  description: 'The page you are looking for does not exist.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
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
      <div
        style={{
          fontSize: '6rem',
          fontWeight: 900,
          background: 'linear-gradient(135deg, #7B61FF, #5B8CFF)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1,
          marginBottom: '1rem',
        }}
      >
        404
      </div>
      <h1
        style={{
          fontSize: '1.75rem',
          fontWeight: 700,
          marginBottom: '0.75rem',
          color: '#EAEAEA',
        }}
      >
        Page Not Found
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
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <a
          href="/"
          style={{
            padding: '0.75rem 1.75rem',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #7B61FF, #5B8CFF)',
            color: '#fff',
            fontWeight: 600,
            textDecoration: 'none',
            fontSize: '0.9375rem',
          }}
        >
          Back to Home
        </a>
        <a
          href="/games"
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
          Browse Games
        </a>
      </div>
    </div>
  );
}
