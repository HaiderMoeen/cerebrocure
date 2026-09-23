import React from 'react';
import { RevealPanel } from '../ui/RevealPanel';
import insidePlatformImg from '../../assets/inside-the-platform.png';
import { ArrowLeft, ArrowRight, RotateCw, Star, Download, User } from 'lucide-react';

export const PlatformDemo: React.FC = () => (
  <section className="demo py-20 px-4 sm:px-6 lg:px-10 w-full flex flex-col items-center">
    {/* Section Header */}
    <div className="max-w-[1180px] mx-auto text-center mb-8 sm:mb-10">
      <h2 className="font-display font-extrabold text-[clamp(1.6rem,3.2vw,2.5rem)] text-text tracking-tight mb-2">
        Inside the platform
      </h2>
      <p className="text-muted text-xs sm:text-sm font-medium">
        A look at the Cerebrocure Stroke Prognosis screen.
      </p>
    </div>

    {/* Framed Screenshot with Pink Accent & 3D Tilt Reveal */}
    <div className="w-full max-w-[1020px]">
      <RevealPanel variant="rv-tilt" className="frame-wrap">
        {/* Laptop/Browser Frame with Pink Ambient Glow & Border */}
        <div className="rounded-[24px] sm:rounded-[32px] bg-gradient-to-br from-[#181f50] via-[#12173f] to-[#0d1130] border-2 border-pink/40 shadow-[0_15px_45px_rgba(238,79,127,0.22)] p-2 sm:p-3 overflow-hidden">
          {/* Top Browser Bar */}
          <div className="h-10 sm:h-12 px-3 sm:px-5 bg-[#0e1126] rounded-t-[18px] sm:rounded-t-[24px] flex items-center justify-between gap-3 text-[#94a3b8] mb-2 select-none border-b border-pink/20">
            {/* Navigation Controls */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 sm:gap-1.5 mr-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block" />
              </div>
              <ArrowLeft size={16} className="hidden sm:inline hover:text-white transition-colors cursor-pointer" />
              <ArrowRight size={16} className="hidden sm:inline hover:text-white transition-colors cursor-pointer" />
              <RotateCw size={14} className="hover:text-white transition-colors cursor-pointer" />
            </div>

            {/* Address Bar */}
            <div className="flex-1 max-w-[480px] h-7 sm:h-8 px-3 rounded-full bg-[#1b1f42] border border-pink/30 flex items-center justify-center text-xs sm:text-sm text-[#cbd5e1] font-mono tracking-tight gap-2 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-pink animate-pulse" />
              <span className="truncate">cerebrocure.web.app</span>
            </div>

            {/* Browser Utilities */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Star size={15} className="hidden sm:inline hover:text-pink transition-colors cursor-pointer" />
              <Download size={15} className="hidden sm:inline hover:text-pink transition-colors cursor-pointer" />
              <div className="w-6 h-6 rounded-full bg-pink/20 border border-pink/50 flex items-center justify-center text-pink">
                <User size={12} />
              </div>
            </div>
          </div>

          {/* Platform Screenshot Container */}
          <div className="relative rounded-b-[18px] sm:rounded-b-[24px] overflow-hidden bg-pink/10 border border-pink/20">
            <img
              src={insidePlatformImg}
              alt="Cerebrocure Stroke Prognosis screen showing demographics, presentation, treatment, risk factors and laboratory results"
              loading="lazy"
              width={1000}
              height={520}
              className="w-full h-auto block object-cover select-none"
            />
          </div>
        </div>
      </RevealPanel>
    </div>
  </section>
);
