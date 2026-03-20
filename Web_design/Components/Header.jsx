"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkle, ChevronDown, Menu, X } from 'lucide-react';
import noderLogo from '../app/assets/noder.png';

export default function Header() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 70) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHidden(true); // scrolling down
      } else {
        setIsHidden(false); // scrolling up
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className={`header-wrapper ${isScrolled ? 'scrolled' : ''} ${isHidden ? 'hidden' : ''}`}>
        <header className="header">
          <div className="header-left">
            <button
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X color="#abababff" strokeWidth={1.25} />
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <line x1="3" y1="10" x2="21" y2="10" stroke="#abababff" strokeWidth="1.25" strokeLinecap="round" />
                  <line x1="3" y1="17" x2="21" y2="17" stroke="#abababff" strokeWidth="1.25" strokeLinecap="round" />
                </svg>
              )}
            </button>
            <div className="logo" onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
              <img src={noderLogo.src} alt="Noder" style={{ height: '20px', objectFit: 'contain' }} />
            </div>
          </div>

          <nav className="nav-links">
            <div className="nav-dropdown">
              <a href="#" style={{ display: 'flex', alignItems: 'center' }}>
                Product <ChevronDown size={14} className="dropdown-icon" />
              </a>
              <div className="dropdown-menu">
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

            <div className="nav-dropdown">
              <a href="#" style={{ display: 'flex', alignItems: 'center' }}>
                Resources <ChevronDown size={14} className="dropdown-icon" />
              </a>
              <div className="dropdown-menu">
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

          <button className="btn btn-primary" onClick={() => router.push('/signup')}> <Sparkle size={16} /> Get Started</button>
        </header>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <div className="mobile-nav-section">
            <h3>Product</h3>
            <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
            <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Integrations</a>
            <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Security</a>
            <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Changelog</a>
          </div>

          <div className="mobile-nav-section">
            <h3>Resources</h3>
            <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Blog</a>
            <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Help Center</a>
            <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Community</a>
            <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Developers</a>
          </div>

          <div className="mobile-nav-section">
            <a href="#" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Our Story</a>
          </div>
        </div>
      </div>
    </>
  );
}
