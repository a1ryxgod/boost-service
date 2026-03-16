'use client';

import { useState } from 'react';
import { GameCode, ServiceType } from '../../../types';
import type { CreateOrderRequest } from '../../../types';
import { OrderForm } from './OrderForm';

interface Plan {
  title: string;
  price: number;
  features: string[];
  popular?: boolean;
}

interface CoachingPlansProps {
  gameCode: GameCode;
  plans: Plan[];
}

export function CoachingPlans({ gameCode, plans }: CoachingPlansProps) {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [currentRank, setCurrentRank] = useState('');
  const [notes, setNotes] = useState('');

  if (selectedPlan) {
    const orderData: CreateOrderRequest = {
      gameCode,
      serviceType: ServiceType.COACHING,
      currentRank: currentRank.trim() || 'Not specified',
      targetRank: `${selectedPlan.title} Coaching Session`,
      price: selectedPlan.price,
      currency: 'USD',
      ...(notes.trim() ? { notes: notes.trim() } : {}),
    };

    const priceSummary = (
      <div className="service__summary-card" style={{ marginBottom: '1rem' }}>
        <div className="service__summary-items">
          <div className="service__summary-item">
            <span className="service__summary-item-label">Plan</span>
            <span className="service__summary-item-value">{selectedPlan.title}</span>
          </div>
          <div className="service__summary-item">
            <span className="service__summary-item-label">Service</span>
            <span className="service__summary-item-value">Coaching</span>
          </div>
        </div>
        <div className="service__summary-total" style={{ marginTop: '1rem' }}>
          <span className="service__summary-total-label">Total</span>
          <span className="service__summary-total-value">${selectedPlan.price.toFixed(2)}</span>
        </div>
      </div>
    );

    return (
      <div className="coaching__order-section">
        <div className="coaching__order-header">
          <h3 className="coaching__order-title">
            {selectedPlan.title} Session
            <span className="coaching__order-price">${selectedPlan.price.toFixed(2)}</span>
          </h3>
          <button
            className="coaching__back-btn"
            onClick={() => { setSelectedPlan(null); setCurrentRank(''); setNotes(''); }}
          >
            ← Choose different plan
          </button>
        </div>

        <div className="coaching__order-fields">
          <div>
            <label className="coaching__order-label">Your current rank / skill level *</label>
            <input
              type="text"
              className="coaching__order-input"
              placeholder="e.g. Gold Nova 3, Diamond, Archon..."
              value={currentRank}
              onChange={(e) => setCurrentRank(e.target.value)}
              maxLength={64}
            />
          </div>
          <div>
            <label className="coaching__order-label">Notes for your coach (optional)</label>
            <textarea
              className="coaching__order-textarea"
              placeholder="What areas do you want to improve? Specific maps, roles, mechanics..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              maxLength={1024}
              rows={3}
            />
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          {!currentRank.trim() && (
            <div className="coaching__order-overlay">
              Fill in your rank above to place the order
            </div>
          )}
          <div style={{ pointerEvents: currentRank.trim() ? 'auto' : 'none', opacity: currentRank.trim() ? 1 : 0.45 }}>
            <OrderForm orderData={orderData} priceSummary={priceSummary} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="coaching__plans">
      {plans.map((plan) => (
        <div
          key={plan.title}
          className={`coaching__card ${plan.popular ? 'coaching__card--popular' : ''}`}
        >
          {plan.popular && <span className="coaching__card-badge">Best Value</span>}
          <h3 className="coaching__card-title">{plan.title}</h3>
          <div className="coaching__card-price">
            <span className="coaching__card-price-value">${plan.price}</span>
          </div>
          <ul className="coaching__card-features">
            {plan.features.map((f) => (
              <li key={f} className="coaching__card-feature">{f}</li>
            ))}
          </ul>
          <button
            className="coaching__card-button"
            onClick={() => setSelectedPlan(plan)}
          >
            Select Plan
          </button>
        </div>
      ))}
    </div>
  );
}
