import type { Metadata } from 'next';
import ProductPage from '@/components/ProductPage';
import { RadarMockup } from '@/components/Mockups';

export const metadata: Metadata = {
  title: 'Cohort Radar',
  description:
    'Cohort Radar gives school leaders live readiness dashboards, cohort benchmarking, and early warning systems that surface struggling students weeks before the exam.',
};

export default function CohortRadarPage() {
  return (
    <ProductPage
      slug="cohort-radar"
      eyebrow="Product — For schools"
      title="See students fall behind, before results do."
      subtitle="Cohort Radar gives school leaders a live readiness dashboard, not a post-mortem report. See which students are falling behind the mastery curve weeks before it shows up in results — and intervene while it still matters."
      visual={<RadarMockup />}
      capabilitiesHeading="From end-of-term reports to live intervention."
      capabilities={[
        {
          icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          ),
          title: 'Early warning system',
          description:
            'Students drifting below the mastery curve are flagged automatically, weeks before the exam — while there is still time to change the outcome.',
        },
        {
          icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10"></line>
              <line x1="12" y1="20" x2="12" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="14"></line>
            </svg>
          ),
          title: 'Cohort benchmarking',
          description:
            'Benchmark classes, streams, and year groups against historical cohorts in real time, and see exactly where your school stands before results are published.',
        },
        {
          icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          ),
          title: 'Intervention tracking',
          description:
            'When you act, the radar responds. Watch readiness recover at student and cohort level, so you know which interventions are actually working.',
        },
      ]}
      steps={[
        {
          title: 'Onboard your cohorts',
          description: 'Bring in your classes and exam calendars. Each student gets a live readiness profile from day one.',
        },
        {
          title: 'Watch the radar',
          description: 'The dashboard benchmarks every cohort continuously and flags students slipping behind the mastery curve.',
        },
        {
          title: 'Intervene early',
          description: 'Direct teaching effort precisely where it changes outcomes, and track readiness as it recovers.',
        },
      ]}
      ctaHeading={<>Proactive intervention, not <em>post-mortem</em> reporting.</>}
      ctaSubtext="Join the waitlist to give your school a live view of exam readiness across every cohort."
    />
  );
}
