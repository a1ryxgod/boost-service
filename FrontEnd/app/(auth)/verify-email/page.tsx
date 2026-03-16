'use client';

import Link from 'next/link';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { authApi } from '../../../lib/api';
import '../AuthPage.css';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('No verification token found. Check your email link.');
      return;
    }

    authApi
      .verifyEmail(token)
      .then((res) => {
        setStatus('success');
        setMessage(res.message);
      })
      .catch((err: unknown) => {
        setStatus('error');
        setMessage(err instanceof Error ? err.message : 'Invalid or expired verification link.');
      });
  }, [token]);

  return (
    <>
      <div className="auth__header">
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          {status === 'loading' ? '⏳' : status === 'success' ? '✅' : '❌'}
        </div>
        <h1 className="auth__title">Email Verification</h1>
      </div>

      {status === 'loading' && (
        <p style={{ textAlign: 'center', color: '#A0A0A0' }}>Verifying your email...</p>
      )}

      {status === 'success' && (
        <>
          <div className="auth__success">{message}</div>
          <Link href="/login" className="auth__button" style={{ display: 'block', textAlign: 'center', marginTop: '1.5rem', textDecoration: 'none' }}>
            Go to Sign In
          </Link>
        </>
      )}

      {status === 'error' && (
        <>
          <div className="auth__error">{message}</div>
          <div className="auth__footer" style={{ marginTop: '1.5rem' }}>
            <Link href="/login" className="auth__footer-link">Back to Sign In</Link>
          </div>
        </>
      )}
    </>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="auth">
      <div className="auth__container">
        <Suspense fallback={<p style={{ textAlign: 'center', color: '#A0A0A0' }}>Loading...</p>}>
          <VerifyEmailContent />
        </Suspense>
      </div>
    </div>
  );
}
