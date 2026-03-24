import React from 'react';
import { Zap, Shield, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './FeaturesSection.module.css';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
});

export default function FeaturesSection() {
  return (
    <section className={styles.featuresSection}>
      <div className={styles.featuresContainer}>
        <motion.div className="mb-10 text-center flex flex-col items-center" {...fadeUp(0)}>
          <h2 className="mb-5 flex items-center justify-center gap-3 text-4xl font-semibold tracking-tighter md:text-4xl">Why choose us</h2>
          <p className="text-muted-foreground mx-auto max-w-xl text-base">The ultimate platform to accelerate your workflow, offering enterprise security and global scalability.</p>
        </motion.div>

        <div className={styles.bentoGrid}>
          <motion.div className={`${styles.bentoCard} ${styles.bentoLarge}`} {...fadeUp(0.1)}>
            <div className={styles.bentoContent}>
              <div className={styles.bentoHeader}>
                <div className={styles.bentoIcon}><Zap size={24} /></div>
                <h3>Lightning Fast Performance</h3>
              </div>
              <p>Our infrastructure is optimized for speed, ensuring your team never experiences lag or downtime. Work at the speed of thought.</p>
            </div>
          </motion.div>

          <motion.div className={styles.bentoCard} {...fadeUp(0.2)}>
            <div className={styles.bentoHeader}>
              <div className={styles.bentoIcon}><Shield size={24} /></div>
              <h3>Enterprise Security</h3>
            </div>
            <p>Bank-grade encryption and advanced security controls to keep your data safe.</p>
          </motion.div>

          <motion.div className={styles.bentoCard} {...fadeUp(0.3)}>
            <div className={styles.bentoHeader}>
              <div className={styles.bentoIcon}><Globe size={24} /></div>
              <h3>Global Sync</h3>
            </div>
            <p>Real-time synchronization across all your devices, anywhere in the world.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
