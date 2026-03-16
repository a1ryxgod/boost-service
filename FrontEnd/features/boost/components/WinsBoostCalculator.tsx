'use client';

import { useWinsCalculator } from '../hooks/useWinsCalculator';
import { WinsSelector } from './WinsSelector';
import { DuoToggle } from './DuoToggle';
import { OrderForm } from '@/features/order/components/OrderForm';
import PriceSummary from '@/components/shared/PriceSummary';
import { WinsConfig } from '../types';
import { GameCode, ServiceType } from '@/types';

interface WinsBoostCalculatorProps {
  config: WinsConfig;
}

export function WinsBoostCalculator({ config }: WinsBoostCalculatorProps) {
  const calculator = useWinsCalculator(config);

  const orderData = {
    gameCode: config.gameCode as GameCode,
    serviceType: ServiceType.WIN_GAMES,
    currentRank: '',
    targetRank: `${calculator.wins} wins`,
    numberOfGames: calculator.wins,
    isDuo: calculator.isDuo,
    price: calculator.price,
    currency: config.currency,
  };

  return (
    <div className="service__grid">
      <section className="service__form-section">
        <OrderForm orderData={orderData}>
          <div className="service__form-content">
            <WinsSelector
              config={config}
              wins={calculator.wins}
              onWinsChange={calculator.setWins}
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
