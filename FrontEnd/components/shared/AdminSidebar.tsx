'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import './DashboardSidebar.css';

const NAV_ITEMS = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: '⊞' },
  { href: '/admin/orders', label: 'Orders', icon: '📋' },
  { href: '/admin/users', label: 'Users', icon: '👥' },
  { href: '/admin/accounts', label: 'Account Shop', icon: '🛒' },
  { href: '/admin/transactions', label: 'Transactions', icon: '💳' },
  { href: '/admin/reviews', label: 'Reviews', icon: '★' },
  { href: '/admin/chat', label: 'Chat', icon: '💬' },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const initials = user?.firstName
    ? `${user.firstName[0]}${user.lastName?.[0] ?? ''}`.toUpperCase()
    : user?.email?.[0]?.toUpperCase() ?? 'A';

  const displayName = user?.firstName
    ? `${user.firstName} ${user.lastName ?? ''}`.trim()
    : user?.email ?? 'Admin';

  const close = () => setMobileOpen(false);

  const isActive = (href: string) =>
    pathname === href || (href !== '/admin/dashboard' && pathname.startsWith(href));

  const content = (
    <aside className="sidebar">
      <Link href="/" className="sidebar__logo" onClick={close}>
        <span className="sidebar__logo-text">BOOST SERVICE</span>
      </Link>

      <div className="sidebar__user">
        <div className="sidebar__avatar">{initials}</div>
        <div className="sidebar__user-info">
          <p className="sidebar__user-name">{displayName}</p>
          <p className="sidebar__user-email">Administrator</p>
        </div>
      </div>

      <nav className="sidebar__nav">
        <span className="sidebar__section-label">Admin Panel</span>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`sidebar__link ${isActive(item.href) ? 'sidebar__link--active' : ''}`}
            onClick={close}
          >
            <span className="sidebar__link-icon">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

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
