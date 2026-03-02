'use client';

import { useEffect, useState } from 'react';
import { shopAccountsApi } from '../../../lib/api';
import type { ShopAccount, CreateShopAccountRequest, ShopScreenshot } from '../../../types';
import { GameCode } from '../../../types';
import '../AdminDashboard.css';

const GAME_TABS = [
  { value: '', label: 'All Games' },
  { value: 'CS2', label: 'CS2' },
  { value: 'DOTA2', label: 'Dota 2' },
  { value: 'LOL', label: 'LoL' },
  { value: 'VALORANT', label: 'Valorant' },
];

const CS2_STAT_FIELDS = [
  { key: 'hours', label: 'Hours' },
  { key: 'winRate', label: 'Win Rate' },
  { key: 'kd', label: 'K/D' },
  { key: 'matchesPlayed', label: 'Matches Played' },
  { key: 'steamLevel', label: 'Steam Level' },
];

const DOTA2_STAT_FIELDS = [
  { key: 'mmr', label: 'MMR Range' },
  { key: 'winRate', label: 'Win Rate' },
  { key: 'behaviorScore', label: 'Behavior Score' },
  { key: 'matchesPlayed', label: 'Matches Played' },
  { key: 'steamLevel', label: 'Steam Level' },
];

const GENERIC_STAT_FIELDS = [
  { key: 'rank', label: 'Rank Detail' },
  { key: 'winRate', label: 'Win Rate' },
  { key: 'matchesPlayed', label: 'Matches Played' },
  { key: 'steamLevel', label: 'Steam Level' },
];

function getStatFields(gameCode: string) {
  if (gameCode === 'CS2') return CS2_STAT_FIELDS;
  if (gameCode === 'DOTA2') return DOTA2_STAT_FIELDS;
  return GENERIC_STAT_FIELDS;
}

const emptyForm = (): CreateShopAccountRequest => ({
  gameCode: GameCode.CS2,
  rank: '',
  rankGroup: '',
  rankIcon: '🎮',
  rankColor: 'rgba(124, 58, 237, 0.15)',
  description: '',
  price: 0,
  currency: 'USD',
  badge: '',
  stats: {},
  features: [],
  medals: [],
  screenshots: [],
  isAvailable: true,
  displayOrder: 0,
});

interface FormState extends Omit<CreateShopAccountRequest, 'features' | 'medals' | 'screenshots'> {
  featuresText: string;
  medalsText: string;
  screenshots: ShopScreenshot[];
}

const inputStyle = {
  background: '#1a1a2e',
  border: '1px solid #333',
  borderRadius: '8px',
  color: '#eaeaea',
  padding: '8px 12px',
  width: '100%',
  fontSize: '0.875rem',
  outline: 'none',
};

const labelStyle = {
  display: 'block',
  fontSize: '0.75rem',
  fontWeight: 600 as const,
  color: '#888899',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  marginBottom: '0.375rem',
};

