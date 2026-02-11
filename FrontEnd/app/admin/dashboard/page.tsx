import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin overview of the service.',
};

const AdminDashboardPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-6 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-400">Active Orders</h2>
          <p className="text-5xl font-bold mt-2">12</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-400">Completed Today</h2>
          <p className="text-5xl font-bold mt-2">5</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-400">New Users Today</h2>
          <p className="text-5xl font-bold mt-2">8</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;