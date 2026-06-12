import type { Metadata } from 'next';
import ProductPage from '@/components/ProductPage';
import { ApiMockup } from '@/components/Mockups';

export const metadata: Metadata = {
  title: 'Intelligence API',
  description:
    'The ScholarGrid Intelligence API embeds predictive mastery indexing and outcome forecasting directly into your EdTech product through a pluggable, API-first integration.',
};

export default function IntelligenceApiPage() {
  return (
    <ProductPage
      slug="intelligence-api"
      eyebrow="Product — For the EdTech ecosystem"
      title="The predictive engine under your product."
      subtitle="ScholarGrid is built as an API-first intelligence layer — the invisible engine powering the EdTech ecosystem. Embed mastery indexing and outcome forecasting directly into your own applications with a pluggable integration."
      visual={<ApiMockup />}
      capabilitiesHeading="Intelligence-as-a-Service, by design."
      capabilities={[
        {
          icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="20" x2="12" y2="10"></line>
              <line x1="18" y1="20" x2="18" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="16"></line>
            </svg>
          ),
          title: 'Mastery indexing',
          description:
            'Send learning events, get back topic-level mastery indexes for every learner — built on the same models that power Mastery Copilot.',
        },
        {
          icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
          ),
          title: 'Outcome forecasting',
          description:
            'Serve your users live pass probabilities and readiness forecasts calibrated against decades of standardized exam data.',
        },
        {
          icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
          ),
          title: 'Drop-in integration',
          description:
            'A clean, pluggable REST interface that fits your existing product. Keep your interface; we supply the intelligence underneath it.',
        },
      ]}
      steps={[
        {
          title: 'Get your keys',
          description: 'Join the waitlist for early API access and receive credentials for the sandbox environment.',
        },
        {
          title: 'Send learning events',
          description: 'Stream your users’ interactions to the API and let the models build topic-level mastery profiles.',
        },
        {
          title: 'Serve predictions',
          description: 'Query pass probabilities, mastery indexes, and focus topics, and render them natively in your own product.',
        },
      ]}
      ctaHeading={<>Ship prediction, <em>without</em> building the models.</>}
      ctaSubtext="Join the waitlist for early access to the Intelligence API and power your product with outcome forecasting from day one."
    />
  );
}
