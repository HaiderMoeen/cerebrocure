import React from 'react';

export const BillingOrbitArt: React.FC = () => (
  <svg viewBox="0 0 240 120" className="w-full h-full rounded-xl border border-line bg-bg2/40 p-2 overflow-visible" aria-hidden="true">
    <ellipse cx="120" cy="60" rx="80" ry="35" fill="none" stroke="var(--line)" strokeWidth="1.5" strokeDasharray="4 4" />
    <circle cx="120" cy="60" r="22" fill="var(--surface2)" stroke="var(--pink)" strokeWidth="2" />
    {/* Clock Hands */}
    <polyline points="120 46 120 60 128 65" fill="none" stroke="var(--pink)" strokeWidth="2" strokeLinecap="round" />
    
    {/* Orbiting Satellite Dots */}
    <circle cx="40" cy="60" r="6" fill="var(--pink)" />
    <circle cx="200" cy="60" r="6" fill="var(--soft)" />
    <circle cx="150" cy="27" r="5" fill="var(--peach)" />
  </svg>
);

export const BillingCustomizedArt: React.FC = () => (
  <svg viewBox="0 0 240 120" className="w-full h-full rounded-2xl border border-pink/30 bg-[#0d1130]/80 p-3 overflow-visible shadow-md" aria-hidden="true">
    <defs>
      <linearGradient id="artGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ee4f7f" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#2d3c82" stopOpacity="0.4" />
      </linearGradient>
    </defs>
    
    {/* Network Nodes and Connecting Lines */}
    <path d="M 60 75 L 120 40 L 180 75" fill="none" stroke="var(--pink)" strokeWidth="1.5" strokeDasharray="4 4" />
    <path d="M 120 40 L 120 90" fill="none" stroke="var(--pink)" strokeWidth="1.5" strokeDasharray="4 4" />

    {/* Center Hospital / Network Node */}
    <g transform="translate(102, 22)">
      <rect x="0" y="0" width="36" height="36" rx="10" fill="url(#artGlow)" stroke="var(--pink)" strokeWidth="1.5" />
      {/* Plus / Medical Cross */}
      <path d="M 18 10 L 18 26 M 10 18 L 26 18" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
    </g>

    {/* Node Left - Clinic/Partner */}
    <g transform="translate(44, 60)">
      <circle cx="16" cy="16" r="16" fill="var(--surface2)" stroke="var(--text)" strokeWidth="1.5" />
      <path d="M 10 16 L 22 16 M 16 10 L 16 22" fill="none" stroke="var(--pink)" strokeWidth="1.5" strokeLinecap="round" />
    </g>

    {/* Node Right - Medical Network */}
    <g transform="translate(164, 60)">
      <circle cx="16" cy="16" r="16" fill="var(--surface2)" stroke="var(--text)" strokeWidth="1.5" />
      <path d="M 10 16 L 22 16 M 16 10 L 16 22" fill="none" stroke="var(--pink)" strokeWidth="1.5" strokeLinecap="round" />
    </g>

  </svg>
);

export const BillingPeopleArt: React.FC = () => (
  <svg viewBox="0 0 240 120" className="w-full h-full rounded-xl border border-line bg-bg2/40 p-2 overflow-visible" aria-hidden="true">
    <g transform="translate(45, 30)">
      {/* Figure 1 */}
      <g transform="translate(0, 10)">
        <circle cx="20" cy="14" r="8" fill="var(--surface2)" stroke="var(--text)" strokeWidth="1.5" />
        <path d="M 6 36 C 6 26 12 24 20 24 C 28 24 34 26 34 36" fill="none" stroke="var(--text)" strokeWidth="1.5" />
      </g>
      {/* Figure 2 (Center - Pink) */}
      <g transform="translate(55, 0)">
        <circle cx="20" cy="14" r="9" fill="var(--surface2)" stroke="var(--pink)" strokeWidth="2" />
        <path d="M 4 40 C 4 28 11 26 20 26 C 29 26 36 28 36 40" fill="none" stroke="var(--pink)" strokeWidth="2" />
      </g>
      {/* Figure 3 */}
      <g transform="translate(110, 10)">
        <circle cx="20" cy="14" r="8" fill="var(--surface2)" stroke="var(--text)" strokeWidth="1.5" />
        <path d="M 6 36 C 6 26 12 24 20 24 C 28 24 34 26 34 36" fill="none" stroke="var(--text)" strokeWidth="1.5" />
      </g>
    </g>
  </svg>
);
