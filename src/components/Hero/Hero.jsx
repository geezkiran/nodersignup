'use client';
import { useRouter } from 'next/navigation';
import { Sparkle, CirclePlus } from 'lucide-react';
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
      <motion.div 
        className={styles.heroBackground}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <img
          src={dashboardImg.src}
          alt="Dashboard Preview"
          className={styles.bgImage}
        />
        <div className={styles.overlay} />
      </motion.div>

      <div className={styles.heroContent}>


        <motion.h1
          className={styles.title}
          {...fadeUp(0.12)}
        >
          Supercharged Learning
        </motion.h1>

        <motion.p className={styles.tagline} {...fadeUp(0.24)}>
          No more wasting hours on endless scrolling. Everything you want to learn, the way you want to learn.
        </motion.p>

        <motion.div className={styles.ctaRow} {...fadeUp(0.36)}>
          <div className={styles.ctaButtons}>
            <button className="btn btn-white" onClick={() => router.push('/signup')}>
              <Sparkle size={17} />Watch Demo
            </button>
            <button
              className="btn btn-primary"
              onClick={() => router.push('/#waitlist')}
              aria-label="Jump to waitlist"
            >
              <CirclePlus size={18} strokeWidth={1.7} />
            </button>
          </div>
        </motion.div>
      </div>
    </main >
  );
}
