import { BoosterSidebar } from '../../components/shared/BoosterSidebar';
import { OrderNotificationsProvider } from '../../components/shared/OrderNotificationsProvider';
import '../(user)/Dashboard.css';

export default function BoosterDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard">
      <BoosterSidebar />
      <main className="dashboard__main">{children}</main>
      <OrderNotificationsProvider />
    </div>
  );
}
