'use client';

import { useState, useMemo } from 'react';
import './FAQ.css';

const categories = ['All', 'General', 'Safety', 'Orders', 'Payment', 'Boosters'];

const faqs = [
  // General
  {
    category: 'General',
    q: 'What is game boosting?',
    a: 'Game boosting is a service where a top-ranked professional player plays on your account (or alongside you in duo mode) to help you reach a higher rank or complete specific in-game challenges faster than you could on your own.',
  },
  {
    category: 'General',
    q: 'Which games do you support?',
    a: 'We currently support Counter-Strike 2 (CS2), Dota 2, Valorant, and League of Legends. We are continuously expanding our game catalog.',
  },
  {
    category: 'General',
    q: 'What services are available?',
    a: 'We offer rank boosting (solo and duo), placement match boosting, FACEIT/ELO boosting (CS2), MMR boosting (Dota 2), coaching sessions, and pre-ranked accounts for sale.',
  },
  {
    category: 'General',
    q: 'Do I need to create an account?',
    a: 'Yes, creating a free account lets you track your orders in real time, chat with your booster, and request support — all from one dashboard.',
  },

  // Safety
  {
    category: 'Safety',
    q: 'Is my account safe?',
    a: 'Absolutely. All our boosters use a VPN matched to your region to avoid suspicious login flags. They play at a natural human pace and never use third-party software or cheats. We have a perfect safety record.',
  },
  {
    category: 'Safety',
    q: 'Will I get banned for using boosting services?',
    a: "Our methods are carefully designed to avoid detection. We use VPNs, play at human speed, and follow all safe-play guidelines. That said, boosting violates most games' ToS — we minimize risk, but cannot provide a 100% ban guarantee.",
  },
  {
    category: 'Safety',
    q: 'Should I change my password after the boost?',
    a: "We recommend changing your password once the order is completed. Your booster will never store or share your credentials — but it's good practice for your own peace of mind.",
  },
  {
    category: 'Safety',
    q: 'Can I watch my booster play?',
    a: 'Yes. You can request a private stream link from your booster at any time via the in-dashboard chat. This is available at no extra cost.',
  },

  // Orders
  {
    category: 'Orders',
    q: 'How long does an order take to start?',
    a: 'Most orders are picked up by a booster within 5–15 minutes of purchase. During peak hours this is almost instant.',
  },
  {
    category: 'Orders',
    q: 'How long does the boost take to complete?',
    a: "It depends on the rank gap and game. A single division in CS2 might take a few hours; larger goals like 2,000 MMR in Dota 2 can take 1–5 days. You'll see an estimate before you check out.",
  },
  {
    category: 'Orders',
    q: 'Can I pause or cancel my order?',
    a: 'Yes. You can pause or resume your order at any time from your dashboard. If you cancel before the work begins you get a full refund. Partial refunds are available for work not yet completed.',
  },
  {
    category: 'Orders',
    q: 'Can I play on my account during the boost?',
    a: 'We recommend pausing the boost while you play to avoid conflicting sessions. You can pause/resume instantly from the dashboard. Alternatively, choose duo mode — your booster plays on their own account alongside you.',
  },
  {
    category: 'Orders',
    q: 'What is duo (self-play) boosting?',
    a: 'In duo mode your booster queues alongside you on their own high-ranked smurf account. You play all your games yourself — they just carry the lobby. Your account credentials are never shared.',
  },

  // Payment
  {
    category: 'Payment',
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit/debit cards and other payment methods via our secure checkout. All transactions are encrypted and processed through trusted payment processors.',
  },
  {
    category: 'Payment',
    q: 'Is my payment information secure?',
    a: 'Yes. We never store card data on our servers. Payments are handled by PCI-compliant processors, so your financial information is always protected.',
  },
  {
    category: 'Payment',
    q: 'Do you offer refunds?',
    a: "Yes. Full refunds for uncompleted orders, and partial refunds proportional to work remaining. If you're unhappy with the result for any reason, contact support and we'll make it right.",
  },
  {
    category: 'Payment',
    q: 'Are prices fixed or do they change?',
    a: 'Prices are calculated dynamically based on your starting and target rank, game, and selected options. The price you see at checkout is the final price — no hidden fees.',
  },

  // Boosters
  {
    category: 'Boosters',
    q: 'Who are your boosters?',
    a: 'All boosters are verified top-ranked players — Global Elite or FACEIT Level 10 for CS2, 8,000+ MMR for Dota 2, Radiant for Valorant, and Challenger/GM for LoL. Every booster passes skill tests and background checks.',
  },
  {
    category: 'Boosters',
    q: 'Can I choose a specific booster?',
    a: 'Not directly, but you can leave preferences (e.g., preferred heroes/agents) and our matching system will find the best fit. After your first order you can request the same booster again.',
  },
  {
    category: 'Boosters',
    q: 'Can I communicate with my booster?',
    a: 'Yes. Every order comes with a live chat between you and your assigned booster inside your dashboard. You can ask for updates, give instructions, or just say hi.',
  },
  {
    category: 'Boosters',
    q: 'Can I leave a review for my booster?',
    a: 'Absolutely — and we encourage it. After your order is marked complete you will be prompted to rate your booster. Reviews help the community and reward our best performers.',
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return faqs.filter((f) => {
      const matchCat = activeCategory === 'All' || f.category === activeCategory;
      const matchSearch = !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="faq">

      {/* Hero */}
      <section className="faq__hero">
        <div className="faq__hero-inner">
          <p className="faq__hero-tag">Help Center</p>
          <h1 className="faq__hero-title">
            <span className="faq__gradient">Frequently</span> Asked Questions
          </h1>
          <p className="faq__hero-desc">
            Everything you need to know about our services. Can&apos;t find an answer? Chat with us live.
          </p>
        </div>
      </section>

      {/* Search */}
      <div className="faq__search-wrap">
        <div className="faq__search">
          <span className="faq__search-icon">🔍</span>
          <input
            className="faq__search-input"
            type="text"
            placeholder="Search questions…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setOpenIndex(null); }}
          />
        </div>
      </div>

      {/* Body */}
      <div className="faq__body">
        <div className="faq__body-inner">

          {/* Category sidebar */}
          <div className="faq__cats">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`faq__cat-btn ${activeCategory === cat ? 'faq__cat-btn--active' : ''}`}
                onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ list */}
          <div className="faq__list">
            {filtered.length === 0 ? (
              <div className="faq__empty">No results found. Try a different search or category.</div>
            ) : (
              filtered.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={i} className={`faq__item ${isOpen ? 'faq__item--open' : ''}`}>
                    <button
                      type="button"
                      className="faq__question"
                      onClick={() => toggle(i)}
                      aria-expanded={isOpen}
                    >
                      <span className="faq__question-text">{item.q}</span>
                      <span className="faq__question-icon">+</span>
                    </button>
                    <div className={`faq__answer ${isOpen ? 'faq__answer--open' : ''}`}>
                      <div className="faq__answer-inner">{item.a}</div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>
      </div>

      {/* CTA */}
      <section className="faq__cta">
        <div className="faq__cta-inner">
          <div className="faq__cta-icon">💬</div>
          <h2 className="faq__cta-title">Still have questions?</h2>
          <p className="faq__cta-desc">Our support team is online 24/7 and typically replies within 3 minutes.</p>
          <a href="/contact" className="faq__cta-btn">Chat with Support</a>
        </div>
      </section>

    </div>
  );
}
