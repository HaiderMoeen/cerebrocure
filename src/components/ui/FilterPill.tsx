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
        ? 'bg-pink text-[#0A1033] border-pink shadow-[0_4px_16px_rgba(238,79,127,0.4)] scale-[1.03]'
        : 'bg-gradient-to-br from-[#181f50] via-[#12173f] to-[#0d1130] text-muted border-pink/30 hover:text-text hover:border-pink hover:shadow-[0_4px_12px_rgba(238,79,127,0.2)]'
    }`}
  >
    <span>{label}</span>
    <em className={`not-italic text-[0.7rem] px-2 py-0.5 rounded-full font-extrabold ${isActive ? 'bg-[#0A1033]/20 text-[#0A1033]' : 'bg-bg text-pink border border-pink/20'}`}>
      {count}
    </em>
  </button>
);
