'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import '../AuthPage.css';

const RegisterPage = () => {
  const { register } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault(): void; currentTarget: HTMLFormElement }) => {
    e.preventDefault();
    setError('');

    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    const confirm = (form.elements.namedItem('confirm-password') as HTMLInputElement).value;

    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);

    try {
      await register(email, password);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__header">
          <h1 className="auth__title">Create an Account</h1>
          <p className="auth__subtitle">
            Get started by creating a new account to place and track orders.
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
              required
              minLength={8}
              placeholder="At least 8 characters"
              className="auth__input"
              disabled={isLoading}
            />
          </div>

          <div className="auth__form-group">
            <label htmlFor="confirm-password" className="auth__label">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              required
              placeholder="••••••••"
              className="auth__input"
              disabled={isLoading}
            />
          </div>

          <button type="submit" className="auth__button" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth__footer">
          Already have an account?{' '}
          <Link href="/login" className="auth__footer-link">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
