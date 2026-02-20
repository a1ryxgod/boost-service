'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import '../AuthPage.css';

const LoginPage = () => {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault(): void; currentTarget: HTMLFormElement }) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    try {
      await login(email, password);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed. Check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__header">
          <h1 className="auth__title">Sign In</h1>
          <p className="auth__subtitle">
            Access your dashboard to track orders and manage settings.
          </p>
        </div>

        <form className="auth__form" onSubmit={handleSubmit}>
          {error && (
            <div className="auth__error" role="alert">
              {error}
            </div>
          )}

          <div className="auth__form-group">
            <label htmlFor="email" className="auth__label">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              className="auth__input"
              disabled={isLoading}
            />
          </div>

          <div className="auth__form-group">
            <label htmlFor="password" className="auth__label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className="auth__input"
              disabled={isLoading}
            />
          </div>

          <button type="submit" className="auth__button" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="auth__footer">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="auth__footer-link">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
