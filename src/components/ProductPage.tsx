import Link from 'next/link';
import type { ReactNode } from 'react';
import styles from './ProductPage.module.css';
import homeStyles from '@/app/page.module.css';

export const PRODUCTS = [
  {
    slug: 'mastery-copilot',
    name: 'Mastery Copilot',
    audience: 'For students',
    tagline: 'A precise readiness score and a personalized pathway to improve it.',
  },
  {
    slug: 'cohort-radar',
    name: 'Cohort Radar',
    audience: 'For schools',
    tagline: 'Live cohort benchmarking and early warning dashboards for school leaders.',
  },
  {
    slug: 'foresight-terminal',
    name: 'Foresight Terminal',
    audience: 'For governments',
    tagline: 'National pass rates and curriculum gaps, modeled years in advance.',
  },
  {
    slug: 'intelligence-api',
    name: 'Intelligence API',
    audience: 'For EdTech',
    tagline: 'Pluggable prediction infrastructure for the EdTech ecosystem.',
  },
] as const;

export type ProductSlug = (typeof PRODUCTS)[number]['slug'];

type Capability = {
  icon: ReactNode;
  title: string;
  description: string;
};

type Step = {
  title: string;
  description: string;
};

type ProductPageProps = {
  slug: ProductSlug;
  eyebrow: string;
  title: string;
  subtitle: string;
  visual: ReactNode;
  capabilitiesHeading: string;
  capabilities: Capability[];
  steps: Step[];
  ctaHeading: ReactNode;
  ctaSubtext: string;
};

export default function ProductPage({
  slug,
  eyebrow,
  title,
  subtitle,
  visual,
  capabilitiesHeading,
  capabilities,
  steps,
  ctaHeading,
  ctaSubtext,
}: ProductPageProps) {
  const related = PRODUCTS.filter((p) => p.slug !== slug);

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <div className={styles.actions}>
          <Link href="/#waitlist" className={styles.primaryCta}>Join the waitlist</Link>
          <a href="mailto:hello@thescholargrid.com" className={styles.secondaryCta}>Talk to us</a>
        </div>
      </header>

      <div className={styles.visualWrap}>
        <div className={styles.visualPanel}>{visual}</div>
      </div>

      <section className={styles.capabilities}>
        <span className={styles.overline}>Capabilities</span>
        <h2 className={styles.sectionHeading}>{capabilitiesHeading}</h2>
        <div className={styles.capabilityGrid}>
          {capabilities.map((capability) => (
            <div key={capability.title} className={styles.capabilityCard}>
              <span className={styles.capabilityIcon}>{capability.icon}</span>
              <h3 className={styles.capabilityTitle}>{capability.title}</h3>
              <p className={styles.capabilityDescription}>{capability.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.steps}>
        <span className={styles.overline}>How it works</span>
        <div className={styles.stepGrid}>
          {steps.map((step, index) => (
            <div key={step.title} className={styles.step}>
              <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.related}>
        <span className={styles.overline}>More from ScholarGrid</span>
        <div className={styles.relatedGrid}>
          {related.map((product) => (
            <Link key={product.slug} href={`/products/${product.slug}`} className={styles.relatedCard}>
              <span className={styles.relatedAudience}>{product.audience}</span>
              <span className={styles.relatedName}>{product.name}</span>
              <span className={styles.relatedTagline}>{product.tagline}</span>
              <span className={styles.relatedArrow} aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.finalCta}>
        <h2 className={styles.finalCtaHeading}>{ctaHeading}</h2>
        <p className={styles.finalCtaSubtext}>{ctaSubtext}</p>
        <Link href="/#waitlist" className={homeStyles.ctaButton}>Join the waitlist</Link>
      </section>
    </main>
  );
}
