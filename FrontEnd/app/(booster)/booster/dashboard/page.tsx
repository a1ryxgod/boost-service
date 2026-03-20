'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { boosterApi } from '../../../../lib/api';
import { GAME_LABELS, SERVICE_TYPE_LABELS, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '../../../../lib/constants';
import type { Order } from '../../../../types';
import '../../BoosterPages.css';

interface BoosterStats {
  completedOrders: number;
  activeOrders: number;
  totalEarnings: number;
  rating: number | null;
}

const STAT_CARDS = (s: BoosterStats | null, loading: boolean) => [
  { icon: '✅', label: 'Completed', value: loading ? '—' : s?.completedOrders ?? 0, color: '#22c55e' },
  { icon: '⚡', label: 'Active', value: loading ? '—' : s?.activeOrders ?? 0, color: '#7B61FF' },
  { icon: '💰', label: 'Earned', value: loading ? '—' : `$${(s?.totalEarnings ?? 0).toFixed(2)}`, color: '#F5A623' },
  { icon: '⭐', label: 'Rating', value: loading ? '—' : (s?.rating ? Number(s.rating).toFixed(1) : 'N/A'), color: '#5B8CFF' },
];

export default function BoosterDashboardPage() {
  const [stats, setStats] = useState<BoosterStats | null>(null);
  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [statsData, myOrders] = await Promise.all([
        boosterApi.getStats(),
        boosterApi.getMyOrders(),
      ]);
      setStats(statsData);
      setActiveOrders(myOrders.filter((o) => o.status === 'ASSIGNED' || o.status === 'IN_PROGRESS'));
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="bp">
      <div className="bp__header">
        <div>
          <h1 className="bp__title">Booster Dashboard</h1>
          <p className="bp__subtitle">Track your progress and manage active orders.</p>
        </div>
        <Link href="/booster/orders" className="bp__btn-pickup" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
          Browse Orders →
        </Link>
      </div>

      {error ? (
        <div className="bp__error">
          <p>{error}</p>
          <button onClick={load} className="bp__btn-pickup">Try Again</button>
        </div>
      ) : (
        <>
          {/* Stats */}
      <div className="bp__stats">
        {STAT_CARDS(stats, isLoading).map((card) => (
          <div className="bp__stat" key={card.label} style={{ '--stat-color': card.color } as React.CSSProperties}>
            <span className="bp__stat-icon">{card.icon}</span>
            <span className="bp__stat-label">{card.label}</span>
            <span className="bp__stat-value">{String(card.value)}</span>
          </div>
        ))}
      </div>

      {/* Active orders */}
      <div className="bp__section">
        <div className="bp__section-head">
          <h2 className="bp__section-title">Active Orders</h2>
          <Link href="/booster/orders" className="bp__section-link">View all →</Link>
        </div>

        {isLoading ? (
          <p className="bp__loading">Loading…</p>
        ) : activeOrders.length === 0 ? (
          <div className="bp__empty">
            No active orders right now.{' '}
            <Link href="/booster/orders">Pick up an available order →</Link>
          </div>
        ) : (
          <div className="bp__order-list">
            {activeOrders.map((order) => (
              <div key={order.id} className="bp__order-card">
                <div className="bp__order-info">
                  <p className="bp__order-title">
                    {GAME_LABELS[order.gameCode] ?? order.gameCode}
                    <span style={{ color: '#505060', fontWeight: 400, margin: '0 0.375rem' }}>·</span>
                    {SERVICE_TYPE_LABELS[order.serviceType] ?? order.serviceType}
                  </p>
                  <p className="bp__order-rank">{order.currentRank} → {order.targetRank}</p>
                  <div className="bp__order-meta">
                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                    {order.isDuo && <span className="bp__order-tag">DUO</span>}
                  </div>
                </div>
                <div className="bp__order-actions">
                  <span
                    className="bp__badge"
                    style={{
                      background: (ORDER_STATUS_COLORS[order.status] ?? '#888') + '22',
                      color: ORDER_STATUS_COLORS[order.status] ?? '#888',
                    }}
                  >
                    {ORDER_STATUS_LABELS[order.status] ?? order.status}
                  </span>
                  <span className="bp__order-price">${Number(order.price).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )}
</div>
);
}
