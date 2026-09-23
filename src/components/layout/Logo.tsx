import React from 'react';
import logoImg from '../../assets/cerebrocure-logo-mark.png';

interface LogoProps {
  size?: number;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 42, className = '' }) => (
  <img
    src={logoImg}
    alt="Cerebrocure logo"
    width={size}
    height={size}
    className={`object-contain select-none shrink-0 ${className}`}
    style={{ width: `${size}px`, height: `${size}px` }}
  />
);
