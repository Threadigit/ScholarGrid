import Link from 'next/link';
import styles from '../legal.module.css';

export const metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyPolicy() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.lastUpdated}>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
      </header>

      <main className={styles.content}>
        <p>
          At ScholarGrid, we operate an Education Intelligence Infrastructure. We believe that predictive data should be used to empower learners, never to create digital barriers. This Privacy Policy outlines our strict adherence to ethical data sovereignty and how we collect, use, and protect your information.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          To provide our predictive intelligence layer, we may collect the following types of information:
        </p>
        <ul>
          <li><strong>Account Information:</strong> Name, email address, and institutional affiliation when you register or join our waitlist.</li>
          <li><strong>Performance Metrics:</strong> De-identified and aggregated historical exam results and student interaction data provided by partner institutions.</li>
          <li><strong>Technical Data:</strong> Standard usage data, IP addresses, and browser metrics required to maintain the security and stability of our API.</li>
        </ul>

        <h2>2. How We Use Your Data</h2>
        <p>
          ScholarGrid functions as an intelligence engine. Your data is strictly used for the following purposes:
        </p>
        <ul>
          <li>To map historical patterns and calibrate our predictive learning pathways.</li>
          <li>To provide real-time benchmarking and early warning dashboards to authorized school administrators.</li>
          <li>To improve the accuracy of our forecasting models and API infrastructure.</li>
        </ul>

        <h2>3. Ethical Data Sovereignty</h2>
        <p>
          We do not sell student data. We do not use educational data to serve targeted advertising. All performance data ingested into our infrastructure is strictly firewalled and utilized solely to improve educational outcomes. We comply with industry-standard regulations (including GDPR and COPPA equivalents) regarding the processing of educational records.
        </p>

        <h2>4. Data Security</h2>
        <p>
          We employ institutional-grade encryption (both in transit and at rest) to secure our data pipelines. Access to individual student readiness scores is strictly limited to authenticated, authorized users within the respective institution.
        </p>

        <h2>5. Contact Us</h2>
        <p>
          If you have questions regarding this Privacy Policy or how ScholarGrid handles data sovereignty, please contact our compliance team at privacy@thescholargrid.com.
        </p>

      </main>
    </div>
  );
}
