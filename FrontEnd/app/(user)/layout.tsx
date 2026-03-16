import { SmartSidebar } from '../../components/shared/SmartSidebar';
import { ChatWidget } from '../../components/chat/ChatWidget';
import { OrderNotificationsProvider } from '../../components/shared/OrderNotificationsProvider';
import './Dashboard.css';

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard">
      <SmartSidebar />
      <main className="dashboard__main">{children}</main>
      <ChatWidget />
      <OrderNotificationsProvider />
    </div>
  );
}
