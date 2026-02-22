'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminApi } from '../../../lib/api';
import type { User } from '../../../types';
import '../AdminDashboard.css';

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: '#10b981',
  SUSPENDED: '#f59e0b',
  BANNED: '#ef4444',
};

const ROLE_COLORS: Record<string, string> = {
  ADMIN: '#a78bfa',
  BOOSTER: '#4A90E2',
  CUSTOMER: '#9ca3af',
};

const filterSelectStyle = {
  backgroundColor: '#1e1e2e',
  color: '#eaeaea',
  border: '1px solid #333',
  borderRadius: '8px',
  padding: '8px 12px',
  cursor: 'pointer',
  outline: 'none',
};

const AdminUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [updatingRoleId, setUpdatingRoleId] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    adminApi.getUsers(roleFilter || undefined, statusFilter || undefined)
      .then(setUsers)
      .catch(() => null)
      .finally(() => setIsLoading(false));
  }, [roleFilter, statusFilter]);

  const handleStatusChange = async (userId: string, newStatus: string) => {
    setUpdatingId(userId);
    try {
      const updated = await adminApi.updateUserStatus(userId, newStatus);
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    setUpdatingRoleId(userId);
    try {
      const updated = await adminApi.updateUserRole(userId, newRole);
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to update role');
    } finally {
      setUpdatingRoleId(null);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard__header">
        <h1 className="admin-dashboard__title">Manage Users</h1>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} style={filterSelectStyle}>
            <option value="">All Roles</option>
            <option value="CUSTOMER">Customer</option>
            <option value="BOOSTER">Booster</option>
            <option value="ADMIN">Admin</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={filterSelectStyle}>
            <option value="">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="SUSPENDED">Suspended</option>
            <option value="BANNED">Banned</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <p style={{ color: '#707070' }}>Loading users...</p>
      ) : (
        <div className="admin-dashboard__table-container">
          <div className="admin-dashboard__table-wrapper">
            <table className="admin-dashboard__table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 && (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', color: '#707070', padding: '2rem' }}>
                      No users found
                    </td>
                  </tr>
                )}
                {users.map((user) => {
                  const statusColor = STATUS_COLORS[user.status] ?? '#707070';
                  const roleColor = ROLE_COLORS[user.role] ?? '#9ca3af';
                  const isUpdatingStatus = updatingId === user.id;
                  const isUpdatingRole = updatingRoleId === user.id;

                  return (
                    <tr key={user.id} style={{ opacity: (isUpdatingStatus || isUpdatingRole) ? 0.6 : 1, transition: 'opacity 0.2s' }}>
                      <td className="admin-dashboard__table-cell--bold">{user.email}</td>
                      <td className="admin-dashboard__table-cell--muted">
                        {user.firstName || user.lastName
                          ? `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim()
                          : '—'}
                      </td>

                      {/* Role — inline select */}
                      <td>
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          disabled={isUpdatingRole}
                          style={{
                            backgroundColor: roleColor + '18',
                            color: roleColor,
                            border: `1px solid ${roleColor}44`,
                            borderRadius: '9999px',
                            padding: '3px 10px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            cursor: isUpdatingRole ? 'not-allowed' : 'pointer',
                            outline: 'none',
                          }}
                        >
                          <option value="CUSTOMER">CUSTOMER</option>
                          <option value="BOOSTER">BOOSTER</option>
                          <option value="ADMIN">ADMIN</option>
                        </select>
                      </td>

                      {/* Status — inline select */}
                      <td>
                        <select
                          value={user.status}
                          onChange={(e) => handleStatusChange(user.id, e.target.value)}
                          disabled={isUpdatingStatus}
                          style={{
                            backgroundColor: statusColor + '18',
                            color: statusColor,
                            border: `1px solid ${statusColor}44`,
                            borderRadius: '9999px',
                            padding: '3px 10px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            cursor: isUpdatingStatus ? 'not-allowed' : 'pointer',
                            outline: 'none',
                          }}
                        >
                          <option value="ACTIVE">ACTIVE</option>
                          <option value="SUSPENDED">SUSPENDED</option>
                          <option value="BANNED">BANNED</option>
                        </select>
                      </td>

                      <td className="admin-dashboard__table-cell--muted">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <Link
                          href={`/admin/users/${user.id}`}
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

export default AdminUsersPage;
