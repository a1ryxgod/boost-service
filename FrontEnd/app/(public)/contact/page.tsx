'use client';

import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';
import './Contact.css';

export default function ContactPage() {
  const { user } = useAuth();

  const openChat = () => {
    window.dispatchEvent(new CustomEvent('chatWidget:open'));
  };

  return (
    <div className="contact">

      {/* Hero */}
      <section className="contact__hero">
        <div className="contact__hero-inner">
          <p className="contact__hero-tag">Support</p>
          <h1 className="contact__hero-title">
            We&apos;re here to <span className="contact__gradient">help you</span>
          </h1>
          <p className="contact__hero-desc">
            Got a question about your order, an issue with your account, or just want to talk?
            Our support team is available around the clock.
          </p>
        </div>
      </section>

      {/* Trust bar */}
      <section className="contact__trust">
        <div className="contact__trust-inner">
          <div className="contact__trust-item">
            <span className="contact__trust-icon">⚡</span>
            <span>Avg. response &lt; 3 min</span>
          </div>
          <div className="contact__trust-item">
            <span className="contact__trust-icon">🕐</span>
            <span>Available 24/7</span>
          </div>
          <div className="contact__trust-item">
            <span className="contact__trust-icon">🌍</span>
            <span>English &amp; Russian</span>
          </div>
          <div className="contact__trust-item">
            <span className="contact__trust-icon">✅</span>
            <span>Issues resolved same day</span>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="contact__body">
        <div className="contact__body-inner">

          {/* Live Chat card */}
          <div className="contact__chat-card">
            <div className="contact__chat-icon">💬</div>
            <h2 className="contact__chat-title">Live Chat Support</h2>
            <p className="contact__chat-desc">
              The fastest way to get help. Chat directly with our support team and get a response in minutes.
            </p>
            <div className="contact__status">
              <span className="contact__status-dot" />
              Support agents online
            </div>

            {user ? (
              <>
                <button
                  type="button"
                  className="contact__chat-btn"
                  onClick={openChat}
                >
                  💬 Start Live Chat
                </button>
                <span className="contact__chat-note">
                  Logged in as {user.email}
                </span>
              </>
            ) : (
              <div className="contact__guest">
                <p>Sign in to start a live chat with our support team.</p>
                <div className="contact__guest-btns">
                  <Link href="/login" className="contact__guest-btn contact__guest-btn--primary">
                    Log In
                  </Link>
                  <Link href="/register" className="contact__guest-btn contact__guest-btn--secondary">
                    Create Account
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Info cards */}
          <div className="contact__info">
            <div className="contact__info-card">
              <div className="contact__info-icon">⚡</div>
              <div>
                <p className="contact__info-title">Response Time</p>
                <p className="contact__info-value">
                  We typically reply within 3 minutes during business hours. Off-peak hours may take up to 15 minutes.
                </p>
              </div>
            </div>

            <div className="contact__info-card">
              <div className="contact__info-icon">🎮</div>
              <div>
                <p className="contact__info-title">Order Support</p>
                <p className="contact__info-value">
                  Have an issue with an active order? Contact us via chat and include your Order ID for the fastest resolution.
                </p>
              </div>
            </div>

            <div className="contact__info-card">
              <div className="contact__info-icon">💸</div>
              <div>
                <p className="contact__info-title">Refunds &amp; Billing</p>
                <p className="contact__info-value">
                  Refund requests are processed within 24 hours. Start a chat and our team will walk you through the process.
                </p>
              </div>
            </div>

            <div className="contact__info-card">
              <div className="contact__info-icon">🔒</div>
              <div>
                <p className="contact__info-title">Account Issues</p>
                <p className="contact__info-value">
                  Can&apos;t log in or having security concerns? Reach out via live chat and we&apos;ll help you regain access immediately.
                </p>
              </div>
            </div>

            <div className="contact__info-card">
              <div className="contact__info-icon">📖</div>
              <div>
                <p className="contact__info-title">Prefer self-service?</p>
                <p className="contact__info-value">
                  Check our{' '}
                  <Link href="/faq" className="contact__info-link">FAQ page</Link>
                  {' '}— most common questions are already answered there.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
