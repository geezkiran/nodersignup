import React from 'react';
import { Target, Zap, Shield, Globe } from 'lucide-react';
import styles from './FeaturesSection.module.css';

export default function FeaturesSection() {
  return (
    <section className={styles.featuresSection}>
      <div className={styles.sectionHeader}>
        <div className="badge"><Target size={14} className="badge-icon" /> Why choose us</div>
      </div>

      <div className={styles.bentoGrid}>
        <div className={`${styles.bentoCard} ${styles.bentoLarge}`}>
          <div className={styles.bentoContent}>
            <div className={styles.bentoHeader}>
              <div className={styles.bentoIcon}><Zap size={24} /></div>
              <h3>Lightning Fast Performance</h3>
            </div>
            <p>Our infrastructure is optimized for speed, ensuring your team never experiences lag or downtime. Work at the speed of thought.</p>
          </div>
        </div>

        <div className={styles.bentoCard}>
          <div className={styles.bentoHeader}>
            <div className={styles.bentoIcon}><Shield size={24} /></div>
            <h3>Enterprise Security</h3>
          </div>
          <p>Bank-grade encryption and advanced security controls to keep your data safe.</p>
        </div>

        <div className={styles.bentoCard}>
          <div className={styles.bentoHeader}>
            <div className={styles.bentoIcon}><Globe size={24} /></div>
            <h3>Global Sync</h3>
          </div>
          <p>Real-time synchronization across all your devices, anywhere in the world.</p>
        </div>
      </div>
    </section>
  );
}
