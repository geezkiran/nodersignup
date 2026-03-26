'use client';
import { useRouter } from 'next/navigation';
import { Sparkles, Sparkle, CirclePlus } from 'lucide-react';
import { motion } from 'framer-motion';
import dashboardImg from '../../app/assets/cardwebp.webp';
import styles from './Hero.module.css';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
});

export default function Hero() {
  const router = useRouter();
  return (
    <main className={styles.heroContainer}>
      <div className={styles.heroBackground}>
        <img
          src={dashboardImg.src}
          alt="Dashboard Preview"
          className={styles.bgImage}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.heroContent}>


        <motion.h1
          className={styles.title}
          style={{
            fontFamily: 'var(--font-geist-sans)',
            fontWeight: 500
          }}
          {...fadeUp(0.12)}
        >
          Supercharge Learning
        </motion.h1>

        <motion.p className={styles.tagline} {...fadeUp(0.24)}>
          No more wasting hours on endless scrolling. Everything you want to learn, the way you want to learn.
        </motion.p>

        <motion.div className={styles.ctaRow} {...fadeUp(0.36)}>
          <div className={styles.ctaButtons}>
            <button className="btn btn-white" onClick={() => router.push('/signup')}>
              <Sparkle size={17} />Watch Demo
            </button>
            <button className="btn btn-primary" onClick={() => router.push('/#')}>
              <CirclePlus size={16} strokeWidth={1.7} color="var(--text-primary)" />
            </button>
          </div>
        </motion.div>
      </div>
    </main >
  );
}
