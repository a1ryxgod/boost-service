'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';
import { profileApi, ordersApi } from '../../../lib/api';
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS, GAME_LABELS } from '../../../lib/constants';
import type { UserStats, Order } from '../../../types';
import './OverviewPage.css';

const QUICK_SERVICES = [
  {
    game: 'CS2',
    color: '#F5A623',
    gradient: 'linear-gradient(135deg, #1a1200 0%, #2a1e00 100%)',
    services: [
      { label: 'Rank Boost', href: '/games/cs2/boost/rank' },
      { label: 'FACEIT Boost', href: '/games/cs2/boost/faceit' },
      { label: 'Wins Boost', href: '/games/cs2/boost/wins' },
    ],
  },
  {
    game: 'Valorant',
    color: '#FF4655',
    gradient: 'linear-gradient(135deg, #1a0508 0%, #2a080e 100%)',
    services: [
      { label: 'Rank Boost', href: '/games/valorant/boost/rank' },
      { label: 'Wins Boost', href: '/games/valorant/boost/wins' },
    ],
  },
  {
    game: 'Dota 2',
    color: '#C23C2A',
    gradient: 'linear-gradient(135deg, #180a08 0%, #261208 100%)',
    services: [
      { label: 'Rank Boost', href: '/games/dota2/boost/rank' },
      { label: 'Wins Boost', href: '/games/dota2/boost/wins' },
    ],
  },
  {
    game: 'LoL',
    color: '#C89B3C',
    gradient: 'linear-gradient(135deg, #181200 0%, #261c00 100%)',
    services: [
      { label: 'Rank Boost', href: '/games/lol/boost/rank' },
      { label: 'Wins Boost', href: '/games/lol/boost/wins' },
    ],
  },
];

const OverviewPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [statsData, ordersData] = await Promise.all([
          profileApi.getStats(),
          ordersApi.list({ page: 1, limit: 3 }),
        ]);
        setStats(statsData);
        setRecentOrders(ordersData.orders);
      } catch {
        // silently fail
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const activeOrder = recentOrders.find(
    (o) => o.status === 'IN_PROGRESS' || o.status === 'ASSIGNED',
  );

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="overview">
      {/* Header */}
      <div className="overview__header">
        <div>
          <h1 className="overview__title">
            {greeting()}{user?.firstName ? `, ${user.firstName}` : ''}
          </h1>
          <p className="overview__subtitle">Here&apos;s what&apos;s happening with your account.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="overview__stats">
        <div className="overview__stat-card">
          <span className="overview__stat-label">Total Orders</span>
          <span className="overview__stat-value">
            {isLoading ? '—' : (stats?.totalOrders ?? 0)}
          </span>
        </div>
        <div className="overview__stat-card overview__stat-card--green">
          <span className="overview__stat-label">Completed</span>
          <span className="overview__stat-value overview__stat-value--green">
            {isLoading ? '—' : (stats?.completedOrders ?? 0)}
          </span>
        </div>
        <div className="overview__stat-card">
          <span className="overview__stat-label">Total Spent</span>
          <span className="overview__stat-value">
            ${isLoading ? '—' : (stats?.totalSpent ?? 0).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Active order banner */}
      {!isLoading && activeOrder && (
        <Link href={`/orders/${activeOrder.id}`} className="overview__active-order">
          <div className="overview__active-order-pulse" />
          <div className="overview__active-order-body">
            <div>
              <p className="overview__active-order-label">Active Order</p>
              <p className="overview__active-order-title">
                {GAME_LABELS[activeOrder.gameCode] ?? activeOrder.gameCode} &mdash;{' '}
                {activeOrder.currentRank} → {activeOrder.targetRank}
              </p>
            </div>
            <span
              className="overview__active-order-status"
              style={{ color: ORDER_STATUS_COLORS[activeOrder.status] }}
            >
              {ORDER_STATUS_LABELS[activeOrder.status]} →
            </span>
          </div>
        </Link>
      )}

      {/* Two-column row: Recent orders + Account */}
      <div className="overview__row">
        {/* Recent orders */}
        <div className="overview__card overview__card--wide">
          <div className="overview__card-header">
            <h2 className="overview__card-title">Recent Orders</h2>
            <Link href="/orders" className="overview__card-link">View all</Link>
          </div>

          {isLoading && <p className="overview__muted">Loading...</p>}

          {!isLoading && recentOrders.length === 0 && (
            <div className="overview__empty">
              <p>No orders yet — place your first boost below.</p>
            </div>
          )}

          {!isLoading && recentOrders.length > 0 && (
            <ul className="overview__order-list">
              {recentOrders.map((order) => (
                <li key={order.id}>
                  <Link href={`/orders/${order.id}`} className="overview__order-row">
                    <div>
                      <p className="overview__order-name">
                        {GAME_LABELS[order.gameCode] ?? order.gameCode} &mdash; {order.currentRank} → {order.targetRank}
                      </p>
                      <p className="overview__order-meta">
                        {new Date(order.createdAt).toLocaleDateString()} &middot; ${Number(order.price).toFixed(2)}
                      </p>
                    </div>
                    <span
                      className="overview__badge"
                      style={{
                        background: ORDER_STATUS_COLORS[order.status] + '22',
                        color: ORDER_STATUS_COLORS[order.status],
                      }}
                    >
                      {ORDER_STATUS_LABELS[order.status]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Account card */}
        <div className="overview__card">
          <h2 className="overview__card-title">Account</h2>
          <div className="overview__account-avatar">
            {user?.firstName
              ? `${user.firstName[0]}${user.lastName?.[0] ?? ''}`.toUpperCase()
              : user?.email?.[0]?.toUpperCase() ?? 'U'}
          </div>
          <p className="overview__account-name">
            {user?.firstName
              ? `${user.firstName} ${user.lastName ?? ''}`.trim()
              : 'No name set'}
          </p>
          <p className="overview__account-email">{user?.email}</p>
          <p className="overview__account-since">
            Member since{' '}
            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
          </p>
          <Link href="/settings" className="overview__settings-link">
            Manage settings →
          </Link>
        </div>
      </div>

      {/* Quick Boost section */}
      <div className="overview__section">
        <h2 className="overview__section-title">Order Boost</h2>
        <p className="overview__section-sub">Select a service to get started instantly</p>

        <div className="overview__games-grid">
          {QUICK_SERVICES.map((g) => (
            <div
              key={g.game}
              className="overview__game-card"
              style={{ background: g.gradient, borderColor: g.color + '33' }}
            >
              <div className="overview__game-header">
                <span className="overview__game-dot" style={{ backgroundColor: g.color }} />
                <span className="overview__game-name" style={{ color: g.color }}>
                  {g.game}
                </span>
              </div>
              <div className="overview__game-services">
                {g.services.map((s) => (
                  <Link key={s.href} href={s.href} className="overview__game-service-btn">
                    {s.label}
                    <span className="overview__game-arrow">→</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
