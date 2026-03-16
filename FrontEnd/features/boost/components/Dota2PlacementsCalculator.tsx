'use client';

import { useDota2PlacementsCalculator } from '../hooks/useDota2PlacementsCalculator';
import { Dota2MmrInput } from './Dota2MmrInput';
import { DuoToggle } from './DuoToggle';
import { OrderForm } from '@/features/order/components/OrderForm';
import PriceSummary from '@/components/shared/PriceSummary';
import { MmrConfig } from '../types';
import { GameCode, ServiceType } from '@/types';

interface Dota2PlacementsCalculatorProps {
  mmrConfig: MmrConfig;
}

export function Dota2PlacementsCalculator({ mmrConfig }: Dota2PlacementsCalculatorProps) {
  const calculator = useDota2PlacementsCalculator(mmrConfig);

  const orderData = {
    gameCode: mmrConfig.gameCode as GameCode,
    serviceType: ServiceType.PLACEMENT,
    currentRank: `${calculator.preMmr} MMR (${calculator.currentRank})`,
    targetRank: 'Calibration matches',
    currentMmr: calculator.preMmr,
    isDuo: calculator.isDuo,
    price: calculator.price,
    currency: mmrConfig.currency,
  };

  return (
    <div className="service__grid">
      <section className="service__form-section">
        <OrderForm orderData={orderData}>
          <div className="service__form-content">
            <Dota2MmrInput
              config={mmrConfig}
              mmr={calculator.preMmr}
              rank={calculator.currentRank}
              onMmrChange={calculator.setPreMmr}
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
