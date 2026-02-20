'use client';

import { useFaceitCalculator } from '../hooks/useFaceitCalculator';
import { FaceitEloSelector } from './FaceitLevelSelector';
import { OrderForm } from '@/features/order/components/OrderForm';
import PriceSummary from '@/components/shared/PriceSummary';
import { FaceitConfig } from '../types';
import { GameCode, ServiceType } from '@/types';

interface FaceitBoostCalculatorProps {
  config: FaceitConfig;
}

export function FaceitBoostCalculator({ config }: FaceitBoostCalculatorProps) {
  const calculator = useFaceitCalculator(config);

  const orderData = {
    gameCode: GameCode.CS2,
    serviceType: ServiceType.RANK_BOOST,
    currentRank: `FACEIT Level ${calculator.currentLevel}`,
    targetRank: `FACEIT Level ${calculator.desiredLevel}`,
    price: calculator.price,
    currency: config.currency,
  };

  return (
    <div className="service__grid">
      <section className="service__form-section">
        <OrderForm orderData={orderData}>
          <div className="service__form-content">
            <FaceitEloSelector
              config={config}
              currentElo={calculator.currentElo}
              desiredElo={calculator.desiredElo}
              currentLevel={calculator.currentLevel}
              desiredLevel={calculator.desiredLevel}
              onCurrentEloChange={calculator.setCurrentElo}
              onDesiredEloChange={calculator.setDesiredElo}
            />
          </div>
        </OrderForm>
      </section>
      <aside className="service__summary">
        <PriceSummary
          price={calculator.price}
          serviceName={calculator.serviceName}
          options={calculator.options}
        />
      </aside>
    </div>
  );
}
