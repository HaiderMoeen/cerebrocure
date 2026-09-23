import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'ghost';
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  href,
  target,
  rel,
  children,
  className = '',
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-base font-semibold transition-all duration-200 focus-visible:outline-none cursor-pointer select-none';

  const variantClasses =
    variant === 'solid'
      ? 'bg-pink text-on-accent hover:-translate-y-0.5 hover:shadow-btn-pink active:translate-y-0'
      : 'bg-transparent text-text border border-line hover:border-pink hover:text-pink active:translate-y-0';

  const combinedClasses = `${baseClasses} ${variantClasses} ${className}`;

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={combinedClasses}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};
