'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isLoading, logout } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link href="/" className="header__logo">
          <span className="header__logo-text">BOOST SERVICE</span>
        </Link>

        <nav className="header__nav">
          <Link href="/" className="header__nav-link">
            Home
          </Link>
          <Link href="/games/cs2" className="header__nav-link">
            CS2
          </Link>
          <Link href="/games/dota2" className="header__nav-link">
            Dota 2
          </Link>
          <Link href="/games/valorant" className="header__nav-link">
            Valorant
          </Link>
          <Link href="/games/lol" className="header__nav-link">
            League of Legends
          </Link>
        </nav>

        <div className="header__actions">
          {!isLoading && (
            user ? (
              <>
                <Link
                  href={user.role === 'ADMIN' ? '/admin/dashboard' : '/overview'}
                  className="header__button header__button--secondary"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => logout()}
                  className="header__button header__button--ghost"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="header__button header__button--secondary">
                  Login
                </Link>
                <Link href="/register" className="header__button header__button--primary">
                  Sign Up
                </Link>
              </>
            )
          )}

          <button
            className={`header__menu-toggle ${isMobileMenuOpen ? 'header__menu-toggle--active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span className="header__menu-toggle-line"></span>
            <span className="header__menu-toggle-line"></span>
            <span className="header__menu-toggle-line"></span>
          </button>
        </div>
      </div>

      <nav className={`header__mobile-menu ${isMobileMenuOpen ? 'header__mobile-menu--open' : ''}`}>
        <Link href="/" className="header__mobile-nav-link" onClick={toggleMobileMenu}>
          Home
        </Link>
        <Link href="/games/cs2" className="header__mobile-nav-link" onClick={toggleMobileMenu}>
          CS2
        </Link>
        <Link href="/games/dota2" className="header__mobile-nav-link" onClick={toggleMobileMenu}>
          Dota 2
        </Link>
        <Link href="/games/valorant" className="header__mobile-nav-link" onClick={toggleMobileMenu}>
          Valorant
        </Link>
        <Link href="/games/lol" className="header__mobile-nav-link" onClick={toggleMobileMenu}>
          League of Legends
        </Link>
      </nav>
    </header>
  );
};
