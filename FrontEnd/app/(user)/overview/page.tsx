'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';
import { profileApi, ordersApi } from '../../../lib/api';
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS, GAME_LABELS } from '../../../lib/constants';
import type { UserStats, Order } from '../../../types';

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
        // silently fail — user sees empty state
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  if (isLoading) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-8">Overview</h1>
        <p style={{ color: '#707070' }}>Loading...</p>
      </div>
    );
  }

  const activeOrder = recentOrders.find(
    (o) => o.status === 'IN_PROGRESS' || o.status === 'ASSIGNED',
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Welcome back{user?.firstName ? `, ${user.firstName}` : ''}!
      </h1>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-gray-800 rounded-lg">
          <h2 className="text-sm text-gray-400 uppercase tracking-wide">Total Orders</h2>
          <p className="text-4xl font-bold mt-2">{stats?.totalOrders ?? 0}</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg">
          <h2 className="text-sm text-gray-400 uppercase tracking-wide">Completed</h2>
          <p className="text-4xl font-bold mt-2 text-green-400">{stats?.completedOrders ?? 0}</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg">
          <h2 className="text-sm text-gray-400 uppercase tracking-wide">Total Spent</h2>
          <p className="text-4xl font-bold mt-2">${(stats?.totalSpent ?? 0).toFixed(2)}</p>
        </div>
      </div>

      {/* Active Order */}
      {activeOrder && (
        <div className="p-6 bg-gray-800 rounded-lg mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-semibold">Active Order</h2>
              <p className="text-gray-400 mt-1">
                {GAME_LABELS[activeOrder.gameCode] ?? activeOrder.gameCode} &mdash;{' '}
                {activeOrder.currentRank} → {activeOrder.targetRank}
              </p>
            </div>
            <span
              style={{
                backgroundColor: ORDER_STATUS_COLORS[activeOrder.status] + '22',
                color: ORDER_STATUS_COLORS[activeOrder.status],
                padding: '4px 12px',
                borderRadius: '9999px',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
            >
              {ORDER_STATUS_LABELS[activeOrder.status]}
            </span>
          </div>
          <Link href={`/orders/${activeOrder.id}`} style={{ color: '#3566D1', fontSize: '0.9rem' }}>
            View details →
          </Link>
        </div>
      )}

      {/* Recent Orders */}
      <div className="p-6 bg-gray-800 rounded-lg mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          <Link href="/orders" style={{ color: '#3566D1', fontSize: '0.9rem' }}>
            View all
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p style={{ color: '#707070' }}>
            No orders yet.{' '}
            <Link href="/games" style={{ color: '#3566D1' }}>
              Browse services →
            </Link>
          </p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {recentOrders.map((order) => (
              <li
                key={order.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: '1px solid #1e1e1e',
                }}
              >
                <div>
                  <p style={{ margin: 0, fontWeight: 500 }}>
                    {GAME_LABELS[order.gameCode] ?? order.gameCode} — {order.currentRank} → {order.targetRank}
                  </p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#707070' }}>
                    {new Date(order.createdAt).toLocaleDateString()} &middot; ${Number(order.price).toFixed(2)}
                  </p>
                </div>
                <span
                  style={{
                    color: ORDER_STATUS_COLORS[order.status],
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                >
                  {ORDER_STATUS_LABELS[order.status]}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Account Info */}
      <div className="p-6 bg-gray-800 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Account</h2>
        <p style={{ color: '#9ca3af', margin: 0 }}>{user?.email}</p>
        <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: '4px 0 0' }}>
          Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
        </p>
        <Link href="/settings" style={{ display: 'inline-block', marginTop: '12px', color: '#3566D1', fontSize: '0.9rem' }}>
          Manage settings →
        </Link>
      </div>
    </div>
  );
};

export default OverviewPage;
