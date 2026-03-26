import React, { useRef, useState, useEffect } from 'react';
import { Zap, Shield, Globe, Cpu, Cloud, Database, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, translateAxis, useScroll, useSpring, useTransform } from 'framer-motion';
import img1 from '../../app/assets/card1.jpg';
import img2 from '../../app/assets/Card2 .jpg';
import img3 from '../../app/assets/Card3 .jpg';
import img4 from '../../app/assets/Card4 .jpg';

import styles from './FeaturesSection.module.css';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
});

const features = [
  {
    icon: <Zap size={24} />,
    title: "",
    desc: "",
    image: img1
  },
  {
    icon: <Shield size={24} />,
    title: "",
    desc: "",
    image: img2
  },
  {
    icon: <Globe size={24} />,
    title: "",
    desc: "",
    image: img3
  },
  {
    icon: <Cpu size={24} />,
    title: "",
    desc: "",
    image: img4
  },

];

function FeatureCard({ feature, index, containerRef, isMobile }) {
  const cardRef = useRef(null);

  // Track scroll progress of this specific card relative to the container
  const { scrollXProgress } = useScroll({
    container: containerRef,
    target: cardRef,
    offset: ["start end", "center center", "end start"]
  });

  // Map progress to opacity: faint at edges, full in middle
  // [0, 0.2, 0.8, 1] mapped to [0.1, 1, 1, 0.1]
  const opacity = useTransform(
    scrollXProgress,
    [0, 0.15, 0.85, 1],
    [0.7, 1, 1, 0.7]
  );

  const motionProps = isMobile
    ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
    : fadeUp(0.1 + (index % 3) * 0.1);

  return (
    <motion.div
      ref={cardRef}
      key={index}
      className={styles.carouselCard}
      style={{ opacity: isMobile ? 1 : opacity }}
      {...motionProps}
    >
      <img
        src={feature.image.src}
        alt=""
        className={styles.cardBackground}
      />
      <div className={styles.cardOverlay} />
      <div className={styles.cardContent}>
        <div className={styles.iconBox}>{feature.icon}</div>
        <h3>{feature.title}</h3>
        <p>{feature.desc}</p>
      </div>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const containerRef = useRef(null);
  const { scrollXProgress: containerScrollProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(containerScrollProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check on mount
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
          <h2
            className="mb-5 mt-5 flex items-center justify-center gap-2 text-5xl font-medium tracking-tighter md:text-5xl"
            style={{ fontFamily: 'var(--font-instrument-serif)' }}
          >
            Why we do<span style={{ fontStyle: 'italic' }}>What we do</span>
          </h2>
          <p className="text-muted-foreground mx-auto pl-2 pr-2 text-base">The ultimate platform to accelerate your workflow, offering enterprise security and global scalability.</p>
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

          <div className={styles.carouselViewport}>
            <div className={styles.carouselTrack} ref={containerRef} style={{ minHeight: '450px' }}>
              {features.map((feature, i) => (
                <FeatureCard
                  key={i}
                  feature={feature}
                  index={i}
                  containerRef={containerRef}
                  isMobile={isMobile}
                />
              ))}
            </div>
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
