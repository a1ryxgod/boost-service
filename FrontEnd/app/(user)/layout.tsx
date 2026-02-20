import { DashboardSidebar } from '../../components/shared/DashboardSidebar';
import './Dashboard.css';

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard">
      <DashboardSidebar />
      <main className="dashboard__main">{children}</main>
    </div>
  );
}
