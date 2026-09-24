import React from 'react';
import { BillingCustomizedArt } from '../icons/BillingArt';
import { Button } from '../ui/Button';
import { RevealPanel } from '../ui/RevealPanel';

interface BillingCardProps {
  onNavigate: (hash: string) => void;
}

export const BillingCard: React.FC<BillingCardProps> = ({ onNavigate }) => {
  return (
    <RevealPanel id="billbox" className="box bill rounded-3xl sm:rounded-4xl p-6 sm:p-9 bg-gradient-to-br from-[#181f50] via-[#12173f] to-[#0d1130] border border-pink/40 shadow-[0_15px_45px_rgba(238,79,127,0.18)] flex flex-col justify-between relative overflow-hidden">
      {/* Radial Corner Glow matching home page */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(80%_120%_at_100%_0,var(--glow),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          {/* Singular Heading */}
          <h2 className="dim font-display font-extrabold text-[clamp(1.6rem,3.2vw,2.5rem)] text-text mb-6 tracking-tight">
            Payment Plan
          </h2>

          {/* Hospital Network Illustration SVG */}
          <div className="w-full aspect-[240/125] mb-6">
            <BillingCustomizedArt />
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-display font-extrabold text-lg sm:text-xl text-text mb-2.5 tracking-tight">
              Customized Solutions
            </h3>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              We offer customized billing plans tailored to your hospital or medical network’s specific volume and operational reach. Please reach out to our team to discuss the ideal configuration for your institution.
            </p>
          </div>
        </div>

        {/* Footer Copy & CTA */}
        <div className="relative z-10 pt-6 border-t border-line/60 mt-auto">
          <p className="text-xs sm:text-sm text-muted mb-4 font-normal">
            For Customized plans, Contact Us
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
      </div>
    </RevealPanel>
  );
};
