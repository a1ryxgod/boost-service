'use client';

import { useValorantPlacementsCalculator } from '../hooks/useValorantPlacementsCalculator';
import { DuoToggle } from './DuoToggle';
import { OrderForm } from '@/features/order/components/OrderForm';
import PriceSummary from '@/components/shared/PriceSummary';
import { GameRankConfig } from '../types';
import { GameCode, ServiceType } from '@/types';
import './RankSelector.css';

interface ValorantPlacementsCalculatorProps {
  config: GameRankConfig;
}

export function ValorantPlacementsCalculator({ config }: ValorantPlacementsCalculatorProps) {
  const calculator = useValorantPlacementsCalculator(config);

  const tiers = config.ranks.reduce<Record<string, { name: string; ranks: { index: number; name: string }[] }>>(
    (acc, rank, index) => {
      if (!acc[rank.tier]) acc[rank.tier] = { name: rank.tier, ranks: [] };
      acc[rank.tier].ranks.push({ index, name: rank.name });
      return acc;
    },
    {},
  );
  const tierGroups = Object.values(tiers);

  const orderData = {
    gameCode: config.gameCode as GameCode,
    serviceType: ServiceType.PLACEMENT,
    currentRank: calculator.currentRank?.name ?? '',
    targetRank: '5 placement games',
    numberOfGames: 5,
    isDuo: calculator.isDuo,
    price: calculator.price,
    currency: config.currency,
  };

  return (
    <div className="service__grid">
      <section className="service__form-section">
        <OrderForm orderData={orderData}>
          <div className="service__form-content">
            <div className="rank-selector">
              <div className="rank-selector__group">
                <label className="rank-selector__label">Previous {config.rankLabel}</label>
                <select
                  className="rank-selector__dropdown rank-selector__dropdown--current"
                  value={calculator.rankIndex}
                  onChange={(e) => calculator.setRankIndex(Number(e.target.value))}
                >
                  {tierGroups.map((group) => (
                    <optgroup key={group.name} label={group.name}>
                      {group.ranks.map((rank) => (
                        <option key={rank.index} value={rank.index}>
                          {rank.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
            </div>
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
