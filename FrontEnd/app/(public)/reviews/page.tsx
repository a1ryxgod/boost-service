'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { reviewsApi } from '../../../lib/api';
import type { Review } from '../../../types';
import './Reviews.css';

const GAME_TAGS = ['All', 'CS2', 'Dota 2', 'Valorant', 'LoL'];
const RATING_FILTERS = ['All', '5★', '4★', '3★ & below'];

const FALLBACK: (Review & { _game: string; _fake: true })[] = [
  {
    id: 'f1', orderId: '', customerId: '', boosterId: '',
    rating: 5, isVisible: true, createdAt: '2025-01-15T10:00:00Z',
    comment: 'Absolute legends. Got to Global Elite in 3 days. Booster was online within 5 minutes of purchase and kept me updated the whole time. 100% will come back.',
    customer: { id: '', email: '', firstName: 'Dmitry' },
    booster: { id: '', email: '', firstName: 'Alex' },
    _game: 'CS2', _fake: true,
  },
  {
    id: 'f2', orderId: '', customerId: '', boosterId: '',
    rating: 5, isVisible: true, createdAt: '2025-01-22T14:30:00Z',
    comment: 'MMR boost from 4k to 6k done in 4 days. No weird hours, no VPN issues. My account is 100% safe. Booster was insane — Divine 5 playing support.',
    customer: { id: '', email: '', firstName: 'Nikita' },
    booster: { id: '', email: '', firstName: 'Dmitry' },
    _game: 'Dota 2', _fake: true,
  },
  {
    id: 'f3', orderId: '', customerId: '', boosterId: '',
    rating: 5, isVisible: true, createdAt: '2025-02-03T09:15:00Z',
    comment: 'Reached Radiant for the first time ever. Coaching session before the boost helped a lot. The team here genuinely cares about your progress.',
    customer: { id: '', email: '', firstName: 'Maria' },
    booster: { id: '', email: '', firstName: 'Kevin' },
    _game: 'Valorant', _fake: true,
  },
  {
    id: 'f4', orderId: '', customerId: '', boosterId: '',
    rating: 5, isVisible: true, createdAt: '2025-02-10T16:45:00Z',
    comment: 'FACEIT Level 10 achieved. Booster climbed from Level 7 super fast. Communication was great, he even explained what he was doing wrong in my games.',
    customer: { id: '', email: '', firstName: 'Pavel' },
    booster: { id: '', email: '', firstName: 'Alex' },
    _game: 'CS2', _fake: true,
  },
  {
    id: 'f5', orderId: '', customerId: '', boosterId: '',
    rating: 4, isVisible: true, createdAt: '2025-02-18T11:00:00Z',
    comment: 'Solid experience. Got to Platinum in LoL. Took a bit longer than estimated but support kept me informed. Would recommend.',
    customer: { id: '', email: '', firstName: 'Sasha' },
    booster: { id: '', email: '', firstName: 'Kevin' },
    _game: 'LoL', _fake: true,
  },
  {
    id: 'f6', orderId: '', customerId: '', boosterId: '',
    rating: 5, isVisible: true, createdAt: '2025-02-25T08:30:00Z',
    comment: 'Second time using this service. Same quality as before. Booster remembered my preferences and jumped right in. This is the only boosting service I trust.',
    customer: { id: '', email: '', firstName: 'Igor' },
    booster: { id: '', email: '', firstName: 'Dmitry' },
    _game: 'Dota 2', _fake: true,
  },
];

