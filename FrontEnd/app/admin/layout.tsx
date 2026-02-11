// import { DashboardSidebar } from '@/components/shared/DashboardSidebar';

// This layout would likely use a shared Sidebar component but with
// admin-specific navigation items.
export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-neutral-950">
      {/* <DashboardSidebar isAdmin={true} /> */}
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
}
