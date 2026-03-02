'use client';

import { useState, useEffect } from 'react';
import { OrderForm } from '@/features/order/components/OrderForm';
import { GameCode, ServiceType } from '@/types';
import './Accounts.css';

interface Screenshot {
  gradient: string;
  label: string;
}

interface CS2Account {
  id: string;
  rank: string;
  rankGroup: string;
  rankIcon: string;
  rankColor: string;
  description: string;
  hours: string;
  winRate: string;
  kd: string;
  matchesPlayed: number;
  steamLevel: number;
  medals: string[];
  screenshots: Screenshot[];
  price: number;
  features: string[];
  badge?: string;
}

const CS2_ACCOUNTS: CS2Account[] = [
  {
    id: 'silver-elite',
    rank: 'Silver Elite',
    rankGroup: 'Silver',
    rankIcon: '🥈',
    rankColor: 'rgba(180, 180, 200, 0.15)',
    description: 'A freshly leveled Silver Elite account ideal for beginners or smurf play. Low playtime, clean history, Prime ready.',
    hours: '80–150h',
    winRate: '48%',
    kd: '0.94',
    matchesPlayed: 120,
    steamLevel: 8,
    medals: ['Prime Status'],
    screenshots: [
      { gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)', label: 'Rank Screen' },
      { gradient: 'linear-gradient(135deg, #0d0d16 0%, #1a1a2e 60%, #2d2d4e 100%)', label: 'Stats Overview' },
      { gradient: 'linear-gradient(135deg, #111118 0%, #1e1e2e 60%, #111118 100%)', label: 'Inventory' },
    ],
    price: 14.99,
    features: ['Prime Status', 'Low hours', 'Clean VAC history', 'Email verified'],
  },
  {
    id: 'gold-nova-4',
    rank: 'Gold Nova 4',
    rankGroup: 'Gold Nova',
    rankIcon: '🥇',
    rankColor: 'rgba(212, 175, 55, 0.15)',
    description: 'A solid Gold Nova 4 account ready for competitive play. Phone verified, Prime status, minimal hours for a clean trust factor.',
    hours: '150–300h',
    winRate: '51%',
    kd: '1.08',
    matchesPlayed: 230,
    steamLevel: 12,
    medals: ['Prime Status', '5-Year Coin'],
    screenshots: [
      { gradient: 'linear-gradient(135deg, #2d1b00 0%, #3d2800 60%, #1a1400 100%)', label: 'Rank Screen' },
      { gradient: 'linear-gradient(135deg, #1a1a2e 0%, #2d2200 60%, #1e1e2e 100%)', label: 'Stats Overview' },
      { gradient: 'linear-gradient(135deg, #111118 0%, #2a2000 60%, #111118 100%)', label: 'Match History' },
    ],
    price: 24.99,
    features: ['Prime Status', 'Low hours', 'Clean VAC history', 'Phone verified'],
    badge: 'Popular',
  },
  {
    id: 'mge',
    rank: 'Master Guardian Elite',
    rankGroup: 'Master Guardian',
    rankIcon: '⭐',
    rankColor: 'rgba(124, 58, 237, 0.15)',
    description: 'Best value pick — MGE account with phone verification and moderate playtime. High trust factor and clean match history.',
    hours: '300–500h',
    winRate: '54%',
    kd: '1.17',
    matchesPlayed: 410,
    steamLevel: 18,
    medals: ['Prime Status', '5-Year Coin', 'Operation Medal'],
    screenshots: [
      { gradient: 'linear-gradient(135deg, #2d1b69 0%, #1a0a3d 60%, #0f0020 100%)', label: 'Rank Screen' },
      { gradient: 'linear-gradient(135deg, #111118 0%, #2a1060 60%, #0d0d16 100%)', label: 'Stats Overview' },
      { gradient: 'linear-gradient(135deg, #0d0d16 0%, #1e0050 60%, #111118 100%)', label: 'Match History' },
    ],
    price: 44.99,
    features: ['Prime Status', 'Medium hours', 'Clean VAC history', 'Phone verified'],
    badge: 'Best Value',
  },
  {
    id: 'dmg',
    rank: 'Distinguished Master Guardian',
    rankGroup: 'Master Guardian',
    rankIcon: '💎',
    rankColor: 'rgba(56, 189, 248, 0.15)',
    description: 'Aged DMG account with multiple games owned. Clean record, high trust factor, suitable for experienced players.',
    hours: '400–700h',
    winRate: '56%',
    kd: '1.24',
    matchesPlayed: 620,
    steamLevel: 25,
    medals: ['Prime Status', '5-Year Coin', 'Operation Medal', 'Service Medal'],
    screenshots: [
      { gradient: 'linear-gradient(135deg, #001a2e 0%, #003860 60%, #001428 100%)', label: 'Rank Screen' },
      { gradient: 'linear-gradient(135deg, #111118 0%, #002244 60%, #0d0d16 100%)', label: 'Stats Overview' },
      { gradient: 'linear-gradient(135deg, #0d0d16 0%, #001e3c 60%, #111118 100%)', label: 'Match History' },
    ],
    price: 69.99,
    features: ['Prime Status', 'Aged account', 'Clean VAC history', 'Multiple games owned'],
  },
  {
    id: 'le',
    rank: 'Legendary Eagle',
    rankGroup: 'Eagle',
    rankIcon: '🦅',
    rankColor: 'rgba(251, 191, 36, 0.15)',
    description: 'Premium Legendary Eagle account with high trust factor. Aged profile, impressive game library, and extensive competitive history.',
    hours: '600–1000h',
    winRate: '58%',
    kd: '1.31',
    matchesPlayed: 880,
    steamLevel: 35,
    medals: ['Prime Status', '10-Year Coin', 'Operation Medal', 'Service Medal', 'Loyalty Badge'],
    screenshots: [
      { gradient: 'linear-gradient(135deg, #2e1800 0%, #5c3800 60%, #2e1400 100%)', label: 'Rank Screen' },
      { gradient: 'linear-gradient(135deg, #111118 0%, #3d2600 60%, #0d0d16 100%)', label: 'Stats Overview' },
      { gradient: 'linear-gradient(135deg, #0d0d16 0%, #2e1c00 60%, #111118 100%)', label: 'Match History' },
    ],
    price: 109.99,
    features: ['Prime Status', 'Aged account', 'High trust factor', 'Multiple games owned'],
  },
  {
    id: 'smfc',
    rank: 'Supreme Master First Class',
    rankGroup: 'Supreme',
    rankIcon: '👑',
    rankColor: 'rgba(239, 68, 68, 0.15)',
    description: 'Top-tier SMFC account — the closest rank to Global Elite. High trust factor, rare medals, and a fully established Steam profile.',
    hours: '800–1500h',
    winRate: '61%',
    kd: '1.45',
    matchesPlayed: 1200,
    steamLevel: 50,
    medals: ['Prime Status', '10-Year Coin', 'Operation Medal', 'Service Medal', 'Loyalty Badge', 'Global General'],
    screenshots: [
      { gradient: 'linear-gradient(135deg, #2e0000 0%, #600000 60%, #1a0000 100%)', label: 'Rank Screen' },
      { gradient: 'linear-gradient(135deg, #111118 0%, #440000 60%, #0d0d16 100%)', label: 'Stats Overview' },
      { gradient: 'linear-gradient(135deg, #0d0d16 0%, #380000 60%, #111118 100%)', label: 'Match History' },
    ],
    price: 179.99,
    features: ['Prime Status', 'High trust factor', 'Clean VAC history', 'Medals & badges'],
    badge: 'Premium',
  },
];

