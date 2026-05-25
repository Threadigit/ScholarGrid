"use client";

import { useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';

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
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Predict whether a student will pass before they take the exam.</h1>
          <p className={styles.heroSubtitle}>
            ScholarGrid is the intelligence layer under education. It ingests decades of standardized exam data, models individual mastery in real time, and gives students, schools, and governments a precise probability of success, not a guess. Know exactly where you stand, and exactly what to study next to change it.
          </p>
          {status === 'SUCCESS' ? (
            <div className={styles.waitlistForm} style={{ color: '#4ADE80', fontWeight: 500, padding: '0.85rem 0' }}>
              ✓ You're on the list! We'll be in touch soon.
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
                {status === 'SUBMITTING' ? 'JOINING...' : 'JOIN THE WAITLIST'}
              </button>
            </form>
          )}
          {status === 'ERROR' && (
            <p style={{ color: '#F87171', marginTop: '0.5rem', fontSize: '0.9rem' }}>Oops! Something went wrong. Please try again.</p>
          )}
          <p style={{ color: '#888', marginTop: '1.5rem', fontSize: '0.95rem', maxWidth: '540px', lineHeight: 1.6 }}>
            Currently supporting WAEC, NECO, UTME, and SAT. Global exam coverage expanding continuously.
          </p>
        </section>

        <div className={styles.sectionLight}>
          <section className={styles.intro}>
            <p>
              ScholarGrid is a predictive education intelligence platform that combines vast historical educational performance data with live student progress to deliver precise real-time success predictions, mastery insights, adaptive learning pathways, and school-level cohort forecasts.
            </p>
          </section>

          <section className={styles.routingSection}>
            <h3 className={styles.routingHeader}>Find your entry point.</h3>
            <div className={styles.routingGrid}>
              <div className={styles.routingCard}>
                <div className={styles.routingCardHeader}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  <h4>Students</h4>
                </div>
                <div className={styles.routingCardHook}>Move from static studying to dynamic mastery.</div>
                <p>We map your performance against decades of historical patterns to provide a precise readiness score and a personalized pathway to actively improve it.</p>
              </div>
              <div className={styles.routingCard}>
                <div className={styles.routingCardHeader}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"></path><path d="M9 8h1"></path><path d="M9 12h1"></path><path d="M9 16h1"></path><path d="M14 8h1"></path><path d="M14 12h1"></path><path d="M14 16h1"></path><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path></svg>
                  <h4>Schools</h4>
                </div>
                <div className={styles.routingCardHook}>Transition from post-mortem reporting to proactive intervention.</div>
                <p>Access live cohort benchmarking and early warning dashboards to catch students falling behind the mastery curve weeks before the exam.</p>
              </div>
              <div className={styles.routingCard}>
                <div className={styles.routingCardHeader}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                  <h4>Governments</h4>
                </div>
                <div className={styles.routingCardHook}>Don't wait for a crisis to fix curriculum gaps.</div>
                <p>Model national pass rates and educational attainment years in advance to drive precise, data-backed policy and resource allocation.</p>
              </div>
              <div className={styles.routingCard}>
                <div className={styles.routingCardHeader}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                  <h4>EdTech Ecosystem</h4>
                </div>
                <div className={styles.routingCardHook}>Power your applications with our Intelligence API.</div>
                <p>Seamlessly integrate our pluggable predictive engine to offer your own users unprecedented mastery indexing and outcome forecasting.</p>
              </div>
            </div>
          </section>

        <section className={styles.features}>
          <div className={styles.featureSection}>
            <div className={styles.featureContent}>
              <h2 className={styles.featureTitle}>Mastery Copilot.</h2>
              <p className={styles.featureDescription}>
                Your student's score, today. Mastery Copilot runs continuously against millions of historical exam patterns to show a student their precise readiness score, not a progress bar, an actual probability.
              </p>
            </div>
            <div className={styles.featureVisual}>
              <div className={styles.visualMockup}>
                <div className={styles.mockupLine}></div>
                <div className={styles.mockupLine}></div>
                <div className={`${styles.mockupLine} ${styles.short}`}></div>
                <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#222' }}></div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem', justifyContent: 'center' }}>
                    <div style={{ height: '6px', width: '40%', backgroundColor: '#333', borderRadius: '4px' }}></div>
                    <div style={{ height: '6px', width: '60%', backgroundColor: '#222', borderRadius: '4px' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.featureSection}>
            <div className={styles.featureContent}>
              <h2 className={styles.featureTitle}>Adaptive Pathways.</h2>
              <p className={styles.featureDescription}>
                No more studying everything. The pathway drops topics a student has already mastered and doubles down on the ones with the highest probability of improving their final score.
              </p>
            </div>
            <div className={styles.featureVisual}>
              <div className={styles.visualMockup}>
                <div style={{ display: 'flex', gap: '1rem', height: '100%' }}>
                  <div style={{ flex: 1, backgroundColor: '#1A1A1A', borderRadius: '4px' }}></div>
                  <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ height: '20px', backgroundColor: '#222', borderRadius: '4px' }}></div>
                    <div style={{ height: '100%', backgroundColor: '#1A1A1A', borderRadius: '4px' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.featureSection}>
            <div className={styles.featureContent}>
              <h2 className={styles.featureTitle}>Cohort Radar.</h2>
              <p className={styles.featureDescription}>
                See which students are falling behind the mastery curve weeks before it shows up in results. Cohort Radar gives school leaders a live readiness dashboard, not a post-mortem report.
              </p>
            </div>
            <div className={styles.featureVisual}>
              <div className={styles.visualMockup}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', height: '100%' }}>
                  <div style={{ backgroundColor: '#222', borderRadius: '4px', height: '60%', alignSelf: 'end' }}></div>
                  <div style={{ backgroundColor: '#333', borderRadius: '4px', height: '85%', alignSelf: 'end' }}></div>
                  <div style={{ backgroundColor: '#444', borderRadius: '4px', height: '100%', alignSelf: 'end' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.featureSection}>
            <div className={styles.featureContent}>
              <h2 className={styles.featureTitle}>Foresight Terminal.</h2>
              <p className={styles.featureDescription}>
                Governments should not find out a generation failed after the results are published. Foresight Terminal models national pass rates years ahead, so curriculum gaps get fixed before they become a crisis.
              </p>
            </div>
            <div className={styles.featureVisual}>
              <div className={styles.visualMockup} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: '80%', height: '80%', border: '2px solid #333', borderRadius: '50%', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', width: '50%', height: '2px', backgroundColor: '#555', transformOrigin: 'left center', transform: 'rotate(-45deg)' }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        </div>

        <section className={styles.trust}>
          <h2 className={styles.trustHeader}>A foundation built for the future.</h2>
          <div className={styles.trustGrid}>
            <div className={styles.trustCard}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.trustIcon}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <h3 className={styles.trustItemTitle}>Ethical Data Sovereignty.</h3>
              <p className={styles.trustItemDescription}>
                We use intelligence to unlock potential, not build digital gatekeepers. Our models adhere to a strict, global standard for transparent, ethical data sovereignty.
              </p>
            </div>
            <div className={styles.trustCard}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.trustIcon}>
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              <h3 className={styles.trustItemTitle}>Pluggable Infrastructure.</h3>
              <p className={styles.trustItemDescription}>
                Built as an API-first intelligence layer, ScholarGrid is designed to be the invisible engine powering the entire EdTech ecosystem. Seamlessly embed our predictive pipelines directly into your existing interfaces.
              </p>
            </div>
            <div className={styles.trustCard}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.trustIcon}>
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <h3 className={styles.trustItemTitle}>Institutional Control.</h3>
              <p className={styles.trustItemDescription}>
                We deploy alongside national examination bodies and ministries of education. Our architecture secures official data pipelines while delivering the high-level policy foresight that institutions currently lack.
              </p>
            </div>
          </div>
        </section>

        <div className={styles.sectionLight}>
          <section className={styles.faq}>
          <h2 className={styles.faqHeader}>FAQs</h2>
          
          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>What is ScholarGrid?</summary>
            <p className={styles.faqAnswer}>
              ScholarGrid is a predictive education intelligence platform that combines vast historical educational performance data with live student progress to deliver precise real-time success predictions, mastery insights, adaptive learning pathways, and school-level cohort forecasts.
            </p>
          </details>

          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>How is this different from traditional test prep?</summary>
            <p className={styles.faqAnswer}>
              Traditional test prep platforms are static. They treat every student the same and offer zero insight into the actual probability of passing. ScholarGrid maps live student interactions against millions of historical data points to identify precise signals of mastery. We don't just provide practice questions; we dynamically calibrate a unique pathway to guarantee improvement.
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
