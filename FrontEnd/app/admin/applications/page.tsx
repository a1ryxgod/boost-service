'use client';

import { useEffect, useState } from 'react';
import { adminApi } from '../../../lib/api';
import { ApplicationStatus, GameCode } from '../../../types';
import type { BoosterApplication } from '../../../types';
import '../AdminDashboard.css';

const STATUS_COLORS: Record<ApplicationStatus, string> = {
  [ApplicationStatus.PENDING]: '#f59e0b',
  [ApplicationStatus.APPROVED]: '#10b981',
  [ApplicationStatus.REJECTED]: '#ef4444',
};

const GAME_LABELS: Record<GameCode, string> = {
  [GameCode.CS2]: 'CS2',
  [GameCode.VALORANT]: 'Valorant',
  [GameCode.LOL]: 'LoL',
  [GameCode.DOTA2]: 'Dota 2',
};

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<BoosterApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<ApplicationStatus | ''>('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [reviewing, setReviewing] = useState<string | null>(null);
  const [adminNote, setAdminNote] = useState('');

  const load = (status?: ApplicationStatus) => {
    setLoading(true);
    adminApi.getBoosterApplications(status)
      .then(setApplications)
      .catch(() => null)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load(filter || undefined);
  }, [filter]);

  const handleReview = async (id: string, action: 'APPROVED' | 'REJECTED') => {
    setReviewing(id);
    try {
      const updated = await adminApi.reviewBoosterApplication(id, action, adminNote || undefined);
      setApplications((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
      setExpanded(null);
      setAdminNote('');
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to review application');
    } finally {
      setReviewing(null);
    }
  };

  const pending = applications.filter((a) => a.status === ApplicationStatus.PENDING);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>
            Booster Applications
          </h1>
          {pending.length > 0 && (
            <p style={{ color: '#f59e0b', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {pending.length} pending review
            </p>
          )}
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as ApplicationStatus | '')}
          style={{
            backgroundColor: '#1e1e2e',
            color: '#eaeaea',
            border: '1px solid #333',
            borderRadius: '8px',
            padding: '8px 12px',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <option value="">All</option>
          <option value={ApplicationStatus.PENDING}>Pending</option>
          <option value={ApplicationStatus.APPROVED}>Approved</option>
          <option value={ApplicationStatus.REJECTED}>Rejected</option>
        </select>
      </div>

      {loading ? (
        <p style={{ color: '#64748b' }}>Loading…</p>
      ) : applications.length === 0 ? (
        <p style={{ color: '#64748b' }}>No applications found.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {applications.map((app) => (
            <div
              key={app.id}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '0.75rem',
                overflow: 'hidden',
              }}
            >
              {/* Header row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem 1.25rem',
                  cursor: 'pointer',
                }}
                onClick={() => setExpanded(expanded === app.id ? null : app.id)}
              >
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: 600, color: '#f1f5f9' }}>
                    {app.user?.firstName
                      ? `${app.user.firstName} ${app.user.lastName ?? ''}`.trim()
                      : app.user?.email ?? app.userId}
                  </p>
                  <p style={{ margin: '0.125rem 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>
                    {app.user?.email} · {app.mainGame} · {app.currentRank}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {app.games.map((g) => (
                    <span
                      key={g}
                      style={{
                        background: 'rgba(124,58,237,0.15)',
                        color: '#a78bfa',
                        padding: '0.25rem 0.625rem',
                        borderRadius: '2rem',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                      }}
                    >
                      {GAME_LABELS[g] ?? g}
                    </span>
                  ))}
                </div>
                <span
                  style={{
                    color: STATUS_COLORS[app.status],
                    fontWeight: 600,
                    fontSize: '0.8125rem',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {app.status}
                </span>
                <span style={{ color: '#64748b', fontSize: '0.875rem' }}>
                  {expanded === app.id ? '▲' : '▼'}
                </span>
              </div>

              {/* Expanded detail */}
              {expanded === app.id && (
                <div
                  style={{
                    padding: '1.25rem',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                  }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem' }}>
                    {[
                      { label: 'Experience', value: `${app.yearsExperience} year(s)` },
                      { label: 'Peak Rank', value: app.peakRank ?? '—' },
                      { label: 'Applied', value: new Date(app.createdAt).toLocaleDateString() },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</p>
                        <p style={{ margin: '0.125rem 0 0', color: '#e2e8f0', fontWeight: 600 }}>{value}</p>
                      </div>
                    ))}
                    {app.profileLink && (
                      <div>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Profile</p>
                        <a
                          href={app.profileLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#a78bfa', fontSize: '0.875rem' }}
                        >
                          View Tracker ↗
                        </a>
                      </div>
                    )}
                  </div>

                  <div>
                    <p style={{ margin: '0 0 0.375rem', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Motivation</p>
                    <p style={{ margin: 0, color: '#cbd5e1', lineHeight: 1.6, background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                      {app.motivation}
                    </p>
                  </div>

                  {app.status === ApplicationStatus.PENDING && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div>
                        <label style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.375rem' }}>
                          Admin Note (optional)
                        </label>
                        <textarea
                          rows={2}
                          value={adminNote}
                          onChange={(e) => setAdminNote(e.target.value)}
                          placeholder="Leave a note for the applicant…"
                          style={{
                            width: '100%',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '0.5rem',
                            color: '#f1f5f9',
                            padding: '0.625rem 0.875rem',
                            fontSize: '0.875rem',
                            resize: 'vertical',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button
                          onClick={() => handleReview(app.id, 'APPROVED')}
                          disabled={reviewing === app.id}
                          style={{
                            background: '#10b981',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '0.5rem',
                            padding: '0.625rem 1.25rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            opacity: reviewing === app.id ? 0.6 : 1,
                          }}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReview(app.id, 'REJECTED')}
                          disabled={reviewing === app.id}
                          style={{
                            background: '#ef4444',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '0.5rem',
                            padding: '0.625rem 1.25rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            opacity: reviewing === app.id ? 0.6 : 1,
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  )}

                  {app.adminNote && (
                    <div>
                      <p style={{ margin: '0 0 0.375rem', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Admin Note</p>
                      <p style={{ margin: 0, color: '#fca5a5', background: 'rgba(239,68,68,0.08)', padding: '0.75rem', borderRadius: '0.5rem', fontSize: '0.875rem' }}>
                        {app.adminNote}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
