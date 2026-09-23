import { Region, RegionKey } from '../types/content';

export const REGIONS: Record<RegionKey, Region> = {
  global: {
    key: 'global',
    name: 'Global',
    color: 'var(--pink)',
  },
  europe: {
    key: 'europe',
    name: 'Europe',
    color: 'var(--pink)',
  },
  mideast: {
    key: 'mideast',
    name: 'Middle East',
    color: 'var(--pink)',
  },
  pk: {
    key: 'pk',
    name: 'Pakistan',
    color: 'var(--pink)',
  },
  apac: {
    key: 'apac',
    name: 'Asia-Pacific',
    color: 'var(--pink)',
  },
};

