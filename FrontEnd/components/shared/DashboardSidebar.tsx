'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import './DashboardSidebar.css';

const NAV_ITEMS = [
  { href: '/overview', label: 'Overview', icon: '⊞' },
  { href: '/orders', label: 'My Orders', icon: '📋' },
  { href: '/settings', label: 'Settings', icon: '⚙' },
];

const BOOST_SERVICES = [
  {
    game: 'CS2',
    code: 'cs2',
    color: '#F5A623',
    services: [
      { label: 'Rank Boost', href: '/games/cs2/boost/rank' },
      { label: 'FACEIT Boost', href: '/games/cs2/boost/faceit' },
      { label: 'Wins Boost', href: '/games/cs2/boost/wins' },
    ],
  },
  {
    game: 'Valorant',
    code: 'valorant',
    color: '#FF4655',
    services: [
      { label: 'Rank Boost', href: '/games/valorant/boost/rank' },
      { label: 'Wins Boost', href: '/games/valorant/boost/wins' },
    ],
  },
  {
    game: 'Dota 2',
    code: 'dota2',
    color: '#C23C2A',
    services: [
      { label: 'Rank Boost', href: '/games/dota2/boost/rank' },
      { label: 'Wins Boost', href: '/games/dota2/boost/wins' },
    ],
  },
  {
    game: 'LoL',
    code: 'lol',
    color: '#C89B3C',
    services: [
      { label: 'Rank Boost', href: '/games/lol/boost/rank' },
      { label: 'Wins Boost', href: '/games/lol/boost/wins' },
    ],
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [expandedGame, setExpandedGame] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const initials = user?.firstName
    ? `${user.firstName[0]}${user.lastName?.[0] ?? ''}`.toUpperCase()
    : user?.email?.[0]?.toUpperCase() ?? 'U';

  const displayName = user?.firstName
    ? `${user.firstName} ${user.lastName ?? ''}`.trim()
    : user?.email ?? 'User';

  const close = () => setMobileOpen(false);

  const content = (
    <aside className="sidebar">
      {/* Logo / back to site */}
      <Link href="/" className="sidebar__logo" onClick={close}>
        <span className="sidebar__logo-text">BOOST SERVICE</span>
      </Link>

      {/* User block */}
      <div className="sidebar__user">
        <div className="sidebar__avatar">{initials}</div>
        <div className="sidebar__user-info">
          <p className="sidebar__user-name">{displayName}</p>
          <p className="sidebar__user-email">{user?.email}</p>
        </div>
      </div>

      {/* Main nav */}
      <nav className="sidebar__nav">
        <span className="sidebar__section-label">Dashboard</span>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`sidebar__link ${pathname === item.href ? 'sidebar__link--active' : ''}`}
            onClick={close}
          >
            <span className="sidebar__link-icon">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Boost services */}
      <div className="sidebar__services">
        <span className="sidebar__section-label">Order Boost</span>
        {BOOST_SERVICES.map((g) => (
          <div key={g.code} className="sidebar__game">
            <button
              className={`sidebar__game-btn ${expandedGame === g.code ? 'sidebar__game-btn--open' : ''}`}
              onClick={() => setExpandedGame(expandedGame === g.code ? null : g.code)}
            >
              <span className="sidebar__game-dot" style={{ backgroundColor: g.color }} />
              {g.game}
              <span className="sidebar__game-chevron">
                {expandedGame === g.code ? '▲' : '▼'}
              </span>
            </button>
            {expandedGame === g.code && (
              <div className="sidebar__game-services">
                {g.services.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className={`sidebar__service-link ${pathname === s.href ? 'sidebar__service-link--active' : ''}`}
                    onClick={close}
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="sidebar__footer">
        <Link href="/" className="sidebar__back-link" onClick={close}>
          ← Main Site
        </Link>
        <button className="sidebar__logout" onClick={() => logout()}>
          Sign Out
        </button>
      </div>
    </aside>
  );

  return (
    <>
      <button
        className="sidebar__mobile-toggle"
        onClick={() => setMobileOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? '✕' : '☰'}
      </button>

      {mobileOpen && <div className="sidebar__overlay" onClick={close} />}

      <div className={`sidebar__wrapper ${mobileOpen ? 'sidebar__wrapper--open' : ''}`}>
        {content}
      </div>
    </>
  );
}
