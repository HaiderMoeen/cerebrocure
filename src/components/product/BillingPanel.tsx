import React from 'react';
import { BillingPlan } from '../../types/content';
import { BillingOrbitArt, BillingPeopleArt } from '../icons/BillingArt';

interface BillingPanelProps {
  plan: BillingPlan;
}

export const BillingPanel: React.FC<BillingPanelProps> = ({ plan }) => {
  return (
    <div className="flex flex-col gap-4 animate-swap">
      {/* SVG Art Thumbnail */}
      <div className="w-full aspect-[240/120]">
        {plan.art === 'orbit' ? <BillingOrbitArt /> : <BillingPeopleArt />}
      </div>

      <div>
        <h3 className="font-display font-bold text-xl text-text mb-2 tracking-tight">
          {plan.heading}
        </h3>
        <p className="text-sm text-muted leading-relaxed">
          {plan.description}
        </p>
      </div>
    </div>
  );
};
