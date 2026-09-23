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
      className={`mcard shrink-0 w-[232px] min-h-[104px] p-3 rounded-[22px] text-left transition-all duration-300 cursor-pointer flex items-center gap-3 select-none focus-visible:outline-none ${
        isSelected
          ? 'bg-slate-200/35 backdrop-blur-md border-2 border-pink shadow-[0_10px_30px_rgba(238,79,127,0.4)] scale-[1.02]'
          : 'bg-slate-300/25 backdrop-blur-md border border-white/25 shadow-md hover:border-pink hover:bg-slate-200/35 hover:shadow-[0_12px_35px_rgba(238,79,127,0.3)] hover:-translate-y-1'
      }`}
    >
      {/* Dynamic Image Box matching photo dimensions */}
      <div className="shrink-0 flex items-center justify-center max-w-[76px] max-h-[76px]">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="max-w-[76px] max-h-[76px] w-auto h-auto object-contain rounded-xl shadow-md border border-white/25 select-none"
          />
        ) : (
          <div
            className="w-[68px] h-[68px] rounded-xl flex items-center justify-center border border-white/25"
            style={{
              background: `linear-gradient(140deg, color-mix(in srgb, ${regionColor} 42%, var(--bg2)), var(--bg2))`,
            }}
          >
            <MediaGlyph glyph={item.glyph} size={30} color="var(--text)" />
          </div>
        )}
      </div>

      {/* Text Info */}
      <div className="flex flex-col justify-between py-0.5 overflow-hidden">
        <span className="text-[0.72rem] font-semibold text-pink/90 uppercase tracking-wider mb-1">
          {item.year} · {item.tag}
        </span>
        <h3 className="font-display font-bold text-xs sm:text-sm text-text line-clamp-3 leading-snug">
          {item.title.includes('®')
            ? item.title.split('®').map((part, idx, arr) => (
                <React.Fragment key={idx}>
                  {part}
                  {idx < arr.length - 1 && <sup className="text-[0.65em] align-super">®</sup>}
                </React.Fragment>
              ))
            : item.title}
        </h3>
      </div>
    </button>
  );
};
