'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ordersApi } from '../../../lib/api';
import { useAuth } from '../../../context/AuthContext';
import type { CreateOrderRequest } from '../../../types';

interface PromoResult {
  discountType: 'PERCENT' | 'FIXED';
  discountValue: number;
}

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
  const [promoCode, setPromoCode] = useState('');
  const [promoStatus, setPromoStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
  const [promoResult, setPromoResult] = useState<PromoResult | null>(null);

  const handlePromoCheck = async () => {
    if (!promoCode.trim()) return;
    setPromoStatus('checking');
    try {
      const res = await ordersApi.validatePromoCode(promoCode.trim());
      if (res.valid && res.discountType && res.discountValue !== undefined) {
        setPromoStatus('valid');
        setPromoResult({ discountType: res.discountType as 'PERCENT' | 'FIXED', discountValue: res.discountValue });
      } else {
        setPromoStatus('invalid');
        setPromoResult(null);
      }
    } catch {
      setPromoStatus('invalid');
      setPromoResult(null);
    }
  };

  const getDiscountLabel = () => {
    if (!promoResult) return '';
    if (promoResult.discountType === 'PERCENT') return `-${promoResult.discountValue}%`;
    return `-$${promoResult.discountValue.toFixed(2)}`;
  };

  const handleOrder = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    setError('');
    setIsLoading(true);
    try {
      const payload: CreateOrderRequest = {
        ...orderData,
        ...(promoStatus === 'valid' && promoCode ? { promoCode: promoCode.trim().toUpperCase() } : {}),
      };
      const order = await ordersApi.create(payload);
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

      {/* Promo Code Field */}
      <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            value={promoCode}
            onChange={(e) => {
              setPromoCode(e.target.value.toUpperCase());
              setPromoStatus('idle');
              setPromoResult(null);
            }}
            placeholder="Promo code"
            style={{
              flex: 1,
              padding: '0.6rem 0.875rem',
              background: '#111',
              border: `1px solid ${promoStatus === 'valid' ? '#22c55e' : promoStatus === 'invalid' ? '#ef4444' : '#2a2a3d'}`,
              borderRadius: '8px',
              color: '#EAEAEA',
              fontSize: '0.875rem',
            }}
            disabled={promoStatus === 'valid'}
          />
          <button
            type="button"
            onClick={promoStatus === 'valid' ? () => { setPromoCode(''); setPromoStatus('idle'); setPromoResult(null); } : handlePromoCheck}
            disabled={promoStatus === 'checking' || !promoCode.trim()}
            style={{
              padding: '0.6rem 1rem',
              background: promoStatus === 'valid' ? 'transparent' : '#2a2a3d',
              border: `1px solid ${promoStatus === 'valid' ? '#22c55e' : '#2a2a3d'}`,
              borderRadius: '8px',
              color: promoStatus === 'valid' ? '#22c55e' : '#EAEAEA',
              fontSize: '0.8125rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {promoStatus === 'checking' ? '...' : promoStatus === 'valid' ? 'Remove' : 'Apply'}
          </button>
        </div>
        {promoStatus === 'valid' && promoResult && (
          <p style={{ color: '#22c55e', fontSize: '0.8125rem', marginTop: '0.35rem' }}>
            Promo code applied: {getDiscountLabel()} discount
          </p>
        )}
        {promoStatus === 'invalid' && (
          <p style={{ color: '#ef4444', fontSize: '0.8125rem', marginTop: '0.35rem' }}>
            Invalid or expired promo code
          </p>
        )}
      </div>

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
