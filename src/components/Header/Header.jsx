"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Telescope, ChevronDown, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import noderLogo from '../../app/assets/logoicon.png';
import logomob from '../../app/assets/logoiconmob.png';

import styles from './Header.module.css';
import Banner1 from '../Banner/Banner1';

export default function Header() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <div className={styles['header-wrapper']}>
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
                  <line x1="3" y1="10" x2="21" y2="10" stroke="var(--text-secondary)" strokeWidth="1.25" strokeLinecap="round" />
                  <line x1="3" y1="17" x2="21" y2="17" stroke="var(--text-secondary)" strokeWidth="1.25" strokeLinecap="round" />
                </svg>
              )}
            </button>
            <div className={styles.logo} onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
              <img src={noderLogo.src} alt="Noder" className={styles['logo-full']} style={{ height: '24px', objectFit: 'contain' }} />
              <img src={logomob.src} alt="Noder" className={styles['logo-mob']} style={{ height: '24px', objectFit: 'contain' }} />
            </div>
          </div>

          <nav className={styles['nav-links']}>
            <div className={styles['nav-dropdown']}>
              <a href="#" style={{ display: 'flex', alignItems: 'center' }}>
                Product <ChevronDown size={14} className={styles['dropdown-icon']} />
              </a>
              <div className={styles['dropdown-menu']}>
                <a href="#">
                  <strong>Features</strong>
                  <span>Explore everything Noder has to offer</span>
                </a>
                <a href="#">
                  <strong>Integrations</strong>
                  <span>Connect your favorite external tools</span>
                </a>
                <a href="#">
                  <strong>Security</strong>
                  <span>Learn how we keep your data safe</span>
                </a>
                <a href="#">
                  <strong>Changelog</strong>
                  <span>See our latest product updates</span>
                </a>
              </div>
            </div>

            <a href="#">Pricing</a>

            <div className={styles['nav-dropdown']}>
              <a href="#" style={{ display: 'flex', alignItems: 'center' }}>
                Resources <ChevronDown size={14} className={styles['dropdown-icon']} />
              </a>
              <div className={styles['dropdown-menu']}>
                <a href="#">
                  <strong>Blog</strong>
                  <span>Read insights and company news</span>
                </a>
                <a href="#">
                  <strong>Help Center</strong>
                  <span>Get support and read our guides</span>
                </a>
                <a href="#">
                  <strong>Community Forum</strong>
                  <span>Join the discussion with other users</span>
                </a>
                <a href="#">
                  <strong>Developer API</strong>
                  <span>Build custom apps with our API</span>
                </a>
              </div>
            </div>

            <a href="#">Story</a>
          </nav>

          <button className="btn btn-primary" onClick={() => router.push('/signup')}> <Telescope  size={18} strokeWidth={2} color="var(--text-primary)"/> Early Access</button>
        </header>
        <Banner1 />
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
            <h3>Product</h3>
            <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
            <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Integrations</a>
            <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Security</a>
            <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Changelog</a>
          </motion.div>

          <motion.div
            className={styles['mobile-nav-section']}
            initial={{ opacity: 0, y: 15 }}
            animate={isMobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ delay: 0.2 }}
          >
            <h3>Resources</h3>
            <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Blog</a>
            <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Help Center</a>
            <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Community</a>
            <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Developers</a>
          </motion.div>

          <motion.div
            className={styles['mobile-nav-section']}
            initial={{ opacity: 0, y: 15 }}
            animate={isMobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ delay: 0.3 }}
          >
            <a href="#" className={styles['mobile-nav-link']} onClick={() => setIsMobileMenuOpen(false)}>Our Story</a>
          </motion.div>
        </div>
      </div>
    </>
  );
}
