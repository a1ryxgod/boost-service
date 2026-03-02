'use client';

import { useState, useEffect } from 'react';
import { OrderForm } from '@/features/order/components/OrderForm';
import { shopAccountsApi } from '@/lib/api';
import type { ShopAccount } from '@/types';
import { GameCode, ServiceType } from '@/types';
import './Accounts.css';

export default function Dota2AccountsPage() {
  const [accounts, setAccounts] = useState<ShopAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    shopAccountsApi.list('DOTA2')
      .then(setAccounts)
      .catch(() => setAccounts([]))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => { setSlideIndex(0); }, [previewId]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setPreviewId(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = previewId ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [previewId]);

  const selectedAccount = accounts.find((a) => a.id === selectedId) ?? null;
  const previewAccount = accounts.find((a) => a.id === previewId) ?? null;

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
        gameCode: GameCode.DOTA2,
        serviceType: ServiceType.ACCOUNT_PURCHASE,
        currentRank: 'Account Purchase',
        targetRank: selectedAccount.rank,
        price: selectedAccount.price,
        currency: selectedAccount.currency || 'USD',
        notes: `Dota 2 Account: ${selectedAccount.rank} | ${Object.entries(selectedAccount.stats).map(([k, v]) => `${k}: ${v}`).join(' | ')}`,
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
        {Object.entries(selectedAccount.stats).map(([k, v]) => (
          <div key={k} className="accounts__order-row">
            <span className="accounts__order-row-label">{k.replace(/([A-Z])/g, ' $1').trim()}</span>
            <span className="accounts__order-row-value">{v}</span>
          </div>
        ))}
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
          <h1 className="accounts__title">Dota 2 Account Shop</h1>
          <p className="accounts__description">
            Buy pre-calibrated Dota 2 accounts from Guardian to Divine. High behavior score, ready for ranked matches.
          </p>
          <div className="accounts__badges">
            <span className="accounts__badge">✓ High Behavior Score</span>
            <span className="accounts__badge">✓ Ranked Calibrated</span>
            <span className="accounts__badge">✓ Instant Delivery</span>
            <span className="accounts__badge">✓ 24h Support</span>
          </div>
        </div>

        {isLoading ? (
          <div style={{ color: '#888899', textAlign: 'center', padding: '3rem 0', fontSize: '1rem' }}>
            Loading accounts…
          </div>
        ) : accounts.length === 0 ? (
          <div style={{
            color: '#888899', textAlign: 'center', padding: '4rem 2rem',
            background: 'linear-gradient(145deg, #111118, #0d0d16)',
            borderRadius: '14px', border: '1px solid #1e1e2e',
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🛒</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 600, color: '#EAEAEA', marginBottom: '0.5rem' }}>No accounts available</div>
            <div style={{ fontSize: '0.9375rem' }}>Check back soon — new accounts are added regularly.</div>
          </div>
        ) : (
          <div className="accounts__grid">
            {accounts.map((account) => (
              <div
                key={account.id}
                className={`accounts__card ${selectedId === account.id ? 'accounts__card--selected' : ''} ${account.badge === 'Popular' || account.badge === 'Best Value' ? 'accounts__card--popular' : ''}`}
                onClick={() => setPreviewId(account.id)}
              >
                {account.badge && <span className="accounts__card-badge">{account.badge}</span>}

                <div>
                  <div className="accounts__card-rank-icon" style={{ background: account.rankColor }}>
                    {account.rankIcon}
                  </div>
                  <div className="accounts__card-rank">{account.rank}</div>
                  <div className="accounts__card-rank-group">
                    {account.stats.mmr ? `${account.stats.mmr} MMR` : account.rankGroup}
                  </div>
                </div>

                <div className="accounts__card-stats">
                  {Object.entries(account.stats).slice(0, 2).map(([k, v]) => (
                    <div key={k} className="accounts__card-stat">
                      <span className="accounts__card-stat-label">{k.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="accounts__card-stat-value">{v}</span>
                    </div>
                  ))}
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

                <div className="accounts__card-actions" onClick={(e) => e.stopPropagation()}>
                  <button type="button" className="accounts__card-details-btn" onClick={() => setPreviewId(account.id)}>
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
        )}

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
            {[
              { n: 1, t: 'Choose Account', d: 'Browse the catalog, check stats and match history, pick the account that fits your goals.' },
              { n: 2, t: 'Place Order', d: 'Sign in and confirm your purchase with one click.' },
              { n: 3, t: 'Receive Credentials', d: 'Account login details delivered to you after order processing.' },
              { n: 4, t: 'Start Playing', d: 'Log in and enjoy your new ranked Dota 2 account immediately.' },
            ].map((s) => (
              <div key={s.n} className="accounts__step">
                <div className="accounts__step-number">{s.n}</div>
                <h3 className="accounts__step-title">{s.t}</h3>
                <p className="accounts__step-description">{s.d}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {previewAccount && (
        <div className="accounts__modal-overlay" onClick={() => setPreviewId(null)}>
          <div className="accounts__modal" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="accounts__modal-close" onClick={() => setPreviewId(null)}>✕</button>

            <div className="accounts__modal-body">
              <div className="accounts__gallery">
                <div className="accounts__gallery-main">
                  {previewAccount.screenshots[slideIndex]?.url ? (
                    <img src={previewAccount.screenshots[slideIndex].url} alt={previewAccount.screenshots[slideIndex].label} className="accounts__gallery-img" />
                  ) : (
                    <div className="accounts__gallery-placeholder" style={{ background: previewAccount.screenshots[slideIndex]?.gradient || '#111118' }}>
                      <span className="accounts__gallery-placeholder-icon">🖥</span>
                      <span>{previewAccount.screenshots[slideIndex]?.label || 'Screenshot'}</span>
                    </div>
                  )}
                  {previewAccount.screenshots.length > 1 && (
                    <div className="accounts__gallery-nav">
                      <button type="button" className="accounts__gallery-nav-btn" onClick={() => setSlideIndex((i) => (i - 1 + previewAccount.screenshots.length) % previewAccount.screenshots.length)}>‹</button>
                      <button type="button" className="accounts__gallery-nav-btn" onClick={() => setSlideIndex((i) => (i + 1) % previewAccount.screenshots.length)}>›</button>
                    </div>
                  )}
                  {previewAccount.screenshots.length > 0 && (
                    <span className="accounts__gallery-counter">{slideIndex + 1} / {previewAccount.screenshots.length}</span>
                  )}
                </div>
                {previewAccount.screenshots.length > 1 && (
                  <div className="accounts__gallery-thumbs">
                    {previewAccount.screenshots.map((s, i) => (
                      <div key={i} className={`accounts__gallery-thumb ${i === slideIndex ? 'accounts__gallery-thumb--active' : ''}`} onClick={() => setSlideIndex(i)}>
                        <div className="accounts__gallery-thumb-inner" style={{ background: s.url ? `url(${s.url})` : s.gradient, backgroundSize: 'cover' }} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="accounts__modal-info">
                <div className="accounts__modal-header">
                  <div className="accounts__modal-rank-icon" style={{ background: previewAccount.rankColor }}>{previewAccount.rankIcon}</div>
                  <div>
                    <div className="accounts__modal-rank">{previewAccount.rank}</div>
                    <div className="accounts__modal-rank-group">
                      {previewAccount.stats.mmr ? `${previewAccount.stats.mmr} MMR` : previewAccount.rankGroup}
                    </div>
                  </div>
                </div>

                {previewAccount.description && (
                  <p className="accounts__modal-description">{previewAccount.description}</p>
                )}

                {Object.keys(previewAccount.stats).length > 0 && (
                  <div>
                    <div className="accounts__modal-stats-title">Account Stats</div>
                    <div className="accounts__modal-stats">
                      {Object.entries(previewAccount.stats).map(([k, v]) => (
                        <div key={k} className="accounts__modal-stat">
                          <span className="accounts__modal-stat-label">{k.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className="accounts__modal-stat-value">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {previewAccount.features.length > 0 && (
                  <div>
                    <div className="accounts__modal-features-title">Included</div>
                    <div className="accounts__modal-features">
                      {previewAccount.features.map((f) => <span key={f} className="accounts__modal-feature">{f}</span>)}
                    </div>
                  </div>
                )}

                {previewAccount.medals.length > 0 && (
                  <div>
                    <div className="accounts__modal-features-title">Medals & Compendiums</div>
                    <div className="accounts__modal-medals">
                      {previewAccount.medals.map((m) => <span key={m} className="accounts__modal-medal">{m}</span>)}
                    </div>
                  </div>
                )}

                <div className="accounts__modal-buy">
                  <div className="accounts__modal-price">
                    <span className="accounts__modal-price-currency">$</span>
                    <span className="accounts__modal-price-amount">{previewAccount.price.toFixed(2)}</span>
                  </div>
                  <button type="button" className="accounts__modal-buy-btn" onClick={handleBuyFromModal}>
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
