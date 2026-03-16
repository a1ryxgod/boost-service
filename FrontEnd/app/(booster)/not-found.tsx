export default function BoosterNotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        padding: '2rem',
        textAlign: 'center',
        color: '#EAEAEA',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div
        style={{
          fontSize: '4rem',
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
      <h1 style={{ fontSize: '1.375rem', fontWeight: 700, marginBottom: '0.5rem', color: '#EAEAEA' }}>
        Page Not Found
      </h1>
      <p style={{ fontSize: '0.9375rem', color: '#888899', maxWidth: '360px', lineHeight: 1.6, marginBottom: '2rem' }}>
        This page doesn&apos;t exist. Head back to the booster dashboard.
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <a
          href="/booster/dashboard"
          style={{
            padding: '0.625rem 1.5rem',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #7B61FF, #5B8CFF)',
            color: '#fff',
            fontWeight: 600,
            textDecoration: 'none',
            fontSize: '0.875rem',
          }}
        >
          Go to Dashboard
        </a>
        <a
          href="/booster/orders"
          style={{
            padding: '0.625rem 1.5rem',
            borderRadius: '8px',
            border: '1px solid #2a2a3d',
            color: '#EAEAEA',
            fontWeight: 600,
            textDecoration: 'none',
            fontSize: '0.875rem',
          }}
        >
          Browse Orders
        </a>
      </div>
    </div>
  );
}
