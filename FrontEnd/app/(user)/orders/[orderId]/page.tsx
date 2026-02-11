import type { Metadata } from 'next';
import Link from 'next/link';
import '../../OrdersPage.css';

export const metadata: Metadata = {
  title: 'Order Details',
  description: 'View the details and progress of a specific order.',
};

const OrderDetailsPage = ({ params }: { params: { orderId: string } }) => {
  const order = {
    id: params.orderId,
    game: 'Valorant',
    service: 'Wins Boost',
    status: 'In Progress',
    date: '2024-03-01',
    details: '5 Wins, Duo Queue',
    progress: 60,
    price: '$49.99',
  };

  return (
    <div className="order-detail">
      <Link href="/orders" className="auth__footer-link" style={{ display: 'inline-block', marginBottom: '2rem' }}>
        &larr; Back to all orders
      </Link>

      <div className="order-detail__header">
        <div className="order-detail__title-section">
          <h1 className="order-detail__title">Order #{order.id}</h1>
          <p className="order-detail__subtitle">
            {order.game} - {order.service}
          </p>
        </div>
        <span className="orders__status orders__status--in-progress">
          {order.status}
        </span>
      </div>

      {/* Order Info Card */}
      <div className="order-detail__card">
        <h2 className="order-detail__card-title">Order Information</h2>
        <div className="order-detail__info-grid">
          <div className="order-detail__info-item">
            <span className="order-detail__info-label">Game</span>
            <span className="order-detail__info-value">{order.game}</span>
          </div>
          <div className="order-detail__info-item">
            <span className="order-detail__info-label">Service</span>
            <span className="order-detail__info-value">{order.service}</span>
          </div>
          <div className="order-detail__info-item">
            <span className="order-detail__info-label">Details</span>
            <span className="order-detail__info-value">{order.details}</span>
          </div>
          <div className="order-detail__info-item">
            <span className="order-detail__info-label">Total Price</span>
            <span className="order-detail__info-value">{order.price}</span>
          </div>
          <div className="order-detail__info-item">
            <span className="order-detail__info-label">Order Date</span>
            <span className="order-detail__info-value">{order.date}</span>
          </div>
          <div className="order-detail__info-item">
            <span className="order-detail__info-label">Status</span>
            <span className="order-detail__info-value">{order.status}</span>
          </div>
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="order-detail__progress">
        <h2 className="order-detail__progress-title">Order Progress</h2>
        <div className="order-detail__progress-steps">
          <div className="order-detail__progress-step">
            <div className="order-detail__progress-icon order-detail__progress-icon--completed">
              ✓
            </div>
            <div className="order-detail__progress-content">
              <h3 className="order-detail__progress-step-title">Order Placed</h3>
              <p className="order-detail__progress-step-description">
                Your order has been received and confirmed
              </p>
            </div>
          </div>

          <div className="order-detail__progress-step">
            <div className="order-detail__progress-icon order-detail__progress-icon--completed">
              ✓
            </div>
            <div className="order-detail__progress-content">
              <h3 className="order-detail__progress-step-title">Booster Assigned</h3>
              <p className="order-detail__progress-step-description">
                A professional booster has been assigned to your order
              </p>
            </div>
          </div>

          <div className="order-detail__progress-step">
            <div className="order-detail__progress-icon order-detail__progress-icon--current">
              {order.progress}%
            </div>
            <div className="order-detail__progress-content">
              <h3 className="order-detail__progress-step-title">In Progress</h3>
              <p className="order-detail__progress-step-description">
                Your booster is actively working on your order
              </p>
            </div>
          </div>

          <div className="order-detail__progress-step">
            <div className="order-detail__progress-icon order-detail__progress-icon--pending">
              4
            </div>
            <div className="order-detail__progress-content">
              <h3 className="order-detail__progress-step-title">Completed</h3>
              <p className="order-detail__progress-step-description">
                Order will be marked as complete when finished
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Section Placeholder */}
      <div className="order-detail__card">
        <h2 className="order-detail__card-title">Chat with Your Booster</h2>
        <div style={{
          padding: '2rem',
          backgroundColor: '#111',
          borderRadius: '8px',
          textAlign: 'center',
          color: '#707070'
        }}>
          Chat component placeholder
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
