'use client';

import React, { useState } from 'react';
import './FAQ.css';

interface FaqItem {
  question: string;
  answer: string;
}

const defaultFaqs: FaqItem[] = [
  {
    question: 'Is my account safe during the boost?',
    answer: 'Absolutely. We use VPN protection matching your region, unique hardware IDs, and never use any third-party software. Our boosters follow strict security guidelines to keep your account safe at all times.',
  },
  {
    question: 'How long does the boost take?',
    answer: 'Timeframes vary depending on the service and the gap between your current and desired rank. Most orders are started within 1-2 hours and completed as fast as possible. You can track progress in real time through your dashboard.',
  },
  {
    question: 'Can I play on my account during the boost?',
    answer: 'For solo boosting, we recommend not playing on the account while the booster is active. For party/duo boosting, you play on your own account alongside our booster — no account sharing needed.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit and debit cards, PayPal, and cryptocurrency. All payments are processed through secure, encrypted channels.',
  },
  {
    question: 'What if I am not satisfied with the service?',
    answer: 'We offer a money-back guarantee if we fail to deliver the promised result. Our support team is available 24/7 to resolve any issues.',
  },
  {
    question: 'Do you offer any discounts?',
    answer: 'Yes! We regularly run promotions and offer discounts for returning customers. Follow us on social media or subscribe to our newsletter to stay updated.',
  },
];

interface FAQProps {
  items?: FaqItem[];
}

export const FAQ = ({ items }: FAQProps) => {
  const faqs = items ?? defaultFaqs;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq">
      {faqs.map((item, index) => (
        <div
          key={index}
          className={`faq__item ${openIndex === index ? 'faq__item--open' : ''}`}
        >
          <button
            type="button"
            className="faq__question"
            onClick={() => toggle(index)}
            aria-expanded={openIndex === index}
          >
            <span className="faq__question-text">{item.question}</span>
            <svg
              className="faq__icon"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M5 8l5 5 5-5" />
            </svg>
          </button>
          <div className="faq__answer-wrapper">
            <p className="faq__answer">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
