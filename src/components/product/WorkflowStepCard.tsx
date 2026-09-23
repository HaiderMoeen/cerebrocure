import React from 'react';
import { WorkflowStep } from '../../types/content';
import { WorkflowInputArt, WorkflowNetworkArt, WorkflowOutputArt } from '../icons/WorkflowArt';

interface WorkflowStepCardProps {
  step: WorkflowStep;
  isLast?: boolean;
}

export const WorkflowStepCard: React.FC<WorkflowStepCardProps> = ({ step, isLast }) => {
  const renderArt = () => {
    switch (step.art) {
      case 'input':
        return <WorkflowInputArt />;
      case 'network':
        return <WorkflowNetworkArt />;
      case 'output':
        return <WorkflowOutputArt />;
      default:
        return null;
    }
  };

  return (
    <div className="relative h-full w-full flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-[#0d1130]/80 border border-pink/30 shadow-md transition-all duration-300 hover:border-pink/60 hover:shadow-[0_8px_25px_rgba(238,79,127,0.2)]">
      {/* SVG Art Thumbnail Container - Equal Height & Aspect Ratio */}
      <div className="w-full aspect-[220/150] h-[135px] sm:h-[145px] mb-4 flex items-center justify-center">
        {renderArt()}
      </div>

      {/* Step Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-display font-bold text-xs uppercase tracking-wider text-pink">
              Step {step.step}
            </span>
            <span className="text-sm sm:text-base font-bold text-text">• {step.title}</span>
          </div>
          
          <p className="text-xs sm:text-sm text-muted leading-relaxed mb-3">
            {step.description}
          </p>
        </div>

        {/* Chips for Step 1 (or height placeholder for Steps 2 & 3 to guarantee equal size) */}
        {step.chips ? (
          <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
            {step.chips.map((chip) => (
              <span
                key={chip}
                className="px-3 py-1 rounded-full text-[0.72rem] font-bold bg-pink/15 text-pink border border-pink/30"
              >
                {chip}
              </span>
            ))}
          </div>
        ) : (
          <div className="h-[28px] mt-auto" />
        )}
      </div>

      {/* Connector Chevron (hidden on last step) */}
      {!isLast && (
        <div className="absolute top-[75px] -right-[18px] lg:-right-[22px] max-lg:top-[auto] max-lg:-bottom-[20px] max-lg:left-1/2 max-lg:-translate-x-1/2 z-20 w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] border-t-2 border-r-2 border-pink rotate-45 max-lg:rotate-[135deg] pointer-events-none" />
      )}
    </div>
  );
};
