'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { reviewsApi } from '../../../lib/api';
import type { Review } from '../../../types';
import '../AdminDashboard.css';

const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    reviewsApi.list()
      .then(setReviews)
      .catch(() => null)
      .finally(() => setIsLoading(false));
  }, []);

  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard__header">
        <h1 className="admin-dashboard__title">Reviews</h1>
        <p style={{ margin: 0, color: '#707070', fontSize: '0.875rem' }}>
          {!isLoading && `${reviews.length} total`}
        </p>
      </div>

      {isLoading ? (
        <p style={{ color: '#707070' }}>Loading reviews...</p>
      ) : (
        <div className="admin-dashboard__table-container">
          <div className="admin-dashboard__table-wrapper">
            <table className="admin-dashboard__table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Booster</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  <th>Order</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {reviews.length === 0 && (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', color: '#707070', padding: '2rem' }}>
                      No reviews yet
                    </td>
                  </tr>
                )}
                {reviews.map((review) => (
                  <tr key={review.id}>
                    <td className="admin-dashboard__table-cell--bold">
                      {review.customer?.firstName ?? review.customer?.email ?? review.customerId.slice(0, 8)}
                    </td>
                    <td className="admin-dashboard__table-cell--muted">
                      {review.booster?.firstName ?? review.booster?.email ?? review.boosterId.slice(0, 8)}
                    </td>
                    <td>
                      <span style={{
                        color: review.rating >= 4 ? '#10b981' : review.rating >= 3 ? '#f59e0b' : '#ef4444',
                        fontWeight: 700,
                        letterSpacing: '1px',
                        fontSize: '0.9rem',
                      }}>
                        {renderStars(review.rating)}
                      </span>
                    </td>
                    <td style={{ maxWidth: '200px' }}>
                      {review.comment ? (
                        <span style={{
                          display: 'block',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          color: '#9ca3af',
                          fontSize: '0.875rem',
                        }}>
                          {review.comment}
                        </span>
                      ) : (
                        <span style={{ color: '#505050', fontSize: '0.8rem' }}>—</span>
                      )}
                    </td>
                    <td>
                      <Link
                        href={`/admin/orders/${review.orderId}`}
                        style={{ color: '#3566D1', fontSize: '0.8rem' }}
                      >
                        {review.orderId.slice(0, 8).toUpperCase()}
                      </Link>
                    </td>
                    <td className="admin-dashboard__table-cell--muted">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReviewsPage;
