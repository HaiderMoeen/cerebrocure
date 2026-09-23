import React, { useRef, useEffect } from 'react';
import { MediaItem, RegionKey } from '../../types/content';
import { REGIONS } from '../../data/regions';
import { MediaCard } from './MediaCard';

interface MediaCardRailProps {
  items: MediaItem[];
  selectedId: number;
  onSelectCard: (id: number) => void;
}

export const MediaCardRail: React.FC<MediaCardRailProps> = ({
  items,
  selectedId,
  onSelectCard,
}) => {
  const railRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const moveDistanceRef = useRef(0);

  // Group items by region
  const groupedRegions: { key: RegionKey; items: MediaItem[] }[] = [];
  const regionOrder: RegionKey[] = ['global', 'europe', 'mideast', 'pk', 'apac'];

  regionOrder.forEach((rKey) => {
    const regionItems = items.filter((i) => i.region === rKey);
    if (regionItems.length > 0) {
      groupedRegions.push({ key: rKey, items: regionItems });
    }
  });

  // Mouse wheel horizontal redirect & drag interaction
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0 && rail.scrollWidth > rail.clientWidth) {
        e.preventDefault();
        rail.scrollLeft += e.deltaY;
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      // Only drag on left click fine pointer
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      isDraggingRef.current = true;
      startXRef.current = e.clientX;
      scrollLeftRef.current = rail.scrollLeft;
      moveDistanceRef.current = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - startXRef.current;
      moveDistanceRef.current += Math.abs(dx);
      rail.scrollLeft = scrollLeftRef.current - dx;
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    rail.addEventListener('wheel', onWheel, { passive: false });
    rail.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      rail.removeEventListener('wheel', onWheel);
      rail.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  const handleCardClick = (id: number) => {
    // If user dragged more than 6px, treat as scroll drag instead of card click
    if (moveDistanceRef.current > 6) return;
    onSelectCard(id);
  };

  return (
    <div className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-4">
      {/* Horizontally Scrollable Rail */}
      <div
        ref={railRef}
        className="rail flex items-stretch gap-6 overflow-x-auto scrollbar-none py-4 cursor-grab active:cursor-grabbing select-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {groupedRegions.map((grp) => {
          const regionObj = REGIONS[grp.key];
          const regionColor = regionObj ? regionObj.color : 'var(--pink)';

          return (
            <div
              key={grp.key}
              className="grp flex items-stretch gap-3 border-l border-line/60 pl-4 py-1 shrink-0"
            >
              {/* Vertical Region Label */}
              <div
                className="writing-mode-vertical rotate-180 text-xs font-bold uppercase tracking-wider select-none shrink-0 py-1 flex items-center justify-center opacity-80"
                style={{ color: regionColor, writingMode: 'vertical-rl' }}
              >
                {regionObj?.name}
              </div>

              {/* Grouped Media Cards */}
              <div className="flex items-center gap-3 shrink-0">
                {grp.items.map((item) => (
                  <MediaCard
                    key={item.id}
                    item={item}
                    isSelected={item.id === selectedId}
                    onSelect={() => handleCardClick(item.id)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
