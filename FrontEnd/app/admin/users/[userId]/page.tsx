'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { use } from 'react';
import { adminApi } from '../../../../lib/api';
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS, GAME_LABELS } from '../../../../lib/constants';
import type { User, Order } from '../../../../types';

const UserDetailsPage = ({ params }: { params: Promise<{ userId: string }> }) => {
  const { userId } = use(params);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [updatingRole, setUpdatingRole] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [userData, ordersData] = await Promise.all([
          adminApi.getUserById(userId),
          adminApi.getOrders(),
        ]);
        setUser(userData);
        setOrders(ordersData.filter((o) => o.userId === userId));
      } catch {
        // handle error
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [userId]);

  const handleStatusChange = async (newStatus: string) => {
    if (!user) return;
    setUpdatingStatus(true);
    try {
      const updated = await adminApi.updateUserStatus(user.id, newStatus);
      setUser(updated);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to update user status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleRoleChange = async (newRole: string) => {
    if (!user) return;
    setUpdatingRole(true);
    try {
      const updated = await adminApi.updateUserRole(user.id, newRole);
      setUser(updated);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to update user role');
    } finally {
      setUpdatingRole(false);
    }
  };

  if (isLoading) return <div><p style={{ color: '#707070' }}>Loading...</p></div>;
  if (!user) return <div><p style={{ color: '#ef4444' }}>User not found</p></div>;

  const STATUS_COLORS: Record<string, string> = {
    ACTIVE: '#10b981',
    SUSPENDED: '#f59e0b',
    BANNED: '#ef4444',
  };

  return (
    <div>
      <Link href="/admin/users" style={{ color: '#3566D1', display: 'inline-block', marginBottom: '1.5rem' }}>
        &larr; Back to users
      </Link>

      <h1 className="text-3xl font-bold mb-2">User Details</h1>

      {/* User Info */}
      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>
              {user.firstName || user.lastName
                ? `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim()
                : user.email}
            </p>
            <p style={{ margin: '4px 0', color: '#9ca3af' }}>{user.email}</p>
            <p style={{ margin: '4px 0', color: '#6b7280', fontSize: '0.85rem' }}>
              Role: <strong style={{ color: '#eaeaea' }}>{user.role}</strong> &middot;{' '}
              Joined: {new Date(user.createdAt).toLocaleDateString()}
            </p>
            {user.role === 'BOOSTER' && (
              <p style={{ margin: '4px 0', color: '#6b7280', fontSize: '0.85rem' }}>
                Rating: {user.boosterRating ? `★ ${Number(user.boosterRating).toFixed(1)}` : 'No rating'} &middot;{' '}
                Completed orders: {user.completedOrdersCount}
              </p>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                backgroundColor: STATUS_COLORS[user.status] + '22',
                color: STATUS_COLORS[user.status],
                padding: '4px 12px',
                borderRadius: '9999px',
                fontWeight: 600,
                fontSize: '0.9rem',
              }}
            >
              {user.status}
            </span>
            <select
              disabled={updatingStatus}
              defaultValue=""
              onChange={(e) => { if (e.target.value) handleStatusChange(e.target.value); }}
              style={{
                backgroundColor: '#1e1e2e',
                color: '#eaeaea',
                border: '1px solid #333',
                borderRadius: '8px',
                padding: '6px 12px',
                cursor: 'pointer',
              }}
            >
              <option value="" disabled>Change status</option>
              {['ACTIVE', 'SUSPENDED', 'BANNED']
                .filter((s) => s !== user.status)
                .map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
            </select>
            <select
              disabled={updatingRole}
              defaultValue=""
              onChange={(e) => { if (e.target.value) handleRoleChange(e.target.value); }}
              style={{
                backgroundColor: '#1e1e2e',
                color: '#eaeaea',
                border: '1px solid #3566D1',
                borderRadius: '8px',
                padding: '6px 12px',
                cursor: 'pointer',
              }}
            >
              <option value="" disabled>Change role</option>
              {['CUSTOMER', 'BOOSTER', 'ADMIN']
                .filter((r) => r !== user.role)
                .map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
            </select>
          </div>
        </div>
      </div>

      {/* Orders */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Orders ({orders.length})</h2>
        {orders.length === 0 ? (
          <p style={{ color: '#707070' }}>No orders found for this user.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {orders.map((order) => (
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
                  <Link
                    href={`/admin/orders/${order.id}`}
                    style={{ fontWeight: 500, color: '#eaeaea' }}
                  >
                    {GAME_LABELS[order.gameCode] ?? order.gameCode} — {order.currentRank} → {order.targetRank}
                  </Link>
                  <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#707070' }}>
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
    </div>
  );
};

export default UserDetailsPage;
