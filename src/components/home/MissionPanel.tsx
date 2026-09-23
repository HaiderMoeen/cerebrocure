import React from 'react';
import { RevealPanel } from '../ui/RevealPanel';

export const MissionPanel: React.FC = () => (
  <section className="relative z-10 w-full -mt-[14vh] lg:-mt-[17vh] px-4 sm:px-6 lg:px-10">
    <RevealPanel className="max-w-[1000px] mx-auto min-h-[340px] rounded-4xl p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-surface2 to-surface border border-line shadow-mission-glow flex flex-col justify-center">
      {/* Eyebrow Heading */}
      <h2 className="flex items-center gap-3 text-pink text-sm sm:text-base font-semibold tracking-wider uppercase mb-6">
        <span className="w-9 h-[2px] bg-pink inline-block rounded-full" />
        Our Mission
      </h2>

      {/* Mission Statement Paragraph with reveal blur */}
      <p className="dim font-display text-[clamp(1.25rem,2.6vw,1.9rem)] font-normal italic leading-[1.35] text-text max-w-[30ch]">
        To equip clinicians with AI technology as a decision-making tool for better patient outcomes in stroke.
      </p>
    </RevealPanel>
  </section>
);
