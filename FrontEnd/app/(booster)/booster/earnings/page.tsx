'use client';

import { useEffect, useState } from 'react';
import { boosterApi } from '../../../../lib/api';
import type { Transaction } from '../../../../types';
import '../../BoosterPages.css';

export default function BoosterEarningsPage() {
  const [earnings, setEarnings] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    boosterApi.getEarnings()
      .then(setEarnings)
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const total = earnings.reduce((sum, t) => sum + Number(t.amount), 0);
  const paid = earnings.filter((t) => t.status === 'PAID').reduce((sum, t) => sum + Number(t.amount), 0);
  const pending = total - paid;

  return (
    <div className="bp">
      <div className="bp__header">
        <div>
          <h1 className="bp__title">Earnings</h1>
          <p className="bp__subtitle">Your payout history and balance overview.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="bp__stats" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="bp__stat" style={{ '--stat-color': '#22c55e' } as React.CSSProperties}>
          <span className="bp__stat-icon">💰</span>
          <span className="bp__stat-label">Total Earned</span>
          <span className="bp__stat-value">{isLoading ? '—' : `$${total.toFixed(2)}`}</span>
        </div>
        <div className="bp__stat" style={{ '--stat-color': '#F5A623' } as React.CSSProperties}>
          <span className="bp__stat-icon">✅</span>
          <span className="bp__stat-label">Paid Out</span>
          <span className="bp__stat-value">{isLoading ? '—' : `$${paid.toFixed(2)}`}</span>
        </div>
        <div className="bp__stat" style={{ '--stat-color': '#7B61FF' } as React.CSSProperties}>
          <span className="bp__stat-icon">⏳</span>
          <span className="bp__stat-label">Pending</span>
          <span className="bp__stat-value">{isLoading ? '—' : `$${pending.toFixed(2)}`}</span>
        </div>
      </div>

      {/* History */}
      <div className="bp__section">
        <div className="bp__section-head">
          <h2 className="bp__section-title">Payout History</h2>
          <span style={{ fontSize: '0.8125rem', color: '#505060' }}>
            {earnings.length} transaction{earnings.length !== 1 ? 's' : ''}
          </span>
        </div>

        {isLoading ? (
          <p className="bp__loading">Loading…</p>
        ) : earnings.length === 0 ? (
          <div className="bp__empty">
            No payouts yet. Complete orders to start earning.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {earnings.map((t) => (
              <div key={t.id} className="bp__transaction">
                <div>
                  <p className="bp__tx-label">Payout</p>
                  <p className="bp__tx-date">{new Date(t.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                </div>
                <div>
                  <p className="bp__tx-amount">+${Number(t.amount).toFixed(2)}</p>
                  <p
                    className="bp__tx-status"
                    style={{ color: t.status === 'PAID' ? '#22c55e' : '#888899' }}
                  >
                    {t.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
