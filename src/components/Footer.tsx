import Link from 'next/link';
import styles from '@/app/page.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <Link href="/" className={styles.logo}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.logoIcon}>
              <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
              <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
              <rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
              <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
            </svg>
            <span className={styles.logoText}>ScholarGrid</span>
          </Link>
          <p className={styles.footerTagline}>The intelligence layer under education. Precise success predictions for students, schools, and governments.</p>
        </div>
        <div className={styles.footerColumns}>
          <div className={styles.footerColumn}>
            <span className={styles.footerHeading}>Product</span>
            <Link href="/#copilot" className={styles.footerLink}>Mastery Copilot</Link>
            <Link href="/#radar" className={styles.footerLink}>Cohort Radar</Link>
            <Link href="/#terminal" className={styles.footerLink}>Foresight Terminal</Link>
            <Link href="/#api" className={styles.footerLink}>Intelligence API</Link>
          </div>
          <div className={styles.footerColumn}>
            <span className={styles.footerHeading}>Resources</span>
            <Link href="https://chat.whatsapp.com/IN7SUOVCzzDBUnBqHq9efR" className={styles.footerLink} target="_blank" rel="noopener noreferrer">Community</Link>
          </div>
          <div className={styles.footerColumn}>
            <span className={styles.footerHeading}>Company</span>
            <Link href="/about" className={styles.footerLink}>About</Link>
            <a href="mailto:hello@thescholargrid.com" className={styles.footerLink}>Contact</a>
            <Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link>
            <Link href="/terms" className={styles.footerLink}>Terms of Service</Link>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.footerBottomInner}>
          <span className={styles.footerCopyright}>© {new Date().getFullYear()} ScholarGrid Inc. All rights reserved.</span>
          <a href="mailto:hello@thescholargrid.com" className={styles.footerContact}>hello@thescholargrid.com</a>
        </div>
      </div>
    </footer>
  );
}
