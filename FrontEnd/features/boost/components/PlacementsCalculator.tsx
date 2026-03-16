'use client';

import { usePlacementsCalculator } from '../hooks/usePlacementsCalculator';
import { PlacementGamesSelector } from './PlacementGamesSelector';
import { DuoToggle } from './DuoToggle';
import { OrderForm } from '@/features/order/components/OrderForm';
import PriceSummary from '@/components/shared/PriceSummary';
import { PlacementsConfig } from '../types';
import { GameCode, ServiceType } from '@/types';

interface PlacementsCalculatorProps {
  config: PlacementsConfig;
}

export function PlacementsCalculator({ config }: PlacementsCalculatorProps) {
  const calculator = usePlacementsCalculator(config);

  const orderData = {
    gameCode: config.gameCode as GameCode,
    serviceType: ServiceType.PLACEMENT,
    currentRank: '',
    targetRank: `${calculator.games} placement games`,
    numberOfGames: calculator.games,
    isDuo: calculator.isDuo,
    price: calculator.price,
    currency: config.currency,
  };

  return (
    <div className="service__grid">
      <section className="service__form-section">
        <OrderForm orderData={orderData}>
          <div className="service__form-content">
            <PlacementGamesSelector
              config={config}
              games={calculator.games}
              onGamesChange={calculator.setGames}
            />
            <DuoToggle
              isDuo={calculator.isDuo}
              onToggle={calculator.setIsDuo}
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
