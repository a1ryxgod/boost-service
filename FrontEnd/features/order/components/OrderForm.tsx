'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ordersApi } from '../../../lib/api';
import { TokenStorage } from '../../../lib/tokens';
import type { CreateOrderRequest } from '../../../types';

interface OrderFormProps {
  orderData: CreateOrderRequest;
  priceSummary?: React.ReactNode;
  children?: React.ReactNode;
}

const OrderForm = ({ orderData, priceSummary, children }: OrderFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOrder = async () => {
    setError('');

    // Check authentication
    if (!TokenStorage.getAccess()) {
      router.push('/login');
      return;
    }

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
        style={{
          width: '100%',
          marginTop: '1rem',
          padding: '14px',
          backgroundColor: isLoading ? '#1e3a70' : '#3566D1',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: 700,
          cursor: isLoading ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s',
        }}
      >
        {isLoading ? 'Placing Order...' : 'Place Order'}
      </button>
    </div>
  );
};

export { OrderForm };
