import React from 'react';
import { MediaItem } from '../../types/content';
import { REGIONS } from '../../data/regions';
import { MediaGlyph } from '../icons/MediaGlyphs';

interface MediaCardProps {
  item: MediaItem;
  isSelected: boolean;
  onSelect: () => void;
}

export const MediaCard: React.FC<MediaCardProps> = ({ item, isSelected, onSelect }) => {
  const regionObj = REGIONS[item.region];
  const regionColor = regionObj ? regionObj.color : 'var(--pink)';

  return (
    <button
      type="button"
      aria-current={isSelected ? 'true' : undefined}
      onClick={onSelect}
      className={`mcard shrink-0 w-[232px] min-h-[104px] p-2.5 rounded-[22px] bg-gradient-to-br from-[#181f50] via-[#12173f] to-[#0d1130] text-left transition-all duration-300 cursor-pointer flex items-center gap-3 select-none focus-visible:outline-none ${
        isSelected
          ? 'border-2 border-pink shadow-[0_10px_30px_rgba(238,79,127,0.4)] scale-[1.02]'
          : 'border border-pink/40 shadow-[0_8px_25px_rgba(238,79,127,0.14)] hover:border-pink hover:shadow-[0_12px_35px_rgba(238,79,127,0.3)] hover:-translate-y-1'
      }`}
    >
      {/* Small Art Thumbnail / Milestone Image */}
      <div className="shrink-0 w-[78px] h-[84px] rounded-2xl flex items-center justify-center border border-pink/30 relative overflow-hidden bg-[#0d1130] p-1">
        {item.image ? (
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl bg-bg/50">
            <img
              src={item.image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover blur-md opacity-30 pointer-events-none"
            />
            <img
              src={item.image}
              alt={item.title}
              className="relative z-10 max-w-full max-h-full w-auto h-auto object-contain rounded-lg select-none"
            />
          </div>
        ) : (
          <div
            className="w-full h-full rounded-xl flex items-center justify-center"
            style={{
              background: `linear-gradient(140deg, color-mix(in srgb, ${regionColor} 42%, var(--bg2)), var(--bg2))`,
            }}
          >
            <MediaGlyph glyph={item.glyph} size={32} color="var(--text)" />
          </div>
        )}
      </div>

      {/* Text Info */}
      <div className="flex flex-col justify-between py-1 overflow-hidden">
        <span className="text-[0.72rem] font-semibold text-muted uppercase tracking-wider mb-1">
          {item.year} · {item.tag}
        </span>
        <h3 className="font-display font-bold text-xs sm:text-sm text-text line-clamp-3 leading-snug">
          {item.title}
        </h3>
      </div>
    </button>
  );
};
