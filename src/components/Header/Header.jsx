"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Telescope, X } from 'lucide-react';
import { motion } from 'framer-motion';
import noderLogo from '../../app/assets/logoicon.png';
import logomob from '../../app/assets/logoiconmob.png';
import ThemeToggle from '../Theme/ThemeToggle';

import styles from './Header.module.css';

export default function Header() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className={`${styles['header-wrapper']} ${isScrolled ? styles.scrolled : ''}`}>
        <header className={styles.header}>
          <div className={styles['header-left']}>
            <button
              className={styles['mobile-menu-toggle']}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X color="var(--text-secondary)" strokeWidth={1.25} />
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <line x1="1" y1="8" x2="21" y2="8" stroke="var(--text-secondary)" strokeWidth="1.25" strokeLinecap="round" />
                  <line x1="1" y1="15" x2="21" y2="15" stroke="var(--text-secondary)" strokeWidth="1.25" strokeLinecap="round" />
                </svg>
              )}
            </button>
            <div className={styles.logo} onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
              <img src={noderLogo.src} alt="Noder" className={styles['logo-full']} style={{ height: '22px', objectFit: 'contain' }} />
              <img src={logomob.src} alt="Noder" className={styles['logo-mob']} style={{ height: '24px', objectFit: 'contain' }} />
            </div>
          </div>

          <nav className={styles['nav-links']}>
            <a href="/#features" className={styles['nav-link-caps']}>Features</a>
            <a href="/#compare" className={styles['nav-link-caps']}>Pricing</a>
            <a href="/blog" className={styles['nav-link-caps']}>Blog</a>
            <a href="/#waitlist" className={styles['nav-link-caps']}>Story</a>
          </nav>

          <div className={styles['header-right']}>
            <div className={styles.headerControls}>
              <ThemeToggle className={styles.headerThemeToggle} />
              <button
                className={`${styles.btn} ${styles['btn-primary']} ${isScrolled ? styles['btn-scrolled'] : ''}`}
                onClick={() => router.push('/signup')}
              >
                <Telescope size={18} strokeWidth={2} color="var(--text-primary)" />
                <motion.span
                  initial={false}
                  animate={{
                    width: isScrolled ? 0 : 'auto',
                    opacity: isScrolled ? 0 : 1,
                    marginLeft: isScrolled ? 0 : 8
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  style={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    display: 'inline-block'
                  }}
                >
                  Early Access
                </motion.span>
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`${styles['mobile-menu']} ${isMobileMenuOpen ? styles.open : ''}`}>
        <div className={styles['mobile-menu-content']}>
          <motion.div
            className={styles['mobile-nav-section']}
            initial={{ opacity: 0, y: 15 }}
            animate={isMobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className={styles['nav-link-caps']} style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>Product</h3>
            <a href="/#features" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
            <a href="/#compare" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
            <a href="/#faq" onClick={() => setIsMobileMenuOpen(false)}>FAQ</a>
            <a href="/#waitlist" onClick={() => setIsMobileMenuOpen(false)}>Waitlist</a>
          </motion.div>

          <motion.div
            className={styles['mobile-nav-section']}
            initial={{ opacity: 0, y: 15 }}
            animate={isMobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className={styles['nav-link-caps']} style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>Resources</h3>
            <a href="/blog" onClick={() => setIsMobileMenuOpen(false)}>Blog</a>
            <a href="/#compare" onClick={() => setIsMobileMenuOpen(false)}>Compare</a>
            <a href="/#faq" onClick={() => setIsMobileMenuOpen(false)}>Documentation</a>
          </motion.div>

          <motion.div
            className={styles['mobile-nav-section']}
            initial={{ opacity: 0, y: 15 }}
            animate={isMobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ delay: 0.3 }}
          >
            <a href="/#waitlist" className={`${styles['mobile-nav-link']} ${styles['nav-link-serif']}`} onClick={() => setIsMobileMenuOpen(false)}>Our Story</a>
          </motion.div>
        </div>
      </div>
    </>
  );
}