export default function AdminAccountsPage() {
  const [accounts, setAccounts] = useState<ShopAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [gameFilter, setGameFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const [form, setForm] = useState<FormState>({
    ...emptyForm(),
    featuresText: '',
    medalsText: '',
    screenshots: [],
  });

  const load = () => {
    setIsLoading(true);
    shopAccountsApi.list(gameFilter || undefined, true)
      .then(setAccounts)
      .catch(() => null)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => { load(); }, [gameFilter]);

  const openCreate = () => {
    const base = emptyForm();
    setForm({
      ...base,
      featuresText: '',
      medalsText: '',
      screenshots: [],
    });
    setEditingId(null);
    setError('');
    setModalOpen(true);
  };

  const openEdit = (acc: ShopAccount) => {
    setForm({
      gameCode: acc.gameCode,
      rank: acc.rank,
      rankGroup: acc.rankGroup,
      rankIcon: acc.rankIcon,
      rankColor: acc.rankColor,
      description: acc.description ?? '',
      price: acc.price,
      currency: acc.currency,
      badge: acc.badge ?? '',
      stats: { ...acc.stats },
      isAvailable: acc.isAvailable,
      displayOrder: acc.displayOrder,
      featuresText: acc.features.join('\n'),
      medalsText: acc.medals.join('\n'),
      screenshots: acc.screenshots.map((s) => ({ ...s })),
    });
    setEditingId(acc.id);
    setError('');
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.rank || !form.rankGroup || form.price <= 0) {
      setError('Rank, Rank Group and Price are required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const payload: CreateShopAccountRequest = {
        gameCode: form.gameCode,
        rank: form.rank,
        rankGroup: form.rankGroup,
        rankIcon: form.rankIcon,
        rankColor: form.rankColor,
        description: form.description || undefined,
        price: Number(form.price),
        currency: form.currency || 'USD',
        badge: form.badge || undefined,
        stats: form.stats,
        features: form.featuresText.split('\n').map((s) => s.trim()).filter(Boolean),
        medals: form.medalsText.split('\n').map((s) => s.trim()).filter(Boolean),
        screenshots: form.screenshots,
        isAvailable: form.isAvailable,
        displayOrder: Number(form.displayOrder) || 0,
      };

      if (editingId) {
        const updated = await shopAccountsApi.update(editingId, payload);
        setAccounts((prev) => prev.map((a) => a.id === editingId ? updated : a));
      } else {
        const created = await shopAccountsApi.create(payload);
        setAccounts((prev) => [...prev, created]);
      }
      setModalOpen(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this account?')) return;
    setDeletingId(id);
    try {
      await shopAccountsApi.remove(id);
      setAccounts((prev) => prev.filter((a) => a.id !== id));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to delete');
    } finally {
      setDeletingId(null);
    }
  };

  const setStatField = (key: string, value: string) => {
    setForm((f) => ({ ...f, stats: { ...f.stats, [key]: value } }));
  };

  const setScreenshot = (i: number, field: keyof ShopScreenshot, value: string) => {
    setForm((f) => {
      const s = [...f.screenshots];
      s[i] = { ...s[i], [field]: value };
      return { ...f, screenshots: s };
    });
  };

  const addScreenshot = () => {
    setForm((f) => ({
      ...f,
      screenshots: [...f.screenshots, { gradient: 'linear-gradient(135deg, #111118, #0d0d16)', label: 'Screenshot' }],
    }));
  };

  const removeScreenshot = (i: number) => {
    setForm((f) => ({ ...f, screenshots: f.screenshots.filter((_, idx) => idx !== i) }));
  };

  const statFields = getStatFields(form.gameCode as string);
  const filtered = gameFilter
    ? accounts.filter((a) => a.gameCode === gameFilter)
    : accounts;

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="admin-dashboard__title">Account Shop</h1>
          <p style={{ color: '#888899', marginTop: '0.25rem' }}>Manage game accounts for sale on the public shop.</p>
        </div>
        <button
          onClick={openCreate}
          style={{
            padding: '0.625rem 1.25rem',
            background: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '0.9375rem',
          }}
        >
          + Add Account
        </button>
      </div>

      {/* Game filter tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {GAME_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setGameFilter(tab.value)}
            style={{
              padding: '0.375rem 1rem',
              borderRadius: '20px',
              border: '1px solid',
              borderColor: gameFilter === tab.value ? '#7C3AED' : '#333',
              background: gameFilter === tab.value ? 'rgba(124,58,237,0.15)' : 'transparent',
              color: gameFilter === tab.value ? '#A78BFA' : '#888899',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <p style={{ color: '#707070' }}>Loading accounts...</p>
      ) : (
        <div className="admin-dashboard__table-container">
          <div className="admin-dashboard__table-wrapper">
            <table className="admin-dashboard__table">
              <thead>
                <tr>
                  <th>Game</th>
                  <th>Rank</th>
                  <th>Price</th>
                  <th>Badge</th>
                  <th>Available</th>
                  <th>Order</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', color: '#707070', padding: '2rem' }}>
                      No accounts found. Click "+ Add Account" to create one.
                    </td>
                  </tr>
                )}
                {filtered.map((acc) => (
                  <tr key={acc.id} style={{ opacity: deletingId === acc.id ? 0.5 : 1 }}>
                    <td>
                      <span style={{
                        padding: '2px 10px',
                        background: 'rgba(124,58,237,0.12)',
                        color: '#A78BFA',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                      }}>
                        {acc.gameCode}
                      </span>
                    </td>
                    <td className="admin-dashboard__table-cell--bold">
                      {acc.rankIcon} {acc.rank}
                      <div style={{ fontSize: '0.75rem', color: '#666677', fontWeight: 400 }}>{acc.rankGroup}</div>
                    </td>
                    <td style={{ color: '#A78BFA', fontWeight: 700 }}>${acc.price.toFixed(2)}</td>
                    <td style={{ color: '#888899', fontSize: '0.875rem' }}>{acc.badge || '—'}</td>
                    <td>
                      <span style={{
                        padding: '2px 10px',
                        background: acc.isAvailable ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
                        color: acc.isAvailable ? '#10b981' : '#ef4444',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                      }}>
                        {acc.isAvailable ? 'Available' : 'Sold / Hidden'}
                      </span>
                    </td>
                    <td style={{ color: '#888899' }}>{acc.displayOrder}</td>
                    <td style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => openEdit(acc)}
                        className="admin-dashboard__action-button admin-dashboard__action-button--primary"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(acc.id)}
                        disabled={deletingId === acc.id}
                        style={{
                          padding: '4px 12px',
                          background: 'rgba(239,68,68,0.1)',
                          color: '#ef4444',
                          border: '1px solid rgba(239,68,68,0.3)',
                          borderRadius: '6px',
                          fontSize: '0.8125rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '2rem 1rem',
            overflowY: 'auto',
          }}
          onClick={() => setModalOpen(false)}
        >
          <div
            style={{
              background: '#111118',
              border: '1px solid rgba(124,58,237,0.3)',
              borderRadius: '16px',
              padding: '2rem',
              width: '100%',
              maxWidth: '680px',
              boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ color: '#fff', fontSize: '1.375rem', fontWeight: 700, marginBottom: '1.5rem' }}>
              {editingId ? 'Edit Account' : 'Add Account'}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

              {/* Game + Rank */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Game *</label>
                  <select
                    value={form.gameCode}
                    onChange={(e) => setForm((f) => ({ ...f, gameCode: e.target.value as GameCode, stats: {} }))}
                    style={inputStyle}
                  >
                    {Object.values(GameCode).map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Rank Name *</label>
                  <input style={inputStyle} value={form.rank} onChange={(e) => setForm((f) => ({ ...f, rank: e.target.value }))} placeholder="e.g. Gold Nova 4" />
                </div>
              </div>

              {/* Rank Group + Icon + Color */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 2fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Rank Group *</label>
                  <input style={inputStyle} value={form.rankGroup} onChange={(e) => setForm((f) => ({ ...f, rankGroup: e.target.value }))} placeholder="e.g. Gold Nova" />
                </div>
                <div>
                  <label style={labelStyle}>Icon</label>
                  <input style={inputStyle} value={form.rankIcon} onChange={(e) => setForm((f) => ({ ...f, rankIcon: e.target.value }))} placeholder="🎮" />
                </div>
                <div>
                  <label style={labelStyle}>Rank Color (CSS)</label>
                  <input style={inputStyle} value={form.rankColor} onChange={(e) => setForm((f) => ({ ...f, rankColor: e.target.value }))} placeholder="rgba(124, 58, 237, 0.15)" />
                </div>
              </div>

              {/* Description */}
              <div>
                <label style={labelStyle}>Description</label>
                <textarea
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '70px' }}
                  value={form.description ?? ''}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Short account description..."
                />
              </div>

              {/* Price + Currency + Badge + Available + Order */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Price (USD) *</label>
                  <input type="number" style={inputStyle} value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: parseFloat(e.target.value) || 0 }))} min={0} step={0.01} />
                </div>
                <div>
                  <label style={labelStyle}>Badge</label>
                  <input style={inputStyle} value={form.badge ?? ''} onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value }))} placeholder="Popular, Best Value…" />
                </div>
                <div>
                  <label style={labelStyle}>Display Order</label>
                  <input type="number" style={inputStyle} value={form.displayOrder ?? 0} onChange={(e) => setForm((f) => ({ ...f, displayOrder: parseInt(e.target.value) || 0 }))} />
                </div>
              </div>

              {/* Available */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <input
                  type="checkbox"
                  id="isAvailable"
                  checked={form.isAvailable ?? true}
                  onChange={(e) => setForm((f) => ({ ...f, isAvailable: e.target.checked }))}
                  style={{ width: '1rem', height: '1rem', accentColor: '#7C3AED' }}
                />
                <label htmlFor="isAvailable" style={{ color: '#EAEAEA', fontSize: '0.9375rem', cursor: 'pointer' }}>
                  Available for purchase (visible on public shop)
                </label>
              </div>

              {/* Stats */}
              <div>
                <label style={{ ...labelStyle, marginBottom: '0.75rem' }}>Stats</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                  {statFields.map((field) => (
                    <div key={field.key}>
                      <label style={{ ...labelStyle, textTransform: 'none', fontSize: '0.6875rem' }}>{field.label}</label>
                      <input
                        style={inputStyle}
                        value={form.stats?.[field.key] ?? ''}
                        onChange={(e) => setStatField(field.key, e.target.value)}
                        placeholder={field.label}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <label style={labelStyle}>Features (one per line)</label>
                <textarea
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
                  value={form.featuresText}
                  onChange={(e) => setForm((f) => ({ ...f, featuresText: e.target.value }))}
                  placeholder={"Prime Status\nLow hours\nClean VAC history"}
                />
              </div>

              {/* Medals */}
              <div>
                <label style={labelStyle}>Medals / Compendiums (one per line)</label>
                <textarea
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '60px' }}
                  value={form.medalsText}
                  onChange={(e) => setForm((f) => ({ ...f, medalsText: e.target.value }))}
                  placeholder={"5-Year Coin\nBattle Pass 2023"}
                />
              </div>

              {/* Screenshots */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <label style={labelStyle}>Screenshots (gradient or image URL)</label>
                  <button
                    type="button"
                    onClick={addScreenshot}
                    disabled={form.screenshots.length >= 4}
                    style={{
                      padding: '3px 10px',
                      background: 'rgba(124,58,237,0.15)',
                      color: '#A78BFA',
                      border: '1px solid rgba(124,58,237,0.3)',
                      borderRadius: '6px',
                      fontSize: '0.8125rem',
                      cursor: 'pointer',
                    }}
                  >
                    + Add
                  </button>
                </div>
                {form.screenshots.map((s, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr auto', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                    <input style={inputStyle} value={s.gradient} onChange={(e) => setScreenshot(i, 'gradient', e.target.value)} placeholder="CSS gradient or image URL" />
                    <input style={inputStyle} value={s.label} onChange={(e) => setScreenshot(i, 'label', e.target.value)} placeholder="Label" />
                    <button
                      type="button"
                      onClick={() => removeScreenshot(i)}
                      style={{ padding: '8px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {error && <p style={{ color: '#ef4444', fontSize: '0.875rem' }}>{error}</p>}

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.9375rem',
                    cursor: saving ? 'not-allowed' : 'pointer',
                    opacity: saving ? 0.7 : 1,
                  }}
                >
                  {saving ? 'Saving…' : editingId ? 'Save Changes' : 'Create Account'}
                </button>
                <button
                  onClick={() => setModalOpen(false)}
                  style={{
                    padding: '0.75rem 1.25rem',
                    background: 'transparent',
                    color: '#888899',
                    border: '1px solid #333',
                    borderRadius: '8px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
