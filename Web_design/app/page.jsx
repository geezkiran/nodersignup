"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight, Sparkles,
  Zap, Shield, Globe, Target, Command, PackagePlus, Sparkle, ChevronDown
} from 'lucide-react';
import noderLogo from './assets/noder.png';
import dashboardImg from './assets/Timeline 1.webp';



function Home() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
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

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.25 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="noder-app">
      <div className={`header-wrapper ${isScrolled ? 'scrolled' : ''} ${isHidden ? 'hidden' : ''}`}>
        <header className="header">
          <div className="logo">
            <img src={noderLogo.src} alt="Noder" style={{ height: '20px', filter: 'invert(1)', objectFit: 'contain' }} />
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

      <main className="hero-split">
        {/* Left Graphic Side */}
        <div className="hero-image-container">
          <img src={dashboardImg.src} alt="Dashboard Preview" className="hero-image" />
        </div>

        {/* Right Content Side */}
        <div className="hero-content">
          <div className="badge ">
            <Sparkles size={14} className="badge-icon" /> Connecting AI Features
          </div>

          <h1 className="title reveal">
            Stay focused, stay<br />
            productive, <span className="title-faded">and<br />get more done</span>
          </h1>

          <div style={{ display: 'flex', gap: '16px', marginTop: '40px' }}>
            <div className="cta-buttons">
              <button className="btn btn-white" onClick={() => router.push('/signup')}><Sparkle size={16} /> Get Started</button>
              <button className="btn btn-secondary">Learn more</button>
            </div>
          </div>
        </div>
      </main>

      <section className="trusted-section">
        <p className="trusted-text">Trusted by innovative teams worldwide</p>
        <div className="trusted-logos">
          <span className="trusted-logo">Acme Corp</span>
          <span className="trusted-logo">Globex</span>
          <span className="trusted-logo">Soylent</span>
          <span className="trusted-logo">Initech</span>
          <span className="trusted-logo">Umbrella</span>
        </div>
      </section>

      <section className="features-section">
        <div className="section-header">
          <div className="badge"><Target size={14} className="badge-icon" /> Why choose us</div>
          <h2 className='reveal'>Everything you need to scale</h2>
          <p className='reveal'>Powerful features to help your team work faster and smarter.</p>
        </div>

        <div className="bento-grid">
          <div className="bento-card bento-large">
            <div className="bento-icon"><Zap size={24} /></div>
            <h3>Lightning Fast Performance</h3>
            <p>Our infrastructure is optimized for speed, ensuring your team never experiences lag or downtime. Work at the speed of thought.</p>
            <div className="bento-graphic bg-pattern-1"></div>
          </div>

          <div className="bento-card">
            <div className="bento-icon"><Shield size={24} /></div>
            <h3>Enterprise Security</h3>
            <p>Bank-grade encryption and advanced security controls to keep your data safe.</p>
          </div>

          <div className="bento-card">
            <div className="bento-icon"><Globe size={24} /></div>
            <h3>Global Sync</h3>
            <p>Real-time synchronization across all your devices, anywhere in the world.</p>
          </div>

          <div className="bento-card bento-wide">
            <div className="bento-icon"><Command size={24} /></div>
            <h3>Command Menu Interface</h3>
            <p>Navigate your entire workspace, run actions, and find anything instantly with our powerful command menu. Just press CMD+K.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to boost your productivity?</h2>
          <p>Join thousands of teams already using Noder to accomplish more.</p>
          <div className="cta-buttons">
            <button className="btn btn-white" onClick={() => router.push('/signup')}>Start for free</button>
            <button className="btn btn-secondary">Contact Sales</button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <img src={noderLogo.src} alt="Noder" style={{ height: '22px', filter: 'invert(1)', objectFit: 'contain' }} />
            <p>Making work beautifully simple.</p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Product</h4>
              <a href="#">Features</a>
              <a href="#">Integrations</a>
              <a href="#">Pricing</a>
            </div>
            <div className="link-group">
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Blog</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Noder Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );

}

export default Home;
