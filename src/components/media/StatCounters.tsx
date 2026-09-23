import React from 'react';
import { MEDIA_ITEMS } from '../../data/mediaItems';
import { REGIONS } from '../../data/regions';

export const StatCounters: React.FC = () => {
  const milestoneCount = MEDIA_ITEMS.length;
  const regionCount = Object.keys(REGIONS).length;

  return (
    <dl className="m-stats flex items-center justify-start lg:justify-end gap-10 sm:gap-14">
      <div className="flex flex-col-reverse items-start lg:items-end">
        <dt className="text-xs sm:text-sm text-muted font-medium uppercase tracking-wider mt-1">
          Milestones
        </dt>
        <dd className="font-display font-bold text-[clamp(2.2rem,4.5vw,3.6rem)] text-text leading-none tracking-tight">
          {milestoneCount}
        </dd>
      </div>

      <div className="w-[1px] h-12 bg-line/60" />

      <div className="flex flex-col-reverse items-start lg:items-end">
        <dt className="text-xs sm:text-sm text-muted font-medium uppercase tracking-wider mt-1">
          Regions
        </dt>
        <dd className="font-display font-bold text-[clamp(2.2rem,4.5vw,3.6rem)] text-text leading-none tracking-tight">
          {regionCount}
        </dd>
      </div>
    </dl>
  );
};
