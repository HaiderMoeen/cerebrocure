import React from 'react';
import { ProductHeroPanel } from '../components/product/ProductHeroPanel';
import { WorkflowCard } from '../components/product/WorkflowCard';
import { BillingCard } from '../components/product/BillingCard';
import { PlatformDemo } from '../components/product/PlatformDemo';

interface ProductPageProps {
  onNavigate: (hash: string) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ onNavigate }) => (
  <div className="w-full flex flex-col items-center animate-fade-in">
    <ProductHeroPanel />
    
    {/* Overlapping Product Grid: Workflow (1.85fr) + Billing (1fr) */}
    <section className="relative z-10 w-full -mt-[10vh] lg:-mt-[14vh] px-4 sm:px-6 lg:px-10 max-w-[1180px] mx-auto animate-fade-in-delay-1">
      <div className="p-grid-in grid grid-cols-1 lg:grid-cols-[1.85fr_1fr] gap-6">
        <WorkflowCard />
        <BillingCard onNavigate={onNavigate} />
      </div>
    </section>

    <div className="w-full animate-fade-in-delay-2 flex flex-col items-center">
      <PlatformDemo />
    </div>
  </div>
);
