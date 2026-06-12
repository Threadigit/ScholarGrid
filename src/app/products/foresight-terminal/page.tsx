import type { Metadata } from 'next';
import ProductPage from '@/components/ProductPage';
import { ForesightMockup } from '@/components/Mockups';

export const metadata: Metadata = {
  title: 'Foresight Terminal',
  description:
    'Foresight Terminal models national pass rates and educational attainment years in advance, giving governments the policy intelligence to fix curriculum gaps before they become a crisis.',
};

export default function ForesightTerminalPage() {
  return (
    <ProductPage
      slug="foresight-terminal"
      eyebrow="Product — For governments"
      title="National outcomes, modeled years ahead."
      subtitle="Governments should not find out a generation failed after the results are published. Foresight Terminal models national pass rates and attainment years in advance, so ministries and examination bodies can fix curriculum gaps before they become a crisis."
      visual={<ForesightMockup />}
      capabilitiesHeading="Policy intelligence for the educational lifecycle."
      capabilities={[
        {
          icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
          ),
          title: 'Outcome forecasting',
          description:
            'Model national and regional pass rates years in advance, built on decades of standardized exam data and live mastery signals from across the system.',
        },
        {
          icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          ),
          title: 'Curriculum gap analysis',
          description:
            'Pinpoint the topics, subjects, and regions where mastery is structurally weak — and see the projected national cost of leaving each gap unaddressed.',
        },
        {
          icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1"></rect>
              <rect x="14" y="3" width="7" height="7" rx="1"></rect>
              <rect x="14" y="14" width="7" height="7" rx="1"></rect>
              <rect x="3" y="14" width="7" height="7" rx="1"></rect>
            </svg>
          ),
          title: 'Resource allocation modeling',
          description:
            'Test policy and resourcing scenarios against the model before committing budgets, and direct investment where it changes attainment most.',
        },
      ]}
      steps={[
        {
          title: 'Secure data integration',
          description: 'We deploy alongside national examination bodies and ministries, securing official data pipelines end to end.',
        },
        {
          title: 'Model the trajectory',
          description: 'The terminal projects pass rates and attainment forward, surfacing structural gaps years before they appear in results.',
        },
        {
          title: 'Act with foresight',
          description: 'Drive curriculum reform and resource allocation with precise, data-backed projections instead of post-mortem statistics.',
        },
      ]}
      ctaHeading={<>Fix the curriculum gap <em>before</em> it becomes a crisis.</>}
      ctaSubtext="Join the waitlist or speak with us about deploying Foresight Terminal alongside your examination body or ministry."
    />
  );
}
