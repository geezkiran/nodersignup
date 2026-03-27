'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import styles from './BlogFooter.module.css';

const blogFooterLinks = [
  { label: 'All Articles', href: '/blog' },
  { label: 'Get Early Access', href: '/#waitlist' },
];

export default function BlogFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.blogFooter}>
      <motion.div
        className={styles.footerInner}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.45 }}
      >
        <div className={styles.footerTop}>
          <p className={styles.kicker}>User Journal</p>
          <h3 className={styles.title}>The Learning Log</h3>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.linksRow}>
            {blogFooterLinks.map((link) => (
              <Link key={link.label} href={link.href} className={styles.linkItem}>
                <span>{link.label}</span>
                <ArrowUpRight size={15} />
              </Link>
            ))}
          </div>
          <p className={styles.meta}>© {year} Noirgrid Inc. All rights reserved.</p>
        </div>
      </motion.div>
    </footer>
  );
}