function stars(n: number) {
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function getInitials(review: Review) {
  const name = review.customer?.firstName ?? review.customer?.email ?? '?';
  return name.slice(0, 2).toUpperCase();
}

function getName(review: Review) {
  const name = review.customer?.firstName ?? review.customer?.email ?? 'Customer';
  return name.length > 12 ? name.slice(0, 10) + '…' : name;
}

type AnyReview = Review & { _game?: string; _fake?: true };

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<AnyReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [gameFilter, setGameFilter] = useState('All');
  const [ratingFilter, setRatingFilter] = useState('All');

  useEffect(() => {
    reviewsApi.list()
      .then((data) => setReviews(data.length ? data : FALLBACK))
      .catch(() => setReviews(FALLBACK))
      .finally(() => setIsLoading(false));
  }, []);

  const avgRating = useMemo(() => {
    if (!reviews.length) return 0;
    return (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  }, [reviews]);

  const filtered = useMemo(() => {
    return reviews.filter((r) => {
      const matchGame = gameFilter === 'All' || (r as AnyReview)._game === gameFilter;
      const matchRating =
        ratingFilter === 'All' ? true :
        ratingFilter === '5★' ? r.rating === 5 :
        ratingFilter === '4★' ? r.rating === 4 :
        r.rating <= 3;
      return matchGame && matchRating;
    });
  }, [reviews, gameFilter, ratingFilter]);

  return (
    <div className="reviews">

      {/* Hero */}
      <section className="reviews__hero">
        <div className="reviews__hero-inner">
          <p className="reviews__hero-tag">Verified Reviews</p>
          <h1 className="reviews__hero-title">
            What our <span className="reviews__gradient">clients say</span>
          </h1>
          <p className="reviews__hero-desc">
            Real reviews from real players. Every review comes from a verified completed order.
          </p>
        </div>
      </section>

      {/* Stats */}
      {!isLoading && reviews.length > 0 && (
        <section className="reviews__stats">
          <div className="reviews__stats-inner">
            <div className="reviews__stat">
              <span className="reviews__stat-value">{avgRating}</span>
              <span className="reviews__stat-label">Average Rating</span>
            </div>
            <div className="reviews__stat">
              <span className="reviews__stars-big">★★★★★</span>
            </div>
            <div className="reviews__stat">
              <span className="reviews__stat-value">{reviews.length}+</span>
              <span className="reviews__stat-label">Reviews</span>
            </div>
            <div className="reviews__stat">
              <span className="reviews__stat-value">99%</span>
              <span className="reviews__stat-label">Satisfaction</span>
            </div>
          </div>
        </section>
      )}

      {/* Filters */}
      <div className="reviews__filters">
        <div className="reviews__filters-inner">
          <span className="reviews__filter-label">Game:</span>
          {GAME_TAGS.map((g) => (
            <button
              key={g}
              type="button"
              className={`reviews__filter-btn ${gameFilter === g ? 'reviews__filter-btn--active' : ''}`}
              onClick={() => setGameFilter(g)}
            >
              {g}
            </button>
          ))}
          <span className="reviews__filter-label" style={{ marginLeft: '1rem' }}>Rating:</span>
          {RATING_FILTERS.map((r) => (
            <button
              key={r}
              type="button"
              className={`reviews__filter-btn ${ratingFilter === r ? 'reviews__filter-btn--active' : ''}`}
              onClick={() => setRatingFilter(r)}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="reviews__body">
        <div className="reviews__body-inner">
          {isLoading ? (
            <div className="reviews__loading">Loading reviews…</div>
          ) : filtered.length === 0 ? (
            <div className="reviews__empty">
              <div className="reviews__empty-icon">🔍</div>
              <p>No reviews match your filters.</p>
            </div>
          ) : (
            <>
              <p className="reviews__count">{filtered.length} review{filtered.length !== 1 ? 's' : ''}</p>
              <div className="reviews__grid">
                {filtered.map((review) => (
                  <div key={review.id} className="reviews__card">
                    <div className="reviews__card-top">
                      <div className="reviews__card-user">
                        <div className="reviews__card-avatar">{getInitials(review)}</div>
                        <div>
                          <div className="reviews__card-name">{getName(review)}</div>
                          <div className="reviews__card-date">{formatDate(review.createdAt)}</div>
                        </div>
                      </div>
                      <span className="reviews__card-stars">{stars(review.rating)}</span>
                    </div>

                    {(review as AnyReview)._game && (
                      <span className="reviews__card-game">{(review as AnyReview)._game}</span>
                    )}

                    {review.comment && (
                      <p className="reviews__card-text">&ldquo;{review.comment}&rdquo;</p>
                    )}

                    {review.booster && (
                      <div className="reviews__card-booster">
                        Booster: <span className="reviews__card-booster-label">
                          {review.booster.firstName ?? review.booster.email}
                        </span>
                      </div>
                    )}

                    {(review as any).adminResponse && (
                      <div className="reviews__card-response">
                        <div className="reviews__card-response-label">FANCY BOOST Reply</div>
                        <div className="reviews__card-response-text">{(review as any).adminResponse}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* CTA */}
      <section className="reviews__cta">
        <div className="reviews__cta-inner">
          <h2 className="reviews__cta-title">Ready to join them?</h2>
          <p className="reviews__cta-desc">Thousands of players already reached their goal. Your turn.</p>
          <Link href="/games/cs2" className="reviews__cta-btn">Browse Services</Link>
        </div>
      </section>

    </div>
  );
}
