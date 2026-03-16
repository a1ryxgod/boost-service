'use client';

import { useEffect, useState } from 'react';
import { boosterApi, ordersApi } from '../../../../lib/api';
import { GAME_LABELS, SERVICE_TYPE_LABELS, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '../../../../lib/constants';
import type { Order } from '../../../../types';
import '../../BoosterPages.css';

type Tab = 'available' | 'mine';

export default function BoosterOrdersPage() {
  const [tab, setTab] = useState<Tab>('available');
  const [availableOrders, setAvailableOrders] = useState<Order[]>([]);
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [assigningId, setAssigningId] = useState<string | null>(null);

  const load = async () => {
    setIsLoading(true);
    try {
      const [available, mine] = await Promise.all([
        boosterApi.getAvailableOrders(),
        boosterApi.getMyOrders(),
      ]);
      setAvailableOrders(available);
      setMyOrders(mine);
    } catch {
      // silently fail
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleAssign = async (orderId: string) => {
    setAssigningId(orderId);
    try {
      await ordersApi.assignToSelf(orderId);
      await load();
      setTab('mine');
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to pick up order');
    } finally {
      setAssigningId(null);
    }
  };

  const orders = tab === 'available' ? availableOrders : myOrders;

  return (
    <div className="bp">
      <div className="bp__header">
        <div>
          <h1 className="bp__title">Orders</h1>
          <p className="bp__subtitle">Pick up available orders or manage your active ones.</p>
        </div>
      </div>

      <div className="bp__tabs">
        <button
          className={`bp__tab ${tab === 'available' ? 'bp__tab--active' : 'bp__tab--inactive'}`}
          onClick={() => setTab('available')}
        >
          Available ({availableOrders.length})
        </button>
        <button
          className={`bp__tab ${tab === 'mine' ? 'bp__tab--active' : 'bp__tab--inactive'}`}
          onClick={() => setTab('mine')}
        >
          My Orders ({myOrders.length})
        </button>
      </div>

      {isLoading ? (
        <p className="bp__loading">Loading…</p>
      ) : orders.length === 0 ? (
        <div className="bp__empty">
          {tab === 'available'
            ? 'No available orders at the moment. Check back soon.'
            : 'You have no assigned orders yet.'}
        </div>
      ) : (
        <div className="bp__order-list">
          {orders.map((order) => (
            <div
              key={order.id}
              className={`bp__order-card${tab === 'available' ? ' bp__order-card--available' : ''}`}
            >
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
                  {order.notes && <span className="bp__order-tag" style={{ background: 'rgba(234,179,8,0.12)', color: '#fbbf24' }}>NOTE</span>}
                </div>
              </div>

              <div className="bp__order-actions">
                {tab === 'mine' && (
                  <span
                    className="bp__badge"
                    style={{
                      background: (ORDER_STATUS_COLORS[order.status] ?? '#888') + '22',
                      color: ORDER_STATUS_COLORS[order.status] ?? '#888',
                    }}
                  >
                    {ORDER_STATUS_LABELS[order.status] ?? order.status}
                  </span>
                )}
                <span className="bp__order-price">${Number(order.price).toFixed(2)}</span>
                {tab === 'available' && (
                  <button
                    className="bp__btn-pickup"
                    onClick={() => handleAssign(order.id)}
                    disabled={assigningId === order.id}
                  >
                    {assigningId === order.id ? 'Picking up…' : 'Pick Up'}
                  </button>
                )}
              </div>

              {order.notes && (
                <p className="bp__order-notes" style={{ width: '100%' }}>
                  📝 {order.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
