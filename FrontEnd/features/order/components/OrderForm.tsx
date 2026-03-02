'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ordersApi } from '../../../lib/api';
import { useAuth } from '../../../context/AuthContext';
import type { CreateOrderRequest } from '../../../types';

interface OrderFormProps {
  orderData: CreateOrderRequest;
  priceSummary?: React.ReactNode;
  children?: React.ReactNode;
}

const OrderForm = ({ orderData, priceSummary, children }: OrderFormProps) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOrder = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    setError('');
    setIsLoading(true);
    try {
      const order = await ordersApi.create(orderData);
      router.push(`/orders/${order.id}`);
    } catch (err: unknown) {
      if (err instanceof Error && err.message.includes('expired')) {
        router.push('/login');
      } else {
        setError(err instanceof Error ? err.message : 'Failed to create order. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const buttonLabel = isLoading
    ? 'Placing Order...'
    : isAuthenticated
      ? 'Place Order'
      : 'Sign in to Order';

  return (
    <div>
      {priceSummary}
      {children}
      {error && (
        <p style={{ color: '#ef4444', marginTop: '0.75rem', fontSize: '0.9rem' }}>
          {error}
        </p>
      )}
      <button
        type="button"
        onClick={handleOrder}
        disabled={isLoading}
        className="service__summary-button"
        style={{ opacity: isLoading ? 0.7 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
      >
        {buttonLabel}
      </button>
    </div>
  );
};

export { OrderForm };
