import React from 'react';

export const ProductHeroPanel: React.FC = () => (
  <section className="relative w-full min-h-[100svh] pt-24 pb-[18vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-10">
    <div className="pbox w-full max-w-[1080px] min-h-[min(66svh,620px)] rounded-3xl sm:rounded-5xl p-8 sm:p-14 lg:p-20 bg-gradient-to-br from-[#181f50] via-[#12173f] to-[#0d1130] border border-pink/40 shadow-[0_15px_45px_rgba(238,79,127,0.18)] relative overflow-hidden flex flex-col items-center justify-center text-center">
      {/* Top Radial Pink Glow */}
      <div className="absolute top-0 left-0 right-0 h-full bg-[radial-gradient(70%_90%_at_50%_0,var(--glow),transparent_70%)] pointer-events-none" />

      {/* Tag Pill with Pulsing Pink Dot */}
      <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-line bg-bg2/80 text-xs sm:text-sm font-semibold text-text mb-6 relative z-10 select-none">
        <span className="w-2.5 h-2.5 rounded-full bg-pink animate-pulse shadow-[0_0_10px_var(--pink)]" />
        <span>Cloud software for stroke care</span>
      </div>

      {/* H1 Title */}
      <h1 className="font-display font-bold text-[clamp(2.6rem,8vw,6.4rem)] leading-[1.02] tracking-[-0.04em] text-text mb-6 relative z-10">
        Cerebrocure
      </h1>

      {/* Tagline */}
      <p className="font-display font-normal text-[clamp(1.1rem,2.3vw,1.7rem)] leading-[1.3] text-muted max-w-[34ch] mx-auto relative z-10">
        An AI-powered cloud software to assist neurologists make rapid and informed decisions for better patient outcomes in stroke.
      </p>
    </div>
  </section>
);
