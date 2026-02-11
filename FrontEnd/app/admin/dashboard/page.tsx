import type { Metadata } from 'next';
import '../AdminDashboard.css';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin overview of the service.',
};

const AdminDashboardPage = () => {
  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard__header">
        <h1 className="admin-dashboard__title">Admin Dashboard</h1>
      </div>

      <div className="admin-dashboard__stats">
        <div className="admin-dashboard__stat-card">
          <h2 className="admin-dashboard__stat-label">Active Orders</h2>
          <p className="admin-dashboard__stat-value">12</p>
          <p className="admin-dashboard__stat-sublabel">Currently being processed</p>
        </div>

        <div className="admin-dashboard__stat-card">
          <h2 className="admin-dashboard__stat-label">Completed Today</h2>
          <p className="admin-dashboard__stat-value">5</p>
          <p className="admin-dashboard__stat-sublabel">Successfully finished</p>
        </div>

        <div className="admin-dashboard__stat-card">
          <h2 className="admin-dashboard__stat-label">New Users Today</h2>
          <p className="admin-dashboard__stat-value">8</p>
          <p className="admin-dashboard__stat-sublabel">Registrations today</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
