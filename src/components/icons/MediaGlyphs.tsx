import React from 'react';
import { GlyphKey } from '../../types/content';

interface GlyphProps extends React.SVGProps<SVGSVGElement> {
  glyph: GlyphKey;
  size?: number;
  color?: string;
}

export const MediaGlyph: React.FC<GlyphProps> = ({ glyph, size = 48, color = 'var(--text)', ...props }) => {
  const strokeProps = {
    fill: 'none',
    stroke: color,
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (glyph) {
    case 'medal':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" {...props}>
          <circle cx="24" cy="30" r="10" {...strokeProps} />
          <polyline points="16 8 20 20 24 20" {...strokeProps} />
          <polyline points="32 8 28 20 24 20" {...strokeProps} />
          <polygon points="24 26 26 29 29 29 27 31 28 34 24 32 20 34 21 31 19 29 22 29" fill={color} opacity={0.6} />
        </svg>
      );
    case 'mic':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" {...props}>
          <rect x="18" y="8" width="12" height="20" rx="6" {...strokeProps} />
          <path d="M 12 22 A 12 12 0 0 0 36 22" {...strokeProps} />
          <line x1="24" y1="34" x2="24" y2="40" {...strokeProps} />
          <line x1="16" y1="40" x2="32" y2="40" {...strokeProps} />
        </svg>
      );
    case 'booth':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" {...props}>
          <path d="M 10 16 L 38 16 L 35 10 L 13 10 Z" {...strokeProps} />
          <rect x="10" y="16" width="28" height="22" rx="2" {...strokeProps} />
          <line x1="18" y1="24" x2="30" y2="24" {...strokeProps} />
          <line x1="18" y1="30" x2="26" y2="30" {...strokeProps} />
        </svg>
      );
    case 'chip':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" {...props}>
          <rect x="14" y="14" width="20" height="20" rx="4" {...strokeProps} />
          <rect x="20" y="20" width="8" height="8" rx="1" fill={color} opacity={0.3} stroke={color} strokeWidth={1.5} />
          {/* Pins */}
          <line x1="20" y1="8" x2="20" y2="14" {...strokeProps} />
          <line x1="28" y1="8" x2="28" y2="14" {...strokeProps} />
          <line x1="20" y1="34" x2="20" y2="40" {...strokeProps} />
          <line x1="28" y1="34" x2="28" y2="40" {...strokeProps} />
          <line x1="8" y1="20" x2="14" y2="20" {...strokeProps} />
          <line x1="8" y1="28" x2="14" y2="28" {...strokeProps} />
          <line x1="34" y1="20" x2="40" y2="20" {...strokeProps} />
          <line x1="34" y1="28" x2="40" y2="28" {...strokeProps} />
        </svg>
      );
    case 'people':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" {...props}>
          <circle cx="24" cy="16" r="6" {...strokeProps} />
          <path d="M 12 36 C 12 28 17 26 24 26 C 31 26 36 28 36 36" {...strokeProps} />
          <circle cx="12" cy="18" r="4" {...strokeProps} opacity={0.7} />
          <path d="M 4 36 C 4 30 7 28 12 28" {...strokeProps} opacity={0.7} />
          <circle cx="36" cy="18" r="4" {...strokeProps} opacity={0.7} />
          <path d="M 44 36 C 44 30 41 28 36 28" {...strokeProps} opacity={0.7} />
        </svg>
      );
    case 'cert':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" {...props}>
          <rect x="10" y="8" width="28" height="32" rx="4" {...strokeProps} />
          <line x1="16" y1="16" x2="32" y2="16" {...strokeProps} />
          <line x1="16" y1="22" x2="28" y2="22" {...strokeProps} />
          <circle cx="28" cy="30" r="4" {...strokeProps} />
          <polyline points="26 34 26 38 28 36 30 38 30 34" {...strokeProps} />
        </svg>
      );
    default:
      return null;
  }
};
