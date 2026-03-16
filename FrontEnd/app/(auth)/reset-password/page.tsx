'use client';

import Link from 'next/link';
import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { authApi } from '../../../lib/api';
import '../AuthPage.css';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const form = e.currentTarget;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    const confirm = (form.elements.namedItem('confirm') as HTMLInputElement).value;

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    if (!token) {
      setError('Invalid reset link. Please request a new one.');
      return;
    }

    setStatus('loading');

    try {
      await authApi.resetPassword(token, password);
      setStatus('success');
      setTimeout(() => router.push('/login'), 2500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid or expired reset link.');
      setStatus('idle');
    }
  };

  if (status === 'success') {
    return (
      <div className="auth__header">
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
        <h1 className="auth__title">Password Reset</h1>
        <p className="auth__subtitle">Your password has been updated. Redirecting to sign in...</p>
      </div>
    );
  }

  return (
    <>
      <div className="auth__header">
        <h1 className="auth__title">Reset Password</h1>
        <p className="auth__subtitle">Enter your new password below.</p>
      </div>

      <form className="auth__form" onSubmit={handleSubmit}>
        {error && <div className="auth__error">{error}</div>}

        <div className="auth__form-group">
          <label htmlFor="password" className="auth__label">New Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            placeholder="Min 8 characters"
            className="auth__input"
            disabled={status === 'loading'}
          />
        </div>

        <div className="auth__form-group">
          <label htmlFor="confirm" className="auth__label">Confirm Password</label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            autoComplete="new-password"
            required
            placeholder="Repeat your password"
            className="auth__input"
            disabled={status === 'loading'}
          />
        </div>

        <button type="submit" className="auth__button" disabled={status === 'loading'}>
          {status === 'loading' ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>

      <div className="auth__footer">
        <Link href="/login" className="auth__footer-link">Back to Sign In</Link>
      </div>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="auth">
      <div className="auth__container">
        <Suspense fallback={<p style={{ textAlign: 'center', color: '#A0A0A0' }}>Loading...</p>}>
          <ResetPasswordContent />
        </Suspense>
      </div>
    </div>
  );
}
