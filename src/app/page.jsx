'use client';
import { useEffect } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Hero from '../components/Hero/Hero';
import TrustedSection from '../components/Testimonial/TrustedSection';
import FeaturesSection from '../components/FeatureSection/FeaturesSection';
import Waitlist1 from '../components/Waitlist/Waitlist1';
import FAQ2 from '../components/FAQ/FAQ2';
import Compare8 from "../components/Table/Compare8";




export default function Home() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active');
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
      <Hero />
      <TrustedSection />
      <FeaturesSection />
      <Compare8 />
      <FAQ2 />
      <Waitlist1 />
      <Footer />
    </div>
  );
}
