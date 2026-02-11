import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'View User',
  description: 'View user details and their order history.',
};

const UserDetailsPage = ({ params }: { params: { userId: string } }) => {
  const user = {
    id: params.userId,
    email: 'user2@example.com',
    joinDate: '2024-02-20',
  };

  const userOrders = [
    { id: 'ORD-002', service: 'Valorant Wins Boost', status: 'In Progress' },
    { id: 'ORD-005', service: 'CS2 Rank Boost', status: 'Completed' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">User Details</h1>
      <p className="text-gray-400 mb-8">Email: {user.email} | Joined: {user.joinDate}</p>
      
      <div className="bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Order History for this User</h2>
        <ul className="divide-y divide-gray-700">
          {userOrders.map(order => (
            <li key={order.id} className="py-3 flex justify-between items-center">
              <Link href={`/admin/orders/${order.id}`} className="font-medium hover:underline">
                {order.id} - {order.service}
              </Link>
              <span className={`px-3 py-1 text-xs font-bold rounded-full ${order.status === 'Completed' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                {order.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDetailsPage;