export default function CS2AccountsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const selectedAccount = CS2_ACCOUNTS.find((a) => a.id === selectedId) ?? null;
  const previewAccount = CS2_ACCOUNTS.find((a) => a.id === previewId) ?? null;

  // Reset slide when modal opens a different account
  useEffect(() => {
    setSlideIndex(0);
  }, [previewId]);

  // Close modal on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewId(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = previewId ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [previewId]);

  const handleBuyFromModal = () => {
    if (!previewAccount) return;
    setSelectedId(previewAccount.id);
    setPreviewId(null);
    setTimeout(() => {
      document.getElementById('order-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const orderData = selectedAccount
    ? {
        gameCode: GameCode.CS2,
        serviceType: ServiceType.ACCOUNT_PURCHASE,
        currentRank: 'Account Purchase',
        targetRank: selectedAccount.rank,
        price: selectedAccount.price,
        currency: 'USD',
        notes: `CS2 Account: ${selectedAccount.rank} | ${selectedAccount.hours} hours | Win rate: ${selectedAccount.winRate} | K/D: ${selectedAccount.kd}`,
      }
    : null;

  const priceSummary = selectedAccount ? (
    <div>
      <h3 className="accounts__order-panel-title">Order Summary</h3>
      <div className="accounts__order-summary">
        <div className="accounts__order-row">
          <span className="accounts__order-row-label">Account</span>
          <span className="accounts__order-row-value">{selectedAccount.rank}</span>
        </div>
        <div className="accounts__order-row">
          <span className="accounts__order-row-label">Hours played</span>
          <span className="accounts__order-row-value">{selectedAccount.hours}</span>
        </div>
        <div className="accounts__order-row">
          <span className="accounts__order-row-label">Win rate</span>
          <span className="accounts__order-row-value">{selectedAccount.winRate}</span>
        </div>
        <div className="accounts__order-row">
          <span className="accounts__order-row-label">K/D ratio</span>
          <span className="accounts__order-row-value">{selectedAccount.kd}</span>
        </div>
      </div>
      <div className="accounts__order-total">
        <span className="accounts__order-total-label">Total</span>
        <span className="accounts__order-total-value">${selectedAccount.price.toFixed(2)}</span>
      </div>
    </div>
  ) : null;

  return (
    <div className="accounts">
      <div className="accounts__container">
        <div className="accounts__header">
          <h1 className="accounts__title">CS2 Account Shop</h1>
          <p className="accounts__description">
            Buy pre-ranked CS2 accounts with Prime Status. All accounts are hand-leveled, verified, and ready to play.
          </p>
          <div className="accounts__badges">
            <span className="accounts__badge">✓ Prime Status Included</span>
            <span className="accounts__badge">✓ Instant Delivery</span>
            <span className="accounts__badge">✓ Clean VAC History</span>
            <span className="accounts__badge">✓ 24h Support</span>
          </div>
        </div>

        <div className="accounts__grid">
          {CS2_ACCOUNTS.map((account) => (
            <div
              key={account.id}
              className={`accounts__card ${selectedId === account.id ? 'accounts__card--selected' : ''} ${account.badge === 'Popular' || account.badge === 'Best Value' ? 'accounts__card--popular' : ''}`}
              onClick={() => setPreviewId(account.id)}
            >
              {account.badge && (
                <span className="accounts__card-badge">{account.badge}</span>
              )}

              <div>
                <div className="accounts__card-rank-icon" style={{ background: account.rankColor }}>
                  {account.rankIcon}
                </div>
                <div className="accounts__card-rank">{account.rank}</div>
                <div className="accounts__card-rank-group">{account.rankGroup}</div>
              </div>

              <div className="accounts__card-stats">
                <div className="accounts__card-stat">
                  <span className="accounts__card-stat-label">Hours</span>
                  <span className="accounts__card-stat-value">{account.hours}</span>
                </div>
                <div className="accounts__card-stat">
                  <span className="accounts__card-stat-label">Win rate</span>
                  <span className="accounts__card-stat-value">{account.winRate}</span>
                </div>
                <div className="accounts__card-stat">
                  <span className="accounts__card-stat-label">K/D</span>
                  <span className="accounts__card-stat-value">{account.kd}</span>
                </div>
              </div>

              <div className="accounts__card-features">
                {account.features.slice(0, 3).map((f) => (
                  <span key={f} className="accounts__card-feature">{f}</span>
                ))}
              </div>

              <div className="accounts__card-price">
                <span className="accounts__card-price-currency">$</span>
                <span className="accounts__card-price-amount">{account.price.toFixed(2)}</span>
              </div>

              <div
                className="accounts__card-actions"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="accounts__card-details-btn"
                  onClick={() => setPreviewId(account.id)}
                >
                  Details
                </button>
                <button
                  type="button"
                  className={`accounts__card-button ${selectedId === account.id ? 'accounts__card-button--selected' : ''}`}
                  onClick={() => {
                    setSelectedId(selectedId === account.id ? null : account.id);
                    if (selectedId !== account.id) {
                      setTimeout(() => {
                        document.getElementById('order-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 100);
                    }
                  }}
                >
                  {selectedId === account.id ? 'Selected ✓' : 'Buy Now'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedAccount && orderData && (
          <div id="order-panel" className="accounts__order-panel">
            <OrderForm orderData={orderData} priceSummary={priceSummary} />
          </div>
        )}

        <section className="accounts__how-it-works">
          <div className="accounts__how-it-works-header">
            <h2 className="accounts__how-it-works-title">How It Works</h2>
          </div>
          <div className="accounts__steps">
            <div className="accounts__step">
              <div className="accounts__step-number">1</div>
              <h3 className="accounts__step-title">Choose Account</h3>
              <p className="accounts__step-description">Browse the catalog, review screenshots and stats, pick the account that fits you.</p>
            </div>
            <div className="accounts__step">
              <div className="accounts__step-number">2</div>
              <h3 className="accounts__step-title">Place Order</h3>
              <p className="accounts__step-description">Sign in and confirm your purchase with one click.</p>
            </div>
            <div className="accounts__step">
              <div className="accounts__step-number">3</div>
              <h3 className="accounts__step-title">Receive Credentials</h3>
              <p className="accounts__step-description">Account login details delivered to you after order processing.</p>
            </div>
            <div className="accounts__step">
              <div className="accounts__step-number">4</div>
              <h3 className="accounts__step-title">Start Playing</h3>
              <p className="accounts__step-description">Log in and enjoy your new ranked CS2 account immediately.</p>
            </div>
          </div>
        </section>
      </div>

      {/* Detail Modal */}
      {previewAccount && (
        <div
          className="accounts__modal-overlay"
          onClick={() => setPreviewId(null)}
        >
          <div
            className="accounts__modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="accounts__modal-close"
              onClick={() => setPreviewId(null)}
            >
              ✕
            </button>

            <div className="accounts__modal-body">
              {/* Left: Gallery */}
              <div className="accounts__gallery">
                <div className="accounts__gallery-main">
                  <div
                    className="accounts__gallery-placeholder"
                    style={{ background: previewAccount.screenshots[slideIndex]?.gradient }}
                  >
                    <span className="accounts__gallery-placeholder-icon">🖥</span>
                    <span>{previewAccount.screenshots[slideIndex]?.label}</span>
                  </div>
                  {previewAccount.screenshots.length > 1 && (
                    <div className="accounts__gallery-nav">
                      <button
                        type="button"
                        className="accounts__gallery-nav-btn"
                        onClick={() => setSlideIndex((i) => (i - 1 + previewAccount.screenshots.length) % previewAccount.screenshots.length)}
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        className="accounts__gallery-nav-btn"
                        onClick={() => setSlideIndex((i) => (i + 1) % previewAccount.screenshots.length)}
                      >
                        ›
                      </button>
                    </div>
                  )}
                  <span className="accounts__gallery-counter">
                    {slideIndex + 1} / {previewAccount.screenshots.length}
                  </span>
                </div>

                <div className="accounts__gallery-thumbs">
                  {previewAccount.screenshots.map((s, i) => (
                    <div
                      key={i}
                      className={`accounts__gallery-thumb ${i === slideIndex ? 'accounts__gallery-thumb--active' : ''}`}
                      onClick={() => setSlideIndex(i)}
                    >
                      <div
                        className="accounts__gallery-thumb-inner"
                        style={{ background: s.gradient }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Info */}
              <div className="accounts__modal-info">
                <div className="accounts__modal-header">
                  <div
                    className="accounts__modal-rank-icon"
                    style={{ background: previewAccount.rankColor }}
                  >
                    {previewAccount.rankIcon}
                  </div>
                  <div>
                    <div className="accounts__modal-rank">{previewAccount.rank}</div>
                    <div className="accounts__modal-rank-group">{previewAccount.rankGroup}</div>
                  </div>
                </div>

                <p className="accounts__modal-description">{previewAccount.description}</p>

                <div>
                  <div className="accounts__modal-stats-title">Account Stats</div>
                  <div className="accounts__modal-stats">
                    <div className="accounts__modal-stat">
                      <span className="accounts__modal-stat-label">Hours</span>
                      <span className="accounts__modal-stat-value">{previewAccount.hours}</span>
                    </div>
                    <div className="accounts__modal-stat">
                      <span className="accounts__modal-stat-label">Win Rate</span>
                      <span className="accounts__modal-stat-value">{previewAccount.winRate}</span>
                    </div>
                    <div className="accounts__modal-stat">
                      <span className="accounts__modal-stat-label">K/D</span>
                      <span className="accounts__modal-stat-value">{previewAccount.kd}</span>
                    </div>
                    <div className="accounts__modal-stat">
                      <span className="accounts__modal-stat-label">Matches</span>
                      <span className="accounts__modal-stat-value">{previewAccount.matchesPlayed}</span>
                    </div>
                    <div className="accounts__modal-stat">
                      <span className="accounts__modal-stat-label">Steam Lvl</span>
                      <span className="accounts__modal-stat-value">{previewAccount.steamLevel}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="accounts__modal-features-title">Included</div>
                  <div className="accounts__modal-features">
                    {previewAccount.features.map((f) => (
                      <span key={f} className="accounts__modal-feature">{f}</span>
                    ))}
                  </div>
                </div>

                {previewAccount.medals.length > 0 && (
                  <div>
                    <div className="accounts__modal-features-title">Medals & Badges</div>
                    <div className="accounts__modal-medals">
                      {previewAccount.medals.map((m) => (
                        <span key={m} className="accounts__modal-medal">{m}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="accounts__modal-buy">
                  <div className="accounts__modal-price">
                    <span className="accounts__modal-price-currency">$</span>
                    <span className="accounts__modal-price-amount">{previewAccount.price.toFixed(2)}</span>
                  </div>
                  <button
                    type="button"
                    className="accounts__modal-buy-btn"
                    onClick={handleBuyFromModal}
                  >
                    Buy Now — ${previewAccount.price.toFixed(2)}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
