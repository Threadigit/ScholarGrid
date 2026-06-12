import type { Metadata } from 'next';
import ProductPage from '@/components/ProductPage';
import { CopilotMockup } from '@/components/Mockups';

export const metadata: Metadata = {
  title: 'Mastery Copilot',
  description:
    'Mastery Copilot gives students a precise, real-time readiness score calibrated against millions of historical exam patterns, plus an adaptive pathway to improve it.',
};

export default function MasteryCopilotPage() {
  return (
    <ProductPage
      slug="mastery-copilot"
      eyebrow="Product — For students"
      title="Your exam score, before the exam."
      subtitle="Mastery Copilot runs your performance against millions of historical exam patterns and tells you your actual probability of passing — not a progress bar. Then it shows you exactly what to study next to raise it."
      visual={<CopilotMockup />}
      capabilitiesHeading="Built to turn studying into a strategy."
      capabilities={[
        {
          icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="6"></circle>
              <circle cx="12" cy="12" r="2"></circle>
            </svg>
          ),
          title: 'Readiness scoring',
          description:
            'A live pass probability calibrated against decades of standardized exam data, recalculated as you learn — so you always know exactly where you stand.',
        },
        {
          icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
          ),
          title: 'Adaptive pathways',
          description:
            'Topics you have already mastered drop off your plan. The pathway doubles down on the areas with the highest probability of improving your final score.',
        },
        {
          icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20V10"></path>
              <path d="M18 20V4"></path>
              <path d="M6 20v-4"></path>
            </svg>
          ),
          title: 'Mastery signals',
          description:
            'Every interaction is a signal. The model maps your strengths and blind spots at topic level, not subject level — precision a mock exam can never give you.',
        },
      ]}
      steps={[
        {
          title: 'Choose your exam',
          description: 'Pick WAEC, NECO, UTME, or SAT and tell us when you sit. Global exam coverage is expanding continuously.',
        },
        {
          title: 'Establish your baseline',
          description: 'A short diagnostic maps your current mastery against decades of historical performance patterns.',
        },
        {
          title: 'Follow the pathway',
          description: 'Study what moves your probability most, and watch your readiness score respond in real time.',
        },
      ]}
      ctaHeading={<>Know exactly where you stand, <em>before</em> it counts.</>}
      ctaSubtext="Join the waitlist and be among the first students to study with a precise probability of success instead of a guess."
    />
  );
}
