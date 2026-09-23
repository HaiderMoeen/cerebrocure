import React from 'react';
import { StatCounters } from './StatCounters';

export const MediaHeader: React.FC = () => (
  <header className="m-top relative w-full pt-24 pb-8 px-4 sm:px-6 lg:px-10 max-w-[1280px] mx-auto">
    {/* Ambient Top-Right Radial Glow */}
    <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[radial-gradient(50%_40%_at_80%_20%,var(--glow),transparent_70%)] pointer-events-none" />

    <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 items-end relative z-10">
      <div>
        <h1 className="font-display font-bold text-[clamp(2rem,4.6vw,3.8rem)] leading-[1.05] text-text tracking-tight mb-4">
          Recognition for AI in stroke care
        </h1>
      </div>

      <div>
        <StatCounters />
      </div>
    </div>
  </header>
);
