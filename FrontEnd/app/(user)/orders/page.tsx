'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ordersApi } from '../../../lib/api';
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS, GAME_LABELS } from '../../../lib/constants';
import type { Order } from '../../../types';
import '../OrdersPage.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await ordersApi.list({ page: 1, limit: 20 });
        setOrders(data.orders);
        setTotal(data.total);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load orders');
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="orders">
      <div className="orders__header">
        <h1 className="orders__title">My Orders {total > 0 && `(${total})`}</h1>
      </div>

      {isLoading && <p style={{ color: '#707070' }}>Loading orders...</p>}
      {error && <p style={{ color: '#ef4444' }}>{error}</p>}

      {!isLoading && !error && orders.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem 0', color: '#707070' }}>
          <p>You haven&apos;t placed any orders yet.</p>
          <Link
            href="/games"
            style={{
              display: 'inline-block',
              marginTop: '1rem',
              padding: '10px 24px',
              backgroundColor: '#3566D1',
              color: '#fff',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            Browse Services
          </Link>
        </div>
      )}

      {!isLoading && orders.length > 0 && (
        <div className="orders__list-container">
          <ul className="orders__list">
            {orders.map((order) => (
              <li key={order.id} className="orders__list-item">
                <Link href={`/orders/${order.id}`} className="orders__list-link">
                  <div className="orders__list-info">
                    <p className="orders__list-title">
                      {GAME_LABELS[order.gameCode] ?? order.gameCode} &mdash;{' '}
                      {order.currentRank} → {order.targetRank}
                    </p>
                    <p className="orders__list-date">
                      {new Date(order.createdAt).toLocaleDateString()} &middot;{' '}
                      ${Number(order.price).toFixed(2)}
                    </p>
                  </div>
                  <span
                    className="orders__status"
                    style={{
                      backgroundColor: ORDER_STATUS_COLORS[order.status] + '22',
                      color: ORDER_STATUS_COLORS[order.status],
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {ORDER_STATUS_LABELS[order.status] ?? order.status}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
