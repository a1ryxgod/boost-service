'use client';

import { useMmrCalculator } from '../hooks/useMmrCalculator';
import { MmrSelector } from './MmrSelector';
import { DuoToggle } from './DuoToggle';
import { OrderForm } from '@/features/order/components/OrderForm';
import PriceSummary from '@/components/shared/PriceSummary';
import { MmrConfig } from '../types';

interface MmrBoostCalculatorProps {
  config: MmrConfig;
}

export function MmrBoostCalculator({ config }: MmrBoostCalculatorProps) {
  const calculator = useMmrCalculator(config);

  return (
    <div className="service__grid">
      <section className="service__form-section">
        <OrderForm>
          <div className="service__form-content">
            <MmrSelector
              config={config}
              currentMmr={calculator.currentMmr}
              desiredMmr={calculator.desiredMmr}
              currentRank={calculator.currentRank}
              desiredRank={calculator.desiredRank}
              onCurrentMmrChange={calculator.setCurrentMmr}
              onDesiredMmrChange={calculator.setDesiredMmr}
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
