export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: 'clock' | 'bars' | 'circles' | 'target' | 'check';
}

export interface WorkflowStep {
  step: 1 | 2 | 3;
  title: string;
  description: string;
  chips?: string[];
  art: 'input' | 'network' | 'output';
}

export type BillingPlanKey = 'lic' | 'ppp';

export interface BillingPlan {
  key: BillingPlanKey;
  tabLabel: string;
  heading: string;
  description: string;
  art: 'orbit' | 'people';
}

export type RegionKey = 'global' | 'europe' | 'mideast' | 'pk' | 'apac';

export interface Region {
  key: RegionKey;
  name: string;
  color: string; // CSS var reference
}

export type GlyphKey = 'medal' | 'mic' | 'booth' | 'chip' | 'people' | 'cert';

export interface MediaItem {
  id: number;
  region: RegionKey;
  year: number;
  glyph: GlyphKey;
  tag: string;
  title: string;
  description: string;
  link?: string;
  image?: string;
}
