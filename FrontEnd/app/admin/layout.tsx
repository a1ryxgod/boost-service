import { AdminSidebar } from '../../components/shared/AdminSidebar';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0a0a0a' }}>
      <AdminSidebar />
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
