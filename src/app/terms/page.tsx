import Link from 'next/link';
import styles from '../legal.module.css';

export const metadata = {
  title: 'Terms of Service',
};

export default function TermsOfService() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Terms of Service</h1>
        <p className={styles.lastUpdated}>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
      </header>

      <main className={styles.content}>
        <p>
          Welcome to ScholarGrid. By accessing our platform, utilizing our Intelligence API, or integrating our predictive infrastructure, you agree to be bound by the following Terms of Service.
        </p>

        <h2>1. Predictive Analytics Disclaimer</h2>
        <p>
          ScholarGrid provides an Education Intelligence Infrastructure that utilizes historical data to forecast educational outcomes. You acknowledge and agree that:
        </p>
        <ul>
          <li>Our readiness scores and predictive models are <strong>probabilistic forecasts</strong>, not absolute guarantees of future performance.</li>
          <li>ScholarGrid shall not be held liable for any student&apos;s failure to pass an exam, achieve a specific certification, or meet institutional benchmarks, regardless of the readiness score or mastery pathway provided by our platform.</li>
          <li>Our tools are designed to inform proactive intervention, not to replace formal educational instruction or institutional assessment.</li>
        </ul>

        <h2>2. Acceptable Use of Infrastructure</h2>
        <p>
          When accessing the ScholarGrid platform or our Intelligence API, you agree not to:
        </p>
        <ul>
          <li>Reverse-engineer, decompile, or attempt to extract the underlying taxonomy or predictive algorithms from our infrastructure.</li>
          <li>Use the platform to create discriminatory digital barriers that prevent students from accessing educational resources.</li>
          <li>Exceed the API rate limits established in your institutional or enterprise agreement.</li>
        </ul>

        <h2>3. Intellectual Property</h2>
        <p>
          All predictive models, algorithms, taxonomies, data pipelines, and visual interfaces remain the exclusive intellectual property of ScholarGrid Inc. Providing access to our API or dashboards does not transfer ownership of our proprietary forecasting technology.
        </p>

        <h2>4. Data Provisioning</h2>
        <p>
          Institutions and governments integrating with ScholarGrid must ensure they possess the legal right and necessary authorizations to supply historical and live student performance data to our infrastructure in accordance with applicable regional laws.
        </p>

        <h2>5. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, ScholarGrid shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our predictive infrastructure.
        </p>

        <h2>6. Modifications to the Terms</h2>
        <p>
          We reserve the right to modify these terms as our infrastructure and predictive models evolve. Continued use of the platform following any such changes constitutes your acceptance of the new Terms of Service.
        </p>

      </main>
    </div>
  );
}
