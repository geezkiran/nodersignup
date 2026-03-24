import React, { useRef, useState, useEffect } from 'react';
import { Zap, Shield, Globe, Cpu, Cloud, Database, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import styles from './FeaturesSection.module.css';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
});

const features = [
  {
    icon: <Zap size={24} />,
    title: "Lightning Fast Performance",
    desc: "Our infrastructure is optimized for speed, ensuring your team never experiences lag or downtime."
  },
  {
    icon: <Shield size={24} />,
    title: "Enterprise Security",
    desc: "Bank-grade encryption and advanced security controls to keep your data safe and compliant."
  },
  {
    icon: <Globe size={24} />,
    title: "Global Scalability",
    desc: "Deploy your applications anywhere in the world with our globally distributed network of edge nodes."
  },
  {
    icon: <Cpu size={24} />,
    title: "Powerful Compute",
    desc: "Infinite scaling with serverless compute that handles any workload, from hobby to enterprise."
  },
  {
    icon: <Cloud size={24} />,
    title: "Hybrid Infrastructure",
    desc: "Seamlessly connect your existing cloud providers with Noder for a truly hybrid experience."
  },
  {
    icon: <Database size={24} />,
    title: "Real-time Sync",
    desc: "Ensure data consistency across your stack with our distributed data layer and streaming API."
  }
];

export default function FeaturesSection() {
  const containerRef = useRef(null);
  const { scrollXProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollXProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.featuresSection}>
      <div className={styles.featuresContainer}>
        <motion.div className="mb-10 text-center flex flex-col items-center" {...fadeUp(0)}>
          <h2 className="mb-5 mt-5 flex items-center justify-center gap-3 text-4xl font-semibold tracking-tighter md:text-4xl">Why choose us</h2>
          <p className="text-muted-foreground mx-auto max-w-xl text-base">The ultimate platform to accelerate your workflow, offering enterprise security and global scalability.</p>
        </motion.div>

        <div className={styles.carouselWrapper}>
          <button 
            className={`${styles.navButton} ${styles.prevButton}`} 
            onClick={() => scroll('left')}
            aria-label="Previous features"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            className={`${styles.navButton} ${styles.nextButton}`} 
            onClick={() => scroll('right')}
            aria-label="Next features"
          >
            <ChevronRight size={24} />
          </button>

          <div className={styles.carouselTrack} ref={containerRef}>
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className={styles.carouselCard}
                {...fadeUp(0.1 + (i % 3) * 0.1)}
              >
                <div className={styles.cardContent}>
                  <div className={styles.iconBox}>{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className={styles.indicatorTrack}>
            <motion.div
              className={styles.indicatorProgress}
              style={{ scaleX, originX: 0 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
