import React from 'react';
import styles from './TrustedSection.module.css';

export default function TrustedSection() {
  return (
    <section className={styles.trustedSection}>
      <p className={styles.trustedText}>Trusted by innovative teams worldwide</p>
      <div className={styles.trustedLogosContainer}>
        <div className={styles.trustedLogosTrack}>
          <div className={styles.trustedLogosGroup}>
            <span className={styles.trustedLogo}>Acme Corp</span>
            <span className={styles.trustedLogo}>Globex</span>
            <span className={styles.trustedLogo}>Soylent</span>
            <span className={styles.trustedLogo}>Initech</span>
            <span className={styles.trustedLogo}>Umbrella</span>
          </div>
          <div className={styles.trustedLogosGroup} aria-hidden="true">
            <span className={styles.trustedLogo}>Acme Corp</span>
            <span className={styles.trustedLogo}>Globex</span>
            <span className={styles.trustedLogo}>Soylent</span>
            <span className={styles.trustedLogo}>Initech</span>
            <span className={styles.trustedLogo}>Umbrella</span>
          </div>
        </div>
      </div>
    </section>
  );
}
