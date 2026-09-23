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

        {/* Left Art Tile / Milestone Image */}
        <div className="art-tile relative z-10 w-full h-[280px] sm:h-[340px] lg:h-[360px] rounded-3xl overflow-hidden border border-pink/30 select-none bg-gradient-to-br from-[#101438] via-[#0d102e] to-[#161c47] p-2.5 sm:p-3.5 flex items-center justify-center">
          {item.image ? (
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl bg-bg/40 backdrop-blur-sm">
              {/* Ambient Blurred Backdrop for Aspect Ratio Fill */}
              <img
                src={item.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover scale-125 blur-xl opacity-35 pointer-events-none"
              />
              {/* Full-View Foreground Image preserving natural shape */}
              <img
                src={item.image}
                alt={item.title}
                className="relative z-10 max-w-full max-h-full w-auto h-auto object-contain rounded-xl shadow-lg select-none"
              />
            </div>
          ) : (
            <div
              className="w-full h-full p-6 flex items-center justify-center relative rounded-2xl overflow-hidden"
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
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold text-[#0A1033] bg-pink shadow-[0_2px_10px_rgba(238,79,127,0.35)] select-none">
                {item.tag}
              </span>
              <span className="text-xs font-medium text-muted uppercase tracking-wider">
                {regionObj?.name} · {item.year}
              </span>
            </div>

            {/* Title H2 */}
            <h2 className="font-display font-bold text-[clamp(1.5rem,2.9vw,2.4rem)] leading-[1.08] text-text mb-4 tracking-tight">
              {item.title}
            </h2>

            {/* Description */}
            <p className="text-muted text-sm sm:text-base leading-relaxed mb-6">
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
