"use client";

import { useState } from 'react';
import styles from './page.module.css';
import { CopilotMockup, PathwaysMockup, RadarMockup, ForesightMockup } from '@/components/Mockups';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'' | 'SUBMITTING' | 'SUCCESS' | 'ERROR'>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('SUBMITTING');
    try {
      const res = await fetch('https://formspree.io/f/xvzyogev', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('SUCCESS');
      } else {
        setStatus('ERROR');
      }
    } catch (err) {
      setStatus('ERROR');
    }
  };
  return (
    <main>
        <section className={styles.hero} id="waitlist">
          <div className={styles.heroInner}>
            <h1 className={styles.heroTitle}>
              Detect learning gaps early, predict exam outcomes, and improve them <em className={styles.heroAccent}>before</em> exam day.
            </h1>

            {status === 'SUCCESS' ? (
              <div className={styles.successMessage}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
                You&apos;re on the list! We&apos;ll be in touch soon.
              </div>
            ) : (
              <form className={styles.waitlistForm} onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  aria-label="Email address"
                  className={styles.waitlistInput}
                  required
                  disabled={status === 'SUBMITTING'}
                />
                <button type="submit" className={styles.ctaButton} disabled={status === 'SUBMITTING'}>
                  {status === 'SUBMITTING' ? 'Joining…' : 'Join the waitlist'}
                </button>
              </form>
            )}
            {status === 'ERROR' && (
              <p className={styles.errorMessage}>Oops! Something went wrong. Please try again.</p>
            )}
            <div className={styles.examContainer}>
              <div className={styles.examRow}>
                <span className={styles.examLabel}>
                  <span className={styles.liveIndicator}></span> Live Now
                </span>
                <span className={`${styles.examChip} ${styles.examChipActive}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--signal-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  UTME
                </span>
              </div>
              <div className={styles.examRow}>
                <span className={styles.examLabel}>Coming soon</span>
                <div className={styles.examGroup}>
                  <span className={styles.examGroupLabel}>Global:</span>
                  <span className={styles.examChip}>SAT</span>
                  <span className={styles.examChip}>IGCSE</span>
                </div>
                <div className={styles.examGroup}>
                  <span className={styles.examGroupLabel}>Regional:</span>
                  <span className={styles.examChip}>WAEC</span>
                  <span className={styles.examChip}>NECO</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.sectionLight}>
          <section className={styles.intro}>
            <span className={styles.overline}>The platform</span>
            <p className={styles.introText}>
              ScholarGrid connects historical exam performance data with <em>real-time</em> student learning signals to generate readiness scores, outcome ranges, mastery insights, adaptive study paths, and cohort-level forecasts.
            </p>
          </section>

          <section className={styles.routingSection}>
            <span className={styles.overline}>Who it&apos;s for</span>
            <h3 className={styles.routingHeader}>Find your entry point.</h3>
            <div className={styles.routingGrid}>
              <div className={styles.routingCard}>
                <span className={styles.routingIconWrap}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </span>
                <div className={styles.routingCardHeader}>
                  <h4>Students</h4>
                </div>
                <div className={styles.routingCardHook}>Move from static studying to dynamic mastery.</div>
                <p>We map your performance against decades of historical patterns to provide a precise readiness score and a personalized pathway to actively improve it.</p>
              </div>
              <div className={styles.routingCard}>
                <span className={styles.routingIconWrap}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"></path><path d="M9 8h1"></path><path d="M9 12h1"></path><path d="M9 16h1"></path><path d="M14 8h1"></path><path d="M14 12h1"></path><path d="M14 16h1"></path><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path></svg>
                </span>
                <div className={styles.routingCardHeader}>
                  <h4>Schools</h4>
                </div>
                <div className={styles.routingCardHook}>Transition from post-mortem reporting to proactive intervention.</div>
                <p>Access live cohort benchmarking and early warning dashboards to catch students falling behind the mastery curve weeks before the exam.</p>
              </div>
              <div className={styles.routingCard}>
                <span className={styles.routingIconWrap}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                </span>
                <div className={styles.routingCardHeader}>
                  <h4>Governments</h4>
                </div>
                <div className={styles.routingCardHook}>Don&apos;t wait for a crisis to fix curriculum gaps.</div>
                <p>Model national pass rates and educational attainment years in advance to drive precise, data-backed policy and resource allocation.</p>
              </div>
              <div className={styles.routingCard}>
                <span className={styles.routingIconWrap}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                </span>
                <div className={styles.routingCardHeader}>
                  <h4>EdTech Ecosystem</h4>
                </div>
                <div className={styles.routingCardHook}>Power your applications with our Intelligence API.</div>
                <p>Seamlessly integrate our pluggable predictive engine to offer your own users unprecedented mastery indexing and outcome forecasting.</p>
              </div>
            </div>
          </section>

        <section className={styles.features}>
          <div className={styles.featureSection} id="copilot">
            <div className={styles.featureContent}>
              <span className={styles.featureEyebrow}>01 — For students</span>
              <h2 className={styles.featureTitle}>Mastery Copilot.</h2>
              <p className={styles.featureDescription}>
                Your student&apos;s score, today. Mastery Copilot runs continuously against millions of historical exam patterns to show a student their precise readiness score, not a progress bar, an actual probability.
              </p>
            </div>
            <div className={styles.featureVisual}>
              <CopilotMockup />
            </div>
          </div>

          <div className={styles.featureSection} id="pathways">
            <div className={styles.featureContent}>
              <span className={styles.featureEyebrow}>02 — For students</span>
              <h2 className={styles.featureTitle}>Adaptive Pathways.</h2>
              <p className={styles.featureDescription}>
                No more studying everything. The pathway drops topics a student has already mastered and doubles down on the ones with the highest probability of improving their final score.
              </p>
            </div>
            <div className={styles.featureVisual}>
              <PathwaysMockup />
            </div>
          </div>

          <div className={styles.featureSection} id="radar">
            <div className={styles.featureContent}>
              <span className={styles.featureEyebrow}>03 — For schools</span>
              <h2 className={styles.featureTitle}>Cohort Radar.</h2>
              <p className={styles.featureDescription}>
                See which students are falling behind the mastery curve weeks before it shows up in results. Cohort Radar gives school leaders a live readiness dashboard, not a post-mortem report.
              </p>
            </div>
            <div className={styles.featureVisual}>
              <RadarMockup />
            </div>
          </div>

          <div className={styles.featureSection} id="terminal">
            <div className={styles.featureContent}>
              <span className={styles.featureEyebrow}>04 — For governments</span>
              <h2 className={styles.featureTitle}>Foresight Terminal.</h2>
              <p className={styles.featureDescription}>
                Governments should not find out a generation failed after the results are published. Foresight Terminal models national pass rates years ahead, so curriculum gaps get fixed before they become a crisis.
              </p>
            </div>
            <div className={styles.featureVisual}>
              <ForesightMockup />
            </div>
          </div>
        </section>
        </div>

        <section className={styles.trust} id="api">
          <span className={styles.overline}>Foundation</span>
          <h2 className={styles.trustHeader}>A foundation built for the future.</h2>
          <div className={styles.trustGrid}>
            <div className={styles.trustCard}>
              <span className={styles.trustIconWrap}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.trustIcon}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </span>
              <h3 className={styles.trustItemTitle}>Ethical Data Sovereignty.</h3>
              <p className={styles.trustItemDescription}>
                We use intelligence to unlock potential, not build digital gatekeepers. Our models adhere to a strict, global standard for transparent, ethical data sovereignty.
              </p>
            </div>
            <div className={styles.trustCard}>
              <span className={styles.trustIconWrap}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.trustIcon}>
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </span>
              <h3 className={styles.trustItemTitle}>Pluggable Infrastructure.</h3>
              <p className={styles.trustItemDescription}>
                Built as an API-first intelligence layer, ScholarGrid is designed to be the invisible engine powering the entire EdTech ecosystem. Seamlessly embed our predictive pipelines directly into your existing interfaces.
              </p>
            </div>
            <div className={styles.trustCard}>
              <span className={styles.trustIconWrap}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.trustIcon}>
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </span>
              <h3 className={styles.trustItemTitle}>Institutional Control.</h3>
              <p className={styles.trustItemDescription}>
                We deploy alongside national examination bodies and ministries of education. Our architecture secures official data pipelines while delivering the high-level policy foresight that institutions currently lack.
              </p>
            </div>
          </div>
        </section>

        <div className={styles.sectionLight}>
          <section className={styles.faq}>
          <span className={styles.overline}>Answers</span>
          <h2 className={styles.faqHeader}>Frequently asked questions</h2>

          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>What is ScholarGrid?</summary>
            <p className={styles.faqAnswer}>
              ScholarGrid is a predictive education intelligence platform that connects historical exam performance data with <em>real-time</em> student learning signals to generate readiness scores, outcome ranges, mastery insights, adaptive study paths, and cohort-level forecasts.
            </p>
          </details>

          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>How is this different from traditional test prep?</summary>
            <p className={styles.faqAnswer}>
              Traditional test prep platforms are static. They treat every student the same and offer zero insight into the actual probability of passing. ScholarGrid maps live student interactions against millions of historical data points to identify precise signals of mastery. We don&apos;t just provide practice questions; we dynamically calibrate a unique pathway to guarantee improvement.
            </p>
          </details>

          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>Who is ScholarGrid built for?</summary>
            <p className={styles.faqAnswer}>
              It is built for the entire educational lifecycle. For students, it provides mastery indexing and probability reports. For schools, cohort readiness dashboards and early warning systems. For governments, policy intelligence and curriculum gap analysis. For the EdTech ecosystem, it acts as an Intelligence-as-a-Service API.
            </p>
          </details>
        </section>
        </div>
      </main>
  );
}
