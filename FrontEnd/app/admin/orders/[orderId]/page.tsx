'use client';

import { useEffect, useState } from 'react';
import { use } from 'react';
import Link from 'next/link';
import { ordersApi, adminApi } from '../../../../lib/api';
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS, GAME_LABELS, SERVICE_TYPE_LABELS } from '../../../../lib/constants';
import type { Order, User } from '../../../../types';
import '../../AdminDashboard.css';

const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  PENDING: ['PAID', 'CANCELLED'],
  PAID: ['ASSIGNED', 'CANCELLED'],
  ASSIGNED: ['IN_PROGRESS', 'CANCELLED'],
  IN_PROGRESS: ['COMPLETED'],
  COMPLETED: [],
  CANCELLED: [],
};

const AdminOrderDetailPage = ({ params }: { params: Promise<{ orderId: string }> }) => {
  const { orderId } = use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [boosters, setBoosters] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooster, setSelectedBooster] = useState('');
  const [assigning, setAssigning] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [orderData, usersData] = await Promise.all([
          ordersApi.getById(orderId),
          adminApi.getUsers('BOOSTER', 'ACTIVE'),
        ]);
        setOrder(orderData);
        setBoosters(usersData);
      } catch {
        // handle silently
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [orderId]);

  const reloadOrder = async () => {
    const fresh = await ordersApi.getById(orderId);
    setOrder(fresh);
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!order) return;
    setUpdatingStatus(true);
    try {
      await adminApi.updateOrderStatus(order.id, newStatus);
      await reloadOrder();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to update status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleAssign = async () => {
    if (!order || !selectedBooster) return;
    setAssigning(true);
    try {
      await adminApi.assignOrder(order.id, selectedBooster);
      await reloadOrder();
      setSelectedBooster('');
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to assign booster');
    } finally {
      setAssigning(false);
    }
  };

  const selectStyle = {
    backgroundColor: '#1e1e2e',
    color: '#eaeaea',
    border: '1px solid #333',
    borderRadius: '8px',
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '0.875rem',
  };

  if (isLoading) return <div className="admin-dashboard"><p style={{ color: '#707070' }}>Loading...</p></div>;
  if (!order) return <div className="admin-dashboard"><p style={{ color: '#ef4444' }}>Order not found</p></div>;

  const allowedNext = ALLOWED_TRANSITIONS[order.status] ?? [];

  return (
    <div className="admin-dashboard">
      <Link href="/admin/orders" style={{ color: '#3566D1', display: 'inline-block', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
        ← Back to orders
      </Link>

      <div className="admin-dashboard__header" style={{ marginBottom: '1.5rem' }}>
        <h1 className="admin-dashboard__title">Order #{order.id.slice(0, 8).toUpperCase()}</h1>
        <span style={{
          backgroundColor: (ORDER_STATUS_COLORS[order.status] ?? '#707070') + '22',
          color: ORDER_STATUS_COLORS[order.status] ?? '#707070',
          padding: '6px 16px',
          borderRadius: '9999px',
          fontWeight: 600,
          fontSize: '0.875rem',
        }}>
          {ORDER_STATUS_LABELS[order.status] ?? order.status}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>

        {/* Order Info */}
        <div style={{ backgroundColor: '#1a1a2e', border: '1px solid #2a2a3e', borderRadius: '12px', padding: '1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 700, color: '#fff' }}>Order Info</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <tbody>
              {[
                ['Game', GAME_LABELS[order.gameCode] ?? order.gameCode],
                ['Service', SERVICE_TYPE_LABELS[order.serviceType] ?? order.serviceType],
                ['Current Rank', order.currentRank],
                ['Target Rank', order.targetRank],
                ['Price', `$${Number(order.price).toFixed(2)} ${order.currency}`],
                ['Duo', order.isDuo ? 'Yes' : 'No'],
                ['Created', new Date(order.createdAt).toLocaleString()],
                ...(order.notes ? [['Notes', order.notes]] : []),
              ].map(([label, value]) => (
                <tr key={label} style={{ borderBottom: '1px solid #1e1e2e' }}>
                  <td style={{ padding: '8px 0', color: '#707070', width: '45%' }}>{label}</td>
                  <td style={{ padding: '8px 0', color: '#eaeaea', fontWeight: 500 }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Customer */}
        <div style={{ backgroundColor: '#1a1a2e', border: '1px solid #2a2a3e', borderRadius: '12px', padding: '1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 700, color: '#fff' }}>Customer</h2>
          {order.user ? (
            <>
              <p style={{ margin: '0 0 4px', color: '#eaeaea', fontWeight: 600 }}>
                {order.user.firstName
                  ? `${order.user.firstName} ${order.user.lastName ?? ''}`.trim()
                  : order.user.email}
              </p>
              <p style={{ margin: '0 0 12px', color: '#707070', fontSize: '0.8rem' }}>{order.user.email}</p>
              <Link
                href={`/admin/users/${order.userId}`}
                className="admin-dashboard__action-button admin-dashboard__action-button--primary"
                style={{ display: 'inline-block' }}
              >
                View Profile →
              </Link>
            </>
          ) : (
            <Link href={`/admin/users/${order.userId}`} style={{ color: '#3566D1', fontSize: '0.875rem' }}>
              User ID: {order.userId}
            </Link>
          )}
        </div>

        {/* Booster */}
        <div style={{ backgroundColor: '#1a1a2e', border: '1px solid #2a2a3e', borderRadius: '12px', padding: '1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 700, color: '#fff' }}>Booster</h2>
          {order.booster ? (
            <>
              <p style={{ margin: '0 0 4px', color: '#eaeaea', fontWeight: 600 }}>
                {order.booster.firstName
                  ? `${order.booster.firstName} ${order.booster.lastName ?? ''}`.trim()
                  : order.booster.email}
              </p>
              <p style={{ margin: '0 0 12px', color: '#707070', fontSize: '0.8rem' }}>{order.booster.email}</p>
              <Link
                href={`/admin/users/${order.boosterId}`}
                className="admin-dashboard__action-button admin-dashboard__action-button--secondary"
                style={{ display: 'inline-block' }}
              >
                View Profile →
              </Link>
            </>
          ) : order.status === 'PAID' ? (
            <div>
              <p style={{ margin: '0 0 12px', color: '#707070', fontSize: '0.875rem' }}>Not assigned yet</p>
              <select
                value={selectedBooster}
                onChange={(e) => setSelectedBooster(e.target.value)}
                style={{ ...selectStyle, width: '100%', marginBottom: '8px' }}
              >
                <option value="">Select booster...</option>
                {boosters.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.firstName ? `${b.firstName} ${b.lastName ?? ''}`.trim() : b.email}
                  </option>
                ))}
              </select>
              <button
                onClick={handleAssign}
                disabled={assigning || !selectedBooster}
                className="admin-dashboard__action-button admin-dashboard__action-button--primary"
                style={{ width: '100%', cursor: assigning || !selectedBooster ? 'not-allowed' : 'pointer', opacity: !selectedBooster ? 0.5 : 1 }}
              >
                {assigning ? 'Assigning...' : 'Assign Booster'}
              </button>
            </div>
          ) : (
            <p style={{ color: '#505050', fontSize: '0.875rem' }}>No booster assigned</p>
          )}
        </div>

        {/* Status Management */}
        <div style={{ backgroundColor: '#1a1a2e', border: '1px solid #2a2a3e', borderRadius: '12px', padding: '1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 700, color: '#fff' }}>Change Status</h2>
          {allowedNext.length > 0 ? (
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {allowedNext.map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  disabled={updatingStatus}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: status === 'CANCELLED' ? 'rgba(239,68,68,0.1)' : 'rgba(53,102,209,0.15)',
                    color: status === 'CANCELLED' ? '#ef4444' : '#4A90E2',
                    border: `1px solid ${status === 'CANCELLED' ? '#ef444444' : '#3566D144'}`,
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: updatingStatus ? 'not-allowed' : 'pointer',
                    opacity: updatingStatus ? 0.6 : 1,
                  }}
                >
                  → {ORDER_STATUS_LABELS[status] ?? status}
                </button>
              ))}
            </div>
          ) : (
            <p style={{ color: '#505050', fontSize: '0.875rem' }}>No further transitions available</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminOrderDetailPage;
