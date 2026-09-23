import React from 'react';
import { RegionKey } from '../../types/content';
import { REGIONS } from '../../data/regions';
import { MEDIA_ITEMS } from '../../data/mediaItems';
import { FilterPill } from '../ui/FilterPill';

interface RegionFilterBarProps {
  selectedRegion: RegionKey | 'all';
  onSelectRegion: (region: RegionKey | 'all') => void;
}

export const RegionFilterBar: React.FC<RegionFilterBarProps> = ({
  selectedRegion,
  onSelectRegion,
}) => {
  const getCount = (regionKey: RegionKey | 'all') => {
    if (regionKey === 'all') return MEDIA_ITEMS.length;
    return MEDIA_ITEMS.filter((i) => i.region === regionKey).length;
  };

  const regionKeys: (RegionKey | 'all')[] = ['all', 'global', 'europe', 'mideast', 'pk', 'apac'];

  return (
    <div
      role="group"
      aria-label="Filter by region"
      className="flex flex-wrap items-center gap-2 mb-6"
    >
      {regionKeys.map((key) => {
        const label = key === 'all' ? 'All regions' : REGIONS[key]?.name || key;
        const count = getCount(key);
        return (
          <FilterPill
            key={key}
            label={label}
            count={count}
            isActive={selectedRegion === key}
            onClick={() => onSelectRegion(key)}
          />
        );
      })}
    </div>
  );
};
