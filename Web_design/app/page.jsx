"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight, Sparkles,
  Zap, Shield, Globe, Target, Command, PackagePlus, Sparkle, ChevronDown, Menu, X, CirclePlus
} from 'lucide-react';
import noderLogo from './assets/noder.png';
import dashboardImg from './assets/Timeline 1.webp';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

function Home() {
  const router = useRouter();



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
      <Header />

      <main className="hero-split">
        {/* Left Graphic Side */}
        <div className="hero-image-container">
          <img src={dashboardImg.src} alt="Dashboard Preview" className="hero-image" />
        </div>

        {/* Right Content Side */}
        <div className="hero-content">
          <div className="badge ">
            <Sparkles size={16} className="badge-icon" /> Connecting AI Features
          </div>

          <h1 className="title reveal">
            Stay focused, stay<br />
            productive, <span className="title-faded">and<br />get more done</span>
          </h1>

          <div style={{ display: 'flex', gap: '16px', marginTop: '40px' }}>
            <div className="cta-buttons">
              <button className="btn btn-white" onClick={() => router.push('/signup')}><Sparkle size={17} /> Get Started</button>
              <button className="btn btn-blue" onClick={() => router.push('/#')}><CirclePlus size={17} /></button>
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

      <Footer />
    </div>
  );

}

export default Home;
