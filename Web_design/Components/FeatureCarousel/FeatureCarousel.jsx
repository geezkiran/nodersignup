'use client';

import { useState } from 'react';
import styles from './FeatureCarousel.module.css';
import { ChevronLeft, ChevronRight, Zap, Shield, BarChart2, Bell, Globe, Layers } from 'lucide-react';

const features = [
  {
    icon: <Zap size={22} strokeWidth={1.5} />,
    tag: 'Performance',
    title: 'Lightning Fast',
    description: 'Our infrastructure is optimized for speed, ensuring your team never experiences lag or downtime. Work at the speed of thought.',
    accent: '#f5f0e8',
    iconColor: '#c8a96e',
  },
  {
    icon: <Shield size={22} strokeWidth={1.5} />,
    tag: 'Security',
    title: 'Enterprise-grade Security',
    description: 'End-to-end encryption and role-based access controls keep your data safe without slowing your team down.',
    accent: '#e8f0f5',
    iconColor: '#6e9ec8',
  },
  {
    icon: <BarChart2 size={22} strokeWidth={1.5} />,
    tag: 'Analytics',
    title: 'Deep Insights',
    description: 'Real-time dashboards and reports surface the metrics that matter, helping you make faster, smarter decisions.',
    accent: '#eef5e8',
    iconColor: '#7ec86e',
  },
  {
    icon: <Bell size={22} strokeWidth={1.5} />,
    tag: 'Notifications',
    title: 'Stay in the Loop',
    description: 'Smart alerts notify your team at the right moment — no noise, just the updates that actually need your attention.',
    accent: '#f1f1f1ff',
    iconColor: '#c86ea8',
  },
  {
    icon: <Globe size={22} strokeWidth={1.5} />,
    tag: 'Collaboration',
    title: 'Work from Anywhere',
    description: 'Seamless sync across devices means your team is always on the same page, whether in the office or across the world.',
    accent: '#e8eef5',
    iconColor: '#6e7ec8',
  },
  {
    icon: <Layers size={22} strokeWidth={1.5} />,
    tag: 'Integrations',
    title: 'Connects Everything',
    description: 'One-click integrations with the tools your team already loves. No migration headaches, just immediate value.',
    accent: '#f5ebe8',
    iconColor: '#c8836e',
  },
];

export default function FeatureCarousel() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + features.length) % features.length);
  const next = () => setCurrent((c) => (c + 1) % features.length);

  const item = features[current];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Features</p>
        <h2 className={styles.heading}>Everything your team needs.</h2>
      </div>

      <div className={styles.carouselWrapper}>
        <div className={styles.card} style={{ backgroundColor: item.accent }}>
          <span className={styles.tag}>{item.tag}</span>
          <div className={styles.iconWrap} style={{ color: item.iconColor }}>
            {item.icon}
          </div>
          <h3 className={styles.cardTitle}>{item.title}</h3>
          <p className={styles.cardDesc}>{item.description}</p>
        </div>

        <div className={styles.controls}>
          <button className={styles.arrowBtn} onClick={prev} aria-label="Previous">
            <ChevronLeft size={18} strokeWidth={1.75} />
          </button>

          <button className={styles.arrowBtn} onClick={next} aria-label="Next">
            <ChevronRight size={18} strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </section>
  );
}
