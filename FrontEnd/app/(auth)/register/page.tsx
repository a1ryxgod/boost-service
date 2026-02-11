import type { Metadata } from 'next';
import Link from 'next/link';
import '../AuthPage.css';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Create a new account.',
};

const RegisterPage = () => {
  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__header">
          <h1 className="auth__title">Create an Account</h1>
          <p className="auth__subtitle">
            Get started by creating a new account to place and track orders.
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
              required
              placeholder="••••••••"
              className="auth__input"
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
            />
          </div>

          <button type="submit" className="auth__button">
            Create Account
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
