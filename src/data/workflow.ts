import { WorkflowStep } from '../types/content';

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Input',
    description: 'Clinical imaging data.',
    chips: ['Imaging data'],
    art: 'input',
  },
  {
    step: 2,
    title: 'AI processing',
    description: 'The model reads every data type together, in the cloud.',
    art: 'network',
  },
  {
    step: 3,
    title: 'Output',
    description: 'Diagnostics and treatment recommendations.',
    art: 'output',
  },
];
