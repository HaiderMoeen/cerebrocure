import React from 'react';

interface FilterPillProps {
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}

export const FilterPill: React.FC<FilterPillProps> = ({ label, count, isActive, onClick }) => (
  <button
    type="button"
    aria-pressed={isActive}
    onClick={onClick}
    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer border select-none focus-visible:outline-none ${
      isActive
        ? 'bg-gradient-to-br from-[#181f50] via-[#12173f] to-[#0d1130] text-pink border-2 border-pink shadow-[0_0_18px_rgba(238,79,127,0.4)] scale-[1.02]'
        : 'bg-gradient-to-br from-[#181f50] via-[#12173f] to-[#0d1130] text-muted border-line hover:text-text hover:border-pink/50'
    }`}
  >
    <span>{label}</span>
    <em className={`not-italic text-[0.7rem] px-2 py-0.5 rounded-full font-extrabold ${isActive ? 'bg-pink/15 text-pink border border-pink/30' : 'bg-bg text-muted border border-line/60'}`}>
      {count}
    </em>
  </button>
);
