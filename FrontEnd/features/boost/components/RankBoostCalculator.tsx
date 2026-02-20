'use client';

import { useBoostCalculator } from '../hooks/useBoostCalculator';
import { RankSelector } from './RankSelector';
import { DuoToggle } from './DuoToggle';
import { OrderForm } from '@/features/order/components/OrderForm';
import PriceSummary from '@/components/shared/PriceSummary';
import { GameRankConfig } from '../types';
import { GameCode, ServiceType } from '@/types';

interface RankBoostCalculatorProps {
  config: GameRankConfig;
}

export function RankBoostCalculator({ config }: RankBoostCalculatorProps) {
  const calculator = useBoostCalculator(config);

  const currentRank = config.ranks[calculator.currentRankIndex];
  const desiredRank = config.ranks[calculator.desiredRankIndex];

  const orderData = {
    gameCode: config.gameCode as GameCode,
    serviceType: ServiceType.RANK_BOOST,
    currentRank: currentRank?.name ?? '',
    targetRank: desiredRank?.name ?? '',
    isDuo: calculator.isDuo,
    price: calculator.price,
    currency: config.currency,
  };

  return (
    <div className="service__grid">
      <section className="service__form-section">
        <OrderForm orderData={orderData}>
          <div className="service__form-content">
            <RankSelector
              config={config}
              currentRankIndex={calculator.currentRankIndex}
              desiredRankIndex={calculator.desiredRankIndex}
              onCurrentRankChange={calculator.setCurrentRank}
              onDesiredRankChange={calculator.setDesiredRank}
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
