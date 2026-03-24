'use client';
import { useRouter } from 'next/navigation';
import { Sparkles, Sparkle, CirclePlus } from 'lucide-react';
import dashboardImg from '../../app/assets/Timeline 1.webp';
import styles from './Hero.module.css';

export default function Hero() {
  const router = useRouter();
  return (
    <main className={styles.heroSplit}>
      <div className={styles.heroImageContainer}>
        <img
          src={dashboardImg.src}
          alt="Dashboard Preview"
          className={styles.heroImage}
          onContextMenu={(e) => e.preventDefault()}
          draggable={false}
        />
      </div>

      <div className={styles.heroContent}>
        <div className="badge">
          <Sparkles size={14} className="badge-icon" /> Connecting AI Features
        </div>

        <h1 className={`${styles.title} reveal`}>
          The art of Inheritance in modern learning
        </h1>

        <p className={`${styles.tagline} reveal`} style={{ animationDelay: '1s' }}>
          Elevate your productivity with next-generation tools designed for seamless integration and accelerated learning workflows.
        </p>

        <div className={styles.ctaRow}>
          <div className={styles.ctaButtons}>
            <button className="btn btn-white" onClick={() => router.push('/signup')}>
              <Sparkle size={17} /> Get Started
            </button>
            <button className="btn btn-primary" onClick={() => router.push('/#')}>
              <CirclePlus size={17} />
            </button>
          </div>
        </div>
      </div>
    </main >
  );
}
