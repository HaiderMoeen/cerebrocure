import React from 'react';
import { BillingPlanKey } from '../../types/content';

interface SegmentedTabsProps {
  activeTab: BillingPlanKey;
  onTabChange: (key: BillingPlanKey) => void;
}

export const SegmentedTabs: React.FC<SegmentedTabsProps> = ({ activeTab, onTabChange }) => (
  <div
    role="tablist"
    aria-label="Billing models"
    className="inline-flex items-center p-1.5 rounded-full border border-line bg-bg2/80 w-full sm:w-auto"
  >
    <button
      type="button"
      role="tab"
      id="tab-lic"
      aria-selected={activeTab === 'lic'}
      aria-controls="b-lic"
      onClick={() => onTabChange('lic')}
      className={`flex-1 sm:flex-none px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer select-none focus-visible:outline-none ${
        activeTab === 'lic'
          ? 'bg-pink text-on-accent shadow-md'
          : 'bg-transparent text-muted hover:text-text'
      }`}
    >
      Annual license fee
    </button>
    <button
      type="button"
      role="tab"
      id="tab-ppp"
      aria-selected={activeTab === 'ppp'}
      aria-controls="b-ppp"
      onClick={() => onTabChange('ppp')}
      className={`flex-1 sm:flex-none px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer select-none focus-visible:outline-none ${
        activeTab === 'ppp'
          ? 'bg-pink text-on-accent shadow-md'
          : 'bg-transparent text-muted hover:text-text'
      }`}
    >
      Pay per patient
    </button>
  </div>
);
