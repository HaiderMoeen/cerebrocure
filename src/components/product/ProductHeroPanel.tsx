import React from 'react';

export const ProductHeroPanel: React.FC = () => (
  <section className="relative w-full pt-20 pb-[12vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-10">
    <div className="pbox w-full max-w-[1080px] rounded-3xl sm:rounded-4xl p-6 sm:p-10 lg:p-14 bg-gradient-to-br from-[#181f50] via-[#12173f] to-[#0d1130] border border-pink/40 shadow-[0_15px_45px_rgba(238,79,127,0.18)] relative overflow-hidden flex flex-col items-center justify-center text-center">
      {/* Top Radial Pink Glow */}
      <div className="absolute top-0 left-0 right-0 h-full bg-[radial-gradient(70%_90%_at_50%_0,var(--glow),transparent_70%)] pointer-events-none" />

      {/* Tag Pill with Pulsing Pink Dot */}
      <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-line bg-bg2/80 text-xs sm:text-sm font-semibold text-text mb-5 relative z-10 select-none">
        <span className="w-2.5 h-2.5 rounded-full bg-pink animate-pulse shadow-[0_0_10px_var(--pink)]" />
        <span>Cloud software for stroke care</span>
      </div>

      {/* H1 Title - Matches 'What Cerebrocure Offers' heading size */}
      <h1 className="font-display font-extrabold text-[clamp(1.6rem,3.2vw,2.5rem)] text-text tracking-tight mb-3.5 relative z-10">
        Cerebrocure
      </h1>

      {/* Tagline - Resized body text accordingly */}
      <p className="text-muted text-[0.84rem] sm:text-[0.92rem] lg:text-[1rem] leading-relaxed max-w-[48ch] mx-auto relative z-10">
        An AI-powered cloud software to assist neurologists make rapid and informed decisions for better patient outcomes in stroke.
      </p>
    </div>
  </section>
);
