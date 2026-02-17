'use client';

import { useBoostCalculator } from '../hooks/useBoostCalculator';
import { RankSelector } from './RankSelector';
import { DuoToggle } from './DuoToggle';
import { OrderForm } from '@/features/order/components/OrderForm';
import PriceSummary from '@/components/shared/PriceSummary';
import { GameRankConfig } from '../types';

interface ValorantBoostCalculatorProps {
  config: GameRankConfig;
}

export function ValorantBoostCalculator({ config }: ValorantBoostCalculatorProps) {
  const calculator = useBoostCalculator(config);

  return (
    <div className="service__grid">
      <section className="service__form-section">
        <OrderForm>
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
