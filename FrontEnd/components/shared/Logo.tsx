import React from 'react';

export const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 2L2 12V28L16 22L30 28V12L16 2Z" fill="url(#paint0_linear)"/>
        <path d="M16 8L8 14V22L16 19L24 22V14L16 8Z" fill="#000000"/>
        <path d="M16 12L12 15V19L16 17.5L20 19V15L16 12Z" fill="url(#paint1_linear)"/>
        <defs>
          <linearGradient id="paint0_linear" x1="16" y1="2" x2="16" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF"/>
            <stop offset="1" stopColor="#8A8A8A"/>
          </linearGradient>
          <linearGradient id="paint1_linear" x1="16" y1="12" x2="16" y2="19" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF"/>
            <stop offset="1" stopColor="#A0A0A0"/>
          </linearGradient>
        </defs>
      </svg>
      <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.05em', color: '#FFFFFF' }}>
        FANCY BOOST
      </span>
    </div>
  );
};
