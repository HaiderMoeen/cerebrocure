import { BillingPlan } from '../types/content';

export const BILLING_PLANS: Record<string, BillingPlan> = {
  lic: {
    key: 'lic',
    tabLabel: 'Annual license fee',
    heading: 'Annual license fee',
    description: 'One yearly fee for your hospital or network.',
    art: 'orbit',
  },
  ppp: {
    key: 'ppp',
    tabLabel: 'Pay per patient',
    heading: 'Pay per patient',
    description: 'Pay for the patients you run through Cerebrocure.',
    art: 'people',
  },
};
