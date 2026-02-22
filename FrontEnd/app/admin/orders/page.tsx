'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminApi } from '../../../lib/api';
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS, GAME_LABELS } from '../../../lib/constants';
import type { Order } from '../../../types';
import '../AdminDashboard.css';


const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    adminApi.getOrders(filter || undefined)
      .then(setOrders)
      .catch(() => null)
      .finally(() => setIsLoading(false));
  }, [filter]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const updated = await adminApi.updateOrderStatus(orderId, newStatus);
      setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard__header">
        <h1 className="admin-dashboard__title">Manage All Orders</h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            backgroundColor: '#1e1e2e',
            color: '#eaeaea',
            border: '1px solid #333',
            borderRadius: '8px',
            padding: '8px 12px',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <option value="">All Statuses</option>
          {Object.entries(ORDER_STATUS_LABELS).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <p style={{ color: '#707070' }}>Loading orders...</p>
      ) : (
        <div className="admin-dashboard__table-container">
          <div className="admin-dashboard__table-wrapper">
            <table className="admin-dashboard__table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Game / Ranks</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', color: '#707070', padding: '2rem' }}>
                      No orders found
                    </td>
                  </tr>
                )}
                {orders.map((order) => {
                  const statusColor = ORDER_STATUS_COLORS[order.status] ?? '#707070';
                  const isUpdating = updatingId === order.id;

                  return (
                    <tr key={order.id} style={{ opacity: isUpdating ? 0.6 : 1, transition: 'opacity 0.2s' }}>
                      <td className="admin-dashboard__table-cell--bold">
                        {order.id.slice(0, 8).toUpperCase()}
                      </td>
                      <td className="admin-dashboard__table-cell--muted">
                        {order.user?.email ?? order.userId}
                      </td>
                      <td>
                        {GAME_LABELS[order.gameCode] ?? order.gameCode}
                        <br />
                        <span style={{ fontSize: '0.8rem', color: '#707070' }}>
                          {order.currentRank} → {order.targetRank}
                        </span>
                      </td>
                      <td>${Number(order.price).toFixed(2)}</td>

                      {/* Status — controlled select */}
                      <td>
                        <select
                          value={order.status}
                          disabled={isUpdating}
                          onChange={(e) => {
                            if (e.target.value !== order.status) {
                              handleStatusChange(order.id, e.target.value);
                            }
                          }}
                          style={{
                            backgroundColor: statusColor + '18',
                            color: statusColor,
                            border: `1px solid ${statusColor}44`,
                            borderRadius: '9999px',
                            padding: '3px 10px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            cursor: isUpdating ? 'default' : 'pointer',
                            outline: 'none',
                          }}
                        >
                          {Object.entries(ORDER_STATUS_LABELS).map(([key, label]) => (
                            <option key={key} value={key}>{label}</option>
                          ))}
                        </select>
                      </td>

                      <td className="admin-dashboard__table-cell--muted">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="admin-dashboard__action-button admin-dashboard__action-button--primary"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
