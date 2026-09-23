import React, { useState, useEffect } from 'react';
import { MediaHeader } from '../components/media/MediaHeader';
import { MediaFeaturePanel } from '../components/media/MediaFeaturePanel';
import { RegionFilterBar } from '../components/media/RegionFilterBar';
import { MediaCardRail } from '../components/media/MediaCardRail';
import { MEDIA_ITEMS } from '../data/mediaItems';
import { RegionKey } from '../types/content';

export const MediaPage: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<RegionKey | 'all'>('all');
  const [selectedId, setSelectedId] = useState<number>(MEDIA_ITEMS[0].id);
  const featurePanelRef = React.useRef<HTMLDivElement>(null);

  // Filtered dataset
  const filteredItems = MEDIA_ITEMS.filter((item) => {
    if (selectedRegion === 'all') return true;
    return item.region === selectedRegion;
  });

  // Ensure selectedId is valid within current filter
  useEffect(() => {
    if (!filteredItems.some((i) => i.id === selectedId) && filteredItems.length > 0) {
      setSelectedId(filteredItems[0].id);
    }
  }, [selectedRegion, filteredItems, selectedId]);

  const currentItem = filteredItems.find((i) => i.id === selectedId) || filteredItems[0] || MEDIA_ITEMS[0];
  const currentIndex = filteredItems.findIndex((i) => i.id === currentItem.id);

  const handlePrev = () => {
    if (filteredItems.length === 0) return;
    const prevIdx = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedId(filteredItems[prevIdx].id);
  };

  const handleNext = () => {
    if (filteredItems.length === 0) return;
    const nextIdx = (currentIndex + 1) % filteredItems.length;
    setSelectedId(filteredItems[nextIdx].id);
  };

  const handleSelectCard = (id: number) => {
    setSelectedId(id);
    if (featurePanelRef.current) {
      featurePanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Keyboard Left / Right arrow stepping
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside an input/textarea
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className="w-full flex flex-col items-center min-h-[100svh] animate-fade-in">
      <MediaHeader />
      
      <div ref={featurePanelRef} className="w-full scroll-mt-24">
        <MediaFeaturePanel
          item={currentItem}
          currentIndex={currentIndex >= 0 ? currentIndex : 0}
          totalCount={filteredItems.length}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </div>

      <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 mt-6 mb-12 animate-fade-in-delay-1">
        <RegionFilterBar
          selectedRegion={selectedRegion}
          onSelectRegion={setSelectedRegion}
        />
        <MediaCardRail
          items={filteredItems}
          selectedId={currentItem.id}
          onSelectCard={handleSelectCard}
        />
      </section>
    </div>
  );
};
