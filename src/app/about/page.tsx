import Link from 'next/link';
import styles from '../about.module.css';

export const metadata = {
  title: 'About',
};

export default function About() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Measuring Education Backwards Ends Here.</h1>
        <p className={styles.subtitle}>
          We are building the predictive infrastructure layer to transition global education from post-mortem reporting to proactive intelligence.
        </p>
      </header>

      <main className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>The Core Problem</h2>
          <p className={styles.sectionText}>
            For decades, the global education system has operated on a delayed feedback loop. A student spends a year learning, sits for a standardized exam, and only discovers they were falling behind <em>after</em> the results are published. 
          </p>
          <p className={styles.sectionText}>
            It is a system built entirely on post-mortem reporting. We realized that if we could map decades of historical exam patterns against real-time student interactions, we could break this cycle.
          </p>
        </section>

        <div className={styles.highlightBox}>
          <p className={styles.highlightText}>
            We do not build traditional test prep. We build predictive pipelines.
          </p>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>The Engineering Solution</h2>
          <p className={styles.sectionText}>
            ScholarGrid was engineered to be the intelligence layer under education. By ingesting massive datasets of past performance, our models identify the precise signals of mastery in real-time. 
          </p>
          <p className={styles.sectionText}>
            We don't just show a progress bar. We give students, schools, and governments an exact probability of success long before the exam is taken, and provide the exact pathway required to change that outcome.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>The Vision</h2>
          <p className={styles.sectionText}>
            Our vision is simple: No student should ever walk into an exam without knowing exactly where they stand, and no government should ever be surprised by a generational curriculum failure. 
          </p>
          <p className={styles.sectionText}>
            We are turning historical data into a roadmap for the future.
          </p>
        </section>
      </main>
    </div>
  );
}
