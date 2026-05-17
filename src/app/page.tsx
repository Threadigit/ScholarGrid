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
    <div className={styles.container}>
      <div className={styles.navWrapper}>
        <nav className={styles.nav}>
          <div className={styles.logo}>ScholarGrid</div>
          <div className={styles.navLinks}>
            <div className={styles.dropdownContainer}>
              <span className={styles.navLink}>PRODUCT</span>
              <div className={styles.dropdownMenu}>
                <Link href="#copilot" className={styles.dropdownItem}>
                  <span className={styles.dropdownTitle}>Mastery Copilot</span>
                  <span className={styles.dropdownDesc}>Predictive scoring and adaptive learning pathways for students.</span>
                </Link>
                <Link href="#radar" className={styles.dropdownItem}>
                  <span className={styles.dropdownTitle}>Cohort Radar</span>
                  <span className={styles.dropdownDesc}>Real-time benchmarking and early warning systems for schools.</span>
                </Link>
                <Link href="#terminal" className={styles.dropdownItem}>
                  <span className={styles.dropdownTitle}>Foresight Terminal</span>
                  <span className={styles.dropdownDesc}>Curriculum gap analysis and outcome forecasting for governments.</span>
                </Link>
                <Link href="#api" className={styles.dropdownItem}>
                  <span className={styles.dropdownTitle}>Intelligence API</span>
                  <span className={styles.dropdownDesc}>Pluggable prediction infrastructure for the EdTech ecosystem.</span>
                </Link>
              </div>
            </div>
            <Link href="#community" className={styles.navLink}>COMMUNITY</Link>
            <Link href="#docs" className={styles.navLink}>DOCS</Link>
          </div>
        </nav>
      </div>

      <main>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Education Intelligence Infrastructure.</h1>
          <p className={styles.heroSubtitle}>
            A predictive engine that models mastery and forecasts educational outcomes. 
            An intelligence system bridging the gap between exam patterns and student behavior.
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
        </section>

        <div className={styles.sectionLight}>
          <section className={styles.intro}>
            <p>
              ScholarGrid starts with historical archives and becomes the prediction engine you rely on. 
              Most platforms treat every student the same. We offer clear insight into the probability of specific outcomes, adapting in real time to student performance.
            </p>
          </section>

        <section className={styles.features}>
          <div className={styles.featureSection}>
            <div className={styles.featureContent}>
              <h2 className={styles.featureTitle}>Predictive Outcomes.</h2>
              <p className={styles.featureDescription}>
                Stop guessing. Real-time assessments tell a student exactly what they would likely score if the exam were held today. We process millions of data points against historical patterns to indicate precise readiness.
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
                A dynamic roadmap that constantly recalibrates based on performance. It focuses a student's energy only on the areas with the highest probability of improving their final outcome. No more static preparation.
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
              <h2 className={styles.featureTitle}>Institutional Intelligence.</h2>
              <p className={styles.featureDescription}>
                Real-time benchmarking against national and global averages. Early warning systems visualize which students are falling behind the mastery curve before the exam, enabling targeted and immediate intervention.
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
              <h2 className={styles.featureTitle}>Policy Foresight.</h2>
              <p className={styles.featureDescription}>
                Outcome forecasting that allows governments and testing bodies to predict national pass rates and educational attainment years in advance, driving better resource allocation and identifying curriculum gaps.
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
            <div>
              <h3 className={styles.trustItemTitle}>Ethical Data Sovereignty.</h3>
              <p className={styles.trustItemDescription}>
                Performance data is used to empower learners, never to create digital barriers. We set a global standard for how educational intelligence should be handled in an AI-driven world.
              </p>
            </div>
            <div>
              <h3 className={styles.trustItemTitle}>Pluggable Infrastructure.</h3>
              <p className={styles.trustItemDescription}>
                An API-first architecture designed to be the engine under the hood of the entire industry. Other platforms can integrate our predictive insights seamlessly into their own interfaces.
              </p>
            </div>
            <div>
              <h3 className={styles.trustItemTitle}>Institutional Control.</h3>
              <p className={styles.trustItemDescription}>
                We partner with national examination bodies and ministries of education, ensuring official data pipelines are secure while providing high-level analytics they currently lack.
              </p>
            </div>
          </div>
        </section>

        <div className={styles.sectionLight}>
          <section className={styles.faq}>
          <h2 className={styles.faqHeader}>FAQs</h2>
          
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>What is ScholarGrid?</h3>
            <p className={styles.faqAnswer}>
              ScholarGrid is an Education Intelligence Infrastructure. It ingests decades of standardized exam data, applies a sophisticated taxonomy, and builds a Predictive Model of Evolution. It is a foundational layer that predicts educational outcomes and provides actionable analytics for students, schools, and governments.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>How is this different from traditional test prep?</h3>
            <p className={styles.faqAnswer}>
              Traditional platforms are static and treat every student exactly the same. They offer zero insight into the probability of success. ScholarGrid maps student interaction against historical recurrences, identifying precise signals of mastery and calibrating a unique, predictive learning pathway.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Who is ScholarGrid built for?</h3>
            <p className={styles.faqAnswer}>
              It is built for the entire educational lifecycle. For students, it provides mastery indexing and probability reports. For schools, cohort readiness dashboards and early warning systems. For governments, policy intelligence and curriculum gap analysis. For the EdTech ecosystem, it acts as an Intelligence-as-a-Service API.
            </p>
          </div>
        </section>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerColumn}>
          <div className={styles.logo}>ScholarGrid</div>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>© {new Date().getFullYear()} ScholarGrid Inc.</span>
        </div>
        <div className={styles.footerColumn}>
          <span className={styles.footerHeading}>Product</span>
          <Link href="#copilot" className={styles.footerLink}>Mastery Copilot</Link>
          <Link href="#radar" className={styles.footerLink}>Cohort Radar</Link>
          <Link href="#terminal" className={styles.footerLink}>Foresight Terminal</Link>
          <Link href="#api" className={styles.footerLink}>Intelligence API</Link>
          <Link href="#pricing" className={styles.footerLink}>Pricing</Link>
        </div>
        <div className={styles.footerColumn}>
          <span className={styles.footerHeading}>Resources</span>
          <Link href="#docs" className={styles.footerLink}>Documentation</Link>
          <Link href="#community" className={styles.footerLink}>Community</Link>
        </div>
        <div className={styles.footerColumn}>
          <span className={styles.footerHeading}>Company</span>
          <Link href="#about" className={styles.footerLink}>About</Link>
          <Link href="#contact" className={styles.footerLink}>Contact</Link>
        </div>
      </footer>
    </div>
  );
}
