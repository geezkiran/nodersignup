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
    <main className={styles.heroSplit}>
      <motion.div
        className={styles.heroImageContainer}
        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{
          duration: 1.2,
          delay: 0.2,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        <img
          src={dashboardImg.src}
          alt="Dashboard Preview"
          className={styles.heroImage}
          onContextMenu={(e) => e.preventDefault()}
          draggable={false}
        />
      </motion.div>

      <div className={styles.heroContent}>
        <motion.div className="badge" {...fadeUp(0)}>
          <Sparkles size={14} className="badge-icon" /> Connecting AI Features
        </motion.div>

        <motion.h1 className={styles.title} {...fadeUp(0.12)}>
          The art of Inheritance in modern learning
        </motion.h1>

        <motion.p className={styles.tagline} {...fadeUp(0.24)}>
          Elevate your productivity with next-generation tools designed for seamless integration and accelerated learning workflows.
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
