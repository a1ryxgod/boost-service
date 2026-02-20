'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { use } from 'react';
import { ordersApi } from '../../../../lib/api';
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS, GAME_LABELS, SERVICE_TYPE_LABELS } from '../../../../lib/constants';
import type { Order } from '../../../../types';
import '../../OrdersPage.css';

const STATUS_STEPS = ['PENDING', 'PAID', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED'];

function getStepState(step: string, currentStatus: string): 'completed' | 'current' | 'pending' {
  const currentIdx = STATUS_STEPS.indexOf(currentStatus);
  const stepIdx = STATUS_STEPS.indexOf(step);
  if (currentStatus === 'CANCELLED') return stepIdx === 0 ? 'completed' : 'pending';
  if (stepIdx < currentIdx) return 'completed';
  if (stepIdx === currentIdx) return 'current';
  return 'pending';
}

const OrderDetailsPage = ({ params }: { params: Promise<{ orderId: string }> }) => {
  const { orderId } = use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await ordersApi.getById(orderId);
        setOrder(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Order not found');
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [orderId]);

  const handleCancel = async () => {
    if (!order || !confirm('Are you sure you want to cancel this order?')) return;
    setCancelling(true);
    try {
      const updated = await ordersApi.cancel(order.id);
      setOrder(updated);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to cancel order');
    } finally {
      setCancelling(false);
    }
  };

  if (isLoading) return <div className="order-detail"><p style={{ color: '#707070' }}>Loading...</p></div>;
  if (error) return <div className="order-detail"><p style={{ color: '#ef4444' }}>{error}</p></div>;
  if (!order) return null;

  const canCancel = order.status === 'PENDING' || order.status === 'PAID';

  return (
    <div className="order-detail">
      <Link href="/orders" className="auth__footer-link" style={{ display: 'inline-block', marginBottom: '2rem' }}>
        &larr; Back to all orders
      </Link>

      <div className="order-detail__header">
        <div className="order-detail__title-section">
          <h1 className="order-detail__title">Order #{order.id.slice(0, 8).toUpperCase()}</h1>
          <p className="order-detail__subtitle">
            {GAME_LABELS[order.gameCode] ?? order.gameCode} &mdash;{' '}
            {SERVICE_TYPE_LABELS[order.serviceType] ?? order.serviceType}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span
            style={{
              backgroundColor: ORDER_STATUS_COLORS[order.status] + '22',
              color: ORDER_STATUS_COLORS[order.status],
              padding: '6px 14px',
              borderRadius: '9999px',
              fontWeight: 600,
            }}
          >
            {ORDER_STATUS_LABELS[order.status] ?? order.status}
          </span>
          {canCancel && (
            <button
              onClick={handleCancel}
              disabled={cancelling}
              style={{
                padding: '6px 14px',
                backgroundColor: 'transparent',
                border: '1px solid #ef4444',
                color: '#ef4444',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              {cancelling ? 'Cancelling...' : 'Cancel Order'}
            </button>
          )}
        </div>
      </div>

      {/* Order Info */}
      <div className="order-detail__card">
        <h2 className="order-detail__card-title">Order Information</h2>
        <div className="order-detail__info-grid">
          <div className="order-detail__info-item">
            <span className="order-detail__info-label">Game</span>
            <span className="order-detail__info-value">{GAME_LABELS[order.gameCode] ?? order.gameCode}</span>
          </div>
          <div className="order-detail__info-item">
            <span className="order-detail__info-label">Service</span>
            <span className="order-detail__info-value">{SERVICE_TYPE_LABELS[order.serviceType] ?? order.serviceType}</span>
          </div>
          <div className="order-detail__info-item">
            <span className="order-detail__info-label">From Rank</span>
            <span className="order-detail__info-value">{order.currentRank}</span>
          </div>
          <div className="order-detail__info-item">
            <span className="order-detail__info-label">Target Rank</span>
            <span className="order-detail__info-value">{order.targetRank}</span>
          </div>
          <div className="order-detail__info-item">
            <span className="order-detail__info-label">Duo Queue</span>
            <span className="order-detail__info-value">{order.isDuo ? 'Yes' : 'No'}</span>
          </div>
          <div className="order-detail__info-item">
            <span className="order-detail__info-label">Total Price</span>
            <span className="order-detail__info-value">${Number(order.price).toFixed(2)}</span>
          </div>
          <div className="order-detail__info-item">
            <span className="order-detail__info-label">Order Date</span>
            <span className="order-detail__info-value">{new Date(order.createdAt).toLocaleDateString()}</span>
          </div>
          {order.booster && (
            <div className="order-detail__info-item">
              <span className="order-detail__info-label">Booster</span>
              <span className="order-detail__info-value">
                {order.booster.firstName ?? order.booster.email}
                {order.booster.boosterRating ? ` ★ ${Number(order.booster.boosterRating).toFixed(1)}` : ''}
              </span>
            </div>
          )}
        </div>
        {order.notes && (
          <div style={{ marginTop: '1rem', padding: '12px', backgroundColor: '#111', borderRadius: '8px' }}>
            <span className="order-detail__info-label">Notes: </span>
            <span style={{ color: '#9ca3af' }}>{order.notes}</span>
          </div>
        )}
      </div>

      {/* Progress Tracker */}
      {order.status !== 'CANCELLED' && (
        <div className="order-detail__progress">
          <h2 className="order-detail__progress-title">Order Progress</h2>
          <div className="order-detail__progress-steps">
            {[
              { key: 'PENDING', label: 'Order Placed', desc: 'Your order has been received' },
              { key: 'PAID', label: 'Payment Confirmed', desc: 'Payment successfully processed' },
              { key: 'ASSIGNED', label: 'Booster Assigned', desc: 'A professional booster is on your order' },
              { key: 'IN_PROGRESS', label: 'In Progress', desc: 'Your booster is actively working' },
              { key: 'COMPLETED', label: 'Completed', desc: 'Order finished successfully' },
            ].map(({ key, label, desc }) => {
              const state = getStepState(key, order.status);
              return (
                <div key={key} className="order-detail__progress-step">
                  <div
                    className={`order-detail__progress-icon order-detail__progress-icon--${state}`}
                  >
                    {state === 'completed' ? '✓' : state === 'current' ? '●' : '○'}
                  </div>
                  <div className="order-detail__progress-content">
                    <h3 className="order-detail__progress-step-title">{label}</h3>
                    <p className="order-detail__progress-step-description">{desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {order.status === 'CANCELLED' && (
        <div style={{ padding: '1.5rem', backgroundColor: '#1a0a0a', border: '1px solid #ef4444', borderRadius: '8px', marginTop: '1rem', color: '#ef4444' }}>
          This order has been cancelled.
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
