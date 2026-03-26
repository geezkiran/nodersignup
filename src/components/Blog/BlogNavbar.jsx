'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import logo from '../../app/assets/logoicon.png';
import logoMob from '../../app/assets/logoiconmob.png';
import ThemeToggle from '../Theme/ThemeToggle';
import styles from './Blog.module.css';

export default function BlogNavbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`${styles.navbarWrapper} ${isScrolled ? styles.navbarScrolled : ''}`}>
      <nav className={styles.navbar}>
        <div className={styles.navbarLeft}>
          <a href="https://noderhq.com" className={styles.navbarLogo}>
            <img src={logo.src} alt="Noder" className={styles.logoIcon} />
            <img src={logoMob.src} alt="Noder Mobile" className={styles.logoIconMob} />
          </a>
          <div className={styles.divider} />
          <Link href="/blog" className={styles.navLink}>Blog</Link>
        </div>

        <div className={styles.navbarRight}>
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
