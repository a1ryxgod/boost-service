'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { applicationApi } from '../../../lib/api';
import { useAuth } from '../../../context/AuthContext';
import { GameCode, UserRole, ApplicationStatus } from '../../../types';
import type { BoosterApplication } from '../../../types';
import './BecomeBooster.css';

const GAMES = [
  { value: GameCode.CS2, label: 'CS2' },
  { value: GameCode.VALORANT, label: 'Valorant' },
  { value: GameCode.LOL, label: 'League of Legends' },
  { value: GameCode.DOTA2, label: 'Dota 2' },
];

export default function BecomeBoosterPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [existing, setExisting] = useState<BoosterApplication | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [games, setGames] = useState<GameCode[]>([]);
  const [mainGame, setMainGame] = useState('');
  const [currentRank, setCurrentRank] = useState('');
  const [peakRank, setPeakRank] = useState('');
  const [yearsExperience, setYearsExperience] = useState(1);
  const [motivation, setMotivation] = useState('');
  const [profileLink, setProfileLink] = useState('');

  useEffect(() => {
    if (user?.role === UserRole.BOOSTER || user?.role === UserRole.ADMIN) {
      router.replace('/booster/dashboard');
      return;
    }

    applicationApi.getMy()
      .then((data) => setExisting(data))
      .catch(() => setExisting(null))
      .finally(() => setLoading(false));
  }, [user, router]);

  const toggleGame = (game: GameCode) => {
    setGames((prev) =>
      prev.includes(game) ? prev.filter((g) => g !== game) : [...prev, game],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (games.length === 0) {
      setError('Please select at least one game.');
      return;
    }
    if (motivation.trim().length < 50) {
      setError('Motivation must be at least 50 characters.');
      return;
    }

    setSubmitting(true);
    try {
      await applicationApi.submit({
        games,
        mainGame,
        currentRank,
        peakRank: peakRank || undefined,
        yearsExperience,
        motivation,
        profileLink: profileLink || undefined,
      });
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="become-booster">
        <div className="become-booster__loading">Loading…</div>
      </div>
    );
  }

  if (submitted || (existing && existing.status === ApplicationStatus.PENDING)) {
    return (
      <div className="become-booster">
        <div className="become-booster__status-card become-booster__status-card--pending">
          <div className="become-booster__status-icon">⏳</div>
          <h2>Application Under Review</h2>
          <p>Your booster application has been submitted and is being reviewed by our team. We will notify you by email with the decision.</p>
        </div>
      </div>
    );
  }

  if (existing && existing.status === ApplicationStatus.APPROVED) {
    return (
      <div className="become-booster">
        <div className="become-booster__status-card become-booster__status-card--approved">
          <div className="become-booster__status-icon">✅</div>
          <h2>Application Approved!</h2>
          <p>Congratulations! Your booster application was approved. Your account has been upgraded.</p>
        </div>
      </div>
    );
  }

  if (existing && existing.status === ApplicationStatus.REJECTED) {
    return (
      <div className="become-booster">
        <div className="become-booster__status-card become-booster__status-card--rejected">
          <div className="become-booster__status-icon">❌</div>
          <h2>Application Rejected</h2>
          {existing.adminNote && (
            <p className="become-booster__admin-note">{existing.adminNote}</p>
          )}
          <p>You may reapply by contacting our support team.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="become-booster">
      <div className="become-booster__header">
        <h1 className="become-booster__title">Become a Booster</h1>
        <p className="become-booster__subtitle">
          Join our elite team of professional boosters. Fill out the application below and we&apos;ll
          review it within 24–48 hours.
        </p>
      </div>

      <form className="become-booster__form" onSubmit={handleSubmit}>
        {error && <div className="become-booster__error">{error}</div>}

        <div className="become-booster__section">
          <h3 className="become-booster__section-title">Games</h3>
          <div className="become-booster__games">
            {GAMES.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                className={`become-booster__game-btn${games.includes(value) ? ' become-booster__game-btn--active' : ''}`}
                onClick={() => toggleGame(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="become-booster__section">
          <h3 className="become-booster__section-title">Main Game &amp; Rank</h3>
          <div className="become-booster__row">
            <div className="become-booster__field">
              <label>Main Game</label>
              <select
                value={mainGame}
                onChange={(e) => setMainGame(e.target.value)}
                required
              >
                <option value="">Select game…</option>
                {GAMES.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
            <div className="become-booster__field">
              <label>Years of Experience</label>
              <input
                type="number"
                min={0}
                max={20}
                value={yearsExperience}
                onChange={(e) => setYearsExperience(Number(e.target.value))}
                required
              />
            </div>
          </div>
          <div className="become-booster__row">
            <div className="become-booster__field">
              <label>Current Rank</label>
              <input
                type="text"
                placeholder="e.g. Global Elite, Radiant"
                value={currentRank}
                onChange={(e) => setCurrentRank(e.target.value)}
                required
              />
            </div>
            <div className="become-booster__field">
              <label>Peak Rank <span className="become-booster__optional">(optional)</span></label>
              <input
                type="text"
                placeholder="e.g. Faceit Level 10"
                value={peakRank}
                onChange={(e) => setPeakRank(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="become-booster__section">
          <h3 className="become-booster__section-title">About You</h3>
          <div className="become-booster__field">
            <label>Why do you want to be a booster?</label>
            <textarea
              rows={5}
              placeholder="Tell us about your experience, why you'd be a great booster, and anything else relevant… (min. 50 characters)"
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              required
            />
            <span className="become-booster__char-count">{motivation.length} / 50 min</span>
          </div>
          <div className="become-booster__field">
            <label>Profile / Tracker Link <span className="become-booster__optional">(optional)</span></label>
            <input
              type="url"
              placeholder="https://tracker.gg/…"
              value={profileLink}
              onChange={(e) => setProfileLink(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="become-booster__submit" disabled={submitting}>
          {submitting ? 'Submitting…' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
}
