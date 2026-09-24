import React from 'react';
import { MediaItem } from '../../types/content';
import { REGIONS } from '../../data/regions';
import { MediaGlyph } from '../icons/MediaGlyphs';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface MediaFeaturePanelProps {
  item: MediaItem;
  currentIndex: number;
  totalCount: number;
  onPrev: () => void;
  onNext: () => void;
}

export const MediaFeaturePanel: React.FC<MediaFeaturePanelProps> = ({
  item,
  currentIndex,
  totalCount,
  onPrev,
  onNext,
}) => {
  const regionObj = REGIONS[item.region];
  const regionColor = regionObj ? regionObj.color : 'var(--pink)';

  return (
    <div className="m-stage w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-6" aria-live="polite">
      <div
        key={item.id}
        className="feat rounded-3xl sm:rounded-4xl p-6 sm:p-10 bg-gradient-to-br from-[#181f50] via-[#12173f] to-[#0d1130] border border-pink/40 shadow-[0_15px_45px_rgba(238,79,127,0.18)] relative overflow-hidden grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-8 lg:gap-12 items-center animate-swap-media"
      >
        {/* Radial Corner Glow matching home page */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(80%_120%_at_100%_0,var(--glow),transparent_60%)] pointer-events-none" />

        {/* Left Art Tile / Milestone Image - Centered for equal margins from left border & text */}
        <div className="relative z-10 flex items-center justify-center max-h-[320px] sm:max-h-[360px] lg:max-h-[400px] max-w-full justify-self-center lg:justify-self-center">
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              style={item.imageScale ? { transform: `scale(${item.imageScale})` } : undefined}
              className={`max-h-[320px] sm:max-h-[360px] lg:max-h-[400px] max-w-full w-auto h-auto object-contain rounded-2xl sm:rounded-3xl shadow-xl border border-white/30 select-none transition-transform duration-300 ${
                item.id === 8 || item.id === 9 ? 'bg-white p-3.5 sm:p-5' : ''
              }`}
            />
          ) : (
            <div
              className="w-full min-h-[240px] p-6 flex items-center justify-center relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/30"
              style={{
                background: `linear-gradient(140deg, color-mix(in srgb, ${regionColor} 42%, var(--bg2)), var(--bg2))`,
              }}
            >
              {/* Subtle Dot Pattern */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(var(--text) 1px, transparent 1px)',
                  backgroundSize: '16px 16px',
                }}
              />

              {/* Centered Category Glyph */}
              <div className="relative z-10 p-6 rounded-2xl bg-bg2/50 backdrop-blur-md border border-line/40 shadow-lg">
                <MediaGlyph glyph={item.glyph} size={64} color="var(--text)" />
              </div>

              {/* Year Numeral Bottom-Left */}
              <span className="absolute bottom-4 left-6 font-display font-extrabold text-5xl sm:text-6xl text-text/30 tracking-tighter">
                {item.year}
              </span>
            </div>
          )}
        </div>

        {/* Right Details Column */}
        <div className="relative z-10 flex flex-col justify-between h-full">
          <div>
            {/* Tag Badge & Kicker */}
            <div className="flex items-center gap-3 mb-3.5">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold text-[#0A1033] bg-pink shadow-[0_2px_10px_rgba(238,79,127,0.35)] select-none">
                {item.tag}
              </span>
              <span className="text-xs font-medium text-muted uppercase tracking-wider">
                {regionObj?.name} · {item.year}
              </span>
            </div>

            {/* Title H2 - Matches Founder Page heading (Dr. Saira title size) */}
            <h2 className="font-display font-extrabold text-lg sm:text-xl lg:text-2xl text-text mb-3.5 tracking-tight">
              {item.title.includes('®')
                ? item.title.split('®').map((part, idx, arr) => (
                    <React.Fragment key={idx}>
                      {part}
                      {idx < arr.length - 1 && <sup className="text-[0.65em] align-super">®</sup>}
                    </React.Fragment>
                  ))
                : item.title}
            </h2>

            {/* Description - Matches Founder Page body text size */}
            <p className="text-muted text-[0.78rem] sm:text-[0.84rem] lg:text-[0.9rem] leading-relaxed mb-6">
              {item.description}
            </p>
          </div>

          {/* Actions & Pagination Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-line/60">
            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-pink hover:text-soft transition-colors"
              >
                <span>View the post</span>
                <ExternalLink size={16} />
              </a>
            ) : (
              <span className="text-xs text-muted/60 italic">Official milestone</span>
            )}

            <div className="flex items-center gap-4">
              <span className="text-xs text-muted font-medium">
                {currentIndex + 1} of {totalCount}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous milestone"
                  onClick={onPrev}
                  className="w-11 h-11 rounded-full border border-line flex items-center justify-center text-text hover:border-pink hover:bg-bg2 transition-colors cursor-pointer focus-visible:outline-none"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  aria-label="Next milestone"
                  onClick={onNext}
                  className="w-11 h-11 rounded-full border border-line flex items-center justify-center text-text hover:border-pink hover:bg-bg2 transition-colors cursor-pointer focus-visible:outline-none"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
