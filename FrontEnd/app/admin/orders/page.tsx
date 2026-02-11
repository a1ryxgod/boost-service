import type { Metadata } from 'next';
import Link from 'next/link';
import '../AdminDashboard.css';

export const metadata: Metadata = {
  title: 'Manage Orders',
  description: 'View and manage all user orders.',
};

const allOrders = [
  { id: 'ORD-003', user: 'user3@example.com', service: 'LoL Placements', status: 'Pending' },
  { id: 'ORD-002', user: 'user2@example.com', service: 'Valorant Wins Boost', status: 'In Progress' },
  { id: 'ORD-001', user: 'user1@example.com', service: 'CS2 Rank Boost', status: 'Completed' },
];

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'admin-dashboard__badge--success';
    case 'In Progress':
      return 'admin-dashboard__badge--warning';
    case 'Pending':
      return 'admin-dashboard__badge--info';
    default:
      return 'admin-dashboard__badge--neutral';
  }
};

const AdminOrdersPage = () => {
  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard__header">
        <h1 className="admin-dashboard__title">Manage All Orders</h1>
      </div>

      <div className="admin-dashboard__table-container">
        <div className="admin-dashboard__table-wrapper">
          <table className="admin-dashboard__table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Service</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order) => (
                <tr key={order.id}>
                  <td className="admin-dashboard__table-cell--bold">{order.id}</td>
                  <td className="admin-dashboard__table-cell--muted">{order.user}</td>
                  <td>{order.service}</td>
                  <td>
                    <span className={`admin-dashboard__badge ${getStatusBadgeClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <div className="admin-dashboard__actions">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="admin-dashboard__action-button admin-dashboard__action-button--primary"
                      >
                        View
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
