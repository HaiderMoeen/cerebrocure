import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export const ClockIcon: React.FC<IconProps> = ({ size = 42, color = 'var(--pink)', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <circle cx="20" cy="20" r="14" />
    <polyline points="20 12 20 20 25 23" />
  </svg>
);

export const BarsIcon: React.FC<IconProps> = ({ size = 42, color = 'var(--pink)', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <rect x="8" y="24" width="6" height="10" rx="1.5" />
    <rect x="17" y="17" width="6" height="17" rx="1.5" />
    <rect x="26" y="10" width="6" height="24" rx="1.5" />
  </svg>
);

export const CirclesIcon: React.FC<IconProps> = ({ size = 42, color = 'var(--pink)', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <circle cx="15" cy="17" r="7.5" />
    <circle cx="25" cy="17" r="7.5" />
    <circle cx="20" cy="25" r="7.5" />
  </svg>
);

export const TargetIcon: React.FC<IconProps> = ({ size = 42, color = 'var(--pink)', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <circle cx="20" cy="20" r="13" />
    <circle cx="20" cy="20" r="7" />
    <circle cx="20" cy="20" r="2" fill={color} />
    <line x1="20" y1="3" x2="20" y2="7" />
    <line x1="20" y1="33" x2="20" y2="37" />
    <line x1="3" y1="20" x2="7" y2="20" />
    <line x1="33" y1="20" x2="37" y2="20" />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ size = 42, color = 'var(--pink)', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <circle cx="20" cy="20" r="14" />
    <polyline points="13 20 18 25 27 15" />
  </svg>
);
