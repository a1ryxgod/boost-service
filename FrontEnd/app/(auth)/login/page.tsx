import type { Metadata } from 'next';
import Link from 'next/link';
import '../AuthPage.css';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Access your account dashboard.',
};

const LoginPage = () => {
  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__header">
          <h1 className="auth__title">Sign In</h1>
          <p className="auth__subtitle">
            Access your dashboard to track orders and manage settings.
          </p>
        </div>

        <form className="auth__form">
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
            />
          </div>

          <button type="submit" className="auth__button">
            Sign In
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
