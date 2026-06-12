'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '@/app/page.module.css';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className={styles.navWrapper}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.logoIcon}>
            <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
            <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
            <rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
            <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
          </svg>
          <span className={styles.logoText}>ScholarGrid</span>
        </Link>

        <button
          className={`${styles.mobileMenuButton} ${isMobileMenuOpen ? styles.open : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className={styles.mobileMenuIcon}></div>
        </button>

        <div className={`${styles.navLinks} ${isMobileMenuOpen ? styles.open : ''}`}>
          <div className={styles.dropdownContainer}>
            <span className={styles.navLink} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              Product
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
            <div className={styles.dropdownMenu}>
              <Link href="/products/mastery-copilot" className={styles.dropdownItem} onClick={() => setIsMobileMenuOpen(false)}>
                <span className={styles.dropdownTitle}>Mastery Copilot</span>
                <span className={styles.dropdownDesc}>Predictive scoring and adaptive learning pathways for students.</span>
              </Link>
              <Link href="/products/cohort-radar" className={styles.dropdownItem} onClick={() => setIsMobileMenuOpen(false)}>
                <span className={styles.dropdownTitle}>Cohort Radar</span>
                <span className={styles.dropdownDesc}>Real-time benchmarking and early warning systems for schools.</span>
              </Link>
              <Link href="/products/foresight-terminal" className={styles.dropdownItem} onClick={() => setIsMobileMenuOpen(false)}>
                <span className={styles.dropdownTitle}>Foresight Terminal</span>
                <span className={styles.dropdownDesc}>Curriculum gap analysis and outcome forecasting for governments.</span>
              </Link>
              <Link href="/products/intelligence-api" className={styles.dropdownItem} onClick={() => setIsMobileMenuOpen(false)}>
                <span className={styles.dropdownTitle}>Intelligence API</span>
                <span className={styles.dropdownDesc}>Pluggable prediction infrastructure for the EdTech ecosystem.</span>
              </Link>
            </div>
          </div>
          <Link
            href="https://chat.whatsapp.com/IN7SUOVCzzDBUnBqHq9efR"
            className={styles.navLink}
            onClick={() => setIsMobileMenuOpen(false)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Community
          </Link>
          <Link href="/about" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>About</Link>
          <Link href="/#waitlist" className={styles.navCta} onClick={() => setIsMobileMenuOpen(false)}>Join the waitlist</Link>
        </div>
      </nav>
    </div>
  );
}
