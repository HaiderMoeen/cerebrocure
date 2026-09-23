import React from 'react';
import { FeatureItem } from '../../types/content';
import { ClockIcon, BarsIcon, CirclesIcon, TargetIcon, CheckIcon } from '../icons/FeatureIcons';

interface FeatureCardProps {
  item: FeatureItem;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ item }) => {
  const renderIcon = () => {
    switch (item.icon) {
      case 'clock':
        return <ClockIcon />;
      case 'bars':
        return <BarsIcon />;
      case 'circles':
        return <CirclesIcon />;
      case 'target':
        return <TargetIcon />;
      case 'check':
        return <CheckIcon />;
      default:
        return null;
    }
  };

  return (
    <article className="shrink-0 w-[280px] sm:w-[320px] min-h-[220px] p-7 rounded-[26px] bg-[#181b3a] border border-[#282d5a] hover:border-pink/50 hover:shadow-[0_0_25px_rgba(238,79,127,0.15)] transition-all duration-300 flex flex-col justify-start gap-3 select-none">
      <div>
        <div className="mb-4">{renderIcon()}</div>
        <h3 className="font-display font-bold text-2xl text-white mb-2 tracking-tight">
          {item.title}
        </h3>
      </div>
      <p className="text-sm text-[#94a3b8] leading-relaxed font-normal">{item.description}</p>
    </article>
  );
};
