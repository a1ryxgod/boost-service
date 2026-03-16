'use client';

import Link from 'next/link';
import { useState } from 'react';
import { authApi } from '../../../lib/api';
import '../AuthPage.css';

export default function ForgotPasswordPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setStatus('loading');

    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;

    try {
      await authApi.forgotPassword(email);
      setStatus('sent');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStatus('idle');
    }
  };

  if (status === 'sent') {
    return (
      <div className="auth">
        <div className="auth__container">
          <div className="auth__header">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📧</div>
            <h1 className="auth__title">Check Your Email</h1>
            <p className="auth__subtitle">
              If an account with that email exists, we&apos;ve sent a password reset link. Check your inbox.
            </p>
          </div>
          <div className="auth__footer">
            <Link href="/login" className="auth__footer-link">Back to Sign In</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__header">
          <h1 className="auth__title">Forgot Password</h1>
          <p className="auth__subtitle">
            Enter your email and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        <form className="auth__form" onSubmit={handleSubmit}>
          {error && <div className="auth__error">{error}</div>}

          <div className="auth__form-group">
            <label htmlFor="email" className="auth__label">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              className="auth__input"
              disabled={status === 'loading'}
            />
          </div>

          <button type="submit" className="auth__button" disabled={status === 'loading'}>
            {status === 'loading' ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="auth__footer">
          <Link href="/login" className="auth__footer-link">Back to Sign In</Link>
        </div>
      </div>
    </div>
  );
}
