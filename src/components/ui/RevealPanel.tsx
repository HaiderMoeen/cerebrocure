import React, { useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface RevealPanelProps {
  variant?: 'rv' | 'rv-tilt';
  divisor?: number;
  className?: string;
  id?: string;
  children: React.ReactNode;
}

export const RevealPanel: React.FC<RevealPanelProps> = ({
  variant = 'rv',
  divisor,
  className = '',
  id,
  children,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const defaultDivisor = variant === 'rv-tilt' ? 0.62 : 0.52;
  
  useScrollReveal(panelRef, { divisor: divisor || defaultDivisor });

  return (
    <div
      ref={panelRef}
      id={id}
      className={`${variant} ${className}`}
    >
      {children}
    </div>
  );
};
