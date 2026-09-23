import React, { useState } from 'react';
import { BILLING_PLANS } from '../../data/billing';
import { BillingPlanKey } from '../../types/content';
import { SegmentedTabs } from '../ui/SegmentedTabs';
import { BillingPanel } from './BillingPanel';
import { Button } from '../ui/Button';
import { RevealPanel } from '../ui/RevealPanel';

interface BillingCardProps {
  onNavigate: (hash: string) => void;
}

export const BillingCard: React.FC<BillingCardProps> = ({ onNavigate }) => {
  const [activePlanKey, setActivePlanKey] = useState<BillingPlanKey>('lic');
  const currentPlan = BILLING_PLANS[activePlanKey];

  return (
    <RevealPanel id="billbox" className="box bill rounded-3xl sm:rounded-4xl p-6 sm:p-9 bg-gradient-to-br from-[#181f50] via-[#12173f] to-[#0d1130] border border-pink/40 shadow-[0_15px_45px_rgba(238,79,127,0.18)] flex flex-col justify-between relative overflow-hidden">
      {/* Radial Corner Glow matching home page */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(80%_120%_at_100%_0,var(--glow),transparent_60%)] pointer-events-none" />

      <div className="relative z-10">
        <h2 className="dim font-display font-bold text-[clamp(1.6rem,3.2vw,2.5rem)] text-text mb-6 tracking-tight">
          Payment Plans
        </h2>

        {/* Tab switcher */}
        <div className="mb-6">
          <SegmentedTabs activeTab={activePlanKey} onTabChange={setActivePlanKey} />
        </div>

        {/* Selected Plan Content */}
        <div key={activePlanKey} role="tabpanel" id={`b-${activePlanKey}`}>
          <BillingPanel plan={currentPlan} />
        </div>
      </div>

      {/* Footer Copy & CTA */}
      <div className="relative z-10 mt-8 pt-6 border-t border-line/60">
        <p className="text-xs text-muted mb-4">
          Please get in touch for further inquiries.
        </p>
        <Button
          variant="solid"
          href="#/contact"
          className="w-full text-center"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('#/contact');
          }}
        >
          Get in touch
        </Button>
      </div>
    </RevealPanel>
  );
};
