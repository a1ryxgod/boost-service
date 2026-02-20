'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminApi } from '../../../lib/api';
import type { AdminStats } from '../../../types';
import './AdminDashboard.css';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    adminApi.getStats()
      .then(setStats)
      .catch(() => null)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard__header">
        <h1 className="admin-dashboard__title">Admin Dashboard</h1>
      </div>

      {isLoading ? (
        <p style={{ color: '#707070' }}>Loading statistics...</p>
      ) : (
        <>
          {/* Orders Stats */}
          <div className="admin-dashboard__stats">
            <div className="admin-dashboard__stat-card">
              <h2 className="admin-dashboard__stat-label">Active Orders</h2>
              <p className="admin-dashboard__stat-value">{stats?.orders.inProgress ?? 0}</p>
              <p className="admin-dashboard__stat-sublabel">Currently in progress</p>
            </div>
            <div className="admin-dashboard__stat-card">
              <h2 className="admin-dashboard__stat-label">Pending Orders</h2>
              <p className="admin-dashboard__stat-value">{stats?.orders.pending ?? 0}</p>
              <p className="admin-dashboard__stat-sublabel">Awaiting assignment</p>
            </div>
            <div className="admin-dashboard__stat-card">
              <h2 className="admin-dashboard__stat-label">Completed Orders</h2>
              <p className="admin-dashboard__stat-value">{stats?.orders.completed ?? 0}</p>
              <p className="admin-dashboard__stat-sublabel">Successfully finished</p>
            </div>
            <div className="admin-dashboard__stat-card">
              <h2 className="admin-dashboard__stat-label">Total Revenue</h2>
              <p className="admin-dashboard__stat-value">${(stats?.revenue.total ?? 0).toFixed(0)}</p>
              <p className="admin-dashboard__stat-sublabel">All time earnings</p>
            </div>
          </div>

          {/* User Stats */}
          <div className="admin-dashboard__stats" style={{ marginTop: '1.5rem' }}>
            <div className="admin-dashboard__stat-card">
              <h2 className="admin-dashboard__stat-label">Total Users</h2>
              <p className="admin-dashboard__stat-value">{stats?.users.total ?? 0}</p>
              <p className="admin-dashboard__stat-sublabel">Registered accounts</p>
            </div>
            <div className="admin-dashboard__stat-card">
              <h2 className="admin-dashboard__stat-label">Customers</h2>
              <p className="admin-dashboard__stat-value">{stats?.users.customers ?? 0}</p>
              <p className="admin-dashboard__stat-sublabel">Active customers</p>
            </div>
            <div className="admin-dashboard__stat-card">
              <h2 className="admin-dashboard__stat-label">Boosters</h2>
              <p className="admin-dashboard__stat-value">{stats?.users.boosters ?? 0}</p>
              <p className="admin-dashboard__stat-sublabel">Active boosters</p>
            </div>
            <div className="admin-dashboard__stat-card">
              <h2 className="admin-dashboard__stat-label">Avg Rating</h2>
              <p className="admin-dashboard__stat-value">
                {stats?.reviews.averageRating ? Number(stats.reviews.averageRating).toFixed(1) : '—'}
              </p>
              <p className="admin-dashboard__stat-sublabel">Booster rating</p>
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
            <Link
              href="/admin/orders"
              style={{
                padding: '12px 24px',
                backgroundColor: '#3566D1',
                color: '#fff',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Manage Orders
            </Link>
            <Link
              href="/admin/users"
              style={{
                padding: '12px 24px',
                backgroundColor: '#1e1e2e',
                color: '#fff',
                border: '1px solid #333',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Manage Users
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboardPage;
