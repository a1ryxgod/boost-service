import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Manage Order',
  description: 'View and manage a specific order.',
};

const AdminOrderDetailsPage = ({ params }: { params: { orderId: string } }) => {
  const order = {
    id: params.orderId,
    user: 'user2@example.com',
    userId: 'user-id-2',
    service: 'Valorant Wins Boost',
    status: 'In Progress',
  };

  return (
    <div>
      <Link href="/admin/orders" className="text-purple-400 hover:underline mb-8 block">&larr; Back to all orders</Link>
      
      <div className="bg-gray-800 p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold">Order #{order.id}</h1>
            <Link href={`/admin/users/${order.userId}`} className="text-gray-400 hover:underline">
              User: {order.user}
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold">{order.status}</span>
            <Button>Update Status</Button>
          </div>
        </div>
        
        <div>
            <h2 className="text-xl font-semibold">Order Details</h2>
            <p className="mt-4 text-gray-400">Placeholder for detailed order information and admin actions, such as assigning a booster, viewing logs, or modifying order parameters.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetailsPage;