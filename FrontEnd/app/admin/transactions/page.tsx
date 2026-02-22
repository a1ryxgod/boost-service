'use client';

import { useEffect, useState } from 'react';
import { adminApi } from '../../../lib/api';
import type { Transaction } from '../../../types';
import '../AdminDashboard.css';

const PAYMENT_STATUS_COLORS: Record<string, string> = {
  PENDING: '#f59e0b',
  PAID: '#10b981',
  FAILED: '#ef4444',
  REFUNDED: '#6b7280',
};

const AdminTransactionsPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    adminApi.getTransactions()
      .then(setTransactions)
      .catch(() => null)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard__header">
        <h1 className="admin-dashboard__title">Transactions</h1>
        <p style={{ margin: 0, color: '#707070', fontSize: '0.875rem' }}>
          {!isLoading && `${transactions.length} total`}
        </p>
      </div>

      {isLoading ? (
        <p style={{ color: '#707070' }}>Loading transactions...</p>
      ) : (
        <div className="admin-dashboard__table-container">
          <div className="admin-dashboard__table-wrapper">
            <table className="admin-dashboard__table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User ID</th>
                  <th>Order ID</th>
                  <th>Type</th>
                  <th>Method</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 && (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center', color: '#707070', padding: '2rem' }}>
                      No transactions found
                    </td>
                  </tr>
                )}
                {transactions.map((tx) => (
                  <tr key={tx.id}>
                    <td className="admin-dashboard__table-cell--bold">
                      {tx.id.slice(0, 8).toUpperCase()}
                    </td>
                    <td className="admin-dashboard__table-cell--muted">
                      {tx.userId.slice(0, 8)}...
                    </td>
                    <td className="admin-dashboard__table-cell--muted">
                      {tx.orderId ? tx.orderId.slice(0, 8).toUpperCase() : '—'}
                    </td>
                    <td>{tx.transactionType}</td>
                    <td className="admin-dashboard__table-cell--muted">{tx.paymentMethod}</td>
                    <td style={{ fontWeight: 600 }}>
                      ${Number(tx.amount).toFixed(2)} {tx.currency}
                    </td>
                    <td>
                      <span style={{
                        backgroundColor: (PAYMENT_STATUS_COLORS[tx.status] ?? '#707070') + '22',
                        color: PAYMENT_STATUS_COLORS[tx.status] ?? '#707070',
                        padding: '3px 10px',
                        borderRadius: '9999px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                      }}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="admin-dashboard__table-cell--muted">
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTransactionsPage;
