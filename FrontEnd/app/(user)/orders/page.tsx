import type { Metadata } from 'next';
import Link from 'next/link';
import '../OrdersPage.css';

export const metadata: Metadata = {
  title: 'My Orders',
  description: 'View your order history.',
};

const orders = [
  { id: 'ORD-002', game: 'Valorant', service: 'Wins Boost', status: 'In Progress', date: '2024-03-01' },
  { id: 'ORD-001', game: 'CS2', service: 'Rank Boost', status: 'Completed', date: '2024-02-15' },
];

const OrdersPage = () => {
  return (
    <div className="orders">
      <div className="orders__header">
        <h1 className="orders__title">My Orders</h1>
      </div>

      <div className="orders__list-container">
        <ul className="orders__list">
          {orders.map((order) => (
            <li key={order.id} className="orders__list-item">
              <Link href={`/orders/${order.id}`} className="orders__list-link">
                <div className="orders__list-info">
                  <p className="orders__list-title">
                    {order.game} - {order.service}
                  </p>
                  <p className="orders__list-date">
                    Ordered on {order.date}
                  </p>
                </div>
                <span
                  className={`orders__status ${
                    order.status === 'Completed'
                      ? 'orders__status--completed'
                      : 'orders__status--in-progress'
                  }`}
                >
                  {order.status}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrdersPage;
