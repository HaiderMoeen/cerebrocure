import React from 'react';
import { WORKFLOW_STEPS } from '../../data/workflow';
import { WorkflowStepCard } from './WorkflowStepCard';
import { RevealPanel } from '../ui/RevealPanel';

export const WorkflowCard: React.FC = () => (
  <RevealPanel id="wf" className="box rounded-3xl sm:rounded-4xl p-6 sm:p-9 bg-gradient-to-br from-[#181f50] via-[#12173f] to-[#0d1130] border border-pink/40 shadow-[0_15px_45px_rgba(238,79,127,0.18)] flex flex-col justify-between relative overflow-hidden h-full">
    {/* Radial Corner Glow matching home page */}
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(80%_120%_at_100%_0,var(--glow),transparent_60%)] pointer-events-none" />

    <div className="relative z-10 w-full flex flex-col justify-between h-full">
      {/* Left-Aligned Workflow Heading */}
      <h2 className="dim font-display font-bold text-[clamp(1.6rem,3.2vw,2.5rem)] text-text mb-6 sm:mb-8 tracking-tight text-left">
        Workflow
      </h2>

      {/* Centered Equal-Sized Step Boxes Grid in middle of workflow component */}
      <div className="my-auto w-full max-w-[980px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 justify-center items-stretch justify-items-stretch">
        {WORKFLOW_STEPS.map((step, index) => (
          <WorkflowStepCard
            key={step.step}
            step={step}
            isLast={index === WORKFLOW_STEPS.length - 1}
          />
        ))}
      </div>
    </div>
  </RevealPanel>
);
