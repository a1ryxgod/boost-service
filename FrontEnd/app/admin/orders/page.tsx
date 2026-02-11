import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Manage Orders',
  description: 'View and manage all user orders.',
};

const allOrders = [
    { id: 'ORD-003', user: 'user3@example.com', service: 'LoL Placements', status: 'Pending' },
    { id: 'ORD-002', user: 'user2@example.com', service: 'Valorant Wins Boost', status: 'In Progress' },
    { id: 'ORD-001', user: 'user1@example.com', service: 'CS2 Rank Boost', status: 'Completed' },
];

const AdminOrdersPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage All Orders</h1>
      <div className="bg-gray-800 rounded-lg overflow-x-auto shadow-md">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-900/50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Order</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Service</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">View</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {allOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-700/20">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{order.user}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{order.service}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{order.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href={`/admin/orders/${order.id}`} className="text-purple-400 hover:text-purple-300">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdersPage;