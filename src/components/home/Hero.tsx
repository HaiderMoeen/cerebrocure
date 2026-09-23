import React from 'react';
import brainImg from '../../assets/brain.jpg';

interface HeroProps {
  onNavigate: (hash: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative w-full min-h-[85svh] pt-28 pb-16 flex items-center justify-center px-4 sm:px-6 lg:px-10 overflow-hidden bg-[radial-gradient(60%_50%_at_50%_42%,var(--glow),transparent_70%)]">
      <div className="w-full max-w-[1080px] mx-auto grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Headline, Our Mission, & Contact Us Button */}
        <div className="flex flex-col items-start text-left">
          {/* H1 Headline */}
          <h1 className="animate-fade-in font-display font-extrabold text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[1.08] tracking-tight text-white select-none">
            <span className="block">Turning data into</span>
            <span className="block">
              better <span className="text-pink">stroke</span>
            </span>
            <span className="block text-pink">patient outcomes</span>
          </h1>

          {/* Our Mission Callout Block */}
          <div className="animate-fade-in-delay-1 border-l-[3px] border-pink pl-5 sm:pl-6 py-1 my-7 sm:my-8 max-w-[500px]">
            <div className="flex items-center gap-2 text-pink text-xs sm:text-sm font-semibold tracking-wide mb-2.5 sm:mb-3">
              <span>—</span>
              <span>Our mission</span>
            </div>
            <p className="font-display text-base sm:text-lg text-[#cbd5e1] font-normal italic leading-relaxed">
              To equip clinicians with AI technology as a decision-making tool for better patient outcomes in stroke.
            </p>
          </div>

          {/* Contact Us Button */}
          <div className="animate-fade-in-delay-2">
            <a
              href="#/contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('#/contact');
              }}
              className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-pink text-[#0F1330] font-bold text-sm sm:text-base shadow-[0_8px_20px_rgba(238,79,127,0.4)] hover:shadow-[0_12px_28px_rgba(238,79,127,0.6)] hover:bg-[#ff5d8f] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 select-none"
            >
              Contact us
            </a>
          </div>
        </div>

        {/* Right Column: Brain MRI Scan Image */}
        <div className="animate-fade-in-delay-1 w-full flex justify-center lg:justify-end">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.65)] max-w-[460px] w-full bg-[#080b1e]">
            <img
              src={brainImg}
              alt="Brain MRI scan axial view series"
              className="w-full h-auto block object-cover select-none"
              loading="eager"
            />
            {/* Image Overlay Label */}
            <div className="absolute bottom-3 left-4 text-xs font-mono text-white/90 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 select-none">
              MRI series — axial view
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
