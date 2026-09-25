import React from 'react';
import billingCardImg from '../../assets/billing-card.png';
import { RevealPanel } from '../ui/RevealPanel';
import { ArrowRight } from 'lucide-react';

interface BillingCardProps {
  onNavigate: (hash: string) => void;
}

export const BillingCard: React.FC<BillingCardProps> = ({ onNavigate }) => {
  return (
    <RevealPanel id="billbox" className="box bill rounded-3xl sm:rounded-4xl p-6 sm:p-9 bg-gradient-to-br from-[#181f50] via-[#12173f] to-[#0d1130] border border-pink/40 shadow-[0_15px_45px_rgba(238,79,127,0.18)] flex flex-col justify-between relative overflow-hidden">
      {/* Radial Corner Glow matching website theme */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(80%_120%_at_100%_0,var(--glow),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          {/* Main Title matching photo: 'Annual Licensing Plan' */}
          <h2 className="dim font-display font-extrabold text-[clamp(1.7rem,3.4vw,2.6rem)] text-text mb-6 tracking-tight leading-[1.1]">
            Annual <span className="text-pink">Licensing</span> Plan
          </h2>

          {/* Multi-Site Hospital & Document Artwork */}
          <div className="w-full aspect-[280/160] mb-6 rounded-2xl overflow-hidden bg-[#0A0D28]/60 border border-pink/30 flex items-center justify-center p-2 relative group shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-tr from-pink/10 via-transparent to-purple-500/10 opacity-50 pointer-events-none" />
            <img 
              src={billingCardImg} 
              alt="Multi-Site Hospital Access & AI Licensing" 
              className="w-full h-full object-contain mix-blend-screen drop-shadow-[0_0_20px_rgba(238,79,127,0.35)] filter contrast-110 saturate-115 transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>

          {/* Subheading & Description matching photo */}
          <div className="mb-6">
            <h3 className="font-display font-extrabold text-lg sm:text-xl text-text mb-2.5 tracking-tight">
              Multi-Site Access
            </h3>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Our annual licensing plan provides access to Cerebrocure’s AI-powered stroke care platform, tailored to your hospital or medical network’s specific volume and operational needs.
            </p>
          </div>
        </div>

        {/* Footer Note & Gradient CTA Button */}
        <div className="relative z-10 pt-6 border-t border-line/60 mt-auto">
          <p className="text-xs sm:text-sm text-muted mb-4 font-normal">
            For annual licensing plans, contact us.
          </p>
          
          <a
            href="#/contact"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('#/contact');
            }}
            className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-pink via-[#ff5d8f] to-pink text-[#0A1033] font-extrabold text-sm sm:text-base shadow-[0_6px_20px_rgba(238,79,127,0.4)] hover:shadow-[0_10px_28px_rgba(238,79,127,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 inline-flex items-center justify-center gap-2.5 select-none cursor-pointer"
          >
            <span>Get in touch</span>
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </RevealPanel>
  );
};
