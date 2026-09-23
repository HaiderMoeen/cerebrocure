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
