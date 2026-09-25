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

export const BillingMultiSiteArt: React.FC = () => (
  <svg viewBox="0 0 280 150" className="w-full h-full rounded-2xl border border-pink/30 bg-[#0d1130]/90 p-3 overflow-hidden shadow-lg select-none" aria-hidden="true">
    <defs>
      <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ee4f7f" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#0d1130" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="docGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1a204d" />
        <stop offset="100%" stopColor="#101538" />
      </linearGradient>
    </defs>

    {/* Center Radial Glow */}
    <ellipse cx="140" cy="85" rx="80" ry="55" fill="url(#centerGlow)" />

    {/* Dashed Connecting Arcs */}
    <path d="M 54 80 A 90 60 0 0 1 226 80" fill="none" stroke="#ee4f7f" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.8" />
    <path d="M 54 80 A 90 50 0 0 0 226 80" fill="none" stroke="#ee4f7f" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />

    {/* Top Hospital Badge */}
    <g transform="translate(122, 12)">
      <circle cx="18" cy="18" r="18" fill="#181f50" stroke="#ee4f7f" strokeWidth="2" />
      {/* Hospital Building Icon */}
      <path d="M 12 25 L 12 14 L 24 14 L 24 25 Z" fill="none" stroke="#ffffff" strokeWidth="1.5" />
      <path d="M 18 16 L 18 20 M 16 18 L 20 18" stroke="#ee4f7f" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="15" y="21" width="6" height="4" fill="#ffffff" />
    </g>

    {/* Left Hospital Badge */}
    <g transform="translate(36, 62)">
      <circle cx="18" cy="18" r="18" fill="#181f50" stroke="#b05bff" strokeWidth="2" />
      <path d="M 12 25 L 12 14 L 24 14 L 24 25 Z" fill="none" stroke="#ffffff" strokeWidth="1.5" />
      <path d="M 18 16 L 18 20 M 16 18 L 20 18" stroke="#ee4f7f" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="15" y="21" width="6" height="4" fill="#ffffff" />
    </g>

    {/* Right Hospital Badge */}
    <g transform="translate(208, 62)">
      <circle cx="18" cy="18" r="18" fill="#181f50" stroke="#b05bff" strokeWidth="2" />
      <path d="M 12 25 L 12 14 L 24 14 L 24 25 Z" fill="none" stroke="#ffffff" strokeWidth="1.5" />
      <path d="M 18 16 L 18 20 M 16 18 L 20 18" stroke="#ee4f7f" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="15" y="21" width="6" height="4" fill="#ffffff" />
    </g>

    {/* Central Document Card */}
    <g transform="translate(104, 48)">
      <rect x="0" y="0" width="72" height="82" rx="12" fill="url(#docGrad)" stroke="#ffffff" strokeWidth="1.5" />

      {/* Brain Icon inside document */}
      <g transform="translate(24, 10)">
        {/* Left brain lobe */}
        <path d="M 12 2 C 7 2 3 6 3 11 C 3 14 5 16 7 18 C 5 19 3 21 3 23 C 3 27 7 30 12 30" fill="none" stroke="#ee4f7f" strokeWidth="1.8" strokeLinecap="round" />
        {/* Right brain lobe */}
        <path d="M 12 2 C 17 2 21 6 21 11 C 21 14 19 16 17 18 C 19 19 21 21 21 23 C 21 27 17 30 12 30" fill="none" stroke="#ee4f7f" strokeWidth="1.8" strokeLinecap="round" />
        {/* Center line */}
        <line x1="12" y1="2" x2="12" y2="30" stroke="#ee4f7f" strokeWidth="1.5" />
      </g>

      {/* Text Lines */}
      <line x1="14" y1="47" x2="52" y2="47" stroke="#8c9bc8" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="14" y1="56" x2="38" y2="56" stroke="#8c9bc8" strokeWidth="2.5" strokeLinecap="round" />

      {/* Pink Checkmark Circle Badge */}
      <g transform="translate(44, 52)">
        <circle cx="13" cy="13" r="13" fill="#ee4f7f" />
        <path d="M 8 13 L 11.5 16.5 L 18 10" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
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
