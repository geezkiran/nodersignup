import styles from './Footer.module.css';
import noderLogo from '../../app/assets/noder.png';
import { motion } from 'framer-motion';

const footerLinks = {
  Product: [
    { label: 'Features', href: '/#features' },
    { label: 'Pricing', href: '/#compare' },
    { label: 'FAQ', href: '/#faq' },
  ],
  Developers: [
    { label: 'Compare', href: '/#compare' },
    { label: 'Documentation', href: '/#faq' },
    { label: 'Waitlist', href: '/#waitlist' },
  ],
  Resources: [
    { label: 'Blog', href: '/blog' },
    { label: 'About us', href: '/#hero' },
    { label: 'Early Access', href: '/#waitlist' },
  ],
};

const badges = [
  'GDPR Compliant',
  'HIPAA Compliant',
  'AICPA SOC Type 2',
  'ISO 27001 Compliant',
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <motion.div
        className={styles.footerContent}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.footerTop}>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div className={styles.linkGroup} key={category}>
              <h4 className={styles.groupTitle}>{category}</h4>
              {links.map((link) => (
                <a key={link.label} href={link.href} className={styles.link}>
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.brandBlock}>
            <div className={styles.brandHeader}>
              <div className={styles.logo}>
                <img
                  src={noderLogo.src}
                  alt="Noder"
                  className={styles.logoImg}
                  style={{ height: '20px', objectFit: 'contain' }}
                />
              </div>
            </div>
            <p className={styles.tagline}>Noder is an official trademark of Noirgrid Inc.</p>
          </div>

          <div className={styles.rightBlock}>
            <div className={styles.badgeRow}>
              {badges.map((badge) => (
                <span key={badge} className={styles.badge}>{badge}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
